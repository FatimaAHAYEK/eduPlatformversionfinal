import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Bot, Users, Eye, Ear, Hand, ArrowRight, Sparkles, Target, BarChart3, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 gradient-hero opacity-[0.07] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Plateforme de Pédagogie Différenciée
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            Chaque élève est{" "}
            <span className="text-gradient">unique</span>,{" "}
            <br className="hidden md:block" />
            son apprentissage aussi.
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            EduPlatform identifie le style d'apprentissage de chaque élève et aide les enseignants
            à adapter leurs cours grâce à l'intelligence artificielle.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/test">
              <Button size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-8 py-6 rounded-xl shadow-elevated hover:opacity-90 transition-opacity">
                <BookOpen className="w-5 h-5 mr-2" />
                Passer le Test Élève
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="font-bold text-base px-8 py-6 rounded-xl border-2">
                <GraduationCap className="w-5 h-5 mr-2" />
                Espace Professeur
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Qu'est-ce que la pédagogie différenciée ? */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Qu'est-ce que la <span className="text-gradient">pédagogie différenciée</span> ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              C'est une approche qui adapte l'enseignement aux besoins, au rythme et au style
              d'apprentissage de chaque élève, pour que tous puissent progresser à leur manière.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, color: "bg-primary/15 text-primary", title: "Visuel", desc: "Apprend mieux avec des images, schémas, vidéos et cartes mentales." },
              { icon: Ear, color: "bg-secondary/15 text-secondary", title: "Auditif", desc: "Retient l'information à travers l'écoute, les discussions et les enregistrements." },
              { icon: Hand, color: "bg-accent/15 text-accent-foreground", title: "Kinesthésique", desc: "Comprend en manipulant, expérimentant et pratiquant directement." },
            ].map((style, i) => (
              <motion.div key={style.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i}
                className="rounded-2xl bg-card border border-border/50 p-8 shadow-card text-center hover:shadow-elevated transition-shadow duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${style.color} flex items-center justify-center mx-auto mb-5`}>
                  <style.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{style.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{style.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-primary/[0.03] pointer-events-none" />
        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-muted-foreground text-lg">Un processus simple en 3 étapes</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: BookOpen, title: "L'élève passe le test", desc: "Un quiz interactif évalue les connaissances et identifie le style d'apprentissage dominant." },
              { step: "02", icon: BarChart3, title: "Le professeur consulte", desc: "Un tableau de bord affiche en temps réel les scores et profils de tous les élèves." },
              { step: "03", icon: Brain, title: "L'IA propose", desc: "Des activités personnalisées et des groupes optimisés sont générés automatiquement." },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="relative"
              >
                <span className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2 font-display">{item.step}</span>
                <div className="relative pt-10 pl-2">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fonctionnalités clés</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Target, title: "Diagnostic précis", desc: "Questions techniques et de style d'apprentissage pour un profil complet." },
              { icon: Users, title: "Groupes intelligents", desc: "Constitution automatique de groupes selon le niveau et le style." },
              { icon: Bot, title: "Assistant IA", desc: "Suggestions d'activités personnalisées pour chaque profil d'élève." },
              { icon: Sparkles, title: "Interface interactive", desc: "Feedback visuel instantané, animations fluides et design moderne." },
            ].map((feat, i) => (
              <motion.div key={feat.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i}
                className="flex gap-5 items-start p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl gradient-secondary flex items-center justify-center">
                  <feat.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{feat.title}</h3>
                  <p className="text-muted-foreground text-sm">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={0}
            className="rounded-3xl gradient-primary p-10 md:p-14 text-center text-primary-foreground shadow-elevated"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à différencier ?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Commencez dès maintenant : faites passer le test à vos élèves et découvrez
              leurs profils d'apprentissage.
            </p>
            <Link to="/test">
              <Button size="lg" className="bg-card text-foreground font-bold text-base px-8 py-6 rounded-xl hover:bg-card/90 transition-colors">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
