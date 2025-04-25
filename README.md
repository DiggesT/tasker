# How to lounch the project

1 Step: Create PostgreSQL database

```
psql
create database "tasker";
create user "tasker" with encrypted password 'tasker';
grant all privileges on database "tasker" to "tasker";
alter user "tasker" createdb;
alter database "tasker" owner to "tasker";
```

2 Step: Download repository

```
git clone https://github.com/DiggesT/tasker.git
```

3 Step: Install packages

```
cd tasker/
pnpm i
```

4 Step: Run project in dev mode

```
pnpm dev
```

Note: be careful with db url, check `schema.prisma` file.