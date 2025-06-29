# 📽️ Raspberry Awards API - Backend

API RESTful desenvolvida com NestJS para processar e exibir dados do prêmio *Pior Filme* do Golden Raspberry Awards.

---

## ✅ Tecnologias Utilizadas

- 🚀 NestJS + TypeScript
- 🧩 Prisma ORM (SQLite em memória)
- 📄 Leitura de arquivos CSV
- 🧪 Testes com Jest
- 📘 Swagger para documentação automática

---

## ⚙️ Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/YagoGodoyGarcia/raspberry-awards-api.git
cd raspberry-awards-api

# 2. Instale as dependências
npm install

# 3. Gere os arquivos do Prisma
npx prisma generate

# 4. Execute a API em modo desenvolvimento
npm run start:dev
```

---

## 🌐 Rotas da API

| Método | Rota                    | Descrição                                                               |
|--------|-------------------------|-------------------------------------------------------------------------|
| GET    | `/movies/All`           | Retorna todos os filmes cadastrados.                                   |
| GET    | `/movies/PrizeInterval` | Retorna produtores com **maior** e **menor** intervalo entre prêmios.  |

---

## 📘 Documentação Swagger

Após iniciar a aplicação, acesse a documentação interativa em:

```
http://localhost:3000/api/swagger-ui
```

Nela você pode visualizar os contratos, testar endpoints e ver exemplos de resposta.

---

## 🧪 Testes

Execute todos os testes com:

```bash
npm run test
```

---

## 📁 Estrutura de Pastas (Simplificada)

```
src/
├── database/           # Configuração do Prisma
├── modules/
│   └── movie/          # Módulo de filmes (controller, service, DTOs)
│       ├── dto/        # Data Transfer Objects
│       ├── tests/      # Testes do módulo
├── main.ts             # Ponto de entrada da aplicação
```

---

## 🗃️ Dados

Os dados são carregados automaticamente de um arquivo `.csv` durante o boot da aplicação.

---

## ✨ Autor

Desenvolvido por **Yago Godoy Garcia** — [LinkedIn](https://www.linkedin.com/in/yago-godoy-204016130)