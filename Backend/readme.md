# Rest API NODE EXPRESS MONGOOSE para um sistema de uma datawarehouse de bancos de imagens médicas

O projeto constroi uma api usando Node, Express e Mongoose para um sistema de uma datawarehouse de bancos de dados de imagens médicas

## Instalação Manual

Clonar o repositório:

```bash
git clone https://github.com/matheusssilva991/sistema_gestao_imagens_medicas.git
cd Backend 
```

Instalar as dependências:

```bash
npm install
```

Definir as variáveis de ambiente:

```bash
cp .env.example .env
# Abra .env e modifique as variáveis de ambiente
```

## Tabela de conteúdos

- [Comandos](#comandos)
- [Variáveis de ambiente](#variaveis-de-ambiente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)

## Comandos

Rodar em desenvolvimento:

```bash
npm start
```

## Variaveis de ambiente

```bash
# Porta utilizada na API
PORT=8081 # Padrão

# URL para conexão do banco de dados
URL_DATABASE_CONNECTION=mongodb://localhost:27017/radiomica # Padrão

# JWT
SECRET=RXRXM7X1LIXO # Padrão
```

## Estrutura do projeto

```text
 |--controllers\    # Controllers
 |--middlewares\    # Express middlewares customizados
 |--models\         # Modelos Mongoose 
 |--routes\         # Rotas
 |--database\       # Conexão com o banco de dados
 |--index.js        # App 
```

## Endpoints da API

**Usuários**:\
`GET users` - Pegar todos os usuários\
`GET users/:id` - Pegar um usuário pelo id\
`POST users` - Cadastrar um novo usuário\
`PUT users/:id` - Atualizar um usuário\
`DELETE users/:id` - Deletar um usuário\
`POST login` - Fazer login

**Solicitações**:\
`GET solicitations` - Pegar todas as solicitações\
`GET solicitations/:id` - Pegar uma solicitação pelo id\
`POST solicitations` - Cadastrar uma nova solicitação\
`PUT solicitations/:id` - Atualizar uma solicitação\
`DELETE solicitations/:id` - Deletar uma solicitação

**Bancos de dados**:\
`GET databases` - Pegar todos os bancos de dados\
`GET databases/:id` - Pegar um banco de dados pelo id\
`POST databases` - Cadastrar um novo banco de dados\
`PUT databases/:id` - Atualizar um banco de dados\
`DELETE databases/:id` - Deletar um banco de dados

**Tipos de imagens**:\
`GET images-types` - Pegar todos os tipos de imagens\
`GET images-types/:id` - Pegar um tipo de imagem pelo id\
`POST images-types` - Cadastrar um novo tipo de imagem\
`PUT images-types/:id` - Atualizar um tipo de imagem\
`DELETE images-types/:id` - Deletar um tipo de imagem
