import type {
  Document,
  CreateDocumentInput,
  UpdateDocumentInput,
} from "@/types/document";
import { api } from "./client";

const BASE = "/documents";

export const documentsApi = {
  getAll: () => api.get<Document[]>(BASE),
  getById: (id: string) => api.get<Document>(`${BASE}/${id}`),
  create: (input: CreateDocumentInput) => api.post<Document>(BASE, input),
  update: (id: string, input: UpdateDocumentInput) =>
    api.patch<Document>(`${BASE}/${id}`, input),
  delete: (id: string) => api.delete(`${BASE}/${id}`),
};
