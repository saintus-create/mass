'use client';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';
import React, { ReactNode } from 'react';

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  preset?: 'fade' | 'slide' | 'scale' | 'blur' | 'shake';
  as?: React.ElementType;
};

const defaultContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const presets = {
  fade: {
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
  scale: {
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  blur: {
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  },
  shake: {
    item: {
      hidden: { x: 0 },
      visible: {
        x: [0, -10, 10, -10, 10, 0],
        transition: { type: 'spring', stiffness: 300, damping: 10 },
      },
    },
  },
};

export const AnimatedGroup = ({
  children,
  className,
  variants,
  preset,
  as: Component = 'div',
}: AnimatedGroupProps) => {
  const selectedPreset = preset ? presets[preset] : presets.fade;

  const containerVariants = {
    ...defaultContainerVariants,
    ...variants?.container,
  };

  const itemVariants = {
    ...selectedPreset.item,
    ...variants?.item,
  };

  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </MotionComponent>
  );
};
