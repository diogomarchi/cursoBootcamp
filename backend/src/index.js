const express = require ('express');
const cors = require ('cors');
const {uuid, isUuid} = require ('uuidv4');//exportar biblioteca de pegar id

const app = express();

//cors permite que qualquer frontend tenha acessa ao nosso backend
//pode-se passar como parametro a origem do frontend que pode ter acesso ao backend
app.use(cors());

//para conseguir puxar o body enviado do insomnia
app.use(express.json());


//App.get precisa de dois parametros, requisição e resposta
//A resposta vem no 'return'
//URL de acesso: localhost:3333/projects
// Código de funcionamento no terminal: node src/index.js


/*
app.get('/projects', (request, response) => {
  //return response.send('Hello World');
  return response.json({message: "Hello world 🚀"});
});
*/

const projects = [];

function logRequests(request, response, next){
  // Saber qual metodo ta sendo chamado e a rota
  const{ method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
 
  console.log(logLabel);

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next){
  const { id } = request.params;

  //Se entrar no if, nao segue mais adiante o codigo
  if(!isUuid(id)){
    return response.status(400).json({error: 'Invalid project Id'});
  }
  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

// Retorna informações
app.get('/projects', (request, response) => {
  const { title} = request.query;

  // se tiver titulo colocado pelo usuário, usa primeira linha
  // caso contrário, segunda linha
  const results = title
    //ve se o title está incluso no project.title
    ? projects.filter(project => project.title.includes(title))
    : projects

  return response.json(results);
});

// Insere informações
app.post('/projects', (request, response) => {
  //constante body recebe o parametro do body inserido no insominia
  const { title, owner } = request.body;

  const project = {id: uuid(), title, owner}; 
  projects.push(project);

  return response.json(project);
});

// Altera informações
app.put('/projects/:id', (request, response) => {

  //constante body recebe o parametro do body inserido no insominia
  const { id } = request.params;
  //constante body recebe o parametro do body inserido no insominia
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return response.status(400).json({error: 'project not found'})
  }

  const project = {
    id,
    title, 
    owner, 
  }
  projects[projectIndex] = project;

  return response.json(project);
});

// Deleta informações
app.delete('/projects/:id', (request, response) => {
  //constante body recebe o parametro do body inserido no insominia
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return response.status(400).json({error: 'project not found'})
  }

  projects.splice(projectIndex, 1);


  return response.status(204).send();
});

// Ouvir a porta 3333
app.listen(3333, () => {
  // Segundo argumento serve para mostrar no console que o servidor está pronto
  console.log("🚀 Back-end started!");
});
