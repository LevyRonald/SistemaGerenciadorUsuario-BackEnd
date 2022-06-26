import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: User) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({name: 'id' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
