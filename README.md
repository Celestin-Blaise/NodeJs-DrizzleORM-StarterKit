# Getting Started

## Create .env file

Copy the `.env.example` file and update the values accordingly. 

## Create Postgred Docker DB Instance

```sh
run ./create-docker-postgres-db.sh file in your terminal - NB: DOCKER SHOULD BE INSTALLED ON YOUR PC
```
## Generate DB Migrations from Schema files

```sh
pnpm run db:generate
```

## Migrate the DB

```sh
pnpm run db:migrate
```

## Seed the DB

```sh
pnpm run db:seed
```
## Run Drizzle Studio

```sh
pnpm run studio
```

## Start the SERVER

```sh
pnpm run dev
```