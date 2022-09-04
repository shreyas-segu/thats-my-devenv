import { Injectable } from '@nestjs/common';
import { AppHomeOpenedEvent, Context } from '@slack/bolt';
import { Logger, WebClient } from '@slack/web-api';

@Injectable()
export class HomeOpenedService {
  async handleHomeOpenedEvent({
    event,
    client,
    logger,
  }: {
    event: AppHomeOpenedEvent;
    client: WebClient;
    logger: Logger;
    context: Context;
  }) {
    logger.info('Home opened event received');
    try {
      await client.views.publish({
        user_id: event.user,
        view: {
          type: 'home',
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `Welcome home, <@${event.user}> :house_with_garden:`,
              },
            },
          ],
        },
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
