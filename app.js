const timeLeftDisplay=document.querySelector('#time-left')
const resultDisplay=document.querySelector('#result')
const StartPauseButton=document.querySelector('#start-pause-button')
const squares=document.querySelectorAll('.grid div')
const logleft=document.querySelectorAll('.log-left')
const logright=document.querySelectorAll('.log-right')
const carleft=document.querySelectorAll('.car-left')
const carright=document.querySelectorAll('.car-right')

let currentIndex=76;
const width=9
let timerId
let currentTimer=10
let outcomeTimerId;


const moveFrog=(e)=>{
 squares[currentIndex].classList.remove('frog')
 switch(e.key){
	 case 'ArrowLeft':
		 if(currentIndex % width !==0)
		 currentIndex-=1
		 break
	 case 'ArrowRight':
		 if(currentIndex % width < width-1)
		 currentIndex+=1
		 break
	 case 'ArrowUp':
		 if(currentIndex-width >=0)
		 currentIndex-=width
		 break
	 case 'ArrowDown':
		 if(currentIndex+width < width * width)
		 currentIndex+=width
		 break
 }	
 squares[currentIndex].classList.add('frog')
}





function autoMoveLog(){
currentTimer--
timeLeftDisplay.textContent=currentTimer
logleft.forEach(logLeft => moveLogLeft(logLeft))
logright.forEach(logRight => moveLogRight(logRight))
carleft.forEach(carLeft => movecarLeft(carLeft))
carright.forEach(carRight => movecarRight(carRight))
}

function checkOutcome(){
loose()
}


function moveLogLeft(logLeft){
   switch(true){
	   case logLeft.classList.contains('l1'):
		   logLeft.classList.remove('l1')
		   logLeft.classList.add('l2')
		   break
	   case logLeft.classList.contains('l2'):
		   logLeft.classList.remove('l2')
		   logLeft.classList.add('l3')
		   break
	   case logLeft.classList.contains('l3'):
		   logLeft.classList.remove('l3')
		   logLeft.classList.add('l4')
		   break
	   case logLeft.classList.contains('l4'):
		   logLeft.classList.remove('l4')
		   logLeft.classList.add('l5')
		   break
	   case logLeft.classList.contains('l5'):
		   logLeft.classList.remove('l5')
		   logLeft.classList.add('l1')
		   break
   }
}


function moveLogRight(logRight){
   switch(true){
	   case logRight.classList.contains('l1'):
		   logRight.classList.remove('l1')
		   logRight.classList.add('l5')
		   break
	   case logRight.classList.contains('l2'):
		   logRight.classList.remove('l2')
		   logRight.classList.add('l1')
		   break
	   case logRight.classList.contains('l3'):
		   logRight.classList.remove('l3')
		   logRight.classList.add('l2')
		   break
	   case logRight.classList.contains('l4'):
		   logRight.classList.remove('l4')
		   logRight.classList.add('l3')
		   break
	   case logRight.classList.contains('l5'):
		   logRight.classList.remove('l5')
		   logRight.classList.add('l4')
		   break
   }
}




function movecarLeft(carLeft){
   switch(true){
	   case carLeft.classList.contains('c1'):
		   carLeft.classList.remove('c1')
		   carLeft.classList.add('c2')
		   break
	   case carLeft.classList.contains('c2'):
		   carLeft.classList.remove('c2')
		   carLeft.classList.add('c3')
		   break
	   case carLeft.classList.contains('c3'):
		   carLeft.classList.remove('c3')
		   carLeft.classList.add('c1')
		   break
	      }
}


function movecarRight(carRight){
   switch(true){
	   case carRight.classList.contains('c1'):
		   carRight.classList.remove('c1')
		   carRight.classList.add('c3')
		   break
	   case carRight.classList.contains('c2'):
		   carRight.classList.remove('c2')
		   carRight.classList.add('c1')
		   break
	   case carRight.classList.contains('c3'):
		   carRight.classList.remove('c3')
		   carRight.classList.add('c2')
		   break
	     }
}




function loose(){
   if(squares[currentIndex].classList.contains('c1') || squares[currentIndex].classList.contains('l4') || squares[currentIndex].classList.contains('l5') || currentTimer === 0 ){
    resultDisplay.textContent='You Lose'
	clearInterval(timerId)
	clearInterval(outcomeTimerId)
	squares[currentIndex].classList.remove('frog')
	document.removeEventListener('keyup',moveFrog)
   }
   else{
    if(squares[currentIndex].classList.contains('ending-block')){
    resultDisplay.textContent='You Win' 
    clearInterval(timerId)
	clearInterval(outcomeTimerId)
	squares[currentIndex].classList.remove('frog')
	document.removeEventListener('keyup',moveFrog)
   }
   }
}




	
const startPause=()=>{
  if(timerId){
     clearInterval(timerId)
	 clearInterval(outcomeTimerId)
	 timerId=null
     currentTimer=null
	 document.removeEventListener('keyup',moveFrog )
	 
	 
  } 
  else{
	timerId=setInterval(autoMoveLog,500)
	outcomeTimerId = setInterval(checkOutcome,50)
	document.addEventListener('keyup',moveFrog )
	}
}

StartPauseButton.addEventListener('click',startPause)


const checkForEnter=(e)=>{
   if(e.keyCode === 13){
    startPause()
	document.removeEventListener('keypress',checkForEnter)
   }
}


document.addEventListener('keypress',checkForEnter)

