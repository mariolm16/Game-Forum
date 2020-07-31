import React, { Component } from 'react';


class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: ""
        }
    }

    render(props) {
        return (
            <div>
                <h1>I am the news Component</h1>
                <img src="https://upload.wikimedia.org/wikipedia/en/4/4f/Under_construction.JPG" alt="construction" />
            </div>
        )
    }
}

export default News