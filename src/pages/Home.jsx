import React from 'react';
import NavBar from './components/NavBar';
import styles from './CSS/Home.module.css';
import cards from '../JSON/CardsHome.json';
import { HomeCard } from './components/HomeCard';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className={styles.home}>
      <NavBar />
      <div className={styles.homeWrapper}>
        <div className={styles.homeSobre}>
          <div>
            <p>
              A ONTime é responsável por realizar agendamentos para empresas,
              microeemprendedores e prestadores de serviços.
            </p>
            <p>
              Aqui você encontrará um preço acessível, um ótimo atendimento e um
              serviço de ponta para o seu empreendimento!
            </p>
          </div>
        </div>
        <div className={styles.homePlanos}>
          <div className={styles.homeCards}>
            {cards.map((card, index) => (
              <div key={index}>
                <HomeCard card={card} index={index} />
              </div>
            ))}
          </div>
          <div className={styles.homePlanosSobre}>
            A ONTime possui três categorias de assinaturas, uma delas sendo até
            mesmo grátis! Verifique agora mesmo{' '}
            <Link to="/planos">clicando aqui!</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
