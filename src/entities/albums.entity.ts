import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Genres } from '@/constants'
import { Tracks } from './tracks.entity'

@Entity('albums')
export class Albums {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  groupId: string

  @Column('text')
  name: string

  @Column('text', { nullable: true })
  description: string

  @Column('enum', { enum: Genres, default: Genres.MOVIE })
  genre: Genres

  @Column('text', { nullable: true })
  poster: string

  @Column('int4', { default: 1 })
  seasonNo: number

  @Column('boolean', { default: true })
  isActive: boolean

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  releaseDate: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date

  // __RELATION's
  @OneToMany(() => Tracks, (track) => track.album)
  tracks: Tracks[]
}

export type AlbumsDocument = Albums
