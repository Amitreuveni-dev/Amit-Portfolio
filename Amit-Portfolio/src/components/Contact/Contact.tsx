import { useState, useRef, useCallback } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Mail, Copy, Check, Linkedin, Github } from 'lucide-react';
import styles from './Contact.module.scss';

const EMAIL = 'amitr123r@gmail.com';
const LINKEDIN_URL = 'https://linkedin.com/in/amit-reuveni';
const GITHUB_URL = 'https://github.com/Amitreuveni-dev';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const Contact = (): React.JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
      <div className={styles.container}>
        <motion.div className={styles.content} variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.h2 className={styles.title} variants={itemVariants}>Let&apos;s Work Together</motion.h2>
          <motion.p className={styles.description} variants={itemVariants}>
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll do my best to get back to you!
          </motion.p>
          <motion.div className={styles.emailWrapper} variants={itemVariants}>
            <button type="button" className={styles.emailButton} onClick={handleCopyEmail} aria-label={copied ? 'Email copied!' : 'Click to copy email'}>
              <Mail size={20} />
              <span className={styles.email}>{EMAIL}</span>
              <span className={styles.copyIcon}>{copied ? <Check size={18} /> : <Copy size={18} />}</span>
            </button>
            {copied && (
              <motion.span className={styles.toast} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>Copied to clipboard!</motion.span>
            )}
          </motion.div>
          <motion.div className={styles.socials} variants={itemVariants}>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn Profile"><Linkedin size={24} /></a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub Profile"><Github size={24} /></a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
