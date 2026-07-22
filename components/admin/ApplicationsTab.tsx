"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronDown, ChevronUp, RefreshCw, Mail, Phone, Download,
  Trash2, Briefcase, GraduationCap, Calendar, Cpu, MessageSquare,
  Users, Banknote, Heart, Package, AlertTriangle,
} from "lucide-react";

type Submission = {
  id: string;
  created_at: string;
  type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  data: Record<string, unknown>;
};

const TABS = [
  { key: "career_application",      label: "Job Applications",    icon: Briefcase      },
  { key: "scholarship_application", label: "Scholarships",        icon: GraduationCap  },
  { key: "enterprise_application",  label: "Enterprise Fund",     icon: Cpu            },
  { key: "event_registration",      label: "Event Registrations", icon: Calendar       },
  { key: "training_registration",   label: "Training",            icon: Users          },
  { key: "volunteer_application",   label: "Volunteers",          icon: Heart          },
  { key: "contact_message",         label: "Contact Messages",    icon: MessageSquare  },
  { key: "event_attendance",        label: "Attendance Logs",     icon: Calendar       },
  { key: "grant_received",          label: "Grants / Donations",  icon: Banknote       },
  { key: "beneficiary_supported",   label: "Beneficiary Records", icon: Heart          },
  { key: "asset",                   label: "Asset Records",       icon: Package        },
] as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function formatKey(key: string) {
  return key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function exportCSV(typeKey: string, rows: Submission[]) {
  if (rows.length === 0) return;

  const dataKeys = Array.from(
    new Set(rows.flatMap(s => Object.keys(s.data || {})))
  );
  const headers = ["submitted_at", "name", "email", "phone", ...dataKeys];

  const csv = [
    headers,
    ...rows.map(s => [
      new Date(s.created_at).toLocaleString("en-GB"),
      s.name ?? "",
      s.email ?? "",
      s.phone ?? "",
      ...dataKeys.map(k => {
        const v = s.data?.[k];
        if (v === null || v === undefined) return "";
        if (Array.isArray(v)) return v.join("; ");
        return String(v);
      }),
    ]),
  ]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${typeKey}_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Delete confirmation modal ──────────────────────────────────────────────

function DeleteModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle size={22} className="text-red-500 shrink-0" />
          <h3 className="text-lg font-bold text-dark">Delete this record?</h3>
        </div>
        <p className="text-mid text-sm mb-6">This will permanently remove it from the database. This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-sm">
            Yes, delete
          </button>
          <button onClick={onCancel}
            className="flex-1 py-2.5 border border-light text-mid font-semibold rounded-lg hover:bg-page transition-colors text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Submission row ────────────────────────────────────────────────────────

function DataRow({ label, value }: { label: string; value: unknown }) {
  if (value === null || value === undefined || value === "") return null;
  const display = Array.isArray(value) ? value.join(", ") : String(value);
  return (
    <div className="grid grid-cols-[180px_1fr] gap-x-4 py-1.5 border-b border-light last:border-0">
      <span className="text-mid text-sm">{formatKey(label)}</span>
      <span className="text-dark text-sm whitespace-pre-wrap">{display}</span>
    </div>
  );
}

function SubmissionRow({
  sub, isSuperAdmin, onDelete,
}: {
  sub: Submission;
  isSuperAdmin: boolean;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/submissions/${sub.id}`, { method: "DELETE" });
      if (res.ok) {
        onDelete(sub.id);
      }
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  const title =
    sub.name ||
    (sub.data?.position as string) ||
    (sub.data?.programme as string) ||
    (sub.data?.event as string) ||
    (sub.data?.asset_name as string) ||
    (sub.data?.funder_name as string) ||
    "—";

  const subtitle =
    (sub.data?.position as string) ||
    (sub.data?.programme as string) ||
    (sub.data?.event as string) ||
    (sub.data?.beneficiary_name as string) ||
    "";

  return (
    <>
      {confirming && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setConfirming(false)}
        />
      )}
      <div className="border border-light rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 bg-white hover:bg-page transition-colors">
          {/* Expand toggle */}
          <button onClick={() => setOpen(o => !o)} className="flex-1 flex items-center gap-4 text-left min-w-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-dark truncate">{title}</span>
                {subtitle && subtitle !== title && (
                  <span className="text-sm text-primary font-medium truncate">{subtitle}</span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-mid flex-wrap">
                {sub.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={12} /> {sub.email}
                  </span>
                )}
                {sub.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {sub.phone}
                  </span>
                )}
                <span>{formatDate(sub.created_at)}</span>
              </div>
            </div>
            {open
              ? <ChevronUp size={16} className="text-mid shrink-0" />
              : <ChevronDown size={16} className="text-mid shrink-0" />}
          </button>

          {/* Delete button — super_admin only */}
          {isSuperAdmin && (
            <button
              onClick={() => setConfirming(true)}
              disabled={deleting}
              title="Delete record"
              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 disabled:opacity-40"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>

        {open && (
          <div className="px-5 pb-5 pt-2 bg-page border-t border-light space-y-1">
            {sub.name && <DataRow label="Name" value={sub.name} />}
            {sub.email && <DataRow label="Email" value={sub.email} />}
            {sub.phone && <DataRow label="Phone" value={sub.phone} />}
            {Object.entries(sub.data || {}).map(([k, v]) => (
              <DataRow key={k} label={k} value={v} />
            ))}
            <p className="text-xs text-mid pt-2">Submitted: {formatDate(sub.created_at)}</p>
          </div>
        )}
      </div>
    </>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function ApplicationsTab({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const [activeType, setActiveType] = useState("career_application");
  const [subs, setSubs] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const load = useCallback(async (type: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/submissions?type=${type}`);
      const data = await res.json();
      setSubs(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/submissions?limit=500");
      const all: Submission[] = await res.json();
      if (!Array.isArray(all)) return;
      const c: Record<string, number> = {};
      all.forEach(s => { c[s.type] = (c[s.type] || 0) + 1; });
      setCounts(c);
    })();
  }, []);

  useEffect(() => { load(activeType); }, [activeType, load]);

  function handleDeleted(id: string) {
    setSubs(prev => prev.filter(s => s.id !== id));
    setCounts(prev => ({ ...prev, [activeType]: Math.max(0, (prev[activeType] ?? 1) - 1) }));
  }

  const filtered = subs.filter(s => s.type === activeType);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-dark">Applications & Records</h2>
          <p className="text-mid text-sm mt-0.5">All submissions from public forms and internal data entry.</p>
        </div>
        <div className="flex items-center gap-2">
          {filtered.length > 0 && (
            <button
              onClick={() => exportCSV(activeType, filtered)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-light text-sm text-mid hover:text-dark hover:border-mid transition-colors"
            >
              <Download size={14} /> Export CSV
            </button>
          )}
          <button
            onClick={() => load(activeType)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-light text-sm text-mid hover:text-dark hover:border-mid transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ key, label, icon: Icon }) => {
          const count = counts[key] ?? 0;
          const active = activeType === key;
          return (
            <button key={key} onClick={() => setActiveType(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                active
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-mid border-light hover:border-mid hover:text-dark"
              }`}>
              <Icon size={13} />
              {label}
              {count > 0 && (
                <span className={`text-xs rounded-full px-1.5 py-0.5 ml-0.5 font-bold ${
                  active ? "bg-white/20 text-white" : "bg-light text-dark"
                }`}>{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-mid text-sm gap-2">
            <RefreshCw size={16} className="animate-spin" /> Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-mid text-sm">
            <p className="font-medium text-dark mb-1">No records yet</p>
            <p>Submissions will appear here once people fill in the public forms or you log entries.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-mid">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</p>
              {isSuperAdmin && (
                <p className="text-xs text-mid">Tip: click the trash icon on any row to delete it</p>
              )}
            </div>
            {filtered.map(s => (
              <SubmissionRow
                key={s.id}
                sub={s}
                isSuperAdmin={isSuperAdmin}
                onDelete={handleDeleted}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
