import React, { Component } from 'react';


import { callGamespot } from "../../Service/api_helper";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {}
        }
    }

    async componentDidMount() {
        const news = await callGamespot();
        this.setState({
            news
        })
    }

    render(props) {
        return (
            <div>
                <h1>I am the news Component</h1>
                <img src="https://upload.wikimedia.org/wikipedia/en/4/4f/Under_construction.JPG" alt="construction" />
                <p>News provided by Gamespot.com</p>
            </div>
        )
    }
}

export default News