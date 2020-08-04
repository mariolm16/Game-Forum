import React, { Component } from 'react';
import { callGamespot } from "../../Service/api_helper";
import moment from 'moment';

import "../../Css/News.css"

//Custom components
import ShowNews from './ShowNews';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        }
    }
    // fetching current and previous dates to pass on to Gamespot call
    // async componentDidMount() {
    //     const yesterday = await moment().subtract(1, 'days').format("YYYY-MM-DD")
    //     const today = await moment().format("YYYY-MM-DD")
    //     const news = await callGamespot(yesterday, today);
    //     this.setState({
    //         news,
    //     })
    // }

    render(props) {
        return (
            <div className="newsComp">
                {this.state.news ? (<ShowNews newsSingle={this.state.news} />) : (<p>Loading....</p>)}
                <p>News provided by Gamespot</p>
            </div>
        )
    }
}

export default News