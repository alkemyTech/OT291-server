# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

## TEST USERS

# ADMIN USERS 

| FirstName      | lastName | email            | password |
|----------------|----------|------------------|----------|
| usuarioAdmin1  | Demo1    | test1@admin.com  | admin    |
| usuarioAdmin2  | Demo2    | test2@admin.com  | admin    |
| usuarioAdmin3  | Demo3    | test3@admin.com  | admin    |
| usuarioAdmin4  | Demo4    | test4@admin.com  | admin    |
| usuarioAdmin5  | Demo5    | test5@admin.com  | admin    |
| usuarioAdmin6  | Demo6    | test6@admin.com  | admin    |
| usuarioAdmin7  | Demo7    | test7@admin.com  | admin    |
| usuarioAdmin8  | Demo8    | test8@admin.com  | admin    |
| usuarioAdmin9  | Demo9    | test9@admin.com  | admin    |
| usuarioAdmin10 | Demo10   | test10@admin.com | admin    |

# STANDAR USERS

| FirstName      | lastName | email            | password |
|----------------|----------|------------------|----------|
| usuarioStandar1  | Demo1    | test1@user.com  | user    |
| usuarioStandar2  | Demo2    | test2@user.com  | user    |
| usuarioStandar3  | Demo3    | test3@user.com  | user    |
| usuarioStandar4  | Demo4    | test4@user.com  | user    |
| usuarioStandar5  | Demo5    | test5@user.com  | user    |
| usuarioStandar6  | Demo6    | test6@user.com  | user    |
| usuarioStandar7  | Demo7    | test7@user.com  | user    |
| usuarioStandar8  | Demo8    | test8@user.com  | user    |
| usuarioStandar9  | Demo9    | test9@user.com  | user    |
| usuarioStandar10 | Demo10   | test10usern.com | user    |


