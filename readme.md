# Rede Social API

Este projeto é uma API para uma rede social, desenvolvida utilizando **Node.js**, **Express** e **Sequelize** com o banco de dados **MariaDB**. O sistema permite interações como criação de postagens, comentários e curtidas, com validações robustas para garantir a integridade dessas ações. O frontend foi desenvolvido com **React**, proporcionando uma experiência de usuário dinâmica e responsiva.

## Funcionalidades

### Postagens
- **Criação**: Usuários podem criar postagens de texto que serão armazenadas no banco de dados.
- **Atualização**: Postagens podem ser editadas, com validação para garantir que o conteúdo seja alterado corretamente.
- **Deleção**: Postagens podem ser removidas pelo autor.

### Curtidas
- Usuários podem curtir ou descurtir postagens.
- A validação garante que o usuário só pode curtir ou remover sua curtida de uma postagem uma vez.
- O contador de curtidas é atualizado em tempo real.

### Comentários
- Usuários podem comentar nas postagens de outros usuários sem serem redirecionados para outra página.
- Validação de comentários para garantir que mensagens vazias ou com conteúdo inadequado não sejam aceitas.
- O comentário é adicionado à postagem em tempo real após a validação.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Plataforma de execução de código JavaScript no servidor.
- **Express**: Framework web para criar APIs RESTful.
- **Sequelize**: ORM para gerenciar a interação com o banco de dados **MariaDB**.

### Frontend
- **React**: Framework JavaScript para construção de interfaces de usuário.
- **Axios**: Utilizado para consumir a API e realizar requisições HTTP.

### Banco de Dados
- **MariaDB**: Banco de dados relacional utilizado para armazenar postagens, curtidas, e comentários.
- **Sequelize**: Utilizado para mapear as tabelas do banco de dados em modelos JavaScript.

## Estrutura de Pastas

```plaintext
src/
│
├── controllers/
│   ├── postController.js      # Lida com as rotas de postagens
│   └── userController.js      # Lida com as rotas de usuários
│
├── models/
│   ├── post.js                # Define o modelo de postagem
│   ├── user.js                # Define o modelo de usuário
│
├── routes/
│   ├── postRoutes.js          # Define as rotas de postagens
│   └── userRoutes.js          # Define as rotas de usuários
│
├── validations/
│   └── postValidation.js      # Validações para operações em postagens
│
└── app.js                     # Arquivo principal da aplicação
```

### Instalação
Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos
Node.js (versão 14 ou superior)
MariaDB instalado e rodando na sua máquina.

### Passo a Passo
Clone este repositório:
git clone https://github.com/PedroLeiteDeMenezes/repo-name.git
### Navegue até o diretório do projeto:
cd repo-name
### Instale as dependências:
npm install

### Configure suas variáveis de ambiente. Crie um arquivo .env na raiz do projeto com as seguintes informações:
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=rede_social
### Execute as migrations para criar as tabelas no banco de dados:
npx sequelize db:migrate
### Inicie o servidor:
npm run dev
A API estará rodando em http://localhost:3000.

## Uso
Rotas Disponíveis
POST /posts - Criar uma nova postagem.
GET /posts/:id - Buscar uma postagem por ID.
PUT /posts/:id - Atualizar uma postagem.
DELETE /posts/:id - Deletar uma postagem.
POST /posts/:id/like - Curtir ou remover curtida de uma postagem.
POST /posts/:id/comment - Comentar em uma postagem.
Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou criar uma issue com sugestões ou problemas encontrados.

### Autor
Pedro Leite de Menezes

### GitHub: https://github.com/PedroLeiteDeMenezes
### Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.