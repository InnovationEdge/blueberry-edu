import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { fadeVariants, fadeUpVariants, scaleVariants, transitions, DURATION, EASE_SMOOTH } from '../lib/animations';

interface TransitionProps {
  children: ReactNode;
  className?: string;
}

interface StaggerItemProps extends TransitionProps {
  delay?: number;
}

export function PageTransition({ children, className }: TransitionProps) {
  return (
    <motion.div {...fadeVariants} transition={transitions.page} className={className}>
      {children}
    </motion.div>
  );
}

export function StepTransition({ children, className }: TransitionProps) {
  return (
    <motion.div {...fadeVariants} transition={transitions.step} className={className}>
      {children}
    </motion.div>
  );
}

export function FadeUp({ children, className }: TransitionProps) {
  return (
    <motion.div {...fadeUpVariants} transition={{ duration: DURATION.slow, ease: EASE_SMOOTH }} className={className}>
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className }: TransitionProps) {
  return (
    <motion.div {...scaleVariants} transition={{ duration: DURATION.slow, ease: EASE_SMOOTH }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, delay = 0, className }: StaggerItemProps) {
  return (
    <motion.div {...fadeUpVariants} transition={transitions.stagger(delay)} className={className}>
      {children}
    </motion.div>
  );
}
