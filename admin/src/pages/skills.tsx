import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit2, Trash2, X, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const skillSchema = z.object({
  name: z.string().min(1, "Name required"),
  level: z.number().min(0).max(100),
  category: z.string().min(1, "Category required"),
});

type SkillFormValues = z.infer<typeof skillSchema>;

// ─── Static data ──────────────────────────────────────────────────────────────

const STATIC_SKILLS: Skill[] = [
  { id: "1",  name: "React",       level: 92, category: "Frontend" },
  { id: "2",  name: "TypeScript",  level: 88, category: "Frontend" },
  { id: "3",  name: "TailwindCSS", level: 85, category: "Frontend" },
  { id: "4",  name: "Vite",        level: 78, category: "Frontend" },
  { id: "5",  name: "Node.js",     level: 82, category: "Backend"  },
  { id: "6",  name: "PostgreSQL",  level: 74, category: "Backend"  },
  { id: "7",  name: "Prisma",      level: 70, category: "Backend"  },
  { id: "8",  name: "Docker",      level: 65, category: "Tools"    },
  { id: "9",  name: "Git",         level: 90, category: "Tools"    },
  { id: "10", name: "Figma",       level: 60, category: "Design"   },
];

const EMPTY_FORM: SkillFormValues = { name: "", level: 50, category: "Frontend" };

// ─── Component ────────────────────────────────────────────────────────────────

export default function Skills() {
  const { toast } = useToast();

  const [skills, setSkills] = useState<Skill[]>(STATIC_SKILLS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: EMPTY_FORM,
  });

  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    form.reset({ name: skill.name, level: skill.level, category: skill.category });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    form.reset(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const onSubmit = (data: SkillFormValues) => {
    const payload: Skill = {
      id: editingId ?? crypto.randomUUID(),
      name: data.name,
      level: data.level,
      category: data.category,
    };

    setSaving(true);
    setTimeout(() => {
      if (editingId) {
        setSkills((prev) => prev.map((s) => (s.id === editingId ? payload : s)));
        toast({ title: "Success", description: "Skill updated" });
      } else {
        setSkills((prev) => [...prev, payload]);
        toast({ title: "Success", description: "Skill created" });
      }
      setSaving(false);
      setIsModalOpen(false);
    }, 400);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this skill?")) return;
    setSkills((prev) => prev.filter((s) => s.id !== id));
    toast({ title: "Skill deleted" });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Skills</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage your technical proficiencies.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 shrink-0"
        >
          <Plus size={18} /> Add Skill
        </button>
      </div>

      {/* Content */}
      {Object.keys(groupedSkills).length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-border rounded-2xl">
          <Code2 size={40} className="mx-auto text-muted-foreground mb-3 opacity-50" />
          <p className="text-muted-foreground font-medium">No skills mapped yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5"
            >
              <h2 className="text-xl font-display font-bold text-primary mb-6 border-b border-border pb-3 uppercase tracking-wider">
                {category}
              </h2>
              <div className="space-y-6">
                {[...items].sort((a, b) => b.level - a.level).map((skill) => (
                  <div key={skill.id} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(skill)}
                            className="p-1 text-muted-foreground hover:text-primary"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(skill.id)}
                            className="p-1 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-500 to-primary rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] opacity-50" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-card-border rounded-2xl w-full max-w-md z-10 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/30">
                <h2 className="font-display font-bold text-xl">{editingId ? "Edit Skill" : "New Skill"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <form id="skill-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skill Name</label>
                    <input
                      {...form.register("name")}
                      placeholder="e.g. React, Node.js"
                      className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    {form.formState.errors.name && (
                      <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex justify-between">
                      <span>Proficiency Level</span>
                      <span className="font-mono text-primary">{form.watch("level")}%</span>
                    </label>
                    <input
                      type="range"
                      {...form.register("level")}
                      min="0"
                      max="100"
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
                    <input
                      {...form.register("category")}
                      list="categories"
                      placeholder="Frontend, Backend, Tools..."
                      className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    <datalist id="categories">
                      <option value="Frontend" />
                      <option value="Backend" />
                      <option value="Tools" />
                      <option value="Design" />
                    </datalist>
                    {form.formState.errors.category && (
                      <p className="text-destructive text-xs">{form.formState.errors.category.message}</p>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-border bg-secondary/30 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium hover:bg-secondary rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="skill-form"
                  disabled={saving}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}