import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import type { SkipTrack } from '@/types/track'

import { BaseEntity } from './base.entity'
import { Albums } from './albums.entity'
import { Watch } from './watch.entity'

@Entity('tracks', { orderBy: { episode: 'ASC' } })
export class Tracks extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  title: string

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  poster?: string

  @Column('int4', { default: 1 })
  seasonNo: number

  @Column('int4', { default: 1 })
  episodeNo: number

  @Column('float8', { default: 0 })
  duration: number

  @Column('jsonb', { nullable: true })
  skip?: SkipTrack

  @Column('text')
  filePath: string

  @Column('float8')
  fileSize: number

  @Column('float8', { select: false, default: 2 * 1024 * 1024 })
  chunkSize?: number

  @Column('boolean', { default: true })
  isActive: boolean

  // __RELATION's
  @ManyToOne(() => Albums, (album) => album.tracks)
  album: Albums

  @OneToMany(() => Watch, (watch) => watch.track)
  watch: Watch[]
}

export type TracksDocument = Tracks & BaseEntity
