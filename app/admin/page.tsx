"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Pencil, Trash2, LogOut, Loader2, X, ChevronDown, ChevronUp,
  Mail, ShieldCheck, Shield,
} from "lucide-react";
import type { Job, BuefEvent } from "@/lib/types";
import DataEntryTab from "@/components/admin/DataEntryTab";
import ApplicationsTab from "@/components/admin/ApplicationsTab";

// ── helpers ────────────────────────────────────────────────────────────────

const toLines = (arr: string[]) => arr.join("\n");
const toArr = (s: string) => s.split("\n").map(t => t.trim()).filter(Boolean);

const EMPTY_JOB = {
  title: "", type: "Full-time", location: "Remote / Hybrid",
  salary: "", department: "", summary: "",
  responsibilities: "", requirements: "", desirable: "",
};

const EMPTY_EVENT = {
  title: "", type: "", date_label: "", time_label: "", location: "",
  description: "", speakers: "", price: "Free", seats: "", tags: "", sort_order: 0,
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  invite_accepted: boolean;
  created_at: string;
};

type Me = { id: string; name: string; email: string; role: string };

// ── Toggle switch ──────────────────────────────────────────────────────────

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${on ? "bg-green-500" : "bg-gray-300"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

// ── Confirm modal ──────────────────────────────────────────────────────────

function ConfirmDelete({ label, onConfirm, onCancel }: { label: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
        <h3 className="text-lg font-bold text-dark mb-2">Delete this {label}?</h3>
        <p className="text-mid text-sm mb-6">This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Delete</button>
          <button onClick={onCancel} className="flex-1 py-2.5 border border-light text-mid font-semibold rounded-lg hover:bg-page transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Invite modal ───────────────────────────────────────────────────────────

function InviteModal({ onClose, onSent }: { onClose: () => void; onSent: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", role: "editor" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSent(true);
      setTimeout(() => { onSent(); onClose(); }, 2000);
    } else {
      const d = await res.json();
      setError(d.error || "Failed to send invite");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-light">
          <h3 className="font-bold text-dark text-lg">Invite Staff Member</h3>
          <button onClick={onClose} className="p-1.5 text-mid hover:text-dark"><X size={18} /></button>
        </div>
        {sent ? (
          <div className="px-6 py-12 text-center">
            <Mail size={40} className="text-green-500 mx-auto mb-3" />
            <p className="font-semibold text-dark">Invitation sent!</p>
            <p className="text-mid text-sm mt-1">They&apos;ll receive an email with a link to set their password.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Full Name</label>
              <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Staff member&apos;s name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Email Address</label>
              <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="their@email.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">Role</label>
              <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                className="w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary bg-white">
                <option value="editor">Editor — can add/edit jobs and events</option>
                <option value="super_admin">Super Admin — full access including user management</option>
              </select>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving}
                className="flex-1 py-2.5 bg-primary text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Sending…" : "Send Invitation"}
              </button>
              <button type="button" onClick={onClose} className="px-5 py-2.5 border border-light text-mid rounded-lg hover:bg-page transition-colors">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [tab, setTab] = useState<"jobs" | "events" | "data" | "applications" | "users">("jobs");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<BuefEvent[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [jobForm, setJobForm] = useState(EMPTY_JOB);
  const [eventForm, setEventForm] = useState(EMPTY_EVENT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<{ type: string; id: string } | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(false);

  const isSuperAdmin = me?.role === "super_admin";

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [meRes, jr, er] = await Promise.all([
      fetch("/api/admin/me").then(r => r.json()),
      fetch("/api/admin/jobs").then(r => r.json()),
      fetch("/api/admin/events").then(r => r.json()),
    ]);
    setMe(meRes);
    setJobs(Array.isArray(jr) ? jr : []);
    setEvents(Array.isArray(er) ? er : []);
    setLoading(false);
  }, []);

  const fetchUsers = useCallback(async () => {
    const data = await fetch("/api/admin/users").then(r => r.json());
    setUsers(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { if (tab === "users" && isSuperAdmin) fetchUsers(); }, [tab, isSuperAdmin, fetchUsers]);

  // ── Auth ──────────────────────────────────────────────────────────────────

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // ── Job CRUD ──────────────────────────────────────────────────────────────

  function openAddJob() { setEditingId(null); setJobForm(EMPTY_JOB); setFormError(""); setShowJobForm(true); }

  function openEditJob(job: Job) {
    setEditingId(job.id);
    setJobForm({
      title: job.title, type: job.type, location: job.location,
      salary: job.salary, department: job.department, summary: job.summary,
      responsibilities: toLines(job.responsibilities),
      requirements: toLines(job.requirements),
      desirable: toLines(job.desirable),
    });
    setFormError(""); setShowJobForm(true);
  }

  async function saveJob(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setFormError("");
    const payload = {
      ...jobForm,
      responsibilities: toArr(jobForm.responsibilities),
      requirements: toArr(jobForm.requirements),
      desirable: toArr(jobForm.desirable),
    };
    try {
      const url = editingId ? `/api/admin/jobs/${editingId}` : "/api/admin/jobs";
      const res = await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setFormError(d.error || "Failed to save"); return; }
      setShowJobForm(false); fetchData();
    } catch { setFormError("Network error"); }
    finally { setSaving(false); }
  }

  async function toggleJob(id: string, is_active: boolean) {
    await fetch(`/api/admin/jobs/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_active }) });
    setJobs(prev => prev.map(j => j.id === id ? { ...j, is_active } : j));
  }

  async function deleteJob(id: string) {
    await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    setJobs(prev => prev.filter(j => j.id !== id));
    setDeleteTarget(null);
  }

  // ── Event CRUD ────────────────────────────────────────────────────────────

  function openAddEvent() { setEditingId(null); setEventForm(EMPTY_EVENT); setFormError(""); setShowEventForm(true); }

  function openEditEvent(ev: BuefEvent) {
    setEditingId(ev.id);
    setEventForm({
      title: ev.title, type: ev.type, date_label: ev.date_label,
      time_label: ev.time_label, location: ev.location, description: ev.description,
      speakers: toLines(ev.speakers), price: ev.price, seats: ev.seats,
      tags: ev.tags.join(", "), sort_order: ev.sort_order,
    });
    setFormError(""); setShowEventForm(true);
  }

  async function saveEvent(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setFormError("");
    const payload = {
      ...eventForm,
      speakers: toArr(eventForm.speakers),
      tags: eventForm.tags.split(",").map(t => t.trim()).filter(Boolean),
      sort_order: Number(eventForm.sort_order),
    };
    try {
      const url = editingId ? `/api/admin/events/${editingId}` : "/api/admin/events";
      const res = await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setFormError(d.error || "Failed to save"); return; }
      setShowEventForm(false); fetchData();
    } catch { setFormError("Network error"); }
    finally { setSaving(false); }
  }

  async function toggleEvent(id: string, is_active: boolean) {
    await fetch(`/api/admin/events/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_active }) });
    setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, is_active } : ev));
  }

  async function deleteEvent(id: string) {
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    setEvents(prev => prev.filter(ev => ev.id !== id));
    setDeleteTarget(null);
  }

  // ── User management ───────────────────────────────────────────────────────

  async function deleteUser(id: string) {
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setUsers(prev => prev.filter(u => u.id !== id));
    setDeleteTarget(null);
  }

  // ── Field helpers ─────────────────────────────────────────────────────────

  const field = (label: string, node: React.ReactNode, required = false) => (
    <div>
      <label className="block text-sm font-semibold text-dark mb-1.5">{label}{required && " *"}</label>
      {node}
    </div>
  );

  const inp = (value: string, setter: (v: string) => void, placeholder = "", type = "text") => (
    <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-colors bg-white" />
  );

  const ta = (value: string, setter: (v: string) => void, placeholder = "", rows = 4) => (
    <textarea value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-colors resize-y bg-white" />
  );

  const tabs = [
    { id: "jobs" as const, label: `Jobs (${jobs.length})` },
    { id: "events" as const, label: `Events (${events.length})` },
    { id: "data" as const, label: "Data Entry" },
    { id: "applications" as const, label: "Applications" },
    ...(isSuperAdmin ? [{ id: "users" as const, label: "Users" }] : []),
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <header className="bg-primary text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <div className="font-bold text-lg">BUE Foundation Admin</div>
          {me && <div className="text-white/60 text-xs">{me.name} · {me.role === "super_admin" ? "Super Admin" : "Editor"}</div>}
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm font-semibold transition-colors">
          <LogOut size={15} /> Log out
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-light w-fit shadow-sm">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t.id ? "bg-primary text-white shadow-sm" : "text-mid hover:text-dark"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-mid py-20 justify-center">
            <Loader2 size={20} className="animate-spin" /> Loading…
          </div>
        ) : (
          <>
            {/* ── JOBS ───────────────────────────────────────────────────── */}
            {tab === "jobs" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-dark">Job Listings</h2>
                  <button onClick={openAddJob} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
                    <Plus size={15} /> Add Job
                  </button>
                </div>
                {jobs.length === 0 && <p className="text-mid py-10 text-center">No jobs yet. Click &quot;Add Job&quot; to create one.</p>}
                {jobs.map(job => (
                  <div key={job.id} className="bg-white rounded-2xl border border-light shadow-sm overflow-hidden">
                    <div className="p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${job.is_active ? "bg-green-500" : "bg-gray-300"}`} />
                          <span className="font-bold text-dark truncate">{job.title}</span>
                          <span className="text-xs bg-accent/20 text-dark px-2 py-0.5 rounded-full">{job.department}</span>
                        </div>
                        <p className="text-mid text-sm mt-1">{job.type} · {job.location} · {job.salary}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-mid">{job.is_active ? "Live" : "Hidden"}</span>
                          <Toggle on={job.is_active} onChange={v => toggleJob(job.id, v)} />
                        </div>
                        <button onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)} className="p-1.5 text-mid hover:text-dark transition-colors">
                          {expandedJob === job.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <button onClick={() => openEditJob(job)} className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"><Pencil size={16} /></button>
                        {isSuperAdmin && (
                          <button onClick={() => setDeleteTarget({ type: "job", id: job.id })} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                        )}
                      </div>
                    </div>
                    {expandedJob === job.id && (
                      <div className="border-t border-light px-5 py-4 bg-page text-sm text-mid">
                        <p className="mb-2">{job.summary}</p>
                        {job.responsibilities.length > 0 && (
                          <><strong className="text-dark">Responsibilities:</strong>
                          <ul className="list-disc ml-5 mt-1 space-y-0.5">{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul></>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {showJobForm && (
                  <div className="bg-white rounded-2xl border border-primary/30 shadow-md mt-6">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-light">
                      <h3 className="font-bold text-dark text-lg">{editingId ? "Edit Job" : "Add New Job"}</h3>
                      <button onClick={() => setShowJobForm(false)} className="p-1.5 text-mid hover:text-dark"><X size={18} /></button>
                    </div>
                    <form onSubmit={saveJob} className="p-6 space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        {field("Job Title", inp(jobForm.title, v => setJobForm(p => ({ ...p, title: v })), "e.g. Programme Officer"), true)}
                        {field("Department", inp(jobForm.department, v => setJobForm(p => ({ ...p, department: v })), "e.g. Operations"), true)}
                      </div>
                      <div className="grid sm:grid-cols-3 gap-5">
                        {field("Type", (
                          <select value={jobForm.type} onChange={e => setJobForm(p => ({ ...p, type: e.target.value }))}
                            className="w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary bg-white">
                            {["Full-time", "Part-time", "Contract", "Volunteer"].map(o => <option key={o}>{o}</option>)}
                          </select>
                        ))}
                        {field("Location", inp(jobForm.location, v => setJobForm(p => ({ ...p, location: v })), "Remote / Hybrid"))}
                        {field("Salary", inp(jobForm.salary, v => setJobForm(p => ({ ...p, salary: v })), "₦30,000 per month"))}
                      </div>
                      {field("Job Summary", ta(jobForm.summary, v => setJobForm(p => ({ ...p, summary: v })), "Brief overview of the role…", 3), true)}
                      {field("Responsibilities (one per line)", ta(jobForm.responsibilities, v => setJobForm(p => ({ ...p, responsibilities: v })), "Manage daily operations\nCoordinate with teams…", 5))}
                      {field("Requirements (one per line)", ta(jobForm.requirements, v => setJobForm(p => ({ ...p, requirements: v })), "3 years experience\nDegree in relevant field…", 5))}
                      {field("Desirable Skills (one per line)", ta(jobForm.desirable, v => setJobForm(p => ({ ...p, desirable: v })), "Knowledge of X\nExperience in Y…", 3))}
                      {formError && <p className="text-red-600 text-sm">{formError}</p>}
                      <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={saving || !jobForm.title}
                          className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2">
                          {saving && <Loader2 size={14} className="animate-spin" />}
                          {saving ? "Saving…" : editingId ? "Save Changes" : "Create Job"}
                        </button>
                        <button type="button" onClick={() => setShowJobForm(false)} className="px-6 py-2.5 border border-light text-mid rounded-lg hover:bg-page transition-colors">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ── EVENTS ─────────────────────────────────────────────────── */}
            {tab === "events" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-dark">Events</h2>
                  <button onClick={openAddEvent} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
                    <Plus size={15} /> Add Event
                  </button>
                </div>
                {events.length === 0 && <p className="text-mid py-10 text-center">No events yet. Click &quot;Add Event&quot; to create one.</p>}
                {events.map(ev => (
                  <div key={ev.id} className="bg-white rounded-2xl border border-light shadow-sm p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ev.is_active ? "bg-green-500" : "bg-gray-300"}`} />
                        <span className="font-bold text-dark truncate">{ev.title}</span>
                        <span className="text-xs bg-accent/20 text-dark px-2 py-0.5 rounded-full">{ev.type}</span>
                      </div>
                      <p className="text-mid text-sm mt-1">{ev.date_label} · {ev.time_label}</p>
                      <p className="text-mid text-sm">{ev.location} · {ev.price}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-mid">{ev.is_active ? "Live" : "Hidden"}</span>
                        <Toggle on={ev.is_active} onChange={v => toggleEvent(ev.id, v)} />
                      </div>
                      <button onClick={() => openEditEvent(ev)} className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"><Pencil size={16} /></button>
                      {isSuperAdmin && (
                        <button onClick={() => setDeleteTarget({ type: "event", id: ev.id })} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                      )}
                    </div>
                  </div>
                ))}
                {showEventForm && (
                  <div className="bg-white rounded-2xl border border-primary/30 shadow-md mt-6">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-light">
                      <h3 className="font-bold text-dark text-lg">{editingId ? "Edit Event" : "Add New Event"}</h3>
                      <button onClick={() => setShowEventForm(false)} className="p-1.5 text-mid hover:text-dark"><X size={18} /></button>
                    </div>
                    <form onSubmit={saveEvent} className="p-6 space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        {field("Event Title", inp(eventForm.title, v => setEventForm(p => ({ ...p, title: v })), "e.g. Business Seminar"), true)}
                        {field("Type", inp(eventForm.type, v => setEventForm(p => ({ ...p, type: v })), "e.g. Workshop, Gala, Outreach"))}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        {field("Date", inp(eventForm.date_label, v => setEventForm(p => ({ ...p, date_label: v })), "Saturday, 1 August 2026"), true)}
                        {field("Time", inp(eventForm.time_label, v => setEventForm(p => ({ ...p, time_label: v })), "9:00 AM – 2:00 PM"))}
                      </div>
                      {field("Location", inp(eventForm.location, v => setEventForm(p => ({ ...p, location: v })), "BUE Foundation Hall, Afikpo-North"), true)}
                      {field("Description", ta(eventForm.description, v => setEventForm(p => ({ ...p, description: v })), "Event details…", 3), true)}
                      <div className="grid sm:grid-cols-2 gap-5">
                        {field("Price", inp(eventForm.price, v => setEventForm(p => ({ ...p, price: v })), "Free"))}
                        {field("Seats / Availability", inp(eventForm.seats, v => setEventForm(p => ({ ...p, seats: v })), "Limited to 80 attendees"))}
                      </div>
                      {field("Speakers (one per line)", ta(eventForm.speakers, v => setEventForm(p => ({ ...p, speakers: v })), "Beatrice Uchenna Egwu\nGuest Speaker TBA", 3))}
                      <div className="grid sm:grid-cols-2 gap-5">
                        {field("Tags (comma separated)", inp(eventForm.tags, v => setEventForm(p => ({ ...p, tags: v })), "Free Entry, Business, Fundraising"))}
                        {field("Sort Order", inp(String(eventForm.sort_order), v => setEventForm(p => ({ ...p, sort_order: Number(v) })), "1", "number"))}
                      </div>
                      {formError && <p className="text-red-600 text-sm">{formError}</p>}
                      <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={saving || !eventForm.title}
                          className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2">
                          {saving && <Loader2 size={14} className="animate-spin" />}
                          {saving ? "Saving…" : editingId ? "Save Changes" : "Create Event"}
                        </button>
                        <button type="button" onClick={() => setShowEventForm(false)} className="px-6 py-2.5 border border-light text-mid rounded-lg hover:bg-page transition-colors">Cancel</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ── DATA ENTRY ────────────────────────────────────────────── */}
            {tab === "data" && <DataEntryTab />}
            {tab === "applications" && <ApplicationsTab isSuperAdmin={isSuperAdmin} />}

            {/* ── USERS (super_admin only) ───────────────────────────────── */}
            {tab === "users" && isSuperAdmin && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-dark">Admin Users</h2>
                  <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
                    <Plus size={15} /> Invite Staff
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-light shadow-sm divide-y divide-light overflow-hidden">
                  {users.length === 0 && <p className="text-mid text-center py-10">No users found.</p>}
                  {users.map(user => (
                    <div key={user.id} className="p-5 flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${user.role === "super_admin" ? "bg-primary/10" : "bg-accent/20"}`}>
                        {user.role === "super_admin"
                          ? <ShieldCheck size={18} className="text-primary" />
                          : <Shield size={18} className="text-dark/50" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-dark">{user.name}</span>
                          {user.id === me?.id && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">You</span>}
                          {!user.invite_accepted && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Invite pending</span>}
                        </div>
                        <p className="text-mid text-sm">{user.email} · {user.role === "super_admin" ? "Super Admin" : "Editor"}</p>
                      </div>
                      {user.id !== me?.id && (
                        <button onClick={() => setDeleteTarget({ type: "user", id: user.id })} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors flex-shrink-0">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-page border border-light rounded-xl p-5 text-sm text-mid">
                  <p className="font-semibold text-dark mb-2">Role permissions</p>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2"><ShieldCheck size={15} className="text-primary mt-0.5 flex-shrink-0" /><span><strong className="text-dark">Super Admin</strong> — full access: add, edit, delete jobs/events, and manage admin users.</span></div>
                    <div className="flex items-start gap-2"><Shield size={15} className="text-dark/50 mt-0.5 flex-shrink-0" /><span><strong className="text-dark">Editor</strong> — can add and edit jobs and events. Cannot delete or access this Users tab.</span></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {deleteTarget && (
        <ConfirmDelete
          label={deleteTarget.type}
          onConfirm={() => {
            if (deleteTarget.type === "job") deleteJob(deleteTarget.id);
            else if (deleteTarget.type === "event") deleteEvent(deleteTarget.id);
            else deleteUser(deleteTarget.id);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {showInvite && (
        <InviteModal onClose={() => setShowInvite(false)} onSent={fetchUsers} />
      )}
    </div>
  );
}
