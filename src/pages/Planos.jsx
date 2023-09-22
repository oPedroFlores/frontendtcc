import React from 'react';
import NavBar from './components/NavBar';
import styles from './CSS/Planos.module.css'
import plans from '../JSON/CardsHome.json'
import PlansCard from './components/PlansCard';
import {motion} from 'framer-motion'

const Planos = () => {



  return (
    <>
      <NavBar />
      <section className={styles.sectionPlanos}>
      
      {plans.map((card, index) => (
            <motion.div key={index} className={styles.cardPlan}    
            transition={{ duration: .7 }} 
            initial={{right: 800 + (250 *index)}}
            animate={{right: 0}}  >
              <PlansCard card={card} index={index} />
            </motion.div>
          ))}
      </section>
    </>
  );
};

export default Planos;
