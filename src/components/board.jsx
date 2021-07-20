import React, { Component } from 'react';
import Block from './block';
class Board extends Component {
    state = {  }
       
    render() { 
        const blocks = this.props.blockList.map(( data, i)=>{
            return(
                <Block
                key= {i}
                 blockinfo = {this.props.blockList[i]}
                 gWidth = {this.props.level.gridWidth}
                 gHeight = {this.props.level.gridHeight}
                 bgImage = {this.props.level.imageUrl}
                 handleClick ={this.props.handleClick}
                >

                </Block>
            );

        });

        return (
            <div className= "board">
                <div id="blocks">
                {blocks} 

                </div>
                <img 
                id="board-img"
                alt = {"sliding Puzzle"} 
                src={this.props.level.imageUrl} />
            </div>
          );
    }
}
 
export default Board;