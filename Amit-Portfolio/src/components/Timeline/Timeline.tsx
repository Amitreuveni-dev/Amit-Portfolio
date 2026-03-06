import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Shield, GraduationCap, Heart, Calendar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './Timeline.module.scss';

type TimelineTheme = 'military' | 'education' | 'volunteer';

interface TimelineEvent {
  id: string;
  theme: TimelineTheme;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  highlights: string[];
  Icon: LucideIcon;
}

const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 'high-school',
    theme: 'education',
    title: 'Tedi Kolak High School',
    subtitle: 'Tourism Studies',
    description:
      'Completed high school education with a focus on tourism studies, developing communication skills and cultural awareness while successfully passing matriculation exams.',
    period: '2014 - 2019',
    highlights: ['Matriculation Exams', 'Tourism Studies'],
    Icon: GraduationCap,
  },
  {
    id: 'volunteer',
    theme: 'volunteer',
    title: 'Sachi Young Leaders',
    subtitle: 'Youth Mentorship Program',
    description:
      'Volunteered as a mentor and leader, guiding youth through educational and personal development activities, fostering the next generation of community leaders.',
    period: '2017 - 2019',
    highlights: ['Youth Mentorship', 'Community Service', 'Leadership Development'],
    Icon: Heart,
  },
  {
    id: 'military-service',
    theme: 'military',
    title: 'Combat Engineering Squad Commander',
    subtitle: 'IDF Combat Engineering Corps',
    description:
      'Led a squad of combat engineers, developing leadership skills, strategic thinking, and the ability to perform under high-pressure situations.',
    period: '2019 - 2022',
    highlights: ['Squad Leadership', 'Strategic Planning', 'Team Management', 'High-Pressure Decision Making'],
    Icon: Shield,
  },
  {
    id: 'military-reserve',
    theme: 'military',
    title: 'Reserve Duty - Gaza Operation',
    subtitle: 'Combat Engineering Corps',
    description:
      'Called to active reserve duty during Operation Swords of Iron, demonstrating commitment to national defense while balancing professional responsibilities.',
    period: 'Oct 2023 - Present',
    highlights: ['Active Reserve Service', 'Combat Engineering', 'Leadership Under Pressure'],
    Icon: Shield,
  },
  {
    id: 'education',
    theme: 'education',
    title: 'Full-Stack Development Program',
    subtitle: 'INT College',
    description:
      'Comprehensive training in modern web technologies including React, Node.js, TypeScript, and database management. Building real-world applications with industry best practices.',
    period: 'Nov 2024 - Jan 2026',
    highlights: ['React & TypeScript', 'Node.js & Express', 'MongoDB & SQL', 'REST APIs'],
    Icon: GraduationCap,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const itemVariantsRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
    },
  },
};

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
}

const TimelineItem = ({ event, index }: TimelineItemProps): React.JSX.Element => {
  const isLeft = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-100px' });

  return (
    <motion.div ref={itemRef} className={`${styles.timelineItem} ${styles[event.theme]} ${isLeft ? styles.left : styles.right}`}
      variants={isLeft ? itemVariantsLeft : itemVariantsRight} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}><event.Icon size={24} /></div>
        <div className={styles.details}>
          <div className={styles.header}>
            <h3 className={styles.title}>{event.title}</h3>
            <span className={styles.period}><Calendar size={14} />{event.period}</span>
          </div>
          <p className={styles.subtitle}>{event.subtitle}</p>
          <p className={styles.description}>{event.description}</p>
          <div className={styles.highlights}>
            {event.highlights.map((highlight) => (<span key={highlight} className={styles.tag}>{highlight}</span>))}
          </div>
        </div>
      </div>
      <div className={styles.connector}><div className={styles.dot} /></div>
    </motion.div>
  );
};

const Timeline = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className={styles.timeline} ref={sectionRef}>
      <div className={styles.container}>
        <motion.div className={styles.sectionHeader} initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}>
          <h2 className={styles.sectionTitle}>My Journey</h2>
          <p className={styles.sectionSubtitle}>From military leadership to full-stack development</p>
        </motion.div>
        <div className={styles.timelineWrapper}>
          <motion.div className={styles.line} variants={lineVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} />
          <motion.div className={styles.events} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            {TIMELINE_DATA.map((event, index) => (<TimelineItem key={event.id} event={event} index={index} />))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
