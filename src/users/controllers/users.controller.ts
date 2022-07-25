import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { User, UserModel } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { Role } from '../../auth/models/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post('adicionar')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createUserDto: User): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @Get('listar')
  findAll() {
    return this.usersService.findAll();
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.usersService.update(id, updateUserDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiParam({name: 'id' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
