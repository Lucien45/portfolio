import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Plus, Pencil, Trash2, X, Save, MapPin, Calendar, Building2, Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ExpType = "fulltime" | "parttime" | "freelance" | "internship";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  tags: string[];
  location: string;
  type: ExpType;
}

interface ExperienceForm {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  tags: string;
  location: string;
  type: ExpType;
}

const EMPTY_FORM: ExperienceForm = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  tags: "",
  location: "",
  type: "fulltime",
};

const TYPE_LABELS: Record<ExpType, string> = {
  fulltime: "Full-time",
  parttime: "Part-time",
  freelance: "Freelance",
  internship: "Internship",
};

const TYPE_COLORS: Record<ExpType, string> = {
  fulltime: "bg-green-500/10 text-green-400 border-green-500/20",
  parttime: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  freelance: "bg-primary/10 text-primary border-primary/20",
  internship: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const STATIC_EXPERIENCES: Experience[] = [
  {
    id: "1",
    company: "Anthropic",
    role: "Senior Frontend Developer",
    startDate: "2023-01",
    endDate: null,
    current: true,
    description: "Building internal tooling and user-facing interfaces for AI products.",
    tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
    location: "Remote",
    type: "fulltime",
  },
  {
    id: "2",
    company: "Freelance",
    role: "Full-Stack Developer",
    startDate: "2021-06",
    endDate: "2022-12",
    current: false,
    description: "Delivered web apps for various clients across e-commerce and SaaS sectors.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    location: "Paris, France",
    type: "freelance",
  },
  {
    id: "3",
    company: "Acme Corp",
    role: "Frontend Intern",
    startDate: "2020-03",
    endDate: "2020-08",
    current: false,
    description: "Worked on the design system and component library.",
    tags: ["React", "Storybook", "SCSS"],
    location: "Lyon, France",
    type: "internship",
  },
];

function formatDate(str: string): string {
  if (!str) return "";
  const d = new Date(str + "-01");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function duration(start: string, end: string | null, current: boolean): string {
  const s = new Date(start + "-01");
  const e = current || !end ? new Date() : new Date(end + "-01");
  const months = (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth();
  if (months < 12) return `${months} mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y} yr ${m} mo` : `${y} yr`;
}

export default function Experience() {
  const { toast } = useToast();

  const [experiences, setExperiences] = useState<Experience[]>(STATIC_EXPERIENCES);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ExperienceForm>(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (exp: Experience) => {
    setEditId(exp.id);
    setForm({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate ?? "",
      current: exp.current,
      description: exp.description,
      tags: exp.tags.join(", "),
      location: exp.location,
      type: exp.type,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.company || !form.role || !form.startDate) {
      toast({ title: "Missing fields", description: "Company, role and start date are required.", variant: "destructive" });
      return;
    }

    const payload: Experience = {
      id: editId ?? crypto.randomUUID(),
      company: form.company,
      role: form.role,
      startDate: form.startDate,
      endDate: form.current ? null : form.endDate || null,
      current: form.current,
      description: form.description,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      location: form.location,
      type: form.type,
    };

    setSaving(true);
    setTimeout(() => {
      if (editId) {
        setExperiences((prev) => prev.map((e) => (e.id === editId ? payload : e)));
        toast({ title: "Experience updated!" });
      } else {
        setExperiences((prev) => [payload, ...prev]);
        toast({ title: "Experience added!" });
      }
      setSaving(false);
      setShowModal(false);
    }, 400);
  };

  const handleDelete = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Experience deleted." });
    setDeleteId(null);
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Experience</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Manage your professional journey — {experiences.length} position{experiences.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 text-sm"
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>

      {/* Timeline */}
      {experiences.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Briefcase size={28} className="text-primary" />
          </div>
          <h3 className="font-display font-bold text-xl text-foreground mb-2">No experiences yet</h3>
          <p className="text-muted-foreground text-sm mb-6">Add your professional history to showcase your career.</p>
          <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm">
            <Plus size={16} /> Add first experience
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-transparent hidden md:block" />
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="relative md:pl-16 group"
              >
                <div className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-primary bg-background hidden md:flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>

                <div className="bg-card border border-card-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary font-display font-bold text-lg">
                        {exp.company.charAt(0)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-display font-bold text-lg text-foreground leading-tight">{exp.role}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${TYPE_COLORS[exp.type]}`}>
                            {TYPE_LABELS[exp.type]}
                          </span>
                          {exp.current && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                              Current
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-primary font-semibold text-sm mb-3">
                          <Building2 size={13} />
                          <span>{exp.company}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate ?? "")}
                            {" "}· {duration(exp.startDate, exp.endDate, exp.current)}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {exp.location}
                            </span>
                          )}
                        </div>

                        {exp.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{exp.description}</p>
                        )}

                        {exp.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {exp.tags.map((tag) => (
                              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-lg border border-primary/10">
                                <Tag size={10} />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => openEdit(exp)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(exp.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="bg-card border border-card-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-display font-bold text-foreground">
                  {editId ? "Edit Experience" : "Add Experience"}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company *</label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Job Title *</label>
                    <input
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      placeholder="Senior Frontend Developer"
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value as ExpType })}
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Location</label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="Paris, France"
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Start Date *</label>
                    <input
                      type="month"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">End Date</label>
                    <input
                      type="month"
                      value={form.endDate}
                      disabled={form.current}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-40"
                    />
                  </div>

                  <div className="col-span-2 flex items-center gap-3">
                    <label className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors bg-muted">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={form.current}
                        onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? "" : form.endDate })}
                      />
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${form.current ? "translate-x-4" : "translate-x-0.5"}`} />
                      {form.current && <span className="absolute inset-0 rounded-full bg-primary" style={{ zIndex: -1 }} />}
                    </label>
                    <span className="text-sm text-foreground">Currently working here</span>
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      placeholder="Describe your responsibilities and achievements..."
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tech Stack (comma-separated)</label>
                    <input
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      placeholder="React, TypeScript, Node.js"
                      className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 pb-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 text-sm disabled:opacity-60"
                >
                  <Save size={16} />
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-card border border-card-border rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-destructive" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Delete Experience</h3>
              <p className="text-muted-foreground text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}