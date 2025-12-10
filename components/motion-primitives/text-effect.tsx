'use client';
import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
} from 'framer-motion';
import React from 'react';

type PresetType = 'blur' | 'shake' | 'scale' | 'fade' | 'slide';

type TextEffectProps = {
  children: string;
  per?: 'word' | 'char' | 'line';
  as?: React.ElementType;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const presets = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)', y: -8 },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          type: 'spring',
          bounce: 0.3,
          duration: 1.5,
        },
      },
      exit: { opacity: 0, filter: 'blur(12px)', y: -8 },
    },
  },
  shake: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 0 },
      visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
      exit: { x: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          bounce: 0.3,
          duration: 1.5,
        },
      },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  preset,
  delay = 0,
  trigger = true,
  onAnimationComplete,
  segmentWrapperClassName,
}: TextEffectProps) {
  const Component = as as any;
  const words = children.split(/(\s+)/);

  if (per === 'line') {
    const lines = children.split('\n');
    return (
      <AnimatePresence mode='wait'>
        {trigger && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants?.container || presets[preset || 'fade'].container}
            className={className}
            onAnimationComplete={onAnimationComplete}
          >
            {lines.map((line, index) => (
              <motion.span
                key={index}
                variants={variants?.item || presets[preset || 'fade'].item}
                className={cn('block', segmentWrapperClassName)}
              >
                {line}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      {trigger && (
        <Component
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={variants?.container || presets[preset || 'fade'].container}
          className={cn('whitespace-pre-wrap', className)}
          onAnimationComplete={onAnimationComplete}
        >
          {words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              variants={variants?.item || presets[preset || 'fade'].item}
              className='inline-block'
            >
              {per === 'char'
                ? word.split('').map((char, charIndex) => (
                    <motion.span
                      key={`char-${wordIndex}-${charIndex}`}
                      variants={variants?.item || presets[preset || 'fade'].item}
                    >
                      {char}
                    </motion.span>
                  ))
                : word}
            </motion.span>
          ))}
        </Component>
      )}
    </AnimatePresence>
  );
}
