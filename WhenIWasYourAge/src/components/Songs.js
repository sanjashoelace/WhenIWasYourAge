import React from 'react';
import axios from 'axios';
import { LAST_FM_API_KEY } from '../constants/api_keys';
import ReactLoading from 'react-loading';

class Songs extends React.Component {

    constructor() {
        super();
        this.state = {
            songs: []
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

    componentDidUpdate(prevProps, prevState) {
        if (this.props.year !== prevProps.year)
            this.fetchTopTracks();
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

    render() {
        if (!this.props.year) {
            return (
                <div>

                </div>
            )
        } else if (!this.state.songs.length) {
            return (
                <div className="loading">
                    <ReactLoading className='center' type={'spinningBubbles'} color={'blue'} height={'50px'} width={'50px'} />
                </div>
            )
        }

        return (
            <div className="songs lists">
                {this.renderTopSongs()}
            </div>
        )
    }

}

export default Songs;