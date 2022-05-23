import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';
import api from './services/api';
import backgroundImage from './assets/background.jpg';

function App(){

  //iniciado com array vazio, pois projects é um array
  //deve-se iniciar o useState com o mesmo tipo do projects
  //esta iniciando vazio, pois o backend esta retornado um objeto ja
  const [projects, setProjects] = useState([]);

  //array vazio significa que so mostrara useEffect quando o elemento for exibido
  //é um array de dependencia
  useEffect(()=> {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, [])

  async function handleAddProject(){
    //projects.push(`Novo projeto ${Date.now()}`);
    //"..." serve para copiar o que tem no projects
    //conceito de imutabilidade é nao alterar projeto raiz, mas sim fazer uma copia com a modificação
    
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Diogo Marchi"
    });

    const project = response.data;

    //Adiciona o project nos projects
    setProjects([...projects, project]);

    console.log(projects);
  }

  return (
    <>
      <Header title = "Projects"/>

      <img width={300} src={backgroundImage}/>
 
      <ul>
          {projects.map(project => <li key = {project.id}> {project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>

    </>
  );
}

export default App;
 