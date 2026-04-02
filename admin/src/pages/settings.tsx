import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bell, Shield, Monitor, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ─── Schema ───────────────────────────────────────────────────────────────────

const settingsSchema = z.object({
  emailNotifications: z.boolean(),
  messageAlerts: z.boolean(),
  projectUpdates: z.boolean(),
  profilePublic: z.boolean(),
  showEmail: z.boolean(),
  showPhone: z.boolean(),
  darkMode: z.boolean(),
  compactSidebar: z.boolean(),
  language: z.string(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

// ─── Static defaults ──────────────────────────────────────────────────────────

const STATIC_SETTINGS: SettingsFormValues = {
  emailNotifications: true,
  messageAlerts: true,
  projectUpdates: false,
  profilePublic: true,
  showEmail: false,
  showPhone: false,
  darkMode: true,
  compactSidebar: false,
  language: "en",
};

// ─── Sub-component ────────────────────────────────────────────────────────────

interface ToggleRowProps {
  name: keyof SettingsFormValues;
  title: string;
  desc: string;
  form: ReturnType<typeof useForm<SettingsFormValues>>;
}

function ToggleRow({ name, title, desc, form }: ToggleRowProps) {
  const value = form.watch(name);
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="pr-4">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <label className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${value ? "bg-primary" : "bg-muted"}`}>
        <input type="checkbox" className="sr-only" {...form.register(name)} />
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
      </label>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Settings() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: STATIC_SETTINGS,
  });

  const onSubmit = (data: SettingsFormValues) => {
    setIsPending(true);
    setTimeout(() => {
      console.log("Settings saved:", data);
      setIsPending(false);
      toast({ title: "Settings saved successfully" });
    }, 400);
  };

  const toggleProps = { form } as const;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Preferences</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Customize your admin experience and site behavior.</p>
        </div>
        <button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {isPending
            ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            : <Save size={18} />}
          Save Settings
        </button>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
          <h3 className="text-lg font-display font-bold mb-2 flex items-center gap-2">
            <Bell size={20} className="text-primary" /> Notifications
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Manage how and when you receive alerts.</p>
          <div className="space-y-1">
            <ToggleRow {...toggleProps} name="emailNotifications" title="Email Summaries"    desc="Receive daily summaries of portfolio activity." />
            <ToggleRow {...toggleProps} name="messageAlerts"      title="New Message Alerts" desc="Instant email when someone contacts you." />
            <ToggleRow {...toggleProps} name="projectUpdates"     title="Project Reminders"  desc="Reminders to update 'building' status projects." />
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
          <h3 className="text-lg font-display font-bold mb-2 flex items-center gap-2">
            <Shield size={20} className="text-primary" /> Privacy & Visibility
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Control what information is visible to the public.</p>
          <div className="space-y-1">
            <ToggleRow {...toggleProps} name="profilePublic" title="Public Profile"    desc="Make your portfolio visible to search engines." />
            <ToggleRow {...toggleProps} name="showEmail"     title="Show Email Address" desc="Display raw email instead of just a contact form." />
            <ToggleRow {...toggleProps} name="showPhone"     title="Show Phone Number"  desc="Display your phone number publicly." />
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
          <h3 className="text-lg font-display font-bold mb-2 flex items-center gap-2">
            <Monitor size={20} className="text-primary" /> Appearance
          </h3>
          <p className="text-sm text-muted-foreground mb-6">Customize the admin interface.</p>
          <div className="space-y-1">
            <ToggleRow {...toggleProps} name="darkMode"       title="Dark Mode Default" desc="Enforce dark mode (required for this premium theme)." />
            <ToggleRow {...toggleProps} name="compactSidebar" title="Compact Sidebar"   desc="Start with sidebar collapsed by default." />
          </div>
        </div>
      </div>
    </div>
  );
}