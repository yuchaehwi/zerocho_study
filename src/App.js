import React, { PureComponent } from 'react';
import './App.css';
import Ball from './Ball';

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
   state = {
      winNumbers : getWinnumbers(),
      winBalls : [],
      bonus : null,
      redo : false
   };
   

   timeouts = [];

   runTimeouts = () => {
      const { winNumbers } = this.state;
      for (let i = 0; i < winNumbers.length - 1; i++) {
         this.timeouts[i] = setTimeout(() => {
            this.setState((preState) => {
               return {
                  winBalls: [...preState.winBalls, winNumbers[i]]
               }
            })
         },(i+1)*1000);
      }
      this.timeouts[6] = setTimeout(()=>{
         this.setState({
               bonus : winNumbers[6],
               redo : true
         });
      },7000)
   }

   componentDidMount = () => {
      this.runTimeouts();
   }

   componentDidUpdate = (prevProps, prevState) => {
      if(this.state.winBalls.length === 0){
         this.runTimeouts();
      }
   }

   componentWillUnmount = () => {
      this.timeouts.forEach((v)=>{
         clearTimeout(v);
      });
   }

   onClickRedo = () => {
      this.setState({
         winNumbers: getWinnumbers(),
         winBalls: [],
         bonus: null,
         redo: false
      });
      this.timeouts = [];
   }

   render() {
      return (
         <div></div>
      )
   }
};

export default Lotto;
