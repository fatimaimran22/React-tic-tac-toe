import './App.css'
import { useState } from 'react';

//*****TO REMEMBER****** things, components "use state".

function Square({value,onSquareClick}){

  //value stores the value 
  // setValue , a function to change the value. 
  // The null passed to useState is used as the initial value for this state variable, so value here starts off equal to null.

  //const[value,setValue]=useState(null)

  return <button className='square' onClick={onSquareClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay }){  // "export default" specifies the main component of the file

  //const[xIsNext,setXIsNext]=useState(true)
  //const[squares,setSquares]=useState(Array(9).fill(null))
  

  const winner=calculateWinner(squares)

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i){

    //to avoid overwritting
    if(squares[i] || calculateWinner(squares))
      return

    //array.slice() creates a shallow copy of the array.
    const nextSquares=squares.slice()
    if(xIsNext){
      nextSquares[i]='X'
    }
    else{
      nextSquares[i]='O'
    }
    // setSquares(nextSquares) //Update React state with the new array → triggers re-render.
    // setXIsNext(!xIsNext);

    onPlay(nextSquares)
  }

  return (  //used div to move or divide elements onto the next line
    <>
      <div className="status">{status}</div>
      <div className="boardRow"> 
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>

      <div className="boardRow"> 
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>

      <div className="boardRow"> 
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>

      
    </>
  );

  function calculateWinner(squares){
    const lines=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for(let i=0; i<8; i++){
      const[a,b,c]=lines[i]
      if(squares[a] && squares[a]==squares[b] && squares[a]==squares[c]){
        return squares[a]
      }
    }
    return null
  }
}

export default function Game(){

  
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]); 
  //const currentSquares = history[history.length - 1];
  const currentSquares = history[currentMove];
  //const [xIsNext, setXIsNext] = useState(true);
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares){
    //Copying previous and also keeping new one
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //setXIsNext(nextMove % 2 === 0);
  }

  //The map() to transform one array into another
  //state is each state at move(index) in history
  const moves = history.map((state, move) => {
    let description
    if(move>0)
      description = 'Go to move #' + move;
    else
      description = 'Go to game start';

    return (<li key={move}><button onClick={()=> jumpTo(move)}>{description}</button></li>)
  })

  return(//It’s strongly recommended that you assign proper keys whenever you build dynamic lists<ol>.
    <>
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  )
}


