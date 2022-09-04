import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma-service/prisma.service';

@Injectable()
export class UserDaoService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getUser(query: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: query,
    });
  }

  async deleteUser(query: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where: query,
    });
  }
}
