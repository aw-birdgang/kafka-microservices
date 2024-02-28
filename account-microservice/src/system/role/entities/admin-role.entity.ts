import { Entity, PrimaryColumn } from 'typeorm';

@Entity('admin_role')
export class AdminRole {
  @PrimaryColumn({ name: 'admin_user_id', type: 'int' })
  adminUserId: number;

  @PrimaryColumn({ name: 'role_id', type: 'int' })
  roleId: number;
}
