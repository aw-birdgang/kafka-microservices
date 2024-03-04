import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 30 })
  id: string;

  @Column({ name: 'sort', type: 'tinyint', nullable: true })
  sort: number;

  @Column({ name: 'parent_id', type: 'varchar', nullable: true })
  parentId: string;

  @Column({ name: 'permissions', type: 'simple-array', nullable: true })
  permissions: Array<string>;

  @Column({ name: 'code', type: 'varchar', nullable: true })
  code: string;

  @Column({ name: 'url', type: 'varchar', nullable: true })
  url: string;

  @Column({ name: 'default_name', type: 'varchar', nullable: true })
  defaultName: string;

  @Column({ name: 'hide', type: 'boolean', nullable: true })
  hide: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // @Column({
  //   type: "enum",
  //   enum: MenuType,
  //   default: MenuType.MENU,
  // })
  // type: MenuType;

  // @Column({ name: "depth", type: "tinyint" })
  // depth: number;

  // @Column({ name: "code", type: "varchar", nullable: true })
  // code: string;
}
