import React from 'react'

import "../../Css/News.css"



function ShowNews(props) {
    return (
        <div className="singleContainer">
            {props.newsSingle.map((news) => {
                return (
                    <div className="singleNews">
                        <a target="_blank" href={news.site_detail_url}><h3>{news.title}</h3></a>
                        <img src={news.image.square_small} alt="game" />
                        <h3>{news.lede}</h3>
                        <p>By {news.authors}</p>
                    </div>

                )
            })}
        </div>
    )
}

export default ShowNews;