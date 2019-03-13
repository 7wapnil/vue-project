ArcaneBet website
===========================

ArcaneBet front-end project

Development
======================

The project ships with docker-compose.example.yml file meant for local development. In order to use it you need to have Docker and Docker Compose installed on your machine.
Copy example docker-compose file and adjust it to your taste:
```bash
$ cp docker-compose.example.yml docker-compose.yml
```

Copy .env to .env.local (Vue.js convention)

```bash
cp .env .env.local
```

Put the values you got from the development team into .env.local

Install the frontend dependencies into the docker-compose volume
```bash
docker-compose run --rm web sh # bash won't work here
yarn install
exit
```

To launch the application stack run:
```bash
$ docker-compose up -d
```

Development web-server and build watcher are served by default

Testing
=========================
Use yarn command to run unit tests
```bash
yarn run test:unit
```

Production
===================
Use yarn to build production distribution
```bash
yarn build
```
