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

function ListMotion({ items }) {
  return (
    <motion.ul
      className="flex flex-wrap w-full gap-5"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map(({ id, data }) => (
        <motion.li key={id} className="item" variants={item}>
          <Card
            badgeColor="lime"
            off={'$30'}
            price={'$20'}
            title={data.name}
            category={data.category}
            imgUrl={data.imgUrl}
          />
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default ListMotion
