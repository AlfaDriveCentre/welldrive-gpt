import React from 'react';
import { motion, useInView } from 'framer-motion';

export default function Reveal({ children, type='text', delay=0 }:{children: React.ReactNode, type?: 'text'|'image', delay?: number}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const variants = type === 'text'
    ? { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16,1,0.3,1] } } }
    : { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 1.0, delay, ease: 'easeOut' } } };

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={variants}>
      {children}
    </motion.div>
  );
}