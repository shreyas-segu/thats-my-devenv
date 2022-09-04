import { Injectable } from '@nestjs/common';
import { Environment, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma-service/prisma.service';

@Injectable()
export class EnvironmentDaoService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EnvironmentCreateInput): Promise<Environment> {
    return this.prisma.environment.create({ data });
  }

  async getEnvironment(
    query: Prisma.EnvironmentWhereUniqueInput,
  ): Promise<Environment | null> {
    return this.prisma.environment.findUnique({
      where: query,
    });
  }

  async deleteEnvironment(
    query: Prisma.EnvironmentWhereUniqueInput,
  ): Promise<Environment> {
    return this.prisma.environment.delete({
      where: query,
    });
  }
}
