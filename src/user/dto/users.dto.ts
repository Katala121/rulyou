import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsOptional, MaxLength } from 'nestjs-class-validator';
import { User } from '@prisma/client';

const MAX_NAME_LENGTH = 255;
const MAX_ROLE_LENGTH = 255;

export class CreateUserDto {
  @IsString({
    language: "ru",
  })
  @MaxLength(MAX_NAME_LENGTH, {
    language: "ru",
  })
  @ApiProperty({
    description: 'Полное имя пользователя',
    example: 'Иванов Александр',
  })
  full_name: string;

  @IsString({
    language: "ru",
  })
  @MaxLength(MAX_ROLE_LENGTH, {
    language: "ru",
  })
  @ApiProperty({
    example: 'Роль пользователя',
  })
  role: string;

  @IsNumber(undefined, {
    language: "ru"
  })
  @ApiProperty({
    example: 100,
  })
  efficiency: number;
}

type TResponseCreateUser = {
  id: number;
};

type TUsers = {
  users: User[]
}

export class ResponseCreateDto {
  @IsBoolean({
    language: "ru",
  })
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
  @IsBoolean({
    language: "ru",
  })
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
  @IsString({
    language: "ru",
  })
  @IsOptional()
  @MaxLength(MAX_NAME_LENGTH, {
    language: "ru",
  })
  @ApiProperty({
    description: 'Полное имя пользователя',
    example: 'Иванов Александр',
  })
  full_name: string;

  @IsString({
    language: "ru",
  })
  @IsOptional()
  @MaxLength(MAX_ROLE_LENGTH, {
    language: "ru",
  })
  @ApiProperty({
    example: 'Роль пользователя',
  })
  role: string;

  @IsNumber(undefined, {
    language: "ru",
  })
  @IsOptional()
  @ApiProperty({
    example: 100,
  })
  efficiency: number;
}

export class ResponseUpdateDto {
  @IsBoolean({
    language: "ru",
  })
  @ApiProperty({
    description: 'Успешность ответа',
    example: 'true',
  })
  success: boolean;

  @ApiProperty({
    description: 'Результат',
    example: '{"id": 12}',
  })
  result: User;
}

export class ResponseDeleteManyDto {
  @IsBoolean({
    language: "ru",
  })
  @ApiProperty({
    description: 'Успешность ответа',
    example: 'true',
  })
  success: boolean;
}

export class ResponseDeleteUserDto extends ResponseUpdateDto {}
