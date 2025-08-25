## Pickleball Planner

Backend service for a Pickleball planner app

### Endpoints:
`/games` - GET  retrieves all of the available games

`/games` - POST adds a new game to the database

`/games/:id` - GET retrieves a single game by id

`/games/:id/players` - POST adds a new player to a game

`/games/:id/players/:playerid` - PATCH updates the status of a player in a game

`/setup` - GET sets up the database tables if they do not exist

## Getting started
Create a `.env` file in the root of the project with the following code:
```
DB_USER=pguser
DB_PASSWORD=password
DB_NAME=pickleball_db
```
Run `docker compose up -d` to start the Docker host.

Run `npm install` to install the dependencies.

Navigate to `localhost:3000/setup` to build the database.

## Design Notes
### Repeatable games
This could be achieved by creating a `recurring_games` table. In order to avoid cluttering up the `games` table, a cron job could be set up to query the `recurring_games` table and check the `games` table's future games for matches. If there are no matches for a set time into the future, add them.

### Player groups
This could be achieved by creating a `groups` table which has a many-many relationship to the `players` table (so a player could belong to more than one group). The backend logic would provide a method to add all the players from a specified group.

### Invite status
This would be somewhat more complex due to the need for some kind of email service, something like Mailgun or SendGrid.

There would be a new table `invitations` which would be a single source of truth for each specific invite, and record the status and time sent of each email. Once sent, the status would update from 'pending' to 'sent'.

There could also be some sort of authentication system to allow the players to update their own invitation status.

### Shortcuts

Given more time I would:

- Use typescript
- Write unit tests
- Consider having players to games as a many-many relationship so a player can enter more than one game.
- Write a basic front end to enable adding games and players
