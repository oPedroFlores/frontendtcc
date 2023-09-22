import React from 'react'
import styles from '../CSS/Home.module.css'
import {motion} from 'framer-motion'

export const HomeCard = ({card}) => {
    const parent = {
        initialPosition: {right: 232 * card.index},
        variantStart: {right: 60 * card.index, rotate: 25 * card.index, top: card.index === 0 ? 0 : 40},
        variantA: {scale: 1.3, rotate: 0, right: card.index === 0 ? 0 : 140 * card.index, top: 0},
    }


  return (
    <motion.div className={`${styles.homeSingleCard}`}
    variants={parent} transition={{ duration: .5 }} 
    initial="initialPosition" animate="variantStart" whileHover="variantA" >
        <h3>{card.title}</h3>
        <p className={styles.cardMessage}>{card.message}</p>
        <p className={styles.cardWorkers}>{card.workers}</p>
        <p>{card.services}</p>
        <p className={styles.cardPrice}>{card.price !== "GRÁTIS" ? `R$${card.price}/mês` : `${card.price}`}</p>
        </motion.div>

  )
}
