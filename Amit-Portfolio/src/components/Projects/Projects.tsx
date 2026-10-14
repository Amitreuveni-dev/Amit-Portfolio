import { Fragment, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ArrowUpRight, Github, Lock } from 'lucide-react';
import TopoBackground from '../TopoBackground/TopoBackground';
import styles from './Projects.module.scss';

type ProjectVisual = 'chat' | 'shifts' | 'word';

interface Project {
  id: string;
  title: string;
  kicker: string;
  description: string;
  technologies: string[];
  visual: ProjectVisual;
  featured?: boolean;
  githubUrl?: string;
  isPrivateRepo?: boolean;
  liveUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'milu-ai',
    title: 'MiluAI',
    kicker: 'Flagship · Live since early 2026',
    description:
      "An AI chat assistant that answers IDF reservists' questions about their rights, pay and benefits in plain Hebrew. I built and launched it on my own: streaming answers, full RTL, installable PWA, rate limiting, analytics and error tracking.",
    technologies: ['Next.js 16', 'TypeScript', 'Claude API', 'Vercel AI SDK', 'MongoDB', 'Tailwind CSS', 'PostHog', 'Sentry', 'Resend'],
    visual: 'chat',
    featured: true,
    isPrivateRepo: true,
    liveUrl: 'https://milu-ai.vercel.app/',
  },
  {
    id: 'sidur-app',
    title: 'Sidur',
    kicker: 'AI shift management',
    description:
      'A shift scheduler for a food-service branch. An AI parser turns free-text availability requests into structured data, so the weekly plan has no conflicts.',
    technologies: ['Next.js 16', 'Tailwind v4', 'AI parsing', 'PWA'],
    visual: 'shifts',
    githubUrl: 'https://github.com/Amitreuveni-dev/Sidur',
    liveUrl: 'https://sidur.vercel.app/',
  },
  {
    id: 'wordle',
    title: 'Wordle',
    kicker: 'Team project',
    description:
      'A Wordle-style game built with a course team: six daily guesses, color-coded feedback and a leaderboard.',
    technologies: ['React', 'TypeScript', 'Local Storage', 'CSS Animations'],
    visual: 'word',
    githubUrl: 'https://github.com/Amitreuveni-dev/Wordle',
    liveUrl: 'https://wordle-hn9f.onrender.com',
  },
];

const SHIFT_DAYS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
// 0 = open, 1 = assigned, 2 = assigned to a second employee
const SHIFT_GRID = [
  [1, 2, 1, 0, 1, 2, 0],
  [2, 1, 0, 2, 1, 1, 2],
];
const WORD = [
  { letter: 'B', state: 'hit' },
  { letter: 'U', state: 'miss' },
  { letter: 'I', state: 'near' },
  { letter: 'L', state: 'hit' },
  { letter: 'D', state: 'hit' },
] as const;

// Small CSS-drawn previews of each product, standing in until real screenshots are added
const ProjectVisualPreview = ({ visual }: { visual: ProjectVisual }): React.JSX.Element => {
  if (visual === 'chat') {
    return (
      <div className={styles.phone} aria-hidden="true" dir="rtl" lang="he">
        <span className={`${styles.bubble} ${styles.userBubble}`}>כמה מגיע לי על 30 ימי מילואים?</span>
        <span className={`${styles.bubble} ${styles.botBubble}`}>
          בודק את הזכויות שלך…
          <span className={styles.skeleton} />
          <span className={styles.skeleton} />
          <span className={styles.skeleton} />
        </span>
      </div>
    );
  }

  if (visual === 'shifts') {
    return (
      <div className={styles.shifts} aria-hidden="true" dir="rtl" lang="he">
        {SHIFT_DAYS.map((day) => (<span key={day} className={styles.day}>{day}</span>))}
        {SHIFT_GRID.flatMap((row, rowIndex) => row.map((cell, cellIndex) => (
          <span key={`${rowIndex}-${cellIndex}`}
            className={`${styles.shift} ${cell === 1 ? styles.assigned : ''} ${cell === 2 ? styles.assignedAlt : ''}`} />
        )))}
      </div>
    );
  }

  return (
    <div className={styles.word} aria-hidden="true">
      {WORD.map(({ letter, state }) => (<span key={letter} className={styles[state]}>{letter}</span>))}
    </div>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const ProjectTile = ({ project }: { project: Project }): React.JSX.Element => (
  <motion.article className={`${styles.tile} ${project.featured ? styles.featured : ''}`} variants={tileVariants}>
    {project.featured && <TopoBackground seed={5} peakX={0.72} peakY={0.38} />}
    <div className={styles.visual}>
      <ProjectVisualPreview visual={project.visual} />
    </div>
    <div className={styles.body}>
      <p className={styles.kicker}>{project.kicker}</p>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      <p className={styles.technologies}>
        {project.technologies.map((tech, index) => (
          <Fragment key={tech}>
            {index > 0 && <span className={styles.separator} aria-hidden="true"> · </span>}
            <span className={styles.tech}>{tech}</span>
          </Fragment>
        ))}
      </p>
      <div className={styles.links}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.primary}`}
            aria-label={`Open ${project.title} live site`}>
            Live site<ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}
            aria-label={`View ${project.title} source code on GitHub`}>
            <Github size={16} aria-hidden="true" />Code
          </a>
        )}
        {project.isPrivateRepo && (
          <span className={`${styles.link} ${styles.private}`} title="Source code is in a private repository">
            <Lock size={14} aria-hidden="true" />Private repo
          </span>
        )}
      </div>
    </div>
  </motion.article>
);

const Projects = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Selected work</p>
          <div className={styles.headingRow}>
            <h2 className={styles.sectionTitle}>Things I&apos;ve shipped</h2>
            <span className={styles.count}>{String(PROJECTS_DATA.length).padStart(2, '0')} projects</span>
          </div>
        </header>
        <motion.div className={styles.bento} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {PROJECTS_DATA.map((project) => (<ProjectTile key={project.id} project={project} />))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
