import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menu_language')
export class MenuLanguage {
  @PrimaryColumn({ name: 'menu_id', type: 'varchar', length: 30 })
  menuId: string;

  @PrimaryColumn({ name: 'language_code', type: 'varchar', length: 3 })
  languageCode: string;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
