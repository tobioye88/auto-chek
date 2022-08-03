## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

Top 10 most occurring words in the titles of the last 25 stories
```bash
$ curl --location --request GET 'localhost:3000/v1/words/top-10/in-titles-last'
```

Top 10 most occurring words in the titles of the post of exactly the last week
```bash
$ curl --location --request GET 'localhost:3000/v1/words/top-10/in-titles-last-week'
```

Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma
```bash
$ curl --location --request GET 'localhost:3000/v1/words/top-10/in-titles-last-600'
```

## License

Nest is [MIT licensed](LICENSE).
