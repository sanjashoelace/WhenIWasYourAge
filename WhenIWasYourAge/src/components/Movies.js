import React from 'react';
import axios from 'axios';
import { MOVIE_DB_API_KEY } from '../constants/api_keys'
import ReactLoading from 'react-loading';

class Movies extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: []
        }
    }

    async fetchMovies() {
        try {
            const movies = await axios.get('https://api.themoviedb.org/3/discover/movie', { params: { 'api_key': `${MOVIE_DB_API_KEY}`, 'language':'en-US', 'sort_by':'popularity.desc','include_adult':false , 'include_video':false , 'page':1 , 'year': 2000 , 'with_original_language':'en'}
            })
        this.setState({
            movies: movies.data.results
        });
        console.log(movies);
        } catch (error) {
        console.log(error.message);
        }
    }

    //movies image poster link: https://image.tmdb.org/t/p/w1280 poster_path
    // movie link: https://www.themoviedb.org/movie/ id



    renderMovies(){
        const TopMovies = this.state.movies.slice(0,10).map((movie) => {
            let poster = `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`;
            let link=`https://www.themoviedb.org/movie/${movie.id}`
            return (
                <div key={movie.id}>
                    <a href={link}>{movie.original_title}</a>
                    <a href={link}>
                        <img alt="" src={poster}></img>
                    </a>
                    <p>{movie.overview}</p>
                </div>
            )
        })
        return (
            <div>
                {TopMovies}
            </div>
        )
    }

    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.year !== prevProps.year)
            this.fetchMovies();
    }

    render() {
        if (!this.props.year) {
            return (
                <div>

                </div>
            ) } else if (!this.state.movies.length) {
            return (
                <div className="loading">
                    <ReactLoading className='center' type={'spinningBubbles'} color={'blue'} height={'50px'} width={'50px'} />
                </div>
            )
        }

        return (
            <div className="movies lists">
                {this.renderMovies()}
            </div>
        )

    }

}

export default Movies;