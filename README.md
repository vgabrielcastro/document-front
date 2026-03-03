<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

<h1 align="center">Document Front</h1>

<p align="center">
  SPA para gestão de documentos · CRUD · Assinatura de status
</p>

---

## Visão geral

Interface web que consome uma API REST para listar, criar, assinar e excluir documentos. Utiliza App Router (Next.js 16), hooks para estado/efeitos e camada de API centralizada.

## Stack

| Tecnologia   | Versão | Uso                    |
|-------------|--------|------------------------|
| Next.js     | 16     | App Router, SSR/SSG    |
| React       | 19     | UI, hooks              |
| TypeScript  | 5.x    | Tipagem estática       |
| Tailwind CSS| 4      | Estilização            |

## Requisitos

- **Backend** da Document API disponível (ex.: `http://localhost:5050`)

## Instalação e execução

```bash
# Instalar dependências
npm install

# Desenvolvimento (http://localhost:3000)
npm run dev

# Build de produção
npm run build

# Servir build
npm run start
```

## Variáveis de ambiente

| Variável                | Obrigatória | Descrição                          |
|-------------------------|-------------|------------------------------------|
| `NEXT_PUBLIC_API_URL`   | Não         | Base URL da API (ex.: `http://localhost:5050`). Em dev, se ausente, usa proxy `/api/proxy` para evitar CORS. |

Arquivo: `.env.local` (copiar de `.env.example`).

## Arquitetura do projeto

```
├── app/
│   ├── components/       # Componentes de página (DocumentsPage, DocumentItem)
│   ├── layout.tsx
│   └── page.tsx
├── hooks/                # useDocuments (fetch, create, update, delete)
├── lib/
│   ├── api/
│   │   ├── client.ts     # Cliente HTTP (get, post, patch, delete)
│   │   └── documents.ts  # Endpoints /documents
│   └── config.ts         # Configuração (apiUrl)
├── types/
│   └── document.ts       # Document, CreateDocumentInput, UpdateDocumentInput
└── .env.example
```

- **Camada de API** (`lib/api`): abstrai `fetch`, tratamento de erro e base URL.
- **Hooks**: encapsulam estado e chamadas à API; componentes apenas consomem.
- **Tipos**: contratos compartilhados entre API e UI.

## Contrato da API

Base path: `{NEXT_PUBLIC_API_URL}/documents` (ou `/api/proxy/documents` em dev com proxy).

| Método  | Endpoint           | Descrição              |
|---------|--------------------|------------------------|
| `GET`   | `/documents`       | Lista todos os documentos |
| `POST`  | `/documents`       | Cria documento         |
| `PATCH` | `/documents/:id`  | Atualização parcial (ex.: status) |
| `DELETE`| `/documents/:id`   | Remove documento       |

### Payloads

**POST /documents** (criação):

```json
{
  "title": "string",
  "description": "string"
}
```

**PATCH /documents/:id** (ex.: assinar):

```json
{
  "status": "signed"
}
```

### Modelo de documento (resposta)

```ts
{
  id: string;
  title: string;
  description: string;
  status: "pending" | "signed";
  created_at: string;  // ISO 8601
}
```

## Scripts disponíveis

| Script   | Comando         | Descrição                    |
|----------|-----------------|-----------------------------|
| Dev      | `npm run dev`   | Servidor de desenvolvimento  |
| Build    | `npm run build` | Build de produção           |
| Start    | `npm run start` | Servir build                 |
| Lint     | `npm run lint`  | ESLint                      |
