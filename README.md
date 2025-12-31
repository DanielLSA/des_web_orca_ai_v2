# Orça.AI 💰🤖

O **Orça.AI** é uma aplicação web de **controle financeiro pessoal**, criada para ajudar usuários a organizarem suas finanças de forma **simples, clara e inteligente**, com apoio de **Inteligência Artificial**.

---

## 🔗 Links Úteis

- **📂 Apresentação e Slides:** [Acesse no Google Drive](https://drive.google.com/drive/folders/1T8i6Mo-QXFWeoysve7tSPgc-8ttORXR3?usp=sharing)
- **💻 Repositório Oficial:** [GitHub - DanielLSA/des_web_orca_ai_v2](https://github.com/DanielLSA/des_web_orca_ai_v2.git)

---

## ✨ Funcionalidades

- **Autenticação:** Cadastro e Login de usuários seguros.
- **Gestão de Lançamentos:** Registro rápido de entradas e saídas financeiras.
- **Controle Total:** Edição e exclusão de lançamentos a qualquer momento.
- **Dashboard Automático:**
  - Resumo de Entradas
  - Resumo de Saídas
  - Saldo em tempo real
- **🤖 Consultor Financeiro IA:** Insights inteligentes sobre suas finanças.
- **UI/UX:** Interface moderna com suporte nativo a **Dark Mode**.

---

## 🧰 Tecnologias Utilizadas

| Categoria | Tecnologia |
| :--- | :--- |
| **Frontend/Framework** | Next.js 14 (App Router) |
| **Linguagem** | React + TypeScript |
| **Banco de Dados** | PostgreSQL (via Supabase) |
| **ORM** | Prisma |
| **Inteligência Artificial** | Groq API |
| **Estilização** | CSS Customizado |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado/configurado:

- **Node.js** (Versão recomendada: 18 ou 20)
- **npm** (Gerenciador de pacotes)
- Conta no **Supabase** (Para o banco PostgreSQL)
- Chave de API da **Groq** (Para a IA)

---

## 🔐 Configuração do Ambiente (`.env`)

Crie um arquivo chamado `.env` na **raiz do projeto** e preencha com suas credenciais:

```env
# Banco de dados (Supabase Postgres)
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/BANCO"

# API da IA (Groq)
GROQ_API_KEY="SUA_CHAVE_AQUI"




🚀 Como rodar o projeto localmente
Siga o passo a passo abaixo para iniciar a aplicação:

1️⃣ Clonar o repositório
Bash

git clone [https://github.com/DanielLSA/des_web_orca_ai_v2.git](https://github.com/DanielLSA/des_web_orca_ai_v2.git)
cd des_web_orca_ai_v2
2️⃣ Instalar dependências
Bash

npm install
Nota: Se ocorrer conflito de dependências, utilize o comando abaixo:

Bash

npm install --legacy-peer-deps
3️⃣ Configurar o Banco de Dados (Prisma)
Gere o cliente do Prisma para tipagem e conexão:

Bash

npx prisma generate
(Opcional) Migrar o banco de dados: Se você estiver criando as tabelas do zero localmente ou no Supabase via código:

Bash

npx prisma migrate dev
Caso esteja conectando a um banco já existente no Supabase, este passo pode ser ignorado.

4️⃣ Rodar o projeto
Inicie o servidor de desenvolvimento:

Bash

npm run dev
