"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import classes from "./Rotate.module.css" // как у тебя


export default function RotateImage({ images, intervalMs = 2500 }) {
  const list = useMemo(
    () =>
      (images || [])
        .map((x) => (typeof x === "string" ? x : x.src))
        .filter(Boolean),
    [images]
  )

  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (list.length <= 1) return
    const id = window.setInterval(() => {
      setIdx((v) => (v + 1) % list.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [list.length, intervalMs])

  const currentSrc = list[idx]

  return (
    // <div className={classes.imageWrap}>
        <AnimatePresence mode="wait">
            <motion.img
                key={currentSrc}
                src={currentSrc}
                alt=""
                className={classes.img}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
        </AnimatePresence>
    // </div>
  )
}