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

### Player groups

### Invite status

### Shortcuts

Given more time I would:

- Use typescript
- Write tests
- Consider having players to games as a many-many relationship so a player can enter many different games.
- 
