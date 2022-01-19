import React from 'react';

const Boardui = () => {
  let boardUi =[];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      boardUi.push(
         <div className='td'>[{i},{j}]</div>
      ); 
    }    
 }
  return (
    <div id = "board">
      {boardUi}
    </div>
  );
}

export default Boardui;
