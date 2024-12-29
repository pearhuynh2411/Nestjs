import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { ApiHeader, ApiQuery } from '@nestjs/swagger';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /* @Get()
  findAll() {
    return this.userService.findAll();
  } */

    @Get("list-user/:id")
    @ApiQuery({name: "keyword", required: false, type: String})
    @ApiHeader({name: "token", required: false})
    findAll(
      @Param('id') id: string, //lấy param theo kiểu nestjs
      @Query("keyword") keyword: string, //lấy Query theo kiểu nestjs
      @Headers("token") token: string,  //lấy Headers theo kiểu nestjs
      @Req() req: Request //lấy request từ expressjs
    ): any {
      let id1 = req.params.id //lấy param theo kiểu expressjs
      let keyword1 = req.query.keyword; //lấy keyword theo kiểu expressjs
      let token1 = req.headers["token"]; //lấy token theo kiểu expressjs
      return {id ,id1 ,keyword, keyword1, token, token1};
      /* return this.userService.findAll(); */
    }
    

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
