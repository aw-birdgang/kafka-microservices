import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menu_role_permission')
export class MenuRolePermission {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'menu_id', type: 'varchar' })
  menuId: string;

  @Column({ name: 'role_id', type: 'int' })
  roleId: number;

  @Column({ name: 'permission_ids', type: 'simple-array' })
  permissionIds: Array<string>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
