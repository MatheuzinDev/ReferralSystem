# 🚀 Referral System

Um sistema completo de **indicações de usuários**, desenvolvido em **Node.js + Express** no backend e **React + Vite** no frontend.  
O objetivo é permitir que cada usuário gere e compartilhe seu **link de indicação**, acumulando **pontos** conforme novos usuários se registram por meio do seu link.

---

## 🧠 Objetivo do Projeto

O **Referral System** foi criado com o propósito de demonstrar o funcionamento de um **sistema de cadastro com indicações**, incluindo:

- Geração de links personalizados para cada usuário.
- Registro de novos usuários com possibilidade de usar um link de indicação.
- Acúmulo automático de pontos para o usuário que indicou.
- Exibição do perfil com nome, pontos acumulados e link de indicação.
- Interface moderna, responsiva e agradável ao usuário.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- ⚛️ [React](https://react.dev/) com [Vite](https://vitejs.dev/)
- 🎨 CSS Modules (estilização modular e responsiva)
- 🧭 React Router DOM (controle de rotas)

### **Backend**
- 🟩 [Node.js](https://nodejs.org/)
- 🚀 [Express](https://expressjs.com/)
- 🐘 [PostgreSQL](https://www.postgresql.org/) + [pgAdmin](https://www.pgadmin.org/)
- 🔒 [bcryptjs](https://www.npmjs.com/package/bcryptjs) para criptografia de senhas
- 🌐 API RESTful com endpoints para usuários e indicações
- 🔑 JWT (JSON Web Token) para autenticação e autorização de usuários

### **Motivos das escolhas**
- **React**: criação rápida de interfaces dinâmicas e reativas, bem como é a tecnologia que tenho mais afinidade.
- **Vite**: desempenho superior no desenvolvimento local.  
- **Express**: simplicidade e robustez na construção de APIs.  
- **PostgreSQL**: banco de dados relacional confiável e amplamente usado e fácil de ser utilizado.
- **JWT**: segurança nas rotas privadas, permitindo autenticação stateless e fácil escalabilidade.

---

## ⚙️ Como Executar o Projeto Localmente

### 🔹 1. Clonar o repositório

git clone https://github.com/MatheuzinDev/ReferralSystem.git

### 🔹 2. Entrar nas pastas do projeto

cd ReferralSystem

### 🔹 3. Frontend (Interface)

Entrar na pasta do front-end:
cd front-end

Instalar as dependências:
npm install

Iniciar o projeto:
npm run dev

### 🔹 4. Backend (API)

Entrar na pasta do back-end:
cd back-end

Instalar as dependências:
npm install

É necessário criar um banco de dados no PostgreSQL (pgAdmin)

Criar o arquivo ".env" na raiz da pasta "back-end" e colocar as credenciais do banco de dados

Rodar o seguinte comando para a criação das tabelas:
npx prisma migrate dev --name init

Iniciar o projeto:
npm run dev

---

## 🤖 Colaboração com IA

- Animações: tirei dúvidas sobre como implementar efeitos visuais, como modais, transições e feedbacks interativos no front-end.
- Integração Front-end / Back-end: suporte na comunicação entre React e a API em Node.js/Express, incluindo envio de dados e tratamento de erros.
- Resolução de problemas de codificação: ajuda na identificação e solução de bugs e erros encontrados durante o desenvolvimento.
- Sugestões de UI/UX: recomendações sobre design, layout, espaçamento e responsividade para uma interface mais intuitiva e agradável.