# Orça.AI 💰🤖

O **Orça.AI** é uma aplicação web de **controle financeiro pessoal**, criada para ajudar usuários a organizarem suas finanças de forma **simples, clara e inteligente**, com apoio de **Inteligência Artificial**.

🔗 Repositório oficial:  
https://github.com/DanielLSA/des_web_orca_ai_v2.git

---

## ✨ Funcionalidades

- Cadastro e Login de usuários
- Registro de **entradas e saídas financeiras**
- **Edição e exclusão** de lançamentos
- Resumo financeiro automático:
  - Entradas
  - Saídas
  - Saldo em tempo real
- Consultor Financeiro com IA
- Interface moderna (tema dark)

---

## 🧰 Tecnologias Utilizadas

- **Next.js 14** (App Router)
- **React + TypeScript**
- **Prisma ORM**
- **PostgreSQL (Supabase)**
- **IA via Groq API**
- CSS customizado

---

## 📦 Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- **Node.js** (recomendado: versão 18 ou 20)
- **npm**
- Conta no **Supabase** (PostgreSQL)
- Chave de API da **Groq**

---

## 🔐 Configuração do `.env`

Crie um arquivo `.env` na **raiz do projeto** com o seguinte conteúdo:

```env
# Banco de dados (Supabase Postgres)
DATABASE_URL=postgresql://USUARIO:SENHA@HOST:PORTA/BANCO

# API da IA (Groq)
GROQ_API_KEY=SUA_CHAVE_AQUI


#🚀 Como rodar o projeto localmente
##1️⃣ Clonar o repositório
git clone https://github.com/DanielLSA/des_web_orca_ai_v2.git
cd des_web_orca_ai_v2

##2️⃣ Instalar dependências
npm install

Se ocorrer conflito de dependências:

npm install --legacy-peer-deps

##3️⃣ Gerar o Prisma Client
npx prisma generate

##4️⃣ (Opcional) Migrar banco de dados

Se você estiver usando migrations:

npx prisma migrate dev


Caso esteja apontando para um banco já pronto no Supabase, este passo pode ser ignorado.

##5️⃣ Rodar o projeto
npm run dev


Acesse no navegador:

http://localhost:3000