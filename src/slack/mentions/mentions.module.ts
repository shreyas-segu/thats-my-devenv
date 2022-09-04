import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { MentionsService } from './mentions.service';

@Module({
  providers: [MentionsService],
  imports: [DatabaseModule],
  exports: [MentionsService],
})
export class MentionsModule {}
