import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SlackService } from './slack/slack.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;

  const slack = app.get(SlackService);
  app.use('/slack/events', slack.use());
  await app.listen(port);

  Logger.log(`Listening on port ${port}`);
}
bootstrap();
