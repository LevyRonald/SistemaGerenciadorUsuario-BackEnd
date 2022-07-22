import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
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

  @Get('listar')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('listarUm')
  findOne(@Body('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiParam({name: 'id' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
