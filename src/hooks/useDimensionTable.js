import { useEffect, useState } from "react";

const useDimensionTable = () => {

  const [windowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      
      // let containerBody = document.querySelector('.app__container_body');

      // let newHeight = window.innerHeight - 90;
      let gridElement = document.querySelector('.k-widget.k-grid.grid');
      // var dataArea = gridElement.querySelector(".k-grid-container");


      var newHeight = window.innerHeight - 90;
      // let diffContainer = containerBody.clientHeight - newHeight;

      // console.log(diffContainer)

      // newHeight = newHeight - diffContainer;

      // var diff = gridElement.clientHeight - dataArea.clientHeight;
      //gridElement.height(newHeight);
      // dataArea.style.height = (newHeight - diff) + 'px';
      if (gridElement) {
        gridElement.style.height = `${newHeight}px`; 
      }
      // setWindowSize({
      //   width: window.innerWidth,
      //   height: newHeight
      // })
  
    }
  
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize())
  
  }, [])

  return { width: windowSize.width, height: windowSize.height }

}

export default useDimensionTable;
