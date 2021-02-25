import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryColumn({ type: 'varchar', length: '78' })
  token_id: string;

  @Column({ type: 'text' })
  image: string;
}
