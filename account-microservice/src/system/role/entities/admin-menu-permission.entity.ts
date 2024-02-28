import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin_menu_permission')
export class AdminMenuPermission {
  @PrimaryColumn({ name: 'admin_id', type: 'int' })
  adminId: number;

  @PrimaryColumn({ name: 'permission_id', type: 'int' })
  permissionId: number;

  @PrimaryColumn({ name: 'menu_id', type: 'int' })
  menuId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
