import React from 'react';


/*
  Title é o parametro passado pela chamada da função
  children é uma função do Header para exibir o que está no HTML do app.js
*/
export default function Header({ title, children }){
  return(
    //Para exibir o conteudo do title ou afins, precisa abrir a fechar chave
    <header>
      <h1>{title}</h1>
    </header>
  );
}