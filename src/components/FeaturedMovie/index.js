import React from 'react';
import './FeaturedMovie.css';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';

export default function FeaturedMovie({item}) {

    let year = new Date(item.first_air_date);
    let genres = [];

    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if (description.length > 200) {
        description = description.substring(0, 200) +'...';
    }
 
    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured-vertical">
                <div className="featured-horizontal">
                    <div className="featured-name">{item.original_name}</div>
                
                    <div className="featured-info">
                        <div className="featured-points">{item.vote_average} pontos</div>
                        <div className="featured-year">{year.getFullYear()}</div>
                        <div className="featured-seasons">{item.number_of_seasons} temporadas</div>
                    </div>
                    <div className="featured-description">{description}</div>
                    <div className="featured-buttons">
                        <a href={`/watch/${item.id}`} className="btn-featured-watch">
                            <div className="btn-content">
                                <PlayArrowIcon /> Assistir
                            </div>
                        </a>
                        <a href={`/list/add/${item.id}`} className="btn-featured-mylist">
                            <div className="btn-content">
                                <AddIcon /> Minha Lista
                            </div>
                        </a>
                    </div>
                    <div className="featured-genres"><strong>G??neros: </strong>{genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}
