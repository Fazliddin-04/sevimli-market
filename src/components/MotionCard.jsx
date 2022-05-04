import React from 'react'
import { motion } from 'framer-motion'

function MotionCard({
  layoutId,
  onClick,
  imgUrl,
  title,
  category,
  price,
  off,
}) {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="w-full h-full bg-slate-200 rounded-3xl flex items-center shadow-xl text-black"
    >
      <motion.button
        onClick={onClick}
        className="absolute bg-gray-500 w-10 h-10 rounded-full right-1 top-1 text-white"
      >
        X
      </motion.button>
      <motion.div className="flex justify-center flex-1 h-2/3 mb-8">
        <img src={imgUrl} alt="" />
      </motion.div>
      <motion.div className="flex-1">
        <motion.h3 className="text-4xl font-semibold mb-4">{title}</motion.h3>
        <motion.div className="flex items-center gap-6">
          <motion.div className="uppercase font-bold text-emerald-500 bg-emerald-500/10 px-4 h-10 flex items-center rounded-full">
            {category}
          </motion.div>
          <motion.h3 className="text-2xl font-semibold">{price}</motion.h3>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MotionCard
