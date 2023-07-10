# MedStorage

O MedStorage é um aplicativo web desenvolvido para permitir que pesquisadores tenham acesso de forma centralizada a bancos de dados de imagens médicas de diferentes tipos. Ele oferece aos pesquisadores uma solução simples e eficiente para visualizar, pesquisar, e baixar imagens médicas, juntamente com seus principais metadados.

## Tecnologias utilizadas

- Node.js
- Express
- Vue.js
- MongoDB
- SwaggerUI

## Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas em sua máquina:

- Node.js - Baixe e instale o Node.js
- Vue CLI - Instale o Vue CLI

## Instalação

1. Clone este repositório:
`git clone https://github.com/matheusssilva991/Projeto_MedStorage.git`

2. Acesse o diretório do Backend do projeto:
`cd Projeto_MedStorage/Backend`

3. Instale as dependências do Backend:
`npm install`

4. Retorne ao diretório raiz: 
`cd ..`

5. Acesse o diretório do Frontend do projeto:
 `cd Projeto_MedStorage/Frontend`

6. Instale as dependências do Frontend:
`npm install`

## Configuração

1. Dentro do diretório do Backend, crie o arquivo:
`.env`
2. No arquivo .env, defina as seguintes variáveis de ambiente:
    - PORT: porta em que o projeto será executado.
    - SECRET: chave secreta para codificação dos TOKENS.
    - URL_DATABASE_CONNECTION: url para conexão do MongoDB.

## Executando o projeto

1. Execute no Backend o comando:
`npm start`

2. Execute no Frontend o comando:
`npm run serve`

3. Acesse o projeto no navegador:
`http://localhost:{PORT escolhida}`

## Equipe

- [Matheus Santos Silva](https://github.com/matheusssilva991) - Desenvolvedor Front-end/Backend
- [Vinícius Nunes de Carvalho](https://github.com/vinincarvalho) - Desenvolvedor Front-end/Designer
- [Cleber Santos Pinto Junior](https://github.com/cleberspjr) - Desenvolvedor Front-end
- [Victor Silva de Jesus](https://github.com/VictorSilvaJS) - Desenvolvedor Front-end
- [Alessandro Conceição Santos](https://github.com/AlessanBass) - Desenvolvedor Front-end
- [Tauan Neres Silva](https://github.com/Tauan-dev) - Desenvolvedor Front-end

## Contato

Para perguntas, suporte ou feedback relacionados ao projeto, entre em contato conosco em <mssilva.cic@uesc.br>.
