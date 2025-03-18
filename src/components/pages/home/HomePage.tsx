'use client';
import { motion, useScroll, useSpring } from 'motion/react';
import AboutSection from './AboutSection';
import EducationSection from './EducationSection';
import HeaderSection from './HeaderSection';
import ProjectsSection from './ProjectsSection';
import WorkExperienceSection from './WorkExperienceSection';

function HomePage() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <div className="mx-auto flex max-w-md flex-col items-center">
        <HeaderSection />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.25, duration: 0.3, scale: { type: 'spring', visualDuration: 0.4, bounce: 0.4 } }}
        >
          <AboutSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.3, scale: { type: 'spring', visualDuration: 0.4, bounce: 0.4 } }}
        >
          <EducationSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.3, scale: { type: 'spring', visualDuration: 0.4, bounce: 0.4 } }}
        >
          <WorkExperienceSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.3, scale: { type: 'spring', visualDuration: 0.4, bounce: 0.4 } }}
        >
          <ProjectsSection />
        </motion.div>
      </div>
      <motion.div
        id="scroll-indicator"
        style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: 5, originX: 0, backgroundColor: '#A3AABE' }}
      />
    </>
  );
}

export default HomePage;
