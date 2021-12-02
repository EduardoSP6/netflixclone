import React, { useEffect, useState } from 'react';
import './App.css';

import Header from './components/Header';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

import tmdb from './tmdb';

import loadingImg from '../src/assets/images/loading.gif';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // lista de filmes
      let movies = await tmdb.getHomeList();
      setMovieList(movies);

      // filme em destaque
      let originals = movies.filter(i => i.slug === "originals");
      let randChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let movie = originals[0].items.results[randChosen];
      let movieInfo = await tmdb.getMovieInfo(movie.id, 'tv');
      
      if (movieInfo) {
        setFeaturedData(movieInfo);
      }
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
          <span>Desenvolvido por Eduardo Sales (eduardo.sp6@gmail.com)</span>
          <p>Direitos de imagem para Netflix</p>
          Dados obtidos de <a href="https://themoviedb.org" target="_blank">themoviedb.org</a>
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src={loadingImg} alt="Carregando" />
        </div>
      }    
    </div>
  );
}
