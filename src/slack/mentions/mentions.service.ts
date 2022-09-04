import { Injectable } from '@nestjs/common';
import { AppMentionEvent, Context } from '@slack/bolt';
import { Logger, WebClient } from '@slack/web-api';

@Injectable()
export class MentionsService {
  async handleMention({
    event,
    client,
    logger,
  }: {
    event: AppMentionEvent;
    client: WebClient;
    logger: Logger;
    context: Context;
  }) {
    logger.info('Mention event received');
    try {
      await client.chat.postMessage({
        channel: event.channel,
        text: `Hey there <@${event.user}>!`,
      });
    } catch (error) {
      logger.error(error);
    }
  }
}
