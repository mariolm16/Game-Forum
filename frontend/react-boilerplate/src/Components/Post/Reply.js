import React from 'react';

function Reply(props) {
    return (
        <div>
            {props.replies.map((reply, _id) => {
                return (
                    <div key={_id}>
                        <h3>REPLY: {reply.reply}</h3>
                        <p>REPLY BY: {reply.username}</p>
                    </div>
                )

            })}
        </div>
    )
}

export default Reply;