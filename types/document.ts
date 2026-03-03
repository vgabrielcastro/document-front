export type DocumentStatus = "Pending" | "Signed";

export interface Document {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  created_at: string;
}
