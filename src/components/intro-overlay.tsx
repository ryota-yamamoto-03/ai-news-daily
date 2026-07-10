"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * 初回表示のオープニング演出。
 * ロゴがフェードイン → 背景がズームイン → オーバーレイが消え、
 * 後続のヘッダー・ティッカー・カードの時間差表示につながる。
 */
export function IntroOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* ズームインする背景グロー */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(46,124,246,0.22), transparent), radial-gradient(ellipse 40% 30% at 50% 60%, rgba(225,29,46,0.14), transparent)",
            }}
          />

          {/* ロゴのフェードイン */}
          <motion.p
            initial={{ opacity: 0, scale: 0.92, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0.18em" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative font-display text-2xl font-black text-white sm:text-4xl"
          >
            AI <span className="text-breaking-bright text-glow-red">BREAKING</span> NEWS
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
