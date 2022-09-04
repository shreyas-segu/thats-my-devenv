import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SlackModule } from './slack/slack.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), SlackModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
