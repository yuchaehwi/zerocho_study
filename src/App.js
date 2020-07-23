import React, { PureComponent } from 'react';
import './App.css';

function getWinnumbers(){
   const candidate = Array(45).fill().map((v,i)=>i+1);
   const shuffle = [];
   while(candidate.length>0){
      shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
   }
   const bonusNumber = shuffle[shuffle.length-1];
   const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
   return [...winNumbers,bonusNumber];
}

class Lotto extends PureComponent {
   render() {
      return (
         <div></div>
      )
   }
};

export default Lotto;
