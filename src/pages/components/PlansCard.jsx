import React from 'react'
import styles from '../CSS/Planos.module.css'
import { Link } from 'react-router-dom'

const PlansCard = ({card}) => {
  return (
    <>
    <p className={styles.planTitle}>{card.title}</p>
    <p className={styles.planDesc}>{card.message}</p>
    <div>
        <p>{card.workers}</p>
        <p>{card.services}</p>
    </div>
    <p className={styles.planPrices}>{card.price !== "GRÁTIS" ? `R$${card.price}/mês` : `${card.price}`}</p>
        <Link to="/login" className={styles.planButton}>Assinar agora!</Link>
    </>
  )
}

export default PlansCard