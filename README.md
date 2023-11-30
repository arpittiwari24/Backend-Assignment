
# Backend Assignment

This is a URL Shortening API build using nodejs, expressjs and official docker image for the Postgresql as the database. It  implements user authentication and authorization. Also, it has a feature for rate limiting which allows users to shorten only 5 urls in 24 hour duration.  


## Run Locally
### Prerequisites:
   
| Required | Version/Location   
| :-------- | :------- | 
| `Nodejs`      | `18.x or latest` |
| `Docker and Docker Compose`      | `Locally` |

#### Clone the project

```bash
git clone https://github.com/arpittiwari24/Backend-Assignment.git
```

#### Go to the project directory

```bash
cd Backend-Assignment
```

#### Create .env file based on the .env.example file

#### Build the app using docker

```bash
docker build -t my-node-app .
```

#### Run the app using docker-compose

```bash
docker-compose up
```


## API Reference

#### To Setup your databases

```http
GET http://localhost:13000/users/setup
```

#### Signup 

```http
POST http://localhost:13000/users/signup
```

| Input | Type     
| :-------- | :------- | 
| `name`      | `string` |
| `email`      | `string` |
| `password`      | `string` |

#### Login 

```http
POST http://localhost:13000/users/login
```

| Input | Type     
| :-------- | :------- | 
| `email`      | `string` |
| `password`      | `string` |

#### Shorten-URL

```http
POST http://localhost:13000/users/short
```

| Input | Type     
| :-------- | :------- | 
| `origUrl`      | `string` |



