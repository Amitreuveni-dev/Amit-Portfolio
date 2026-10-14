import { motion, type Variants } from 'framer-motion';
import { ArrowDownRight, Download } from 'lucide-react';
import styles from './Hero.module.scss';
import profileImage from '../../assets/Profile-Picture.jpg';
import TopoBackground from '../TopoBackground/TopoBackground';
import { RESUME_FILENAME, RESUME_URL } from '../../constants';

const STACK = ['React', 'TypeScript', 'Next.js', 'Node.js', 'MongoDB', 'SQL', 'Claude API'];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Hero = (): React.JSX.Element => {
  return (
    <section id="hero" className={styles.hero}>
      <TopoBackground seed={11} peakX={0.78} peakY={0.34} />
      <div className={styles.container}>
        <motion.div className={styles.content} variants={containerVariants} initial="hidden" animate="visible">
          <motion.p className={styles.status} variants={itemVariants}>
            <span className={styles.statusDot} aria-hidden="true" />
            Open to full-time engineering roles
          </motion.p>
          <motion.p className={styles.coordinates} variants={itemVariants}>
            <span>32.08°N 34.82°E</span> · Full-stack developer
          </motion.p>
          <motion.h1 className={styles.title} variants={itemVariants}>
            From clearing routes to shipping <em>AI products.</em>
          </motion.h1>
          <motion.p className={styles.description} variants={itemVariants}>
            I&apos;m Amit Reuveni, a former IDF combat engineering squad commander. I build full-stack apps with
            React, Next.js and the Claude API, like <strong>MiluAI</strong>, an AI assistant for IDF reservists
            that I built and launched on my own.
          </motion.p>
          <motion.div className={styles.cta} variants={itemVariants}>
            <a href="#projects" className={styles.primaryButton}>
              See the work<ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className={styles.secondaryButton}>Get in touch</a>
            <a href={RESUME_URL} download={RESUME_FILENAME} className={styles.ghostButton}>
              <Download size={18} aria-hidden="true" />Download CV
            </a>
          </motion.div>
          <motion.div className={styles.stack} variants={itemVariants}>
            <span className={styles.stackLabel}>Stack</span>
            <ul className={styles.stackList}>
              {STACK.map((tech) => (<li key={tech}>{tech}</li>))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.figure className={styles.portrait} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}>
          <div className={styles.frame}>
            <img src={profileImage} alt="Amit Reuveni" className={styles.photo} width={320} height={400}
              fetchPriority="high" loading="eager" />
          </div>
          <figcaption className={styles.caption}>
            <span>Amit Reuveni</span>
            <span>Squad cmdr → Dev</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default Hero;
