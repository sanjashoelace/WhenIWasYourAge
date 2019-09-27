import React, { Component } from 'react';

class Form extends Component {
    constructor(props){
        super(props) 
        this.state = {
            oldAge: 0,
            birthday: 0,
            youngAge: 0,
            year: null
        }
        this.ChangeHandler = this.ChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getYear () {
        const currentYear = new Date().getFullYear();
        const ageDiff = this.state.oldAge - this.state.youngAge + parseInt(this.state.birthday);
        return currentYear - ageDiff;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.onYearFound( this.getYear() );
        this.setState({ year: this.getYear() });
    }

    ChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        if (this.state.year) {
            return (
                <div className="form clearfix">
                    <h2>...In {this.state.year}</h2>
                    <h3>The Top TV Shows Were:</h3>
                    <h3>The Top Songs Were:</h3>
                    <h3>The Top Movies Were:</h3>
                </div>
            )
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit} id='form1'>
                    <p>How old are you?</p>
                    <input type='number' name='oldAge' required onChange={this.ChangeHandler} />
                    <p>Have you celebrated your birthday yet this year? </p>
                    <input type='radio' name='birthday' value='0' required onChange={this.ChangeHandler} /> <label>Yes</label>
                    <input type='radio' name='birthday' value='1' required onChange={this.ChangeHandler} /> <label>No</label>
                    <p>How old is the kid? </p>
                    <input type='number' name='youngAge' required onChange={this.ChangeHandler} />
                </form>
                <button type="submit" form="form1" value="Submit">Submit</button>
            </div>
        )
    }
}

export default Form;