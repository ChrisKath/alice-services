import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tags')
export class Tags {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string
}

export type TagsDocument = Tags
