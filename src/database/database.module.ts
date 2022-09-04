import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { UserDaoService } from './user-dao/user-dao.service';
import { EnvironmentDaoService } from './environment-dao/environment-dao.service';

@Module({
  providers: [PrismaService, UserDaoService, EnvironmentDaoService],
  exports: [PrismaService, UserDaoService, EnvironmentDaoService],
})
export class DatabaseModule {}
