/backend
├── /src
│ ├── /config
│ │ └── firestore.js
│ ├── /controllers
│ │ └── taskController.js
│ ├── /routes
│ │ └── taskRoutes.js
│ ├── /services
│ │ └── taskService.js
│ ├── /models
│ │ └── taskModel.js
│ ├── /middlewares
│ │ └── errorHandler.js
│ ├── /utils
│ │ └── logger.js
│ ├── /tests
│ │ ├── /controllers
│ │ │ └── taskController.test.js
│ │ └── /services
│ │ └── taskService.test.js
│ ├── app.js
│ └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md

    •	/config: Configurações e inicializações de serviços externos (e.g., Firestore).
    •	/controllers: Controladores que lidam com as requisições HTTP e interagem com os serviços.
    •	/routes: Definição das rotas da API.
    •	/services: Lógica de negócio e interações com o banco de dados.
    •	/models: Modelos de dados ou abstrações para facilitar interações com o Firestore.
    •	/middlewares: Middlewares personalizados (e.g., tratamento de erros).
    •	/utils: Utilitários e funções auxiliares (e.g., logging).
    •	/tests: Testes unitários organizados por camada (controllers, services).
    •	app.js: Configuração principal do Express (middlewares globais, rotas).
    •	server.js: Ponto de entrada que inicia o servidor.
    •	.env: Variáveis de ambiente.
    •	package.json: Dependências e scripts do projeto.
    •	README.md: Documentação do projeto.
