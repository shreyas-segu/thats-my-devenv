import { Injectable } from '@nestjs/common';
import { AppMentionEvent, Context } from '@slack/bolt';
import { Logger, WebClient } from '@slack/web-api';
import { PrismaService } from '../../database/prisma-service/prisma.service';

@Injectable()
export class MentionsService {
  constructor(private prisma: PrismaService) {}
  async handleMention({
    event,
    client,
    logger,
    context,
  }: {
    event: AppMentionEvent;
    client: WebClient;
    logger: Logger;
    context: Context;
  }) {
    logger.info(`Mention event received from user ${event.user}`);
    const command = this.parseCommand(event.text);
    try {
      logger.info(command);
      switch (command) {
        case Command.ADD_USER:
          await Promise.all([
            this.addUsers(event, context, logger),
            client.chat.postMessage({
              channel: event.channel,
              text: `I've added the user!`,
            }),
          ]);
          break;
        case Command.ADD_ENVIRONMENT:
          await this.addEnvironments(event, context, logger);
          break;
        case Command.REMOVE_USER:
          break;
        case Command.REMOVE_ENVIRONMENT:
          break;
        case Command.ASSIGN_ENVIRONMENT:
          break;
        case Command.LIST_USERS:
          const users = await this.listUsers(event, context, logger);
          console.log(JSON.stringify(users));
          break;
        case Command.LIST_ENVIRONMENTS:
          break;

        default:
          break;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async addUsers(event: AppMentionEvent, context: Context, logger: Logger) {
    const { botUserId } = context;
    const { text, channel } = event;
    const users = text.matchAll(/(?!<@)[A-Z0-9]+(?=>)/g);
    const usersToAdd: string[] = [];
    for (const user of users) {
      if (user[0] !== botUserId) {
        usersToAdd.push(user[0]);
      }
    }
    logger.info(`adding users ${usersToAdd}`);
    await Promise.all(
      usersToAdd.map((user) =>
        this.prisma.user.create({
          data: { slackId: user, channelId: channel },
        }),
      ),
    )
      .then(() => {
        logger.info(`users added`);
      })
      .catch((err) => {
        logger.error(`error adding users ${JSON.stringify(err)}`);
      });
  }

  async listUsers(event: AppMentionEvent, context: Context, logger: Logger) {
    logger.info(`getting all users`);
    const users = await this.prisma.user.findMany({
      where: {
        channelId: event.channel,
      },
    });
    return users;
  }

  async addEnvironments(
    event: AppMentionEvent,
    context: Context,
    logger: Logger,
  ) {
    logger.info(`adding environments`);
    console.log(JSON.stringify(event));
  }

  parseCommand(message: string): Command {
    if (message.includes('add')) {
      if (message.includes('env')) {
        return Command.ADD_ENVIRONMENT;
      } else {
        return Command.ADD_USER;
      }
    } else if (message.includes('remove')) {
      if (message.includes('user')) {
        return Command.REMOVE_USER;
      } else if (message.includes('env')) {
        return Command.REMOVE_ENVIRONMENT;
      }
    } else if (message.includes('assign')) {
      return Command.ASSIGN_ENVIRONMENT;
    } else if (message.includes('list')) {
      if (message.includes('user')) {
        return Command.LIST_USERS;
      } else if (message.includes('env')) {
        return Command.LIST_ENVIRONMENTS;
      }
    }
  }
}
enum Command {
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
  LIST_USERS = 'LIST_USERS',
  ADD_ENVIRONMENT = 'ADD_ENVIRONMENT',
  REMOVE_ENVIRONMENT = 'REMOVE_ENVIRONMENT',
  ASSIGN_ENVIRONMENT = 'ASSIGN_ENVIRONMENT',
  LIST_ENVIRONMENTS = 'LIST_ENVIRONMENTS',
  QUERY_ENVIRONMENT = 'QUERY_ENVIRONMENT',
  LIST_ASSIGNMENTS = 'LIST_ASSIGNMENTS',
}
