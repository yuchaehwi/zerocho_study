import React, { useState, memo, useRef, PureComponent, useEffect, useMemo, useCallback } from 'react';
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

//useMemo : 복잡한 함수 결괏값을 기억
//useRef : 일반 값을 기억
//useCallback : 함수 자체를 기억

const Lotto = memo(() => {
   const lottoNumbers = useMemo(()=>getWinnumbers(),[]); //이후값이 들어가지 않는 이상 다시 불러지지 않는다
   const [winNumbers,setWinNumbers] = useState(lottoNumbers); //hooks는 매번 전부다 랜더링되기 때문에 getWinnumbers가 계속 불러와져서 문제가 생긴다
   const [winBalls,setWinBalls] = useState([]);
   const [bonus,setBonus] = useState(null);
   const [redo,setRedo] = useState(false);
   const timeouts = useRef([]);

   useEffect(()=>{
      for (let i = 0; i < winNumbers.length - 1; i++) {
         timeouts.current[i] = setTimeout(() => {
            setWinBalls((preWinBalls) => [...preWinBalls,winNumbers[i]])
         },(i+1)*1000);
      }
      timeouts.current[6] = setTimeout(()=>{
         setBonus(winNumbers[6]);
         setRedo(true);
      },7000)
      return () => {
         timeouts.current.forEach((v)=>{
            clearTimeout(v);
         })
      }
   },[timeouts.current]);

   const onClickRedo = () => { //자식컴포넌트에 함수를 전달할 때는 useCallback 사용필수
      setWinNumbers(getWinnumbers());
      setWinBalls([]);
      setBonus(null);
      setRedo(false);

      timeouts.current = [];
   }

   return (
      <React.Fragment>
         <div>당첨숫자</div>
         <div id="결과창">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
         </div>
         <div>보너스!</div>
         {bonus && <Ball number={bonus} />}
         {redo && <button onClick={onClickRedo}>한 번 더!</button>}
      </React.Fragment>
   )
});

// class Lotto extends PureComponent {
//    state = {
//       winNumbers: getWinnumbers(),
//       winBalls: [],
//       bonus: null,
//       redo: false
//    };
   

//    timeouts = [];

//    runTimeouts = () => {
//       const { winNumbers } = this.state;
//       for (let i = 0; i < winNumbers.length - 1; i++) {
//          this.timeouts[i] = setTimeout(() => {
//             this.setState((preState) => {
//                return {
//                   winBalls: [...preState.winBalls, winNumbers[i]]
//                }
//             })
//          },(i+1)*1000);
//       }
//       this.timeouts[6] = setTimeout(()=>{
//          this.setState({
//                bonus : winNumbers[6],
//                redo : true
//          });
//       },7000)
//    }

//    componentDidMount = () => {
//       this.runTimeouts();
//    }

//    componentDidUpdate = (prevProps, prevState) => {
//       if(this.state.winBalls.length === 0){
//          this.runTimeouts();
//       }
//    }

//    componentWillUnmount = () => {
//       this.timeouts.forEach((v)=>{
//          clearTimeout(v);
//       });
//    }

//    onClickRedo = () => {
//       this.setState({
//          winNumbers: getWinnumbers(),
//          winBalls: [],
//          bonus: null,
//          redo: false
//       });
//       this.timeouts = [];
//    }

//    render() {
//       const { winBalls, bonus, redo } = this.state;
//       return (
//          <React.Fragment>
//             <div>당첨숫자</div>
//             <div id="결과창">
//                {winBalls.map((v) => <Ball key={v} number={v} />)}
//             </div>
//             <div>보너스!</div>
//             {bonus && <Ball number={bonus} />}
//             {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
//          </React.Fragment>
//       )
//    }
// };

export default Lotto;

//반복문 기점으로 컴포넌트 분리