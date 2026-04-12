import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-auto">
    <div className="container flex items-center justify-between h-14 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-primary" />
        <span className="font-display font-semibold">EduPlatform</span>
      </div>
      <p>© 2026 — Plateforme éducative interactive</p>
    </div>
  </footer>
);

export default Footer;
