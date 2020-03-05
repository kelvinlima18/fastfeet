<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio Final
</h3>

<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack.</p>

---

## 🚀 Tecnologias utilizadas (BackEnd)

- [Node.js]
- [Docker]
- [PostgreSQL]
- [Express]
- [Redis]
- [Bee-Queue]
- [Bcryptjs]
- [Date-fns]
- [JWT]
- [Yup]
- [Eslint] + [Prettier]
- [Nodemon] + [Sucrase]
- [Sequelize]


## Instruções (BackEnd)

- Na raiz do projeto, execute `yarn` para instalação das dependências;
- Execute o `postgres` e o `redis` utilizando o `docker` conforme abaixo:

Postgres: `$ docker run --name (name_DB) -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432`;

Redis: `$ docker run --name (name_dbRedis) -p 6379:6379 -d -t redis:alpine`;

- Configure os bancos de dados conforme as variaveis de ambiente, do arquivo `.env.example`;
- Execute `yarn sequelize db:migrate` e `yarn sequelize db:seed`;

- Execute `yarn dev` para inicialização do projeto;

---

Feito by [Kelvin Lima](https://github.com/kelvinlima18)
