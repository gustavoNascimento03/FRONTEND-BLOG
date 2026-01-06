# Tech Challenge - Fase 4 (Mobile & Backend)

Este repositório contém a solução para o Tech Challenge da Fase 4. O projeto consiste em uma aplicação Mobile (React Native + Expo) para gerenciamento de postagens escolares, integrada a um Back-end (Node.js + MongoDB).

## 🚀 Tecnologias Utilizadas

- **Mobile:** React Native, Expo, React Navigation, Axios.
- **Back-end:** Node.js, Express, MongoDB (Mongoose), JWT, Docker.
- **Design:** Estilização manual (StyleSheet) e Lucide React Native (ícones).

## 🛠️ Pré-requisitos

- Node.js (v18+)
- Docker e Docker Compose (para o Banco de Dados)
- Expo Go (instalado no celular) ou Emulador (Android Studio/Genymotion)

## 📦 Como Rodar o Projeto

### Passo 1: Iniciar o Back-end (API + Banco de Dados)

1. Entre na pasta do servidor:
   ```bash
   cd backend
   ```

Inicie os containers (API e Mongo):
```bash
docker-compose up --build
```

O servidor estará rodando em: http://localhost:3000Passo 

2: Iniciar o Mobile (App)
- Em outro terminal, entre na pasta do aplicativo:
```bash
cd mobile
```

- Instale as dependências (caso não tenha feito):
```bash
npm install
```

- Inicie o Expo:
```bash
exponpx expo start -c
```

- Pressione w para rodar na Web ou escaneie o QR Code com o app Expo Go no celular.

## 🧪 Usuários para Teste

Para facilitar a correção, utilize os usuários abaixo ou crie novos através da rota /register.

Perfil	| Email	| Senha	| Permissões
---	| ---	| ---	| ---
Professor	| prof@fiap.com.br	| 123	| Criar/Editar/Excluir Posts e Usuários
Aluno	| aluno@fiap.com.br	| 123	| Apenas visualizar Posts (Leitura)


## 📱 Funcionalidades Implementadas

- Autenticação: Login com JWT e controle de sessão.
- Posts:Listagem com filtro de busca.
- Detalhes do post.
- Criação, Edição e Exclusão (Apenas Professores).
- Usuários:Gerenciamento completo (CRUD) de Professores e Alunos (Apenas Professores).
- Segurança:Alunos não visualizam botões de administração.
- Rotas protegidas no Back-end.

## 👥 Autor [Gustavo Santos Nascimento] - RM: [364571]
---