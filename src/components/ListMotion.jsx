import React from 'react'
import { motion } from 'framer-motion'
import Card from './Card'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

function ListMotion({ items, blog }) {
  return (
    <motion.ul
      className="flex flex-wrap justify-center w-full listMotion"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map(({ id, data }) => (
        <motion.li key={id} className="item" variants={item}>
          <Card
            id={id}
            title={data.name || data.title}
            category={data.category}
            imgUrl={data.imgUrl || data.imgUrls}
            linked={blog}
          />
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default ListMotion
