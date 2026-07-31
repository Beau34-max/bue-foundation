"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, X, Loader2, AlertTriangle } from "lucide-react";
import type { VolunteerRole } from "@/lib/types";

const toLines = (arr: string[]) => arr.join("\n");
const toArr = (s: string) => s.split("\n").map(t => t.trim()).filter(Boolean);

const EMPTY: Omit<VolunteerRole, "id" | "created_at"> = {
  title: "", category: "", commitment: "", location: "Remote / Hybrid",
  description: "", skills: [], is_active: true,
};

const CATEGORIES = ["Field", "Education", "Admin", "Finance", "Digital", "Fundraising", "Training", "Health", "Legal", "Other"];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${on ? "bg-green-500" : "bg-gray-300"}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function ConfirmDelete({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle size={22} className="text-red-500 shrink-0" />
          <h3 className="text-lg font-bold text-dark">Delete this volunteer role?</h3>
        </div>
        <p className="text-mid text-sm mb-6">This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-sm">
            Yes, delete
          </button>
          <button onClick={onCancel} className="flex-1 py-2.5 border border-light text-mid font-semibold rounded-lg hover:bg-page transition-colors text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-colors bg-white";

export default function VolunteerRolesTab({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const [roles, setRoles] = useState<VolunteerRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addForm, setAddForm] = useState({ ...EMPTY, skills: "" as unknown as string });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForms, setEditForms] = useState<Record<string, { title: string; category: string; commitment: string; location: string; description: string; skills: string }>>({});
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/volunteer-roles");
      const data = await res.json();
      setRoles(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRoles(); }, [fetchRoles]);

  async function handleToggle(role: VolunteerRole) {
    const updated = { ...role, is_active: !role.is_active };
    setRoles(prev => prev.map(r => r.id === role.id ? updated : r));
    await fetch(`/api/admin/volunteer-roles/${role.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: updated.is_active }),
    });
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/volunteer-roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addForm,
          skills: toArr(addForm.skills as unknown as string),
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setRoles(prev => [created, ...prev]);
        setAddForm({ ...EMPTY, skills: "" as unknown as string });
        setShowAdd(false);
      }
    } finally {
      setSaving(false);
    }
  }

  function startEdit(role: VolunteerRole) {
    setEditing(role.id);
    setEditForms(prev => ({
      ...prev,
      [role.id]: {
        title: role.title,
        category: role.category,
        commitment: role.commitment,
        location: role.location,
        description: role.description,
        skills: toLines(role.skills),
      },
    }));
  }

  async function handleSaveEdit(role: VolunteerRole) {
    const f = editForms[role.id];
    if (!f) return;
    setSaving(true);
    try {
      const body = { ...f, skills: toArr(f.skills) };
      const res = await fetch(`/api/admin/volunteer-roles/${role.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const updated = await res.json();
        setRoles(prev => prev.map(r => r.id === role.id ? updated : r));
        setEditing(null);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/volunteer-roles/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRoles(prev => prev.filter(r => r.id !== id));
      setConfirmDelete(null);
    }
  }

  return (
    <div className="space-y-4">
      {confirmDelete && (
        <ConfirmDelete
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark">Volunteer Roles ({roles.length})</h2>
          <p className="text-mid text-sm mt-0.5">Manage volunteering opportunities shown on the public site.</p>
        </div>
        <button onClick={() => setShowAdd(s => !s)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
          {showAdd ? <X size={15} /> : <Plus size={15} />}
          {showAdd ? "Cancel" : "Add Role"}
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-primary/30 p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-dark text-base">New Volunteer Role</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark mb-1">Title *</label>
              <input required value={addForm.title} onChange={e => setAddForm(p => ({ ...p, title: e.target.value }))}
                className={inputCls} placeholder="e.g. Accountant" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark mb-1">Category</label>
              <select value={addForm.category} onChange={e => setAddForm(p => ({ ...p, category: e.target.value }))} className={inputCls}>
                <option value="">Select…</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark mb-1">Commitment</label>
              <input value={addForm.commitment} onChange={e => setAddForm(p => ({ ...p, commitment: e.target.value }))}
                className={inputCls} placeholder="e.g. 3–5 hours/week" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark mb-1">Location</label>
              <input value={addForm.location} onChange={e => setAddForm(p => ({ ...p, location: e.target.value }))}
                className={inputCls} placeholder="e.g. Remote / Afikpo-North" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark mb-1">Description / Summary *</label>
            <textarea required rows={3} value={addForm.description} onChange={e => setAddForm(p => ({ ...p, description: e.target.value }))}
              className={inputCls} placeholder="What does this volunteer do?" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark mb-1">Skills Needed <span className="text-mid font-normal">(one per line)</span></label>
            <textarea rows={3} value={addForm.skills as unknown as string} onChange={e => setAddForm(p => ({ ...p, skills: e.target.value as unknown as string[] }))}
              className={inputCls} placeholder={"Accounting / bookkeeping\nMicrosoft Excel\nAttention to detail"} />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? "Saving…" : "Save Role"}
            </button>
            <button type="button" onClick={() => setShowAdd(false)}
              className="px-5 py-2.5 border border-light text-mid text-sm font-semibold rounded-lg hover:bg-page transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Role list */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-mid text-sm gap-2">
          <Loader2 size={16} className="animate-spin" /> Loading…
        </div>
      ) : roles.length === 0 ? (
        <div className="text-center py-16 text-mid text-sm">
          <p className="font-medium text-dark mb-1">No volunteer roles yet</p>
          <p>Click "Add Role" above to create your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {roles.map(role => (
            <div key={role.id} className="bg-white rounded-xl border border-light overflow-hidden">
              {/* Row header */}
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-dark">{role.title}</span>
                    {role.category && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        {role.category}
                      </span>
                    )}
                    {!role.is_active && (
                      <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-medium">Closed</span>
                    )}
                  </div>
                  <p className="text-sm text-mid mt-0.5">{role.commitment} · {role.location}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex flex-col items-center gap-0.5">
                    <Toggle on={role.is_active} onChange={() => handleToggle(role)} />
                    <span className="text-xs text-mid">{role.is_active ? "Open" : "Closed"}</span>
                  </div>
                  <button onClick={() => { startEdit(role); setExpanded(role.id); }}
                    className="p-2 text-mid hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    <Pencil size={15} />
                  </button>
                  {isSuperAdmin && (
                    <button onClick={() => setConfirmDelete(role.id)}
                      className="p-2 text-mid hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={15} />
                    </button>
                  )}
                  <button onClick={() => setExpanded(expanded === role.id ? null : role.id)}
                    className="p-2 text-mid hover:text-dark rounded-lg transition-colors">
                    {expanded === role.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded: view or edit */}
              {expanded === role.id && (
                <div className="border-t border-light px-5 py-5 bg-page">
                  {editing === role.id ? (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">Title</label>
                          <input value={editForms[role.id]?.title ?? ""} onChange={e => setEditForms(p => ({ ...p, [role.id]: { ...p[role.id], title: e.target.value } }))} className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">Category</label>
                          <select value={editForms[role.id]?.category ?? ""} onChange={e => setEditForms(p => ({ ...p, [role.id]: { ...p[role.id], category: e.target.value } }))} className={inputCls}>
                            <option value="">Select…</option>
                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">Commitment</label>
                          <input value={editForms[role.id]?.commitment ?? ""} onChange={e => setEditForms(p => ({ ...p, [role.id]: { ...p[role.id], commitment: e.target.value } }))} className={inputCls} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">Location</label>
                          <input value={editForms[role.id]?.location ?? ""} onChange={e => setEditForms(p => ({ ...p, [role.id]: { ...p[role.id], location: e.target.value } }))} className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-dark mb-1">Description</label>
                        <textarea rows={3} value={editForms[role.id]?.description ?? ""} onChange={e => setEditForms(p => ({ ...p, [role.id]: { ...p[role.id], description: e.target.value } }))} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-dark mb-1">Skills <span className="text-mid font-normal">(one per line)</span></label>
                        <textarea rows={3} value={editForms[role.id]?.skills ?? ""} onChange={e => setEditForms(p => ({ ...p, [role.id]: { ...p[role.id], skills: e.target.value } }))} className={inputCls} />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => handleSaveEdit(role)} disabled={saving}
                          className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-50">
                          {saving && <Loader2 size={13} className="animate-spin" />}
                          {saving ? "Saving…" : "Save Changes"}
                        </button>
                        <button onClick={() => setEditing(null)}
                          className="px-5 py-2 border border-light text-mid text-sm font-semibold rounded-lg hover:bg-white transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-mid text-sm leading-relaxed">{role.description}</p>
                      {role.skills.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-dark mb-2">Skills needed:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {role.skills.map(s => (
                              <span key={s} className="text-xs bg-light text-mid px-2.5 py-1 rounded-full">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
