import { Module } from '@nestjs/common';
import { MentionsService } from './mentions.service';

@Module({
  providers: [MentionsService],
  exports: [MentionsService],
})
export class MentionsModule {}
