import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { hashSync } from 'bcrypt'

import { UserRole } from '@/constants'
import { BaseEntity } from './base.entity'
import { Watch } from './watch.entity'

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('enum', { enum: UserRole, default: UserRole.USER })
  role: UserRole

  @Column('text', { nullable: true, default: 'Unnamed' })
  displayName: string

  @Column('text', { nullable: true, default: 'https://picsum.photos/80' })
  avatar: string

  @Column('text')
  email: string

  @Column('text')
  username: string

  @Column('text', {
    select: false,
    transformer: {
      from: (value: string) => value,
      to: (value: string) => hashSync(value, 4)
    }
  })
  password: string

  @Column('text', { nullable: true })
  bio: string

  @Column('text', { select: false, nullable: true })
  refreshKey: string

  @Column('boolean', { default: true })
  isVerified: boolean

  @Column('boolean', { default: true })
  isActive: boolean

  // __RELATION's
  @OneToMany(() => Watch, (watch) => watch.user)
  watch: Watch[]
}

export type UsersDocument = Users & BaseEntity
