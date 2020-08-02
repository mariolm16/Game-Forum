import React, { Component } from 'react';
import moment from 'moment';


import { callGamespot } from "../../Service/api_helper";
import ShowNews from './ShowNews';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            currentTime: ''
        }
    }

    async componentDidMount() {
        const yesterday = await moment().subtract(1, 'days').format("YYYY-MM-DD")
        const today = await moment().format("YYYY-MM-DD")
        const news = await callGamespot(yesterday, today);
        this.setState({
            news,
        })
    }




    render(props) {
        return (
            <div>
                {this.state.news ? (<ShowNews newsSingle={this.state.news} />) : (<p>Loading....</p>)}
                <p>News provided by Gamespot.com</p>
            </div>
        )
    }
}

export default News