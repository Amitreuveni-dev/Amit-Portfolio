import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
  isCurrent?: boolean;
}

const THEME_LABELS: Record<TimelineTheme, string> = {
  education: 'Education',
  military: 'Service',
  volunteer: 'Volunteering',
};

// Oldest first, so the log reads as a story from the field to the stack and ends on "Now".
// The entries before military service start collapsed behind a toggle.
const EARLIER_ENTRIES = 2;

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
  },
  {
    id: 'education',
    theme: 'education',
    title: 'Full-Stack Development Program',
    subtitle: 'INT College',
    description:
      'Comprehensive training in modern web technologies including React, Node.js, TypeScript, and database management. Building real-world applications with industry best practices.',
    period: 'Apr 2024 - Jan 2026',
    highlights: ['React & TypeScript', 'Node.js & Express', 'MongoDB & SQL', 'REST APIs'],
  },
  {
    id: 'degree',
    theme: 'education',
    title: 'B.Sc. in Information Systems',
    subtitle: 'Ramat Gan Academic College',
    description:
      'Starting a three-year B.Sc. in Information Systems with a planned specialization in Data Analysis or Cyber Security, building a strong academic foundation alongside hands-on full-stack development.',
    period: 'Oct 2026 - 2029',
    highlights: ['Information Systems', 'Data Analysis', 'Cyber Security', 'Software Engineering'],
    isCurrent: true,
  },
];

const entryVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
      delay: Math.min(index, 4) * 0.08,
    },
  }),
};

const TimelineEntry = ({ event, index, isInView }: { event: TimelineEvent; index: number; isInView: boolean }): React.JSX.Element => (
  <motion.li className={`${styles.entry} ${styles[event.theme]}`} variants={entryVariants} custom={index}
    initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
    <div className={styles.meta}>
      <span className={styles.period}>{event.period}</span>
      <span className={styles.type}>{THEME_LABELS[event.theme]}</span>
    </div>
    <div className={styles.marker} aria-hidden="true"><span className={styles.dot} /></div>
    <div className={styles.body}>
      <h3 className={styles.title}>
        {event.title}
        {event.isCurrent && <span className={styles.now}>Now</span>}
      </h3>
      <p className={styles.subtitle}>{event.subtitle}</p>
      <p className={styles.description}>{event.description}</p>
      <ul className={styles.highlights}>
        {event.highlights.map((highlight) => (<li key={highlight} className={styles.tag}>{highlight}</li>))}
      </ul>
    </div>
  </motion.li>
);

const Timeline = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [showEarlier, setShowEarlier] = useState<boolean>(false);

  const visibleEvents = showEarlier ? TIMELINE_DATA : TIMELINE_DATA.slice(EARLIER_ENTRIES);
  const firstYear = TIMELINE_DATA[showEarlier ? 0 : EARLIER_ENTRIES].period.match(/\d{4}/)?.[0];

  return (
    <section id="timeline" className={styles.timeline} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Mission log</p>
          <div className={styles.headingRow}>
            <h2 className={styles.sectionTitle}>From the field to the stack</h2>
            <span className={styles.order}>{firstYear} → Now</span>
          </div>
        </header>

        <button type="button" className={styles.toggle} onClick={() => setShowEarlier((prev) => !prev)}
          aria-expanded={showEarlier} aria-controls="mission-log">
          <ChevronDown size={16} aria-hidden="true" className={showEarlier ? '' : styles.flipped} />
          {showEarlier ? 'Hide earlier entries' : `Show ${EARLIER_ENTRIES} earlier entries`}
        </button>

        <ol className={styles.log} id="mission-log">
          {visibleEvents.map((event, index) => (
            <TimelineEntry key={event.id} event={event} index={index} isInView={isInView} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
