import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ExternalLink, Github, Gamepad2, CalendarDays, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './Projects.module.scss';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  Icon: LucideIcon;
  githubUrl?: string;
  liveUrl?: string;
  gradient: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'milu-ai',
    title: 'MiluAI',
    description:
      'An AI-powered chat assistant for Israeli reservists, providing instant answers about military reserve rights, compensation, benefits, and entitlements in plain Hebrew. Features streaming responses, glassmorphism design, RTL support, PWA installable, issue reporting with email notifications, and full analytics. Privacy-first architecture with rate limiting and session replay.',
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Vercel AI SDK', 'Claude API', 'MongoDB', 'Resend', 'PostHog', 'Sentry', 'PWA'],
    Icon: Shield,
    githubUrl: 'https://github.com/Amitreuveni-dev/milu-ai',
    liveUrl: 'https://milu-ai.vercel.app/',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  
  {
  id: 'sidur-app',
  title: 'Sidur - AI Shift Management',
  description: 
    'A smart workforce management platform designed for seamless shift scheduling. It features an AI-driven availability parser that interprets complex employee requests into structured data, ensuring optimal coverage and zero scheduling conflicts.',
  technologies: ['Next.js 16', 'Tailwind v4', 'AI Availability Parser'],
  Icon: CalendarDays,
  githubUrl: 'https://github.com/Amitreuveni-dev/Sidur',
  liveUrl: 'https://sidur.vercel.app/',
  gradient: 'linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)',
},
  {
    id: 'wordle',
    title: 'Wordle Clone',
    description:
      'A faithful recreation of the popular word-guessing game built as a team project during a course. Includes keyboard input, color-coded feedback, and game state persistence.',
    technologies: ['React', 'TypeScript', 'Local Storage', 'CSS Animations'],
    Icon: Gamepad2,
    githubUrl: 'https://github.com/amitr/wordle',
    liveUrl: "https://wordle-hn9f.onrender.com",
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },

];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps): React.JSX.Element => {
  return (
    <motion.article className={styles.card} variants={cardVariants} whileHover={{ scale: 1.05, y: -10 }} whileTap={{ scale: 0.98 }}>
      <div className={styles.glassOverlay} />
      <div className={styles.iconWrapper} style={{ background: project.gradient }}>
        <project.Icon size={32} className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.technologies}>
          {project.technologies.map((tech) => (<span key={tech} className={styles.tech}>{tech}</span>))}
        </div>
        <div className={styles.links}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={`View ${project.title} on GitHub`}>
              <Github size={20} /><span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.primary}`} aria-label={`View ${project.title} live demo`}>
              <ExternalLink size={20} /><span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
      <div className={styles.gradientBorder} style={{ background: project.gradient }} />
    </motion.article>
  );
};

const Projects = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.container}>
        <motion.div className={styles.sectionHeader} initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionSubtitle}>A showcase of my recent work and side projects</p>
        </motion.div>
        <motion.div className={styles.grid} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {PROJECTS_DATA.map((project) => (<ProjectCard key={project.id} project={project} />))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
