'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, CircleX } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  selector: string;
  position?: string;
}

interface OnboardingTutorialProps {
  steps: TutorialStep[];
}

const OnboardingTutorial = ({ steps }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTutorialVisible, setIsTutorialVisible] = useState(false);
  const [elementRect, setElementRect] = useState<DOMRect | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const tutorialCompleted = window.localStorage.getItem(`tutorial_${pathname}_completed`);
    if (!tutorialCompleted) {
      setIsTutorialVisible(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (isTutorialVisible) {
        const element = document.querySelector(steps[currentStep].selector);
        if (element && element instanceof HTMLElement) {
          const rect = element.getBoundingClientRect();
          setElementRect(rect);

          const originalStyles = {
            position: element.style.position,
            zIndex: element.style.zIndex,
            boxShadow: element.style.boxShadow,
            backgroundColor: element.style.backgroundColor,
            borderRadius: element.style.borderRadius,
            color: element.style.color,
          };

          element.style.position = steps[currentStep].position || 'relative';
          element.style.zIndex = '9999';
          element.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
          element.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          element.style.borderRadius = '8px';
          element.style.color = '#333';

          return () => {
            element.style.position = originalStyles.position || '';
            element.style.zIndex = originalStyles.zIndex || '';
            element.style.boxShadow = originalStyles.boxShadow || '';
            element.style.backgroundColor = originalStyles.backgroundColor || '';
            element.style.borderRadius = originalStyles.borderRadius || '';
            element.style.color = originalStyles.color || '';
          };
        }
      }
    };

    if (isTutorialVisible) {
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      const element = document.querySelector(steps[currentStep].selector);
      if (element && element instanceof HTMLElement) {
        element.style.position = '';
        element.style.zIndex = '';
        element.style.boxShadow = '';
        element.style.backgroundColor = '';
        element.style.borderRadius = '';
        element.style.color = '';
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentStep, isTutorialVisible, steps]);

  const handleSkip = () => {
    window.localStorage.setItem(`tutorial_${pathname}_completed`, 'true');
    setIsTutorialVisible(false);
  };

  if (!isTutorialVisible || !elementRect) return null;

  let dialogTop = elementRect.bottom + 15;
  let dialogLeft = elementRect.left;
  const dialogWidth = 320;
  const dialogHeight = 200;

  if (dialogLeft + dialogWidth > window.innerWidth) {
    dialogLeft = window.innerWidth - dialogWidth - 20;
  }
  if (dialogLeft < 20) {
    dialogLeft = 20;
  }
  if (dialogTop + dialogHeight > window.innerHeight) {
    dialogTop = elementRect.top - dialogHeight - 15;
    if (dialogTop < 20) {
      dialogTop = 20;
    }
  }
  if (dialogTop < 20) {
    dialogTop = elementRect.bottom + 15;
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 h-full w-full"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          transition: 'clip-path 0.3s ease-in-out',
          zIndex: '999',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="animation fixed z-50 w-11/12 max-w-md rounded-lg dark:bg-black p-6 shadow-xl bg-gray-400"
        style={{
          top: `${dialogTop}px`,
          left: `${dialogLeft}px`,
          border: '1px solid #e2e8f0',
          maxWidth: `${dialogWidth}px`,
          zIndex: '9999999',
        }}
      >
        <div>
          <h2 className="mb-2 text-xl font-semibold dark:text-gray-400">{steps[currentStep].title}</h2>
          <p className="mb-6 dark:text-gray-300">{steps[currentStep].description}</p>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSkip} className="flex items-center space-x-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
            <CircleX />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default OnboardingTutorial;
