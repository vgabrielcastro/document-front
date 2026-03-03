"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  Document,
  CreateDocumentInput,
  UpdateDocumentInput,
} from "@/types/document";
import { documentsApi } from "@/lib/api/documents";

interface UseDocumentsReturn {
  documents: Document[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  create: (input: CreateDocumentInput) => Promise<void>;
  update: (id: string, input: UpdateDocumentInput) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useDocuments(): UseDocumentsReturn {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await documentsApi.getAll();
      setDocuments(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar documentos",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const create = useCallback(async (input: CreateDocumentInput) => {
    setError(null);
    try {
      const created = await documentsApi.create(input);
      setDocuments((prev) => [created, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar documento");
      throw err;
    }
  }, []);

  const update = useCallback(async (id: string, input: UpdateDocumentInput) => {
    setError(null);
    try {
      const updated = await documentsApi.update(id, input);
      setDocuments((prev) =>
        prev.map((doc) => (doc.id === id ? updated : doc)),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar documento",
      );
      throw err;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setError(null);
    try {
      await documentsApi.delete(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao excluir documento",
      );
      throw err;
    }
  }, []);

  return { documents, loading, error, refetch, create, update, remove };
}
