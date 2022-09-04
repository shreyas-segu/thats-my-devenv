import { Module } from '@nestjs/common';
import { MentionsModule } from './mentions/mentions.module';
import { HomeOpenedModule } from './home-opened/home-opened.module';
import { SlackService } from './slack.service';

@Module({
  imports: [MentionsModule, HomeOpenedModule],
  providers: [SlackService],
  exports: [SlackService],
})
export class SlackModule {}
