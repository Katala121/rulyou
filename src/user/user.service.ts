import { Injectable } from '@nestjs/common';
import { User, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

type TParams = {
  full_name?: string;
  role?: string;
  efficiency?: number
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async getOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async getAll(params: TParams): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        ...params,
      },
    });
  }

  async update(user: User): Promise<User> {
    return this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async deleteAll(): Promise<Prisma.BatchPayload> {
    return this.prisma.user.deleteMany({
      where: {},
    });
  }
  async deleteOne(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}
