import React, { Component } from 'react';
import Header from './components/Header'
import Form from './components/Form'
// import Songs from './components/Songs';
// import TV from './components/TV'
// import Movies from './components/Movies'
import AllLoad from './components/AllLoad'
import DadJoke from './components/DadJoke'
import './styles/styles.scss';

class App extends Component {

  constructor(){
    super()
    this.state = {
      year: 0
    }
    
  }

  onYearFound = (yearData) => {
    console.log(yearData);
    this.setState({ year: yearData});
  }

  render() {
    return (
      <main className="wrapper">
          <Header />
          <Form onYearFound={this.onYearFound} />
          {/* <div className="outter tall">
            <div className="clearfix scroll">
              <TV year={this.state.year} />
              <Songs year={this.state.year} />
              <Movies year={this.state.year} />
              <div className="emptydiv"></div>
            </div>
          </div> */}
          <AllLoad year={this.state.year} />
          <DadJoke year={this.state.year} />
      </main>
    )
  }
}


export default App;