# todo
## Installation
Clone the repository:

```sh
git clone https://github.com/KrifiZ/todo.git
cd todo 
```
Install the dependencies: <br>
```sh
npm install
```
Create a .env file in the root directory of the project with the following contents:
```sh
MONGO_URI=mongodb://mongodb:27017/your-database-name
```
Replace your-database-name with the name of the MongoDB database you want to use.
Start the services with docker-compose: <br>
```sh
docker-compose up
```
This will start the server and client services, as well as a MongoDB service. <br>

Open your web browser and go to http://localhost:5137 to view the client app.
