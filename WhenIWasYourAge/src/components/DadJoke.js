import React from 'react';
import axios from 'axios';

class DadJoke extends React.Component {

    constructor() {
        super();
        this.state = {
            joke: []
        }
    }

    async fetchDadJoke() {
        try {
            const jokes = await axios.get('https://icanhazdadjoke.com/', { headers: {
                'Accept': 'application/json'}})
        this.setState({
            joke: jokes.data.joke
        })
        console.log(jokes);
        } catch (error) {
            console.log(error.message);
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.year !== prevProps.year)
            this.fetchDadJoke();
    }

    render() {
        if (!this.state.joke.length) {
            return (
                <div>

                </div>
            )
        }

        return (
            <div className="dadjokes">
                <h3>Here's a complimentary dad joke 😂 </h3>
                <p>{this.state.joke}</p>
            </div>
        )

    }

}

export default DadJoke;