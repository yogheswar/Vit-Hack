import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, BarChart3, Shield, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SolarLogo } from "@/components/SolarLogo";
import { ImageSequence } from "@/components/ImageSequence";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const wordAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    }
  }
};

const Index = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const isSunRayActive = currentFrame >= 70 && currentFrame <= 130;

  return (
    <div className="min-h-screen bg-background overflow-hidden font-sans">
      {/* Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent"
      >
        <SolarLogo size="md" />
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              size="lg"
              className={`transition-all duration-500 px-6 border bg-black shadow-lg ${isSunRayActive
                  ? "text-white border-white/40 shadow-white/10"
                  : "text-emerald-400 border-emerald-500/30 shadow-emerald-500/5"
                } active:bg-emerald-500 active:text-white active:border-transparent`}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="solar" size="lg" className="shadow-glow">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex flex-col items-start justify-center overflow-hidden">
        {/* Background Image Sequence & Overlay */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <ImageSequence
            totalFrames={192}
            frameRate={24}
            className="opacity-100 w-full h-full object-cover object-top"
            onFrameChange={setCurrentFrame}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-8 flex flex-col items-start text-left pt-32 pb-48">
          <motion.div
            className="max-w-4xl flex flex-col items-start"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-8 border border-white/5 backdrop-blur-sm"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]" />
              <span className="text-sm font-medium text-foreground/80 tracking-wide uppercase">Intelligent Solar Monitoring</span>
            </motion.div>

            {/* Main Heading with Word Reveal */}
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight text-left"
            >
              <span className="sr-only">Maximize your solar energy potential</span>
              <span className="inline-block overflow-hidden mr-3">
                <motion.span variants={wordAnimation} className="inline-block">Maximize</motion.span>
              </span>
              <span className="inline-block overflow-hidden mr-3">
                <motion.span variants={wordAnimation} className="inline-block">your</motion.span>
              </span>
              <span className="inline-block overflow-hidden mr-3">
                <motion.span variants={wordAnimation} className="inline-block text-gradient-solar drop-shadow-sm">solar</motion.span>
              </span>
              <span className="inline-block overflow-hidden mr-3">
                <motion.span variants={wordAnimation} className="inline-block text-gradient-solar drop-shadow-sm">energy</motion.span>
              </span>
              <span className="inline-block overflow-hidden">
                <motion.span variants={wordAnimation} className="inline-block">potential</motion.span>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              Real-time monitoring, AI-powered optimization, and actionable insights
              to help you get the most from your solar investment.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-start"
            >
              <Link to="/signup">
                <Button variant="solar" size="xl" className="h-14 px-8 text-lg shadow-glow hover:scale-105 transition-transform duration-300">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="glass" size="xl" className="h-14 px-8 text-lg hover:bg-white/10 border-white/10 hover:scale-105 transition-transform duration-300">
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid at the bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-0 left-0 w-full max-w-[1200px] px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8 lg:p-10 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
            {[
              { value: "50K+", label: "Active Users" },
              { value: "2.4GW", label: "Energy Monitored" },
              { value: "$12M+", label: "Saved Monthly" },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="font-display text-3xl md:text-4xl font-bold text-emerald-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-background/50">
        <div className="container mx-auto px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              Everything you need to optimize
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to help you understand and maximize your solar system's performance.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Real-time Monitoring",
                description: "Track your energy production and consumption live with instant updates.",
                variant: "primary" as const,
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description: "AI-powered insights to help you understand patterns and optimize usage.",
                variant: "default" as const,
              },
              {
                icon: Sun,
                title: "Panel Health",
                description: "Monitor individual panel performance and get maintenance alerts.",
                variant: "accent" as const,
              },
              {
                icon: Shield,
                title: "Savings Tracking",
                description: "See exactly how much you're saving and your environmental impact.",
                variant: "default" as const,
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 group cursor-pointer border border-white/5"
              >
                <div
                  className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${feature.variant === "primary"
                    ? "gradient-solar shadow-glow"
                    : feature.variant === "accent"
                      ? "gradient-sun shadow-sun"
                      : "bg-secondary text-foreground"
                    }`}
                >
                  <feature.icon
                    className={`h-7 w-7 ${feature.variant === "primary"
                      ? "text-primary-foreground"
                      : feature.variant === "accent"
                        ? "text-accent-foreground"
                        : "text-foreground"
                      }`}
                  />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />

        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to optimize your solar?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                Join thousands of homeowners already saving with SolarFlow's intelligent monitoring.
              </p>
              <Link to="/signup">
                <Button variant="solar" size="xl" className="h-14 px-10 text-lg shadow-glow hover:scale-105 transition-transform duration-300">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <SolarLogo size="sm" />
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 SolarFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
