import React,{PureComponent, memo} from 'react';

const Ball = memo(({number})=>{
   let background;
      if(number<=10){
         background = 'red';
      } else if(number<=20){
         background = 'orange';
      } else if(number<=30){
         background = 'yellow';
      } else if(number<=40){
         background = 'blue'
      } else {
         background = 'green'
      }

      return (
         <div className="ball" style={{background}}>{number}</div>
      );
});

// class Ball extends PureComponent{
//    reder(){
//       const { number } = this.props;
//       let background;
//       if(number<=10){
//          background = 'red';
//       } else if(number<=20){
//          background = 'orange';
//       } else if(number<=30){
//          background = 'yellow';
//       } else if(number<=40){
//          background = 'blue'
//       } else {
//          background = 'green'
//       }

//       return (
//          <div className="ball" style={{background}}>{number}</div>
//       );
//    }
// }

export default Ball;

//state를 사용하지 않는 경우는 함수 컴포넌트로 작성해주는 것이 편함
//useState를 사용하지 않으면?? 함수형으로 작성해도 hooks가 아님