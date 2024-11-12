import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  count_mutant_dna: number;

  @Column({default: 0})
  count_human_dna: number;
}