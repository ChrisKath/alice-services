import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Users } from '@/entities/users.entity'
import type { UpdateValues } from '@/types/user'

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private readonly userStore: Repository<Users>

  async profile(userId: number): Promise<Users> {
    return this.userStore.createQueryBuilder('user').where('user.id = :userId', { userId }).getOne()
  }

  async update(userId: number, values: UpdateValues) {
    return this.userStore
      .createQueryBuilder('user')
      .update(Users)
      .set(values)
      .where('id = :userId', { userId })
      .execute()
  }
}
