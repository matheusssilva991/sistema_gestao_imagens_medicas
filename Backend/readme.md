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
 |--controllers\    # Definição dos Endpoints dos models
 |--documentation\  # Arquivos de documentação do Swagger
 |--middlewares\    # Express middlewares customizados
 |--models\         # Schemas das entidades - Mongoose 
 |--services\       # Operações dos models no MongoDB
 |--routes\         # Rotas
 |--config\         # Conexão com o banco de dados
 |--index.js        # App 
```

## Endpoints da API

**Usuários**:\
`GET /api/users` - Pegar todos os usuários\
`GET /api/user/:id` - Pegar um usuário pelo id\
`POST /api/user` - Cadastrar um novo usuário\
`PUT /api/user/:id` - Atualizar um usuário\
`DELETE user/:id` - Deletar um usuário\
`PUT user/:id/permissao` - Atualizar permissão do usuário\

**Autenticação**:\
`POST login` - Fazer login
`GET logout` - Fazer logout

**Solicitações**:\
`GET /api/solicitations` - Pegar todas as solicitações\
`GET /api/solicitation/:id` - Pegar uma solicitação pelo id\
`POST /api/solicitation` - Cadastrar uma nova solicitação\
`PUT /api/solicitation/:id` - Atualizar uma solicitação\
`DELETE /api/solicitation/:id` - Deletar uma solicitação

**Bancos de dados**:\
`GET /api/databases` - Pegar todos os bancos de dados\
`GET /api/database/:id` - Pegar um banco de dados pelo id\
`POST /api/database` - Cadastrar um novo banco de dados\
`PUT /api/database/:id` - Atualizar um banco de dados\
`DELETE /api/database/:id` - Deletar um banco de dados

**Imagens**:\
`GET /api/databases/images` - Pegar todas as imagens
`GET /api/database/:databaseName/images` - Pegar todas as imagens de um banco de dados

**Tipos de imagens**:\
`GET images-types` - Pegar todos os tipos de imagens\
`GET image-type/:id` - Pegar um tipo de imagem pelo id\
`POST image-type` - Cadastrar um novo tipo de imagem\
`PUT image-type/:id` - Atualizar um tipo de imagem\
`DELETE image-type/:id` - Deletar um tipo de imagem
