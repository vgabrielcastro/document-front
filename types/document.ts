export type DocumentStatus = "Pending" | "Signed";

export interface Document {
  id: string;
  titulo: string;
  description: string;
  status: DocumentStatus;
  criadoEm: string;
}
