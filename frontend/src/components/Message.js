import React from 'react'

function Message(props) {
    return (
        <div className="center rounded" style={{ background: props.color}}>
            <h4 className="py-3">{props.text}</h4>
        </div>
    )
}

Message.defaultProps = {
      color: "#d9534f"
}
export default Message
