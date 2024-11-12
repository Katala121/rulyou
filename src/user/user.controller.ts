import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CreateUserDto,
  ResponseCreateDto,
  ResponseUsersDto,
  UpdateUserDto,
  ResponseUpdateDto,
  ResponseDeleteUserDto,
  ResponseDeleteManyDto,
} from './dto/users.dto';

@ApiTags('Пользователь')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: ResponseCreateDto })
  @ApiOperation({
    summary: 'Создание пользователя',
  })
  @Post('create')
  async create(@Body() userData: CreateUserDto): Promise<ResponseCreateDto> {
    const user = await this.userService.create(userData);
    return { success: true, result: { id: user.id } };
  }

  @ApiOkResponse({ type: ResponseUsersDto })
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiQuery({
    name: 'full_name',
    description: 'Полное имя',
    example: 'Иванов Иван',
    required: false,
  })
  @ApiQuery({
    name: 'role',
    description: 'Роль пользователя',
    example: 'Читатель',
    required: false,
  })
  @ApiQuery({
    name: 'efficiency',
    description: 'Эффективность пользователя',
    example: 98,
    required: false,
  })
  @Get('get')
  async getUsers(
    @Query('full_name') full_name?: string,
    @Query('role') role?: string,
    @Query('efficiency') efficiency?: number,
  ): Promise<ResponseUsersDto> {
    const users = await this.userService.getAll({
      full_name,
      role,
      efficiency: efficiency ? Number(efficiency) : undefined,
    });
    return {
      success: true,
      result: {
        users: users,
      },
    };
  }

  @ApiOkResponse({ type: ResponseUsersDto })
  @ApiOperation({ summary: 'Получение одного пользователя' })
  @Get('get/:id')
  async getOneUser(@Param('id') id: number): Promise<ResponseUsersDto> {
    const user = await this.userService.getOne(Number(id));
    return {
      success: true,
      result: {
        users: user ? [user] : [],
      },
    };
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: ResponseUpdateDto })
  @ApiOperation({
    summary: 'Обновление параметров пользователя',
  })
  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() userUserData: UpdateUserDto,
  ): Promise<ResponseUpdateDto> {
    const user = await this.userService.update({
      ...userUserData,
      id: Number(id),
    });
    return {
      success: true,
      result: user,
    };
  }

  @ApiOkResponse({ type: ResponseDeleteManyDto })
  @ApiOperation({
    summary: 'Удаление всех пользователей',
  })
  @Delete('delete')
  async deleteMany(): Promise<ResponseDeleteManyDto> {
    await this.userService.deleteAll();
    return {
      success: true,
    };
  }

  @ApiOkResponse({ type: ResponseDeleteUserDto })
  @ApiOperation({
    summary: 'Удаление одного пользователя',
  })
  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<ResponseUpdateDto> {
    const user = await this.userService.deleteOne(Number(id));
    return {
      success: true,
      result: user,
    };
  }
}
