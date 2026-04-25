'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Search, 
  Rocket, 
  Eye, 
  Award, 
  DraftingCompass, 
  Terminal, 
  Share2, 
  Globe,
  Menu,
  X
} from 'lucide-react';

// Static Assets
import logoHero from '@/public/logo-hero.png';
// Using local path so the user can place their image here without crashing the build
const aboutUs = "/about-us.png";
import alphaImg from '@/public/alpha.png';
import betaImg from '@/public/beta.png';
import sigmaImg from '@/public/sigma.png';
import omegaImg from '@/public/omega.png';

const smoothScroll = (href: string) => {
  const el = document.querySelector(href);
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY - 80;
  const startY = window.scrollY;
  const diff = targetY - startY;
  const duration = 1000;
  let start: number | null = null;
  const ease = (t: number) => {
    const t1 = t - 1;
    return 1 + t1 * t1 * t1 * t1 * t1; // easeOutQuint
  };
  const step = (ts: number) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    window.scrollTo(0, startY + diff * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};  

// Framer Motion shared config
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre Nós', href: '#sobre-nos' },
    { name: 'Fraternidades', href: '#fraternidades' },
    { name: 'Parceiros', href: '#parceiros' },
  ];


  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-surface/85 backdrop-blur-md border-b border-white/10' : 'py-6'}`}>
        <div className="flex justify-between items-center px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-lg md:text-xl font-bold tracking-tighter text-white uppercase font-headline">
            DINNAMIKUS
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-headline text-[10px] lg:text-[11px] font-semibold tracking-[0.15em] uppercase">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                className="text-white/60 hover:text-white transition-colors relative group cursor-pointer" 
                href={link.href}
                onClick={(e) => { e.preventDefault(); smoothScroll(link.href); }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center bg-white/5 px-3 md:px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
              <Search className="text-white/30 w-3.5 h-3.5 sm:mr-2 group-hover:text-white/60 transition-colors" />
              <span className="hidden md:inline text-white/30 text-xs group-hover:text-white/60 transition-colors">Pesquisar...</span>
            </div>
            <button className="bg-secondary-container text-on-secondary px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold tracking-wider uppercase hover:scale-95 hover:shadow-[0_0_20px_rgba(255,106,0,0.4)] transition-all duration-300 cursor-pointer">
              Bilhetes
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu (Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-surface border-l border-white/10 z-[70] md:hidden flex flex-col p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-lg font-bold tracking-tighter text-white uppercase font-headline">MENU</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white p-2 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => smoothScroll(link.href), 300);
                    }}
                    className="text-2xl font-headline font-light text-white/60 hover:text-secondary-container transition-colors cursor-pointer"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-12 border-t border-white/5">
                <button className="w-full bg-secondary-container text-on-secondary py-4 rounded-2xl font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_20px_rgba(255,106,0,0.4)] transition-all duration-300">
                  Comprar Bilhetes
                </button>
                <p className="text-white/20 text-[10px] text-center mt-6 tracking-[0.2em] uppercase font-headline">
                  DINNAMIKUS © 2024
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-start overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuACnEJ-ZVXIJmncVPbG6n34Z4FQGRHQ6-VlL36BAnRdu3uZ53J4ItLoSom18-0qkTB1eZN1mSKztqJemvQKNR5er3zs8ZV3pJIZrvon1T3mnPP6dGfcDMYv6kJCfOZGfiteU-Nz0zz7H4boYqNJV3TTwr-ezr8AJ1FdSVapR_YaZCVOkeFnp97zP1oyigdm_TnF8iD8qLJTzSlyacn6IDeWv9XS4qZS4OoPw-Aeffz1cx_Y0cLphw2sld90HPEpn7lvRRempyEUfSyf"
          alt="University event crowd"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#160038] via-[#160038]/95 lg:via-[#160038]/90 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, ease }} className="flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
          <h1 className="font-headline font-light text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
            A nova cultura <br /> universitária <span className="text-secondary font-medium">começa aqui</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-on-surface-variant/80 max-w-xl leading-relaxed">
            Unimos estudantes, criamos fraternidades e construímos experiências que marcam gerações. O epicentro da vida académica em movimento.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
            <button className="flex-1 sm:flex-none bg-secondary-container text-on-secondary px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold text-xs md:text-sm tracking-wide uppercase hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all duration-300 cursor-pointer">
              Descobrir Fraternidades
            </button>
            <button className="flex-1 sm:flex-none bg-transparent text-white border border-white/20 px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold text-xs md:text-sm tracking-wide uppercase hover:bg-white/5 transition-all duration-300 cursor-pointer">
              Explorar Projetos
            </button>
          </div>
        </motion.div>

        {/* Floating Logo - Now visible on mobile but smaller */}
        <div className="flex justify-center items-center relative order-1 lg:order-2 animate-float">
          <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]">
            <Image
              src={logoHero}
              alt="Dinnamikus Logo"
              fill
              sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
              className="object-contain drop-shadow-[0_0_30px_rgba(255,106,0,0.2)]"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-secondary/10 blur-[60px] md:blur-[100px] rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-secondary-container" />,
      title: "Missão",
      description: "Elevar o padrão do entretenimento universitário através de infraestrutura premium e conceitos disruptivos."
    },
    {
      icon: <Eye className="w-6 h-6 text-secondary-container" />,
      title: "Visão",
      description: "Ser reconhecida como a marca que moldou a identidade social da elite estudantil contemporânea."
    },
    {
      icon: <Award className="w-6 h-6 text-secondary-container" />,
      title: "Valores",
      description: "Exclusividade, integridade institucional, vanguarda estética e excelência operacional."
    }
  ];

  return (
    <section id="sobre-nos" className="bg-white py-20 md:py-32 text-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        {/* Left Side: Content + Cards */}
        <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.7, ease }}>
            <h2 className="font-headline font-light text-3xl md:text-4xl tracking-tight text-surface mb-6">Quem Somos</h2>
            <div className="font-sans text-sm md:text-base text-surface/90 leading-relaxed space-y-4">
              <p>
                <span className="font-bold text-surface">A DINNAMIKUS EVENTOS</span> é a primeira produtora em Angola especializada, de forma exclusiva, no público estudantil universitário — o segmento mais jovem, influente e determinante nas tendências de consumo atuais e futuras.
              </p>
              <p>
                Num cenário onde a maioria dos eventos voltados para estudantes perdeu relevância, identidade e consistência, a DINNAMIKUS surge como uma resposta estruturada e estratégica: <span className="font-bold text-surface">não apenas organizar eventos, mas construir uma cultura universitária sólida, escalável e altamente conectada com marcas.</span>
              </p>
            </div>
          </motion.div>

          {/* Stacked Cards under text */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                transition={{ duration: 0.5, ease }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.25)' }}
                className="p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-100 group cursor-default"
              >
                <div className="mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="font-headline font-bold text-sm md:text-base mb-1 md:mb-2 text-surface">{feature.title}</h3>
                <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Visual Element */}
        <div className="lg:col-span-5 h-full min-h-[350px] md:min-h-[500px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight} transition={{ duration: 0.8, ease }} className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl group">
            <Image
              src={aboutUs}
              alt="Dinnamikus Team"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-surface/40 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Fraternities = () => {
  const fraternities = [
    { name: "Alpha", desc: "A linhagem dos líderes. Focada em networking executivo e estratégia.", symbol: "Α", image: alphaImg },
    { name: "Beta", desc: "A vanguarda criativa. Onde o design e a arte encontram a academia.", symbol: "Β", image: betaImg },
    { name: "Sigma", desc: "O núcleo tecnológico. Engenharia e inovação pura.", symbol: "Σ", image: sigmaImg },
    { name: "Omega", desc: "A nova ordem. Ousadia e quebra de paradigmas sociais.", symbol: "Ω", image: omegaImg }
  ];

  // Duplicate for seamless loop
  const duplicatedFraternities = [...fraternities, ...fraternities];

  return (
    <section id="fraternidades" className="bg-surface py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 mb-12 md:mb-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7, ease }} className="text-center">
          <h2 className="font-headline font-light text-2xl md:text-4xl mb-4 text-white">
            UMA FRATERNIDADE. <span className="text-secondary-container font-medium">Uma identidade.</span>
          </h2>
          <p className="text-white/40 text-xs md:text-sm max-w-md mx-auto">
            A elite universitária em movimento perpétuo. Explore as linhagens que definem a nossa cultura.
          </p>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex gap-4 md:gap-5 px-4 md:px-5 w-max animate-marquee-slow hover:[animation-play-state:paused]">
          {duplicatedFraternities.map((f, i) => (
            <div 
              key={i}
              className="min-w-[140px] md:min-w-[160px] group relative aspect-[3/4] bg-black rounded-xl overflow-hidden p-3 flex flex-col justify-between shadow-xl border border-white/5 hover:border-secondary-container/50 shrink-0"
            >
              <div className="absolute inset-0 z-0">
                <Image 
                  src={f.image} 
                  alt={f.name} 
                  fill 
                  sizes="160px"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-end">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-secondary-container font-black text-[10px] tracking-widest">{f.symbol}</span>
                    <div className="h-px flex-1 bg-white/10"></div>
                  </div>
                  <h4 className="font-headline font-bold text-sm mb-0.5 text-white drop-shadow-2xl">{f.name}</h4>
                  <p className="text-white/60 text-[8px] leading-tight font-medium drop-shadow-lg line-clamp-2">{f.desc}</p>
                  <div className="w-5 h-0.5 bg-secondary-container mt-2.5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-20"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-20"></div>
      </div>

      <div className="mt-16 flex justify-center px-8">
        <p className="font-headline text-lg italic text-on-surface/30 border-l-4 border-secondary-container/20 pl-6 py-2">
          Cada estudante pertence. Nem todos entram na lista.
        </p>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} transition={{ duration: 0.7, ease }} className="mb-12 md:mb-16">
          <h2 className="font-headline font-light text-2xl md:text-4xl text-surface mb-2">
            Muito além de eventos. <br /> <span className="text-secondary-container font-medium">Criamos experiências.</span>
          </h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
          {/* Featured: 1ªAULA */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} whileHover={{ y: -4, scale: 1.01 }} className="sm:col-span-2 md:col-span-8 bg-surface rounded-3xl overflow-hidden group relative min-h-[350px] md:min-h-[450px] shadow-2xl flex items-end cursor-default">
            <div className="p-6 md:p-10 relative z-10">
              <span className="micro-label bg-secondary-container text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full mb-3 md:mb-4 inline-block font-bold tracking-widest text-[10px]">Evento Principal</span>
              <h3 className="font-headline font-bold text-2xl md:text-4xl text-white mb-2 md:mb-3 tracking-tight">1ªAULA</h3>
              <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">O festival que abre o ano letivo. Onde o conhecimento dá lugar à celebração sensorial e conexões reais.</p>
            </div>
          </motion.div>
          
          {/* SALA#1 */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }} whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.2)' }} className="md:col-span-4 bg-slate-50 rounded-3xl p-8 md:p-10 flex flex-col justify-between group hover:bg-secondary-container transition-colors duration-300 shadow-sm cursor-default">
            <span className="font-headline font-bold text-5xl md:text-7xl text-surface/5 -ml-1 -mt-2 group-hover:text-white/10 transition-colors">01</span>
            <div>
              <h3 className="font-headline font-bold text-xl md:text-2xl text-surface group-hover:text-white mb-2">SALA#1</h3>
              <p className="text-slate-400 text-xs md:text-sm group-hover:text-white/80 leading-relaxed">Workshop imersivo de produção criativa e gestão de carreira universitária.</p>
            </div>
          </motion.div>

          {/* LAB#1 */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }} whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.2)' }} className="md:col-span-4 bg-slate-50 rounded-3xl p-8 md:p-10 flex flex-col justify-between group hover:bg-surface transition-colors duration-300 shadow-sm cursor-default">
            <span className="font-headline font-bold text-5xl md:text-7xl text-surface/5 -ml-1 -mt-2 group-hover:text-white/10 transition-colors">02</span>
            <div>
              <h3 className="font-headline font-bold text-xl md:text-2xl text-surface group-hover:text-white mb-2">LAB#1</h3>
              <p className="text-slate-400 text-xs md:text-sm group-hover:text-white/80 leading-relaxed">Laboratório de ideias disruptivas para startups e projetos universitários.</p>
            </div>
          </motion.div>

          {/* AUDITÓRIO */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }} whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.2)' }} className="md:col-span-4 bg-slate-50 rounded-3xl p-8 md:p-10 flex flex-col justify-between group hover:bg-primary-container transition-colors duration-300 shadow-sm cursor-default">
            <span className="font-headline font-bold text-5xl md:text-7xl text-surface/5 -ml-1 -mt-2 group-hover:text-white/10 transition-colors">03</span>
            <div>
              <h3 className="font-headline font-bold text-xl md:text-2xl text-surface group-hover:text-white mb-2">AUDITÓRIO</h3>
              <p className="text-slate-400 text-xs md:text-sm group-hover:text-white/80 leading-relaxed">Ciclo de conferências exclusivas com líderes e visionários globais.</p>
            </div>
          </motion.div>

          {/* ÁTRIO & CÓDIGO */}
          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }} className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
            <motion.div whileHover={{ y: -4, scale: 1.02 }} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex items-center gap-4 md:gap-5 cursor-default">
              <div className="p-2.5 md:p-3 bg-secondary-container/10 rounded-xl">
                <DraftingCompass className="w-5 h-5 md:w-6 md:h-6 text-secondary-container" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-base md:text-lg text-surface">ÁTRIO</h4>
                <p className="text-[10px] text-slate-400">Exposição curada de arte digital.</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -4, scale: 1.02 }} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex items-center gap-4 md:gap-5 cursor-default">
              <div className="p-2.5 md:p-3 bg-primary/10 rounded-xl">
                <Terminal className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-base md:text-lg text-surface">CÓDIGO</h4>
                <p className="text-[10px] text-slate-400">Hackathon intensivo de 48 horas.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Partners = () => {
  const brands = ["NEXUS", "VANTAGE", "ORBIT", "KINETIC", "PULSE", "CORE", "ELITE", "VISION", "PRIME", "AURA"];
  
  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section id="parceiros" className="bg-surface py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-16">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeUp} 
          transition={{ duration: 0.7, ease }} 
          className="max-w-2xl"
        >
          <h2 className="font-headline font-light text-2xl md:text-4xl leading-tight mb-4 md:mb-6 text-white">
            Marcas que constroem o <span className="text-secondary-container font-medium">futuro connosco</span>
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant/60 leading-relaxed mb-6 md:mb-8">
            As marcas que se juntam à DINNAMIKUS não patrocinam eventos. Constroem cultura.
          </p>
          <button className="w-full sm:w-auto bg-transparent border border-secondary-container/30 text-secondary-container px-6 py-3 rounded-xl text-[10px] md:text-xs font-bold tracking-wider uppercase hover:bg-secondary-container hover:text-white transition-all duration-300 cursor-pointer">
            Torne-se parceiro
          </button>
        </motion.div>
      </div>

      {/* Infinite Carousel */}
      <div className="relative flex overflow-hidden py-10">
        <div className="flex whitespace-nowrap gap-4 md:gap-6 px-4 md:px-6 w-max animate-marquee-fast hover:[animation-play-state:paused]">
          {duplicatedBrands.map((brand, i) => (
            <div 
              key={i} 
              className="inline-flex w-40 md:w-48 h-20 md:h-24 bg-surface-container-low/30 rounded-xl items-center justify-center group cursor-default border border-white/5 hover:border-secondary-container/30 transition-colors duration-300 shrink-0"
            >
              <span className="font-headline font-black text-lg md:text-xl text-white/10 group-hover:text-secondary-container/80 transition-colors duration-300 tracking-widest">
                {brand}
              </span>
            </div>
          ))}
        </div>
        
        {/* Gradient Overlays for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10"></div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <motion.footer 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeUp} 
      transition={{ duration: 0.6, ease }}
      className="bg-surface w-full border-t border-white/5"
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full max-w-7xl mx-auto">
        <div className="mb-6 md:mb-0">
          <div className="font-headline font-bold text-white text-xl mb-2">DINNAMIKUS</div>
          <p className="micro-label uppercase">
            © 2024 DINNAMIKUS. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Privacidade", "Termos", "Imprensa", "Contacto"].map((item) => (
            <a key={item} className="micro-label hover:text-secondary-container transition-colors" href="#">
              {item}
            </a>
          ))}
        </div>
        <div className="mt-6 md:mt-0 flex gap-3">
          <a 
            href="#" 
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Partilhar"
            rel="noopener noreferrer"
          >
            <Share2 className="text-white w-4 h-4" />
          </a>
          <a 
            href="#" 
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Website Global"
            rel="noopener noreferrer"
          >
            <Globe className="text-white w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

const BottomNav = () => {
  const navItems = [
    { name: 'Início', href: '#inicio', icon: <Rocket className="w-5 h-5" /> },
    { name: 'Sobre', href: '#sobre-nos', icon: <Eye className="w-5 h-5" /> },
    { name: 'Fraternidades', href: '#fraternidades', icon: <Award className="w-5 h-5" /> },
    { name: 'Parceiros', href: '#parceiros', icon: <Share2 className="w-5 h-5" /> },
  ];

  return (
    <motion.nav 
      initial={{ y: 100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 w-[90%] max-w-[400px] bg-surface/90 backdrop-blur-md border border-white/10 rounded-2xl z-50 md:hidden shadow-2xl px-2 py-2"
    >
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <a 
            key={item.name}
            href={item.href}
            onClick={(e) => { e.preventDefault(); smoothScroll(item.href); }}
            className="flex flex-col items-center gap-1 p-2 text-white/40 hover:text-secondary-container transition-colors"
          >
            {item.icon}
            <span className="text-[8px] uppercase font-headline font-bold tracking-widest">{item.name}</span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default function LandingPage() {

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <About />
      <Fraternities />
      <Projects />
      <Partners />
      <Footer />
      <BottomNav />
    </main>
  );
}
