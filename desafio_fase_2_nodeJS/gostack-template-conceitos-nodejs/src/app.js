const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findByiD = repositories.findIndex(repository => repository.id === id); 

  if(findByiD === -1){
    return response.status(400).send({ error: 'Repository does not exist' });
  }

  repository = {
    id,
    title,
    url, 
    techs,
    likes: repositories[findByiD].likes,
  }

  repositories[findByiD] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findByiD = repositories.findIndex(repository => repository.id === id);

  if(findByiD >= 0){
    repositories.splice(findByiD, 1);
  }else{
    return response.status(400).send({ error: 'Repository does not exist' });
  }
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findByiD = repositories.findIndex(repository => 
    repository.id === id);
  
  if(findByiD === -1){
    return response.status(400).send({ error: 'Repository does not exist' });
  }
  repositories[findByiD].likes++;

  return response.json(repositories[findByiD]);
});

module.exports = app;
