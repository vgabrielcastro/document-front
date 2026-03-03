"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Document } from "@/types/document";
import { useDocuments } from "@/hooks/useDocuments";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR");
}

function DocumentItem({
  doc,
  onSigned,
  onDelete,
}: {
  doc: Document;
  onSigned: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [signing, setSigning] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSign() {
    setSigning(true);
    try {
      await onSigned(doc.id);
    } finally {
      setSigning(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Excluir este documento?")) return;
    setDeleting(true);
    try {
      await onDelete(doc.id);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <li className="py-3 first:pt-0 flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-zinc-900 dark:text-zinc-100">
          {doc.title}
        </p>
        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
          {doc.description}
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          {formatDate(doc.created_at)}
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${
            doc.status === "signed"
              ? "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
          }`}
        >
          {doc.status}
        </span>
        {doc.status === "pending" && (
          <button
            type="button"
            onClick={handleSign}
            disabled={signing}
            className="text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 disabled:opacity-50"
          >
            {signing ? "..." : "Assinar"}
          </button>
        )}
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 disabled:opacity-50"
        >
          {deleting ? "..." : "Excluir"}
        </button>
      </div>
    </li>
  );
}

export default function DocumentsPage() {
  const { documents, loading, error, create, update, remove } = useDocuments();

  const sign = (id: string) => update(id, { status: "signed" });
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleCreate(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setSubmitting(true);
    try {
      await create({
        title: newTitle.trim(),
        description: newDescription.trim(),
      });
      setNewTitle("");
      setNewDescription("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400";
  const btnClass =
    "rounded bg-zinc-800 dark:bg-zinc-200 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:opacity-90 disabled:opacity-50";

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-xl space-y-6">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Documentos
        </h1>

        {error && (
          <p className="rounded border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
        )}

        <section className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
          <h2 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Novo documento
          </h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
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
            <button type="submit" disabled={submitting} className={btnClass}>
              {submitting ? "Criando..." : "Criar"}
            </button>
          </form>
        </section>

        <section className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
          <h2 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Lista de documentos
          </h2>
          <ul className="space-y-2 divide-y divide-zinc-100 dark:divide-zinc-800">
            {loading ? (
              <li className="py-6 text-center text-sm text-zinc-500">
                Carregando...
              </li>
            ) : documents.length === 0 ? (
              <li className="py-6 text-center text-sm text-zinc-500">
                Nenhum documento cadastrado.
              </li>
            ) : (
              documents.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  doc={doc}
                  onSigned={sign}
                  onDelete={remove}
                />
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
