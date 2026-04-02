import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, User, MapPin, Link as LinkIcon, Mail, Phone, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schema — replace z.coerce.number() with z.number()
const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  title: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  available: z.boolean(),
  yearsOfExperience: z.number().min(0),
  projectsCompleted: z.number().min(0),
  clientsSatisfied: z.number().min(0),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const staticProfile: ProfileFormValues = {
  name: "Savaka Lucien",
  email: "savakalucien@gmail.com",
  phone: "+1 234 567 890",
  title: "Full-Stack Developer",
  location: "Paris, France",
  bio: "Passionate developer building modern web apps with React and Node.js.",
  website: "https://alexmartin.dev",
  github: "Lucien45",
  linkedin: "alexmartin",
  twitter: "@alexmartin",
  available: true,
  yearsOfExperience: 5,
  projectsCompleted: 32,
  clientsSatisfied: 98,
};

export default function Profile() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: staticProfile,
  });

  useEffect(() => {
    form.reset(staticProfile);
  }, [form]);

  const onSubmit = (data: ProfileFormValues) => {
    setIsPending(true);
    setTimeout(() => {
      console.log("Saved:", data);
      setIsPending(false);
      toast({ title: "Profile updated successfully", description: "Your changes have been saved." });
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage your public persona and contact details.</p>
        </div>
        <button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {isPending
            ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"/>
            : <Save size={18} />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5 text-center flex flex-col items-center">
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-primary/30 relative">
                <img src={`${import.meta.env.BASE_URL}images/avatar.png`} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-semibold text-white">Change</span>
                </div>
              </div>
              <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-card ${form.watch('available') ? 'bg-emerald-500' : 'bg-gray-500'}`} />
            </div>

            <h3 className="font-display font-bold text-xl">{form.watch('name') || 'Your Name'}</h3>
            <p className="text-primary text-sm font-medium">{form.watch('title') || 'Developer'}</p>

            <div className="w-full mt-6 pt-6 border-t border-border flex justify-between px-4">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold">{form.watch('yearsOfExperience')}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Years Exp</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-mono font-bold">{form.watch('projectsCompleted')}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Availability Status</h4>
            <label className="flex items-center justify-between cursor-pointer p-3 border border-border rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="flex flex-col">
                <span className="font-medium text-sm">Available for work</span>
                <span className="text-xs text-muted-foreground">Show open to opportunities badge</span>
              </div>
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.watch('available') ? 'bg-primary' : 'bg-muted'}`}>
                <input type="checkbox" className="sr-only" {...form.register('available')} />
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.watch('available') ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
            </label>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-primary" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                <input {...form.register("name")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                {form.formState.errors.name && <p className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Professional Title</label>
                <input {...form.register("title")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bio</label>
                <textarea {...form.register("bio")} rows={4} className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" placeholder="A short description about yourself..." />
              </div>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
              <Mail size={20} className="text-primary" /> Contact & Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Mail size={12}/> Email</label>
                <input {...form.register("email")} type="email" className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                {form.formState.errors.email && <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Phone size={12}/> Phone</label>
                <input {...form.register("phone")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><MapPin size={12}/> Location</label>
                <input {...form.register("location")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><LinkIcon size={12}/> Website</label>
                <input {...form.register("website")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">GitHub</label>
                <input {...form.register("github")} placeholder="username" className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">LinkedIn</label>
                <input {...form.register("linkedin")} placeholder="username" className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Twitter</label>
                <input {...form.register("twitter")} placeholder="@username" className="w-full bg-background border border-input rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-primary" /> Statistics Overrides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Years Exp.</label>
                <input type="number" {...form.register("yearsOfExperience")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</label>
                <input type="number" {...form.register("projectsCompleted")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clients (%)</label>
                <input type="number" {...form.register("clientsSatisfied")} className="w-full bg-background border border-input rounded-xl px-4 py-2.5 font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}