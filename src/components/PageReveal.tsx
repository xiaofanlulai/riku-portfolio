"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PageReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div ref={ref} style={{ perspective: "1400px", height: "100%" }}>
      <motion.div
        style={{ height: "100%", transformOrigin: "center bottom" }}
        initial={{ opacity: 0, rotateX: 18, y: 80, scale: 0.96 }}
        animate={inView ? { opacity: 1, rotateX: 0, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
