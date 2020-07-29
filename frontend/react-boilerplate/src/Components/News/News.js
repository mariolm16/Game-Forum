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
                <h2>Will also have website updates :)</h2>
            </div>
        )
    }
}

export default News