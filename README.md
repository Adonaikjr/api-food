
# Food Explorer

Este projeto foi desenvolvido no projeto final na rocketseat do programa Explorer
Um restaurante que contém Admin e Usuarios

## Instalação
Clone este repositorio, em seguida instale o node_modules dentro da raiz do projeto 

Instale o projeto com npm ou yarn

```bash
  cd api-food
  npm install
```

## Documentação da API

#### Retorna todos os itens

```http
  GET /api/plates/admin/1
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api` | `string` | admin/1 |

#### Retorna um item

```http
  GET /api/plates/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. id do prato solicitado |



## Cadastro de usuario
```http
  POST /api/users
```
Exemplo de envio para usuario comum

```javascript
{
	"name": "john doe",
	"email": "johndoe@johndoe",
	"password": "123", 
}
```

## Cadastro de usuario Admin
```http
  POST /api/users
```
Exemplo de envio para usuario administrador

```javascript
{
	"name": "Admin",
	"email": "admin@admin",
	"password": "123", 
	"isAdmin": 1
}
```
lembre-se que o usuario admin sempre deve conter o valor 1 caso contrario será 0 sendo um usuario comum
## Session users
```http
  POST /api/session
```
Exemplo de envio para gerar um token e vizualizar todas as informações do usuario cadastrado

```javascript
{
	"email": "admin@admin",
	"password": "123"
}
```
resposta: 

```javascript
{
	"user": {
		"id": 1,
		"name": "Admin",
		"email": "admin@admin",
		"password": "$2a$08$D9VWqQ2jKOtXN9T0w8Fud.SnjMClTs/DQpZTLrCsjKDUfzziExYrm",
		"avatar": null,
		"isAdmin": 1,
		"created_at": "2023-03-29 21:06:05",
		"updated_at": "2023-03-29 21:06:05"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODA4ODI4MDQsImV4cCI6MTY4MDk2OTIwNCwic3ViIjoiMSJ9.-Q4RB6hAiUE9QQX-VRY74zKHVFDGDfye2fs3hqT8Gy4"
}
```
## Stack utilizada

**Front-end:** React, styled-components

**Back-end:** Node, Express


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://adonaikjr.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adonaikjr/)
- projeto ao vivo https://explorer-food.netlify.app/
- front-end https://github.com/Adonaikjr/explorerFood-frontend


