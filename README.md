# 📽️ Raspberry Awards API - Backend

Este projeto consiste em uma API RESTful para leitura, processamento e exibição dos dados de indicados e vencedores do prêmio *Pior Filme* do Golden Raspberry Awards, conforme desafio técnico.

## ✅ Tecnologias
- [x] NestJS
- [x] TypeScript
- [x] Prisma ORM
- [x] SQLite (banco em memória)
- [x] CSV Parser
- [x] Testes de Integração com Jest

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/YagoGodoyGarcia/raspberry-awards-api.git
cd raspberry-awards-api

# Instale as dependências
npm install

npx prisma generate

# Rode a aplicação
npm run start:dev
