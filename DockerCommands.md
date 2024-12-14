#### Write `Dockerfile` for nextjs app

```
FROM node:20.9.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

#### Command for create docker Image

```
docker build -f Dockerfile -t personal-protfolio:1.0 .
```

### Show Docker Docker running container

```
docker ps -a
```

#### Show Docker Docker all images

```
docker images
```

#### Create docker container from image

```
docker run -d -p 3000:3000 personal-protfolio:1.0
```

#### Stop docker container

```
docker container stop [name]
```

#### Write `docker-compose.yml`

```
version: "3.8"
services:
  client-dev:
    image: personal-portfolio:1.0
    container_name: personal-portfolio
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    env_file:
      - .env
```

#### Run the docker compose file

```
docker compose up
```
