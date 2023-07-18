# MitraMart
<h3 align="center">MitraMart API</h3>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a Restful API repository for MitraMart. This Restful API is built using ExpressJS and PostgreSQL.

### Technology Used

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### Installation

- Clone this project with `git clone https://github.com/rikakus/MitraMart`
- Install package required with `npm install`
- Setting .env

```bash

PORT=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
```

### Executing program

- Run program with `npm run start`

## Endpoint List

#### User

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `get`      | `/goods/all` | get list all goods |
| `get`      | `/goods/detail/:id` | get detail goods |
| `post`      | `/goods/input` | input data goods |
| `put`      | `/goods/update/:id` | update data goods |
| `delete`      | `/goods/delete/:id` | delete data goods |

## Database sturcture
![image](https://user-images.githubusercontent.com/59488349/213807936-1cb06a25-0395-4015-962b-e3d485c4a634.png)


## License

This project is licensed under the MIT License - see the LICENSE file for details