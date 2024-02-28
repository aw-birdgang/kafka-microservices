import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleDto } from '../dto/role.dto';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 1000 })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  toRoleDto() {
    const roleDto = new RoleDto();
    roleDto.id = this.id;
    roleDto.name = this.name;
    roleDto.description = this.description;
    return roleDto;
  }
}
