"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle, Users, Banknote, Heart, Package } from "lucide-react";
import type { BuefEvent } from "@/lib/types";

// ── helpers ────────────────────────────────────────────────────────────────

const NIGERIA_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara",
];

const PROGRAMMES = [
  "Financial Aid","Scholarship / Education","Shelter Support",
  "Skill Acquisition","Enterprise Fund","Community Outreach","Other",
];

type SaveState = "idle" | "saving" | "saved" | "error";

function useSave() {
  const [state, setState] = useState<SaveState>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function save(type: string, data: Record<string, unknown>, onSuccess: () => void) {
    setState("saving");
    setErrMsg("");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });
      if (res.ok) {
        setState("saved");
        onSuccess();
        setTimeout(() => setState("idle"), 3000);
      } else {
        const d = await res.json();
        setErrMsg(d.error || "Failed to save");
        setState("error");
      }
    } catch {
      setErrMsg("Network error");
      setState("error");
    }
  }

  return { state, errMsg, save };
}

// ── Shared UI ──────────────────────────────────────────────────────────────

function FormCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-light shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-light bg-page">
        <span className="text-primary">{icon}</span>
        <h3 className="font-bold text-dark">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-dark mb-1.5">
        {label}{optional && <span className="text-mid font-normal ml-1">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-colors bg-white";

function SaveButton({ state, label }: { state: SaveState; label: string }) {
  return (
    <button type="submit" disabled={state === "saving"}
      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity">
      {state === "saving" && <Loader2 size={14} className="animate-spin" />}
      {state === "saved" && <CheckCircle size={14} />}
      {state === "saving" ? "Saving…" : state === "saved" ? "Saved!" : label}
    </button>
  );
}

function FormStatus({ state, errMsg }: { state: SaveState; errMsg: string }) {
  if (state === "error") return <p className="text-red-600 text-sm">{errMsg}</p>;
  return null;
}

// ── Event Attendance ───────────────────────────────────────────────────────

function EventAttendanceForm({ events }: { events: BuefEvent[] }) {
  const { state, errMsg, save } = useSave();
  const [form, setForm] = useState({ event: "", customEvent: "", date: "", count: "", notes: "" });

  function reset() { setForm({ event: "", customEvent: "", date: "", count: "", notes: "" }); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const eventName = form.event === "__custom" ? form.customEvent : form.event;
    await save("event_attendance", {
      event: eventName, date: form.date,
      number_attended: Number(form.count), notes: form.notes,
    }, reset);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Event">
        <select value={form.event} onChange={e => setForm(p => ({ ...p, event: e.target.value }))} required className={inputCls}>
          <option value="">Select an event…</option>
          {events.map(ev => <option key={ev.id} value={ev.title}>{ev.title}</option>)}
          <option value="__custom">Other / type below</option>
        </select>
      </Field>
      {form.event === "__custom" && (
        <Field label="Event name">
          <input type="text" required value={form.customEvent} onChange={e => setForm(p => ({ ...p, customEvent: e.target.value }))}
            className={inputCls} placeholder="Type the event name" />
        </Field>
      )}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date">
          <input type="date" required value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={inputCls} />
        </Field>
        <Field label="Number Attended">
          <input type="number" required min="0" value={form.count} onChange={e => setForm(p => ({ ...p, count: e.target.value }))}
            className={inputCls} placeholder="0" />
        </Field>
      </div>
      <Field label="Notes" optional>
        <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
          className={inputCls} rows={3} placeholder="Any additional notes…" />
      </Field>
      <FormStatus state={state} errMsg={errMsg} />
      <SaveButton state={state} label="Save Attendance" />
    </form>
  );
}

// ── Grant / Donation Received ──────────────────────────────────────────────

function GrantForm() {
  const { state, errMsg, save } = useSave();
  const [form, setForm] = useState({ funder: "", amount: "", method: "", date: "", reference: "", notes: "" });

  function reset() { setForm({ funder: "", amount: "", method: "", date: "", reference: "", notes: "" }); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await save("grant_received", {
      funder_name: form.funder, amount_naira: form.amount,
      payment_method: form.method, date_received: form.date,
      reference: form.reference, notes: form.notes,
    }, reset);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Grantor / Funder Name">
        <input type="text" required value={form.funder} onChange={e => setForm(p => ({ ...p, funder: e.target.value }))}
          className={inputCls} placeholder="e.g. USAID, Sir James Knott Trust, Anonymous" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Amount (₦)">
          <input type="number" required min="0" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
            className={inputCls} placeholder="0" />
        </Field>
        <Field label="Payment Method">
          <select value={form.method} onChange={e => setForm(p => ({ ...p, method: e.target.value }))} required className={inputCls}>
            <option value="">Select…</option>
            {["Bank Transfer","Cash","Card / Online","Cheque","Other"].map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date Received">
          <input type="date" required value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={inputCls} />
        </Field>
        <Field label="Reference" optional>
          <input type="text" value={form.reference} onChange={e => setForm(p => ({ ...p, reference: e.target.value }))}
            className={inputCls} placeholder="e.g. grant ref number" />
        </Field>
      </div>
      <Field label="Notes" optional>
        <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
          className={inputCls} rows={3} placeholder="Any conditions, restrictions, notes…" />
      </Field>
      <FormStatus state={state} errMsg={errMsg} />
      <SaveButton state={state} label="Save Grant / Donation" />
    </form>
  );
}

// ── Beneficiary Supported ──────────────────────────────────────────────────

function BeneficiaryForm() {
  const { state, errMsg, save } = useSave();
  const [form, setForm] = useState({
    name: "", programme: "", support_detail: "", amount: "", date: "", state: "", notes: "",
  });

  function reset() { setForm({ name: "", programme: "", support_detail: "", amount: "", date: "", state: "", notes: "" }); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await save("beneficiary_supported", {
      beneficiary_name: form.name, programme: form.programme,
      support_detail: form.support_detail, amount_naira: form.amount,
      date: form.date, state: form.state, notes: form.notes,
    }, reset);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Beneficiary Name">
        <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className={inputCls} placeholder="Full name of person supported" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Programme">
          <select value={form.programme} onChange={e => setForm(p => ({ ...p, programme: e.target.value }))} required className={inputCls}>
            <option value="">Select…</option>
            {PROGRAMMES.map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="State">
          <select value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))} required className={inputCls}>
            <option value="">Select…</option>
            {NIGERIA_STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Type / Description of Support">
        <input type="text" required value={form.support_detail} onChange={e => setForm(p => ({ ...p, support_detail: e.target.value }))}
          className={inputCls} placeholder="e.g. School fees paid, Food packages, Starter capital" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Amount (₦)" optional>
          <input type="number" min="0" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
            className={inputCls} placeholder="0" />
        </Field>
        <Field label="Date">
          <input type="date" required value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={inputCls} />
        </Field>
      </div>
      <Field label="Notes" optional>
        <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
          className={inputCls} rows={3} placeholder="Any extra details…" />
      </Field>
      <FormStatus state={state} errMsg={errMsg} />
      <SaveButton state={state} label="Save Beneficiary Record" />
    </form>
  );
}

// ── Asset ──────────────────────────────────────────────────────────────────

function AssetForm() {
  const { state, errMsg, save } = useSave();
  const [form, setForm] = useState({
    asset_name: "", category: "", acquired_by: "", value: "",
    date_acquired: "", donor_supplier: "", condition: "", notes: "",
  });

  function reset() {
    setForm({ asset_name: "", category: "", acquired_by: "", value: "", date_acquired: "", donor_supplier: "", condition: "", notes: "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await save("asset", { ...form, value_naira: form.value }, reset);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Asset Name / Description">
        <input type="text" required value={form.asset_name} onChange={e => setForm(p => ({ ...p, asset_name: e.target.value }))}
          className={inputCls} placeholder="e.g. Dell Laptop, Office Chair, Generator" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category" optional>
          <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputCls}>
            <option value="">Select…</option>
            {["Electronics","Furniture","Vehicle","Building / Property","Equipment","Stationery","Other"].map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Acquired By">
          <select value={form.acquired_by} onChange={e => setForm(p => ({ ...p, acquired_by: e.target.value }))} required className={inputCls}>
            <option value="">Select…</option>
            {["Purchased","Donated","Grant-funded"].map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Value (₦)">
          <input type="number" min="0" required value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))}
            className={inputCls} placeholder="Worth, whether bought or donated" />
        </Field>
        <Field label="Date Acquired">
          <input type="date" required value={form.date_acquired} onChange={e => setForm(p => ({ ...p, date_acquired: e.target.value }))} className={inputCls} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Donor / Supplier" optional>
          <input type="text" value={form.donor_supplier} onChange={e => setForm(p => ({ ...p, donor_supplier: e.target.value }))}
            className={inputCls} placeholder="Who donated it / where bought from" />
        </Field>
        <Field label="Condition" optional>
          <select value={form.condition} onChange={e => setForm(p => ({ ...p, condition: e.target.value }))} className={inputCls}>
            <option value="">Select…</option>
            {["New","Good","Fair","Poor"].map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Notes" optional>
        <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
          className={inputCls} rows={3} placeholder="Serial number, location, additional details…" />
      </Field>
      <FormStatus state={state} errMsg={errMsg} />
      <SaveButton state={state} label="Save Asset" />
    </form>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function DataEntryTab() {
  const [events, setEvents] = useState<BuefEvent[]>([]);

  useEffect(() => {
    fetch("/api/admin/events")
      .then(r => r.json())
      .then(d => setEvents(Array.isArray(d) ? d : []));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-dark">Data Entry</h2>
          <p className="text-mid text-sm mt-0.5">Log operational records — saved straight to the database.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormCard icon={<Users size={18} />} title="Log Event Attendance">
          <EventAttendanceForm events={events} />
        </FormCard>

        <FormCard icon={<Banknote size={18} />} title="Log Grant / Donation Received">
          <GrantForm />
        </FormCard>

        <FormCard icon={<Heart size={18} />} title="Log Beneficiary Supported">
          <BeneficiaryForm />
        </FormCard>

        <FormCard icon={<Package size={18} />} title="Log Asset (Purchased / Donated)">
          <AssetForm />
        </FormCard>
      </div>
    </div>
  );
}
