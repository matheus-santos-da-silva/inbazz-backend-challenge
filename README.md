# Inbazz Backend Challenge

## Como rodar a aplicação:

### 1 - Clone este repositório:

```
git clone https://github.com/matheus-santos-da-silva/inbazz-backend-challenge
```

### 2 - Renomeie o arquivo .env.example para .env

### 3 - Dentro de .env coloque estas variáveis:

```
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/inbazz-challenge?schema=public
JWT_SECRET=shDWB210!87
```

### 4 - Na raiz do projeto rode o comando para o build:

```
docker compose up
```

### 5 - Após finalizar o build, acesse localmente pelo navegador pela url: localhost:3000/api

## Como rodar os testes:

### 1 - Faça o build da aplicação caso ainda não tenha feito;

### 2 - Instale as dependências localmente:

```
yarn install
```

### 3 - Rode os testes unitários:

```
yarn run test:unit
```

### 4 - Rode os testes e2e:

```
yarn run test:e2e
```

## Arquitetura:

### Trabalhando com Use Cases

#### **Domain:**

A camada central e mais interna da aplicação é onde são entidades.

#### **Presentation:**

Essa camada é responsável pela interação com requisições externas, sendo a porta de entrada para os efeitos de um usuário, aplicativo ou uma mensagem terão no domínio da aplicação. Aqui, as solicitações são aceitas e as respostas são moldadas antes de serem exibidas ao usuário.

#### **Application:**

Camada responsável por lidar com os protocolos e seus casos de uso, nela são injetados os repositórios vindos da camada de infra para realizar a comunicação com banco de dados.

#### **Infra:**

Esta camada é a que acessa serviços externos, como banco de dados, sistemas de mensagens e serviços de e-mail.

## Tecnologias Utilizadas:

- NodeJS
- Typescript
- NestJS
- Prisma
- PostgreSQL
- Docker
