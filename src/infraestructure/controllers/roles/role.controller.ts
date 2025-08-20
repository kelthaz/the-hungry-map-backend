import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../../services/users/user.service';
import { RoleService } from '../../services/roles/role.service';

import { CreateRoleDto } from 'src/application/dtos/roles/create-role.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  async createUser(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all users' })
  // async getUsers() {
  //     return this.roleService.getUsers();
  // }
}
