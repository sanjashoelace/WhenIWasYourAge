import React from 'react';
import axios from 'axios';
import { MOVIE_DB_API_KEY } from '../constants/api_keys'
import ReactLoading from 'react-loading';


class TV extends React.Component {

    constructor() {
        super();
        this.state = {
            tv: []
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

    //tv image poster link: https://image.tmdb.org/t/p/w1280 poster_path
    //tv link: https://www.themoviedb.org/tv/ id
    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.year !== prevProps.year)
            this.fetchTV();
    }

    render() {
        if (!this.props.year) {
            return (
                <div>

                </div>
        ) } else if (!this.state.tv.length) {
            return (
                <div className="loading">
                    <ReactLoading className='center' type={'spinningBubbles'} color={'blue'} height={'50px'} width={'50px'} />
                </div>
            )
        }
        return (
            <div className="tv lists">
                {this.renderTVShows()}
            </div>
        )

    }

}

export default TV;