import React, { useRef, useEffect} from  'react';





const BlockImage = props => {
  
  const canvasRef = useRef(null);
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const img = new Image();
    img.onload = ()=>{
   //context.drawImage(img, props.blockinfo.x, props.blockinfo.y, props.blockinfo.width, props.blockinfo.height, 0, 0, props.imagewidth, props.imageheight );
   if(props.id !==0){
   context.drawImage(img, props.blockinfo.x, props.blockinfo.y, props.blockinfo.width, props.blockinfo.height, 0, 0, 300, 150 );

   }

    }
    img.src = props.bgimage;
    //console.log(document.getElementsByClassName("board")[0].getBoundingClientRect().width);



  });

  return <canvas  className={"block-image"}
   ref={canvasRef} />
}

export default BlockImage;