import { Injectable } from '@nestjs/common';
import { App, ExpressReceiver } from '@slack/bolt';
import { Application } from 'express';
import { HomeOpenedService } from './home-opened/home-opened.service';
import { MentionsService } from './mentions/mentions.service';

@Injectable()
export class SlackService {
  private app: App;
  private readonly reciever: ExpressReceiver;

  constructor(
    private homeOpened: HomeOpenedService,
    private mentions: MentionsService,
  ) {
    this.reciever = new ExpressReceiver({
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      endpoints: '/',
    });

    this.app = new App({
      token: process.env.SLACK_BOT_TOKEN,
      receiver: this.reciever,
    });

    this.app.event(
      'app_mention',
      async ({ event, client, logger, context }) => {
        this.mentions.handleMention({
          event,
          client,
          logger,
          context,
        });
      },
    );
    this.app.event(
      'app_home_opened',
      async ({ event, client, logger, context }) => {
        this.homeOpened.handleHomeOpenedEvent({
          event,
          client,
          logger,
          context,
        });
      },
    );
  }

  public use(): Application {
    return this.reciever.app;
  }
}
