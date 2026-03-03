export type DocumentStatus = "pending" | "signed";

export interface Document {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  created_at: string;
}

export interface CreateDocumentInput {
  title: string;
  description: string;
}

export interface UpdateDocumentInput {
  title?: string;
  description?: string;
  status?: DocumentStatus;
}
