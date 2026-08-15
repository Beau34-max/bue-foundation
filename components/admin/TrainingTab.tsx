"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { TrainingProgramme } from "@/lib/types";

type ProgrammeForm = {
  title: string;
  category: string;
  duration: string;
  schedule: string;
  format: string;
  level: string;
  cost: string;
  next_start: string;
  description: string;
  outcomes: string;
  sort_order: number;
};

const EMPTY_FORM: ProgrammeForm = {
  title: "", category: "General", duration: "", schedule: "",
  format: "In-person · Afikpo-North", level: "All levels",
  cost: "Free (BUE Sponsored)", next_start: "", description: "",
  outcomes: "", sort_order: 0,
};

const CATEGORIES = ["Trades", "Business", "Digital", "Finance", "Entrepreneurship", "Health", "General", "Other"];
const LEVELS = ["Beginner", "Beginner to Intermediate", "Intermediate", "Advanced", "All levels"];

function toArr(s: string): string[] {
  return s.split("\n").map(t => t.trim()).filter(Boolean);
}
function toLines(arr: string[]): string {
  return arr.join("\n");
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${on ? "bg-green-500" : "bg-gray-300"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

const inputCls = "w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-colors bg-white";

export default function TrainingTab({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const [programmes, setProgrammes] = useState<TrainingProgramme[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProgrammeForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const fetchProgrammes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/training");
      const data = await res.json();
      setProgrammes(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProgrammes(); }, [fetchProgrammes]);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
    setExpanded(null);
  }

  function openEdit(p: TrainingProgramme) {
    setEditingId(p.id);
    setForm({
      title: p.title, category: p.category, duration: p.duration,
      schedule: p.schedule, format: p.format, level: p.level, cost: p.cost,
      next_start: p.next_start, description: p.description,
      outcomes: toLines(p.outcomes), sort_order: p.sort_order ?? 0,
    });
    setFormError("");
    setShowForm(true);
    setExpanded(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setFormError("");
    const payload = { ...form, outcomes: toArr(form.outcomes) };
    try {
      const url = editingId ? `/api/admin/training/${editingId}` : "/api/admin/training";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const d = await res.json(); setFormError(d.error || "Failed to save"); return; }
      setShowForm(false);
      fetchProgrammes();
    } catch { setFormError("Network error"); }
    finally { setSaving(false); }
  }

  async function toggleActive(p: TrainingProgramme) {
    await fetch(`/api/admin/training/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    setProgrammes(prev => prev.map(r => r.id === p.id ? { ...r, is_active: !r.is_active } : r));
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/training/${id}`, {
      method: "DELETE",
      headers: { "x-admin-role": "super_admin" },
    });
    setProgrammes(prev => prev.filter(p => p.id !== id));
    setDeleteTarget(null);
  }

  const field = (label: string, node: React.ReactNode, required = false) => (
    <div>
      <label className="block text-sm font-semibold text-dark mb-1.5">{label}{required && " *"}</label>
      {node}
    </div>
  );

  const active = programmes.filter(p => p.is_active);
  const inactive = programmes.filter(p => !p.is_active);

  return (
    <div className="space-y-4">
      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-dark mb-2">Delete this programme?</h3>
            <p className="text-mid text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteTarget)}
                className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Delete</button>
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-light text-mid font-semibold rounded-lg hover:bg-page transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-dark">Training Programmes</h2>
          <p className="text-mid text-sm mt-0.5">{active.length} active · {inactive.length} inactive</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
          <Plus size={15} /> Add Programme
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-mid py-16 justify-center">
          <Loader2 size={18} className="animate-spin" /> Loading…
        </div>
      ) : programmes.length === 0 ? (
        <p className="text-mid py-12 text-center text-sm">
          No training programmes yet. Click &quot;Add Programme&quot; to create one.
        </p>
      ) : (
        <div className="space-y-3">
          {programmes.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-light shadow-sm overflow-hidden">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.is_active ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className="font-bold text-dark truncate">{p.title}</span>
                    <span className="text-xs bg-accent/20 text-dark px-2 py-0.5 rounded-full">{p.category}</span>
                    {!p.is_active && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>
                    )}
                  </div>
                  <p className="text-mid text-sm mt-1">{p.duration} · {p.schedule}</p>
                  <p className="text-mid text-sm">{p.format} · Starts {p.next_start}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-mid">{p.is_active ? "Live" : "Hidden"}</span>
                    <Toggle on={p.is_active} onChange={() => toggleActive(p)} />
                  </div>
                  <button onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    className="p-1.5 text-mid hover:text-dark transition-colors">
                    {expanded === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button onClick={() => openEdit(p)}
                    className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors">
                    <Pencil size={16} />
                  </button>
                  {isSuperAdmin && (
                    <button onClick={() => setDeleteTarget(p.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
              {expanded === p.id && (
                <div className="border-t border-light px-5 py-4 bg-page text-sm text-mid space-y-2">
                  <p>{p.description}</p>
                  {p.outcomes.length > 0 && (
                    <div>
                      <p className="font-semibold text-dark mb-1">Outcomes:</p>
                      <ul className="list-disc ml-5 space-y-0.5">
                        {p.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                      </ul>
                    </div>
                  )}
                  <p><strong className="text-dark">Level:</strong> {p.level} · <strong className="text-dark">Cost:</strong> {p.cost}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-primary/30 shadow-md mt-6">
          <div className="flex items-center justify-between px-6 py-4 border-b border-light">
            <h3 className="font-bold text-dark text-lg">{editingId ? "Edit Programme" : "Add New Programme"}</h3>
            <button onClick={() => setShowForm(false)} className="p-1.5 text-mid hover:text-dark"><X size={18} /></button>
          </div>
          <form onSubmit={handleSave} className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {field("Programme Title", (
                <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  required className={inputCls} placeholder="e.g. Fashion Design & Tailoring" />
              ), true)}
              {field("Category", (
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputCls}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {field("Duration", (
                <input type="text" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                  required className={inputCls} placeholder="e.g. 8 weeks" />
              ), true)}
              {field("Level", (
                <select value={form.level} onChange={e => setForm(p => ({ ...p, level: e.target.value }))} className={inputCls}>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  <option value="Women only">Women only</option>
                </select>
              ))}
              {field("Cost", (
                <input type="text" value={form.cost} onChange={e => setForm(p => ({ ...p, cost: e.target.value }))}
                  className={inputCls} placeholder="Free (BUE Sponsored)" />
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {field("Schedule", (
                <input type="text" value={form.schedule} onChange={e => setForm(p => ({ ...p, schedule: e.target.value }))}
                  required className={inputCls} placeholder="Mon, Wed, Fri — 9am–12pm" />
              ), true)}
              {field("Format / Venue", (
                <input type="text" value={form.format} onChange={e => setForm(p => ({ ...p, format: e.target.value }))}
                  className={inputCls} placeholder="In-person · Afikpo-North" />
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {field("Next Start Date", (
                <input type="text" value={form.next_start} onChange={e => setForm(p => ({ ...p, next_start: e.target.value }))}
                  required className={inputCls} placeholder="e.g. 3 August 2026" />
              ), true)}
              {field("Sort Order", (
                <input type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: Number(e.target.value) }))}
                  className={inputCls} min={0} />
              ))}
            </div>
            {field("Description", (
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={3} required className={inputCls + " resize-y"}
                placeholder="Brief overview of what participants will learn…" />
            ), true)}
            {field("Learning Outcomes (one per line)", (
              <textarea value={form.outcomes} onChange={e => setForm(p => ({ ...p, outcomes: e.target.value }))}
                rows={4} className={inputCls + " resize-y"}
                placeholder={"Sew complete garments from scratch\nPattern cutting and drafting\nCertificate of completion"} />
            ))}
            {formError && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{formError}</p>
            )}
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving || !form.title}
                className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Saving…" : editingId ? "Save Changes" : "Create Programme"}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="px-6 py-2.5 border border-light text-mid rounded-lg hover:bg-page transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
