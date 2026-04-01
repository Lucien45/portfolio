import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus, Edit2, Trash2, ExternalLink, GitBranch, Star, FolderGit2, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectStatus = "live" | "building" | "archived";
type FilterValue = "all" | ProjectStatus;

interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  featured: boolean;
  url: string;
  github: string;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const projectSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().optional(),
  status: z.enum(["live", "building", "archived"]),
  tags: z.string(),
  featured: z.boolean(),
  url: z.string().optional(),
  github: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

// ─── Static data ──────────────────────────────────────────────────────────────

const STATIC_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Portfolio Admin",
    description: "A full-featured admin dashboard to manage portfolio content including projects, skills, and experiences.",
    status: "live",
    tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
    featured: true,
    url: "https://portfolio.example.com",
    github: "https://github.com/example/portfolio-admin",
  },
  {
    id: "2",
    title: "E-Commerce API",
    description: "REST API for an e-commerce platform with authentication, product management, and orders.",
    status: "live",
    tags: ["Node.js", "PostgreSQL", "Express", "JWT"],
    featured: false,
    url: "",
    github: "https://github.com/example/ecommerce-api",
  },
  {
    id: "3",
    title: "AI Chat App",
    description: "Real-time chat application powered by LLMs with streaming responses and conversation history.",
    status: "building",
    tags: ["Next.js", "OpenAI", "Prisma", "WebSockets"],
    featured: true,
    url: "",
    github: "",
  },
  {
    id: "4",
    title: "Design System",
    description: "Component library and design tokens for internal projects, built with Storybook.",
    status: "archived",
    tags: ["React", "Storybook", "SCSS"],
    featured: false,
    url: "",
    github: "https://github.com/example/design-system",
  },
];

const EMPTY_FORM: ProjectFormValues = {
  title: "",
  description: "",
  status: "live",
  tags: "",
  featured: false,
  url: "",
  github: "",
};

const STATUS_STYLES: Record<ProjectStatus, string> = {
  live: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  building: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  archived: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Projects() {
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: EMPTY_FORM,
  });

  const filteredProjects = projects.filter((p) =>
    filter === "all" ? true : p.status === filter
  );

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    form.reset({
      title: project.title,
      description: project.description,
      status: project.status,
      tags: project.tags.join(", "),
      featured: project.featured,
      url: project.url,
      github: project.github,
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    form.reset(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const onSubmit = (data: ProjectFormValues) => {
    const payload: Project = {
      id: editingId ?? crypto.randomUUID(),
      title: data.title,
      description: data.description ?? "",
      status: data.status,
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      featured: data.featured,
      url: data.url ?? "",
      github: data.github ?? "",
    };

    setSaving(true);
    setTimeout(() => {
      if (editingId) {
        setProjects((prev) => prev.map((p) => (p.id === editingId ? payload : p)));
        toast({ title: "Success", description: "Project updated" });
      } else {
        setProjects((prev) => [payload, ...prev]);
        toast({ title: "Success", description: "Project created" });
      }
      setSaving(false);
      setIsModalOpen(false);
    }, 400);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Project deleted" });
  };

  const FILTERS: FilterValue[] = ["all", "live", "building", "archived"];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage your portfolio showcase.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 shrink-0"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex p-1 bg-secondary rounded-xl w-fit border border-border">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${
              filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-lg shadow-black/5 flex flex-col group hover:border-primary/40 transition-colors"
            >
              <div className="h-32 bg-secondary/50 border-b border-border flex items-center justify-center relative overflow-hidden">
                <FolderGit2 size={40} className="text-muted-foreground/30 group-hover:scale-110 transition-transform duration-500" />
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-amber-500/20 p-1.5 rounded-full backdrop-blur-sm border border-amber-500/30">
                    <Star size={14} className="fill-amber-500 text-amber-500" />
                  </div>
                )}
                <div className={`absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${STATUS_STYLES[project.status]}`}>
                  {project.status}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-lg text-foreground mb-1 line-clamp-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-secondary text-secondary-foreground rounded-md border border-border">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] px-2 py-1 bg-secondary text-secondary-foreground rounded-md border border-border">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <GitBranch size={16} />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(project)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-2xl">
            <FolderGit2 size={40} className="mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground font-medium">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-card-border rounded-2xl w-full max-w-xl z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/30">
                <h2 className="font-display font-bold text-xl">{editingId ? "Edit Project" : "New Project"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <form id="project-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title *</label>
                      <input {...form.register("title")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                      {form.formState.errors.title && (
                        <p className="text-destructive text-xs">{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
                      <textarea {...form.register("description")} rows={3} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
                      <select {...form.register("status")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                        <option value="live">Live</option>
                        <option value="building">Building</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tags (comma separated)</label>
                      <input {...form.register("tags")} placeholder="React, Node, etc." className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live URL</label>
                      <input {...form.register("url")} placeholder="https://" className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">GitHub Repo</label>
                      <input {...form.register("github")} placeholder="https://github.com/..." className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>

                    <div className="space-y-1.5 md:col-span-2 flex items-center gap-3 p-3 border border-border rounded-xl mt-2">
                      <input
                        type="checkbox"
                        {...form.register("featured")}
                        id="featured"
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="featured" className="text-sm font-medium cursor-pointer select-none">
                        Feature this project on dashboard
                      </label>
                    </div>
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
                  form="project-form"
                  disabled={saving}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}