import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [ConfigModule.forRoot(), SlackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
