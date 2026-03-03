"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Document } from "@/types/document";

const INITIAL_DOCUMENTS: Document[] = [
  {
    id: "1",
    title: "Contrato A",
    description: "Contrato de prestação de serviços",
    status: "Pending",
    created_at: "2025-03-01",
  },
  {
    id: "2",
    title: "Relatório B",
    description: "Relatório trimestral de atividades",
    status: "Pending",
    created_at: "2025-03-02",
  },
  {
    id: "3",
    title: "Proposta C",
    description: "Proposta comercial para novo cliente",
    status: "Signed",
    created_at: "2025-03-03",
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
      title: newTitle.trim(),
      description: newDescription.trim(),
      status: "Pending",
      created_at: new Date().toISOString().slice(0, 10),
    };
    setDocuments([newDocument, ...documents]);
    setNewTitle("");
    setNewDescription("");
  }

  const inputClass =
    "w-full rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400";
  const btnClass =
    "rounded bg-zinc-800 dark:bg-zinc-200 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:opacity-90";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-xl space-y-6">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Documentos
        </h1>

        <section className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
          <h2 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Novo documento
          </h2>
          <form onSubmit={createDocument} className="flex flex-col gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título"
              className={inputClass}
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descrição"
              className={inputClass}
            />
            <button type="submit" className={btnClass}>
              Criar
            </button>
          </form>
        </section>

        <section className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
          <h2 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Lista de documentos
          </h2>
          <ul className="space-y-2 divide-y divide-zinc-100 dark:divide-zinc-800">
            {documents.length === 0 ? (
              <li className="py-6 text-center text-sm text-zinc-500">
                Nenhum documento cadastrado.
              </li>
            ) : (
              documents.map((doc) => (
                <li key={doc.id} className="py-3 first:pt-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {doc.title}
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                        {doc.description}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {doc.created_at}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${
                        doc.status === "Signed"
                          ? "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
