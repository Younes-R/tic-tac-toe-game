
import { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <div className='main'>
      <Board />
    </div>
  );
}

function Square({content, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>{content}</button>
  )
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squaresContent, setSquaresContent] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  function handleSquareClick(i) {
    let squares = squaresContent;
    if (squares[i] == null && !winner) {
      if (xIsNext) {
        squares[i] = 'X';
        setXIsNext(false);
      } else {
        squares[i] = 'O';
        setXIsNext(true);
      }
      setSquaresContent(squares);

      setWinner(whoIsWinner(squaresContent));

      console.log('winner1: ' + winner);

      console.log(whoIsWinner(squaresContent));
      console.log('winner2: ' + winner);

    }
  }
  function whoIsWinner(squaresContent) {
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8]
    ];
    let [a, b, c] = patterns[0];
    for (let i = 0; i < 8; i++) {
      [a, b, c] = patterns[i];
      if(squaresContent[a] != null && squaresContent[a] == squaresContent[b] && squaresContent[a] == squaresContent[c]) {
        return squaresContent[a];
      }   
    } 
  }

  function refresh() {
    setSquaresContent(Array(9).fill(null));
    setWinner(null);
  }

  return (
    <>
    <div className='board'>
      <Square content={squaresContent[0]} onSquareClick={() => {handleSquareClick(0)}} />
      <Square content={squaresContent[1]} onSquareClick={() => {handleSquareClick(1)}} />
      <Square content={squaresContent[2]} onSquareClick={() => {handleSquareClick(2)}} />
      <Square content={squaresContent[3]} onSquareClick={() => {handleSquareClick(3)}} />
      <Square content={squaresContent[4]} onSquareClick={() => {handleSquareClick(4)}} />
      <Square content={squaresContent[5]} onSquareClick={() => {handleSquareClick(5)}} />
      <Square content={squaresContent[6]} onSquareClick={() => {handleSquareClick(6)}} />
      <Square content={squaresContent[7]} onSquareClick={() => {handleSquareClick(7)}} />
      <Square content={squaresContent[8]} onSquareClick={() => {handleSquareClick(8)}} />
    </div>
    <div className={`result ${winner ? '' : 'display'}`}>
      <p>The Winner is: {winner}</p>
    </div> 
    <button className={`refresh ${winner ? '' : 'display'}`} onClick={() => {refresh()}}>Play again !</button>
    <div className={`result ${(!squaresContent.includes(null) && !winner) ? '' : 'display'}`}>
      <p>No Winner </p>
    </div>
    <button className={`refresh ${(!squaresContent.includes(null) && !winner) ? '' : 'display'}`} onClick={() => {refresh()}}>Play again !</button>
    </>
  )
}




