"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Document } from "@/types/document";

const INITIAL_DOCUMENTS: Document[] = [
  {
    id: "1",
    titulo: "Contrato A",
    description: "Contrato de prestação de serviços",
    status: "Pending",
    criadoEm: "2025-03-01",
  },
  {
    id: "2",
    titulo: "Relatório B",
    description: "Relatório trimestral de atividades",
    status: "Pending",
    criadoEm: "2025-03-02",
  },
  {
    id: "3",
    titulo: "Proposta C",
    description: "Proposta comercial para novo cliente",
    status: "Signed",
    criadoEm: "2025-03-03",
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(INITIAL_DOCUMENTS);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  function createDocument(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newDocument: Document = {
      id: crypto.randomUUID(),
      titulo: newTitle.trim(),
      description: newDescription.trim(),
      status: "Pending",
      criadoEm: new Date().toISOString().slice(0, 10),
    };
    setDocuments([newDocument, ...documents]);
    setNewTitle("");
    setNewDescription("");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 font-sans">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Documentos
        </h1>

        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <h2 className="mb-3 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Novo documento
          </h2>
          <form onSubmit={createDocument} className="flex flex-col gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título do documento"
              className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descrição do documento"
              className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
            <button
              type="submit"
              className="rounded bg-zinc-900 dark:bg-zinc-100 px-4 py-2 font-medium text-white dark:text-zinc-900 hover:opacity-90"
            >
              Criar
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
          <h2 className="mb-3 text-lg font-medium text-zinc-800 dark:text-zinc-200">
            Lista de documentos
          </h2>
          <ul className="space-y-3">
            {documents.length === 0 ? (
              <li className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 py-8 text-center text-zinc-500 dark:text-zinc-400">
                Nenhum documento cadastrado.
              </li>
            ) : (
              documents.map((doc) => (
                <li
                  key={doc.id}
                  className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Título
                      </p>
                      <p className="mt-0.5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {doc.titulo}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        doc.status === "Signed"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      Descrição
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-300">
                      {doc.description}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Criado em {doc.criadoEm}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
