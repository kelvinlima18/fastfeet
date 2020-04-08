<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio Final
</h3>

<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack.</p>

---

## 🚀 Tecnologias utilizadas 

### Backend

- Node.js
- Docker
- PostgreSQL
- Express
- Redis
- Bee-Queue
- Bcryptjs
- Date-fns
- JWT
- Yup
- PropTypes
- Eslint + Prettier
- Nodemon + Sucrase
- Sequelize

### Frontend

- RocketSeat/Unform
- Axios
- React
- Reactotron
- Redux + Saga
- Styled Components

### Mobile

- RocketSeat/Unform
- Axios
- React-Native
- Reactotron
- RNCamera
- Styled Components


## Instruções de Instalação

Para uso desse sistema é iprencindivel que você tenha instalado o NodeJS  e algum gerenciador de pacotes de sua preferência. Recomendamos o [NPM](https://nodejs.org/en/) ou [Yarn](https://yarnpkg.com/lang/en/).

Na raiz do projeto, execute `yarn` ou `npm install` para instalação das dependências;

Execute o `postgres` e o `redis` utilizando o `docker` conforme abaixo para configuração do banco de dados:

 - Postgres: `$ docker run --name (name_DB) -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432`;

 - Redis: `$ docker run --name (name_dbRedis) -p 6379:6379 -d -t redis:alpine`;

Configure os bancos de dados conforme as variaveis de ambiente, do arquivo `.env.example`;

As aplicações Web e Mobile possuem os arquivos de configuração de endereço do backend e do Reactotron. Caso seja necessário os endereços de IP devem ser trocados de acordo com a sua rede. O padrão utilizado neste projeto é o `localhost`.

## Inicialização

Agora é só executar os comandos de inicialização

### Backend
- Na raiz do backend execute, `yarn dev` ou `npm run dev` para inicialização do projeto;

### Frontend
- Na raiz do frontend execute, `yarn start` ou `npm run start` para inicialização do projeto;

### Mobile
Este projeto foi desenvolvido somente para a plataforma `Android`. Execute os comandos abaixo para inicialização:

- Na raiz do mobile execute `react-native run-android`;
- Caso a janela `Metro Bundler` não abra automaticamente, basta executar o comando `yarn start` ou `npm start`;

Obs.: O primeiro comanddo deverá ser executado somente na primeira execuçaõ do seu projeto. O segundo comando, deverá ser executado sempre que o terminal for encerrado ou a sua maquina desligada.

---

Feito by [Kelvin Lima](https://github.com/kelvinlima18)
