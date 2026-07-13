# 🎓 Controle de Certificados - Frontend

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23712CF9.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

Este é o projeto frontend do sistema de gerenciamento de solicitações de certificados, desenvolvido com **Angular**. O sistema permite que alunos solicitem certificados e administradores façam a gestão dessas solicitações, incluindo validações de formulário e autenticação segura.

👉 **[Acesse o repositório do Backend clicando aqui](https://github.com/lucianosantos-dev/controle-certificado)**

## 🚀 Tecnologias Utilizadas

* **Framework**: [Angular 21](https://angular.dev/)
* **Estilização**: [Bootstrap](https://getbootstrap.com/)
* **Comunicação**: HTTP Client (consumo de API REST Java/Spring Boot)
* **Gerenciamento de Estado**: Signals e Formulários Reativos
* **Segurança**: Autenticação via JWT (interceptor de rotas)

## 📋 Funcionalidades Principais

* **Autenticação**: Login seguro para alunos e administradores
* **Gestão de Solicitações**: Interface para visualização de certificados solicitados
* **Cadastro**: Formulários reativos com validações de campos (CPF, Telefone, limites de senha)
* **Experiência do Usuário**: Interface responsiva e feedback visual em tempo real

## 🛠️ Como rodar o projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado na sua máquina.

**1. Clone o repositório:**
```bash
git clone https://github.com/lucianosantos-dev/controle-certificado-front.git
cd controle-certificado-front
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Configure a URL da API**

O arquivo `src/environments/environment.ts` já vem apontando por padrão para a API em produção (Render). Para rodar contra o **backend local**, comente a linha do Render e descomente a linha do `localhost`:
```ts
export const environment = {
  // apiUrl: 'https://sua-url-no-render.onrender.com', // produção
  apiUrl: 'http://localhost:8080' // desenvolvimento local
};
```
> ⚠️ A API em produção está hospedada em uma camada gratuita (Render). Evite apontar para ela em testes locais — prefira sempre rodar o [backend](https://github.com/lucianosantos-dev/controle-certificado) na sua própria máquina.

**4. Rode a aplicação:**
```bash
ng serve
```

**5. Pronto!** Acesse em:
```
http://localhost:4200/
```

---

> Projeto complementar ao backend: [controle-certificado](https://github.com/lucianosantos-dev/controle-certificado)
