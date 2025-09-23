<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# NestJS API - Sistema de Gerenciamento de Usuários e Funcionários

Uma API RESTful construída com NestJS, TypeScript e Prisma ORM para gerenciamento de usuários e funcionários com autenticação baseada em roles e rate limiting.

## 🚀 Características

- **Framework**: NestJS com TypeScript
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Validação**: Class-validator e Class-transformer
- **Rate Limiting**: Throttler integrado
- **Logging**: Sistema customizado de logs
- **Testes**: Jest para testes unitários e e2e
- **CORS**: Habilitado para desenvolvimento
- **Global Exception Filter**: Tratamento centralizado de erros

## 📋 Funcionalidades

### Módulo de Usuários (`/api/users`)

- ✅ Listar todos os usuários (com filtro por role)
- ✅ Buscar usuário por ID
- ✅ Criar novo usuário
- ✅ Atualizar usuário existente
- ✅ Deletar usuário

### Módulo de Funcionários (`/api/employees`)

- ✅ CRUD completo de funcionários
- ✅ Filtro por role (INTERN, ENGINEER, ADMIN)
- ✅ Rate limiting personalizado
- ✅ Logging de requisições com IP
- ✅ Throttling configurável por endpoint

### Sistema de Roles

- `INTERN` - Estagiário
- `ENGINEER` - Engenheiro
- `ADMIN` - Administrador

## 🛠️ Tecnologias Utilizadas

- **NestJS** v11.0.1 - Framework Node.js
- **Prisma** v6.16.2 - ORM e Database toolkit
- **PostgreSQL** - Banco de dados
- **TypeScript** v5.7.3 - Tipagem estática
- **Class-validator** - Validação de DTOs
- **Jest** - Framework de testes
- **ESLint + Prettier** - Linting e formatação

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

## 🚀 Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd nest
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
DIRECT_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
PORT=3000
```

4. **Configure o banco de dados**

```bash
# Gerar cliente Prisma
npm run db:generate

# Aplicar migrações (ou push do schema)
npm run db:push
```

5. **Inicie a aplicação**

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 📚 Documentação da API

### Base URL

```
http://localhost:3000/api
```

### Endpoints - Usuários

#### GET `/users`

Lista todos os usuários ou filtra por role.

```bash
GET /api/users
GET /api/users?role=ADMIN
```

#### GET `/users/:id`

Busca usuário por ID.

```bash
GET /api/users/1
```

#### POST `/users`

Cria novo usuário.

```bash
POST /api/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "role": "ENGINEER"
}
```

#### PATCH `/users/:id`

Atualiza usuário existente.

```bash
PATCH /api/users/1
Content-Type: application/json

{
  "name": "João Santos"
}
```

#### DELETE `/users/:id`

Remove usuário.

```bash
DELETE /api/users/1
```

### Endpoints - Funcionários

#### GET `/employees`

Lista funcionários (com rate limiting).

```bash
GET /api/employees
GET /api/employees?role=INTERN
```

#### GET `/employees/:id`

Busca funcionário por ID (rate limiting: 1 req/segundo).

```bash
GET /api/employees/1
```

#### POST `/employees`

Cria novo funcionário.

```bash
POST /api/employees
Content-Type: application/json

{
  "name": "Maria Silva",
  "email": "maria@exemplo.com",
  "role": "ADMIN"
}
```

#### PATCH `/employees/:id`

Atualiza funcionário.

```bash
PATCH /api/employees/1
Content-Type: application/json

{
  "role": "ENGINEER"
}
```

#### DELETE `/employees/:id`

Remove funcionário.

```bash
DELETE /api/employees/1
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Testes com coverage
npm run test:cov

# Testes em modo watch
npm run test:watch
```

## 📊 Rate Limiting

O sistema implementa rate limiting com duas configurações:

- **Short**: 3 requisições por segundo
- **Long**: 10 requisições por minuto

Endpoints específicos podem ter configurações personalizadas.

## 🗃️ Estrutura do Banco

### Tabela Employee

```sql
CREATE TABLE Employee (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR NOT NULL,
  email     VARCHAR UNIQUE NOT NULL,
  role      Role NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Enum Role

```sql
CREATE TYPE Role AS ENUM ('INTERN', 'ENGINEER', 'ADMIN');
```

## 📝 Scripts Disponíveis

```bash
# Banco de dados
npm run db:generate    # Gera cliente Prisma
npm run db:pull        # Puxa schema do banco
npm run db:push        # Aplica schema ao banco

# Desenvolvimento
npm run start:dev      # Modo desenvolvimento
npm run start:debug    # Modo debug
npm run start:prod     # Modo produção

# Qualidade de código
npm run lint           # ESLint
npm run format         # Prettier
npm run build          # Build para produção
```

## 🏗️ Estrutura do Projeto

```
src/
├── app.module.ts              # Módulo principal
├── main.ts                    # Entry point
├── all-exceptions.filter.ts   # Filtro global de exceções
├── routes.rest               # Arquivo de testes REST
├── database/                 # Módulo do banco
├── users/                    # Módulo de usuários
│   ├── dto/                  # Data Transfer Objects
│   ├── users.controller.ts   # Controller
│   ├── users.service.ts      # Service
│   └── users.module.ts       # Module
├── employees/                # Módulo de funcionários
│   ├── entities/             # Entidades
│   ├── employees.controller.ts
│   ├── employees.service.ts
│   └── employees.module.ts
└── my-logger/                # Sistema de logging
```
