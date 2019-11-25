# Final Fantasy XIV Gear Calculator

**Background:** Final Fantasy XIV is a Massively Multiplayer Online Role Playing Game (MMORPG) with a frankly insane amount of potential gear to use for any given class. This project is intended to pull all the gear and relevant items together in one easy to read spot, as well as in the future implement some way to provide user feedback & updates.

## Tasks:

- Gather data using https://xivapi.com/
- Break down to each item, for each class

## Technology to implement:
- Redis to prevent constant polling of the site
- Pull new items to redis cache daily

## Running locally

There's no database, just `yarn install && yarn run`

### Technology in place:
- React
- Axios
