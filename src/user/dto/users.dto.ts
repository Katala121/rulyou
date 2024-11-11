import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Полное имя пользователя',
    example: 'Иванов Александр',
  })
  full_name: string;

  @IsString()
  @ApiProperty({
    example: 'Роль пользователя',
  })
  role: string;

  @IsNumber()
  @ApiProperty({
    example: 100,
  })
  efficiency: number;
}

type TResponseCreateUser = {
  id: number;
};

type TUser = CreateUserDto & TResponseCreateUser;

type TUsers = {
  users: TUser[]
}

export class ResponseCreateDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Успешность ответа',
    example: 'true',
  })
  success: boolean;

  @ApiProperty({
    description: 'Результат',
    example: '{"id": 12}',
  })
  result: TResponseCreateUser;
}

export class ResponseUsersDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Успешность ответа',
    example: 'true',
  })
  success: boolean;

  @ApiProperty({
    description: 'Результат',
  })
  result: TUsers;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Полное имя пользователя',
    example: 'Иванов Александр',
  })
  full_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Роль пользователя',
  })
  role: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 100,
  })
  efficiency: number;
}

export class ResponseUpdateDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Успешность ответа',
    example: 'true',
  })
  success: boolean;

  @ApiProperty({
    description: 'Результат',
    example: '{"id": 12}',
  })
  result: TResponseCreateUser & CreateUserDto;
}

export class ResponseDeleteManyDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Успешность ответа',
    example: 'true',
  })
  success: boolean;
}

export class ResponseDeleteUserDto extends ResponseUpdateDto {}
