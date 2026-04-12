import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Bot } from "lucide-react";

const navItems = [
  { path: "/", label: "Accueil", icon: BookOpen },
  { path: "/test", label: "Test Élève", icon: BookOpen },
  { path: "/dashboard", label: "Dashboard", icon: GraduationCap },
  { path: "/ai-assistant", label: "AI Assistant", icon: Bot },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/50 bg-card/80">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-gradient">EduPlatform</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className="relative">
                <motion.div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-2 right-2 h-0.5 gradient-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
