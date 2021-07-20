import React, { Component } from 'react';
class MessageBox extends Component {
    state = {  }
    render() { 
        let messageStyle = "message "+ this.props.messageType;
        return (
            <div className="message-box">
                <div className={messageStyle}>{this.props.textMessage}</div>
            </div>
          );
    }
}
 
<div className="message-box">

</div>
export default MessageBox;