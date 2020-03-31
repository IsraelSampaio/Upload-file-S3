# API p/ Upload de arquivos Node

App desenvolvido para a prática de API restful em Node com Mongodb e TypeScript. O projeto foi desenvolvido com a utilização `Multer`
para uploads de arquivos, `Express framework` e `AWS S3 Amazon`.

A API fornece endpoints para uploads local no diretorio `tmp/uploads` e remoto CDN na `AWS S3 Amazon`

## Ferramentas Utilizadas
* [Express](https://expressjs.com/pt-br/) 
* [AWS SDK](https://github.com/aws/aws-sdk-js)
* [Multer](https://github.com/expressjs/multer) 
* [Mongoose](https://github.com/Automattic/mongoose) 
* [Sucrase](https://github.com/alangpierce/sucrase) 
* [ESLint](https://github.com/eslint/eslint) 
* [TypeScript](https://github.com/Microsoft/TypeScript) 

## Instalação
* Instale as bibliotecas com `yarn install` ou `npm install`
* Crie o arquivo .env e copie as variáveis de ambiente do arquivo `.env.exemplo`
* Preencha as variáveis de ambiente - `Nomes auto explicativos`
* Crie o diretório estático para armazenamento local `[Pasta Raiz]/tmp/uploads`
* Rode `yarn dev` ou `npm dev` para desenvolvimento
* Rode `yarn build` ou `npm build` para building do projeto


