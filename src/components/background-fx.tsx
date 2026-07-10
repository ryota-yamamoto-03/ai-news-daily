"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** 世界地図風のドット座標（経度・緯度を%座標に変換した近似値） */
const MAP_DOTS: Array<[number, number]> = [
  // 北米
  [16, 32], [20, 28], [24, 34], [28, 30], [22, 40], [18, 38], [26, 26],
  // 南米
  [28, 58], [30, 66], [26, 72], [32, 62],
  // ヨーロッパ
  [46, 26], [50, 24], [48, 30], [52, 28], [44, 30],
  // アフリカ
  [48, 46], [52, 52], [50, 60], [46, 54],
  // 中東〜インド
  [58, 38], [62, 42], [66, 44],
  // 東アジア
  [76, 32], [80, 36], [84, 34], [78, 42], [82, 28],
  // 東南アジア〜オセアニア
  [76, 52], [82, 58], [86, 66], [80, 70],
];

/** 都市間を結ぶ通信ライン（MAP_DOTSのインデックスペア） */
const LINKS: Array<[number, number]> = [
  [1, 12], [12, 24], [24, 4], [13, 21], [21, 25], [3, 15], [16, 28], [23, 26],
];

/**
 * 放送スタジオ風の背景演出。
 * 薄いグリッド・世界地図ドット・回転する円・通信ラインを重ね、
 * マウス移動に合わせたパララックスで奥行きを出す。
 */
export function BackgroundFx() {
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* ゆっくり流れるグリッド */}
      <div
        className="absolute inset-0 animate-grid-drift opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,124,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(46,124,246,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translate(${offset.x * -8}px, ${offset.y * -8}px)`,
        }}
      />

      {/* 世界地図ドット + 通信ライン（パララックス中層） */}
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-40"
        animate={{ x: offset.x * -16, y: offset.y * -16 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
      >
        {LINKS.map(([a, b], i) => {
          const from = MAP_DOTS[a];
          const to = MAP_DOTS[b];
          if (!from || !to) return null;
          return (
            <line
              key={`link-${i}`}
              x1={from[0]}
              y1={from[1]}
              x2={to[0]}
              y2={to[1]}
              stroke="url(#linkGradient)"
              strokeWidth="0.12"
              strokeDasharray="1 1.5"
            >
              {!prefersReducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-10"
                  dur={`${6 + i}s`}
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}
        {MAP_DOTS.map(([x, y], i) => (
          <circle key={`dot-${i}`} cx={x} cy={y} r="0.35" fill="rgba(57,195,242,0.55)">
            {!prefersReducedMotion && (
              <animate
                attributeName="opacity"
                values="0.25;0.9;0.25"
                dur={`${2.5 + (i % 5) * 0.7}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
        <defs>
          <linearGradient id="linkGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(46,124,246,0.5)" />
            <stop offset="100%" stopColor="rgba(225,29,46,0.35)" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* 回転する円（レーダー風、パララックス前層） */}
      <motion.div
        className="absolute -right-[20vmin] -top-[20vmin] h-[70vmin] w-[70vmin]"
        animate={{ x: offset.x * -28, y: offset.y * -28 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
      >
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-signal-blue/15 [border-top-color:rgba(57,195,242,0.4)]" />
        <div className="absolute inset-[12%] animate-spin-slower rounded-full border border-dashed border-signal-blue/10" />
        <div className="absolute inset-[28%] animate-spin-slow rounded-full border border-white/5 [border-bottom-color:rgba(225,29,46,0.3)]" />
      </motion.div>

      <motion.div
        className="absolute -bottom-[25vmin] -left-[15vmin] h-[60vmin] w-[60vmin]"
        animate={{ x: offset.x * -20, y: offset.y * -20 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
      >
        <div className="absolute inset-0 animate-spin-slower rounded-full border border-signal-blue/10 [border-right-color:rgba(46,124,246,0.35)]" />
        <div className="absolute inset-[20%] animate-spin-slow rounded-full border border-dashed border-white/5" />
      </motion.div>

      {/* 下部のビネット（カードの可読性確保） */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-navy-950 to-transparent" />
    </div>
  );
}
