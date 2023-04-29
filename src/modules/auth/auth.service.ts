import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { compareSync } from 'bcrypt'
import { addHours, addMonths, isBefore } from 'date-fns'
import { v5 as uuidV5, NIL } from 'uuid'

import { UserRole } from '@/constants'
import { Users, UsersDocument } from '@/entities/users.entity'
import type { AccessKey } from '@/types'

@Injectable()
export class AuthService {
  @InjectRepository(Users)
  private readonly userStore: Repository<Users>

  @Inject()
  private readonly jwtService: JwtService

  async createAccessKey(user: UsersDocument): Promise<AccessKey> {
    if (!user.isActive) throw new ForbiddenException('Your account has been suspended!')

    const [accessToken, expiredAt] = [
      this.jwtService.sign({
        uid: user.id,
        role: user.role
      }),
      addHours(new Date(), 1).toISOString()
    ]

    const refreshKey = await this.setRefreshKey(user.id)

    return { accessToken, refreshKey, expiredAt }
  }

  async validateUser(username: string, password: string): Promise<AccessKey | void> {
    const user = await this.userStore
      .createQueryBuilder('user')
      .where('user.username = :username')
      .orWhere('user.email = :username')
      .addSelect(['user.password'])
      .setParameters({ username })
      .getOne()

    if (user && compareSync(password, user.password)) {
      return await this.createAccessKey(user)
    }
  }

  async validateRefreshKey(refreshKey: string): Promise<AccessKey | void> {
    const user = await this.userStore
      .createQueryBuilder('user')
      .where('user.refreshKey LIKE :key', { key: `${refreshKey}%` })
      .addSelect(['user.refreshKey'])
      .getOne()

    if (user) {
      const [_, expiredAt] = user.refreshKey.split('@')

      if (isBefore(new Date(), new Date(expiredAt))) {
        return await this.createAccessKey(user)
      }
    }
  }

  async setRefreshKey(userId: number): Promise<string> {
    const expiredAt = addMonths(new Date(), 2).toISOString()
    const refreshKey = uuidV5(`uuid:${userId}/${expiredAt}`, NIL)

    await this.userStore
      .createQueryBuilder('user')
      .update(Users)
      .set({ refreshKey: `${refreshKey}@${expiredAt}` })
      .where('id = :userId', { userId })
      .execute()

    return refreshKey
  }

  async getProfile(userId: number): Promise<Users> {
    return this.userStore.createQueryBuilder('user').where('user.id = :userId', { userId }).getOne()
  }
}
