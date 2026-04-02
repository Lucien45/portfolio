import { Eye, Heart, Briefcase, MessageSquare, TrendingUp, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = {
  totalViews: 12480, viewsGrowth: 14,
  totalLikes: 843, likesGrowth: 8,
  liveProjects: 6,
  unreadMessages: 3,
};

const projects = [
  { id: 1, title: "Portfolio Website", description: "Personal portfolio with admin panel", status: "live", featured: true },
  { id: 2, title: "E-Commerce App", description: "Full-stack shopping platform", status: "live", featured: false },
  { id: 3, title: "AI Dashboard", description: "Analytics dashboard with ML insights", status: "building", featured: true },
  { id: 4, title: "Mobile App", description: "React Native cross-platform app", status: "archived", featured: false },
];

const skills = [
  { id: 1, name: "React / TypeScript", level: 92 },
  { id: 2, name: "Node.js / Express", level: 85 },
  { id: 3, name: "PostgreSQL", level: 78 },
  { id: 4, name: "Tailwind CSS", level: 95 },
  { id: 5, name: "Docker", level: 70 },
];

const messages = [
  { id: 1, senderName: "Alice Martin", subject: "Job opportunity", body: "Hi, I have an exciting opportunity for you!", read: false, createdAt: new Date().toISOString() },
  { id: 2, senderName: "Bob Chen", subject: "Project collaboration", body: "Would you be interested in collaborating?", read: false, createdAt: new Date().toISOString() },
  { id: 3, senderName: "Sarah Dupont", subject: "Feedback on portfolio", body: "Your work is amazing, loved the design!", read: true, createdAt: new Date().toISOString() },
  { id: 4, senderName: "Tom Wilson", subject: "Freelance mission", body: "We are looking for a React developer.", read: false, createdAt: new Date().toISOString() },
];

const chartData = [
  { name: "Mon", views: 400 }, { name: "Tue", views: 300 }, { name: "Wed", views: 550 },
  { name: "Thu", views: 200 }, { name: "Fri", views: 700 }, { name: "Sat", views: 800 }, { name: "Sun", views: 650 },
];

export default function Dashboard() {
  const statCards = [
    { title: "Total Views", value: stats.totalViews, icon: Eye, growth: stats.viewsGrowth, suffix: "this month" },
    { title: "Total Likes", value: stats.totalLikes, icon: Heart, growth: stats.likesGrowth, suffix: "this month" },
    { title: "Live Projects", value: stats.liveProjects, icon: Briefcase, growth: 0, suffix: "currently active" },
    { title: "Unread Messages", value: stats.unreadMessages, icon: MessageSquare, growth: 0, suffix: "waiting reply" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">Welcome back to your portfolio command center.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-card border border-card-border rounded-2xl p-5 shadow-lg shadow-black/5 hover:border-primary/30 hover:shadow-primary/5 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <stat.icon size={22} />
              </div>
              {stat.growth > 0 && (
                <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md text-xs font-semibold">
                  <TrendingUp size={12} />
                  +{stat.growth}%
                </div>
              )}
            </div>
            <h3 className="text-muted-foreground text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-mono font-bold text-foreground mt-1">{stat.value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2 opacity-70">{stat.suffix}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
          <h2 className="text-lg font-display font-bold mb-6">Traffic Overview</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" tick={{ fill: "#888", fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" tick={{ fill: "#888", fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "#222" }}
                  contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "8px", color: "#fff" }}
                  itemStyle={{ color: "#F59E0B" }}
                />
                <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display font-bold">Top Skills</h2>
            <Link href="/skills" className="text-xs text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-5 flex-1">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className="font-mono text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display font-bold">Recent Projects</h2>
            <Link href="/projects" className="text-xs text-primary hover:underline flex items-center gap-1">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Briefcase size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                      {project.title}
                      {project.featured && <Star size={12} className="fill-primary text-primary" />}
                    </h4>
                    <span className="text-xs text-muted-foreground block truncate max-w-[200px]">{project.description}</span>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  project.status === "live" ? "bg-emerald-500/10 text-emerald-500" :
                  project.status === "building" ? "bg-amber-500/10 text-amber-500" :
                  "bg-gray-500/10 text-gray-500"
                }`}>
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg shadow-black/5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display font-bold">Recent Messages</h2>
            <Link href="/messages" className="text-xs text-primary hover:underline flex items-center gap-1">
              Inbox <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border relative">
                {!msg.read && (
                  <div className="absolute top-4 left-3 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                )}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shrink-0 ml-4 text-xs font-bold font-display">
                  {msg.senderName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className={`font-medium text-sm truncate ${!msg.read ? "text-foreground" : "text-foreground/80"}`}>{msg.senderName}</h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-xs truncate mb-1 ${!msg.read ? "font-medium text-foreground/90" : "text-muted-foreground"}`}>{msg.subject}</p>
                  <p className="text-xs text-muted-foreground/60 line-clamp-1">{msg.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}