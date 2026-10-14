import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { Copy, Check, Linkedin, Github, FileText } from 'lucide-react';
import { RESUME_FILENAME, RESUME_URL } from '../../constants';
import TopoBackground from '../TopoBackground/TopoBackground';
import styles from './Contact.module.scss';

const EMAIL = 'amitr123r@gmail.com';
const LINKEDIN_URL = 'https://linkedin.com/in/amit-reuveni';
const GITHUB_URL = 'https://github.com/Amitreuveni-dev';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Contact = (): React.JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  }, []);

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <TopoBackground seed={29} peakX={0.5} peakY={0.45} />
      <div className={styles.container}>
        <motion.div className={styles.content} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p className={styles.eyebrow} variants={itemVariants}>Contact</motion.p>
          <motion.h2 className={styles.title} variants={itemVariants}>Let&apos;s build <em>something.</em></motion.h2>
          <motion.p className={styles.description} variants={itemVariants}>
            I&apos;m open to full-time engineering roles. Email is the fastest way to reach me.
          </motion.p>

          <motion.div className={styles.emailWrapper} variants={itemVariants}>
            <button type="button" className={styles.emailButton} onClick={handleCopyEmail}
              aria-label={copied ? 'Email copied' : `Copy email address ${EMAIL}`}>
              <span className={styles.email}>{EMAIL}</span>
              <span className={styles.copyIcon} aria-hidden="true">{copied ? <Check size={18} /> : <Copy size={18} />}</span>
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span className={styles.toast} role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}>
                  Copied to clipboard
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.ul className={styles.links} variants={itemVariants}>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <Linkedin size={18} aria-hidden="true" />LinkedIn
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <Github size={18} aria-hidden="true" />GitHub
              </a>
            </li>
            <li>
              <a href={RESUME_URL} download={RESUME_FILENAME} className={styles.link}>
                <FileText size={18} aria-hidden="true" />Resume (PDF)
              </a>
            </li>
          </motion.ul>
        </motion.div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© {new Date().getFullYear()} Amit Reuveni</span>
          <span>Built with React, TypeScript &amp; SCSS</span>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
