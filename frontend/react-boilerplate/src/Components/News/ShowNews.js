import React from 'react'

function ShowNews(props) {
    return (
        <div>
            {props.newsSingle.map((news) => {
                return (
                    <div>
                        <img src={news.image.square_small} alt="game" />
                        <a href={news.site_detail_url}><h3>{news.title}</h3></a>
                        <p>{news.lede}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ShowNews;