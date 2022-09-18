import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PrismaService } from '../../database/prisma-service/prisma.service';
import { MentionsService } from './mentions.service';

@Module({
  providers: [MentionsService, PrismaService],
  imports: [DatabaseModule],
  exports: [MentionsService],
})
export class MentionsModule {}
