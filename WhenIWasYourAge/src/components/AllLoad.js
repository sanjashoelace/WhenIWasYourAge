import React from 'react';
import axios from 'axios';
import { LAST_FM_API_KEY } from '../constants/api_keys';
import { MOVIE_DB_API_KEY } from '../constants/api_keys'
import ReactLoading from 'react-loading';

class LoadAll extends React.Component {

    constructor() {
        super();
        this.state = {
            songs: [],
            movies: [],
            tv: []
        }
    }

    async fetchTopTracks() {
        try {
            const songs = await axios.get('https://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks', { params: {
                'api_key': `${LAST_FM_API_KEY}`, 'tag': `${this.props.year}`, 'limit': 10, 'page': 1, 'format': 'json'

            }})
        this.setState({
            songs: songs.data.tracks.track
            
        })
        console.log(songs);
        } catch (error) {
            console.log(error.message)
        }
    }

    async fetchMovies() {
        try {
            const movies = await axios.get('https://api.themoviedb.org/3/discover/movie', { params: { 'api_key': `${MOVIE_DB_API_KEY}`, 'language':'en-US', 'sort_by':'popularity.desc','include_adult':false , 'include_video':false , 'page':1 , 'year': `${this.props.year}` , 'with_original_language':'en'}
            })
        this.setState({
            movies: movies.data.results
        });
        console.log(movies);
        } catch (error) {
        console.log(error.message);
        }
    }

    async fetchTV() {
        try {
            const tv = await axios.get('https://api.themoviedb.org/3/discover/tv', { params: { 'api_key': `${MOVIE_DB_API_KEY}`, 'language':'en-US', 'sort_by':'popularity.desc','include_adult':false , 'include_video':false , 'page':1, 'first_air_date_year': `${this.props.year}`, 'with_original_language':'en'}
            })
        this.setState({
            tv: tv.data.results
        })
        console.log(tv);
        } catch (error) {
        console.log(error.message);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.year !== prevProps.year) {
            this.fetchTopTracks();
            this.fetchMovies();
            this.fetchTV();
        }
    }

    renderTopSongs() {
        const songDetails = this.state.songs.map((singleSong) => {
            return (
                <div key={singleSong.mbid} className="songDetails">
                    <a href={singleSong.url}>{singleSong.name}</a>
                    <p className="by">By: {singleSong.artist.name}</p>
                </div>
            )
        })
        return (
            <div>
                {songDetails}
            </div>
        )
    }

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

    renderTVShows(){

        const TVShows = this.state.tv.slice(0, 10).map((show) => {
            let poster = `https://image.tmdb.org/t/p/w1280/${show.poster_path}`;
            let link = `https://www.themoviedb.org/tv/${show.id}`
            return (
                <div key={show.id}>
                    <a href={link}>{show.name}</a>
                    <a href={link}>
                        <img alt="" src={poster}></img>
                    </a>
                    <p>{show.overview}</p>
                </div>
            )
        })
        return (
            <div>
                {TVShows}
            </div>
        )
    }
    
    render() {
        if (!this.props.year) {
            return (
                <div>

                </div>

            ) 
        
            } else if (!this.state.movies.length || !this.state.tv.length || !this.state.songs.length) {
                return (
                    <div className="loading">
                        <ReactLoading className='center' type={'spinningBubbles'} color={'blue'} height={'50px'} width={'50px'} />
                    </div>
                )
            }

            return (
            <div className="outter tall">
                <div className="clearfix scroll">
                    <div className="movies lists">
                        {this.renderTVShows()}
                    </div>
                    <div className="movies lists">
                        {this.renderTopSongs()}
                    </div>
                    <div className="movies lists">
                        {this.renderMovies()}
                    </div>
                </div>
            </div>
        )

    }

}

export default LoadAll