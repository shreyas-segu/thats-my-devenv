# That's my DevEnv!

This slack bot will be helpful for teams who have many development environments and want to book them for their projects.

## Objective

The bot will be designed to be used in a slack channel. The bot will be able to book a development environment for a user and will be able to release the environment when the user is done with it.

## Features

- [ ] The bot will be able to book a development environment for a user.
- [ ] The bot will be able to release a development environment when the user is done with it.
- [ ] Any user can take a look at the available development environments.
- [ ] Any user can query the bot to know who is using a specific development environment.

## Technologies

- NodeJS
- Typescript
- SQLite
- Prisma
- Slack API (Slack Bolt)


## Entities

- Users
- Environments

## Design

### Schema

```mermaid
erDiagram
    USERS {
      string id PK
      string name
    }

    ENVIRONMENT {
      string id PK
      string name
      string userID FK
    }

    USERS o|..|o ENVIRONMENT : has
```

A user can have 0 or 1 environments at a time, and an environment can be used by only 1 user at a time.

### User CRUD Conversation

```mermaid
sequenceDiagram
    participant User
    participant Bot

    User->>Bot: @DevEnv add user <@name>
    Bot->>User: User <name> added successfully!
    User->>Bot: @DevEnv remove user <@name>
    Bot->>User: User <name> removed successfully!
```

### Environment CRUD Conversation

```mermaid
sequenceDiagram
    participant User
    participant Bot

    User->>Bot: @DevEnv add environment <dev-env-name>
    Bot->>User: Environment <dev-env-name> added successfully!
    User->>Bot: @DevEnv remove environment <dev-env-name>
    Bot->>User: Environment <dev-env-name> removed successfully!
```

### Book Environment Conversation

```mermaid
sequenceDiagram
    participant User
    participant Bot

    alt book environment
      User->>Bot: @DevEnv list free environments
      Bot->>User: Here are the free environments: <dev-env-name-1>, <dev-env-name-2>, <dev-env-name-3>
      User->>Bot: @DevEnv book <dev-env-name-1>
      Bot->>User: <dev-env-name-1> booked successfully!
    else see who is using an environment
      User->>Bot: @DevEnv who is using <dev-env-name-1>
      Bot->>User: <dev-env-name-1> is being used by <@name>
    else see assignment
      User->>Bot: @DevEnv assignment
      Bot->>User: Here is your assignment: <lists-mapping>
    else release environment
      User->>Bot: @DevEnv release <dev-env-name-1>
      Bot->>User: <dev-env-name-1> released successfully!
    end
```

## References

- [Slack Bolt](https://slack.dev/bolt-js/concepts)
- Inspired by [Rota Bot](https://github.com/kmaida/rota-slackbot)
- [Prisma](https://www.prisma.io/)