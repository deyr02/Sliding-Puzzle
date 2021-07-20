import React, { useEffect, useState } from 'react';
import BlockImage from './blockImage';

 
function Block(props) {
        const[width, setWidth] = useState(0);
        const[height, setHeight] = useState(0);

        useEffect(()=>{
          function buildBlock() {
            const boardWdith =  document.getElementsByClassName("board")[0].getBoundingClientRect().width;
            setWidth(boardWdith/props.gWidth);
            setHeight(boardWdith/props.gHeight);
          }
          window.addEventListener('load', buildBlock);
         window.addEventListener('resize', buildBlock);
          buildBlock();

          return() =>{
            window.removeEventListener("load", buildBlock);
            window.removeEventListener("resize", buildBlock);
          }
          
        });

        if(props.blockinfo.id === 0){
          return (
           <div 
            id = {props.blockinfo.id}
            className="canvas-block"
            style={{width:width, height:height}}
            onClick={props.blockinfo.id ===0? null: ()=> props.handleClick(props.blockinfo.id)}
        >
         
        </div> 
            
          );
        }

    return(
        <div 
            id = {props.blockinfo.id}
            className="canvas-block"
            style={{width:width, height:height}}
            onClick={props.blockinfo.id ===0? null: ()=> props.handleClick(props.blockinfo.id)}
        >
          <BlockImage
           bgimage = { props.blockinfo.id === 0? null: props.bgImage}
           imageheight = {height}
           imagewidth = {width}
            blockinfo = {props.blockinfo}
          ></BlockImage>
        </div>  
    );
}
export default Block;