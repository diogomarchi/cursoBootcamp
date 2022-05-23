module.exports = {
  presets: [
    //converte js mais moderno em um mais antigo baseado no ambiente de aplicação
    //env = ambiente
    '@babel/preset-env',
    // adiciona funcionalidades do react na conversao
    // ele que entende o html dentro do js e converte pro browser
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};