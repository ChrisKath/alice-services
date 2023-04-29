import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { WatchStatus } from '@/constants'
import { BaseEntity } from './base.entity'
import { Tracks } from './tracks.entity'
import { Users } from './users.entity'

@Entity('watch')
export class Watch extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column('float8', { default: 0 })
  seekTime: number

  @Column('enum', { enum: WatchStatus, default: WatchStatus.NEW })
  status: WatchStatus

  // __RELATION's
  @ManyToOne(() => Users, (user) => user)
  user: Users

  @ManyToOne(() => Tracks, (track) => track)
  track: Tracks
}

export type WatchDocument = Watch & BaseEntity
