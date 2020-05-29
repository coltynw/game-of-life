import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';

let numRows = 25; // setting initial values for these varibables we'll update later
let numCols = 25;
let numPix = 25;
let cellColor = 'gray';
let bgColor = 'white';
let borderColor = 'black';
let cellW = 25;
let cellH = 25;
let count = 0;
let time = 200;

const operations = [ // you need this later for checking the neighbors
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]


function App() {
  const [grid, setGrid] = useState(() => { // inside state
    const rows = []; // // making the grid for the first time
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  // console.log(grid);

  
const [running, setRunning] = useState(false);

const runningRef = useRef(); // you need useRef to accurately determine the value of is running
runningRef.current = running // the current value of Ref is whatever the value of running is

const generateEmptyGrid = () => {
  const rows = [];
    for (let i = 0; i < numRows; i++) { // iterate through all the cells with a for loop 
      rows.push(Array.from(Array(numCols), () => 0)); // then set them all to dead
    }
    count = 0; // also reset geration counter 
    return rows;
}

const runSimulation = useCallback (() => {
  if (!runningRef.current) {
    return;
  }
  // simulate 
  // somekindof set state logic to sim the update
  setGrid((g) => {
    return produce(g, gridCopy => { // produce will update the grid when I change gridCopy
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) { // go through every cell in the grid
          let neighbors = 0; // check neighbors
          operations.forEach(([x, y]) => { // check if out of bounds
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ <  numCols) {
              neighbors+= g[newI][newJ]
            }
          });
            // once we check neighbors, determine what happens
          if (neighbors < 2 || neighbors > 3) { // dying
            gridCopy[i][j] = 0
          } else if (g[i][j] === 0 && neighbors === 3) { //being born 
            gridCopy[i][j] = 1;
          }
        }
      }
    })
  })

  // then call ourselves again in 2nd parameter time
  setTimeout(runSimulation, time)
  count++
}, [])



  return (
    <>
    <button onClick={() =>{
      setRunning(!running);
      if (!running) {
      runningRef.current = true;
      count = 0;
      runSimulation();
    } 
    }}
    >{ running ? 'stop' : 'start'}
    </button>
    <button onClick={() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)));
      count = 0;
    }
    setGrid(rows);
    }}>
      20% seed
    </button>

    <button onClick={() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.6 ? 1 : 0)));
      count = 0;
    }
    setGrid(rows);
    }}>
      40% seed
    </button>

    <button onClick={() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.3 ? 1 : 0)));
    }
    setGrid(rows);
    }}>
      70% seed
    </button>

    <button onClick={( ) => {
      numRows = 25;
      numCols = 25;
      numPix = 25;
      cellColor = 'gray';
      bgColor = 'white';
      borderColor = 'black';
      cellW = 25;
      cellH = 25;
      count = 0;
      time = 200;
      setGrid(generateEmptyGrid());
    }}>
      RESET
    </button>

    <button onClick={( ) => {
      numRows = 50;
      numCols = 50;
      setGrid(generateEmptyGrid());
    }}>
      50x50
    </button>

    <button onClick={( ) => {
      numRows = 29;
      numCols = 64;
      setGrid(generateEmptyGrid());
    }}>
      widescreen
    </button>

    <button onClick={( ) => {
      numRows++;
      setGrid(generateEmptyGrid());
    }}>
      +row
    </button>

    <button onClick={( ) => {
      numCols++;
      setGrid(generateEmptyGrid());
    }}>
      +collum
    </button>

    <button onClick={( ) => {
      numRows++;
      numCols++;
      setGrid(generateEmptyGrid());
    }}>
      +both
    </button>

    <button onClick={( ) => {
      cellW++;
      cellH++;
      numPix = cellW
      setGrid(generateEmptyGrid());
    }}>
      bigger cells
    </button>

    <button onClick={( ) => {
      cellW--;
      cellH--;
      numPix = cellW
      setGrid(generateEmptyGrid());
    }}>
      smaller cells
    </button>

    <button onClick={( ) => {
       numPix++;
      setGrid(generateEmptyGrid());
    }}> 
          add width space?
    </button>   
    
    <button onClick={( ) => {
      time = 50;
      setGrid(generateEmptyGrid());
   }}>
     fast speed
   </button>

   <button onClick={( ) => {
      time = 500;
      setGrid(generateEmptyGrid());
   }}>
     slow speed
   </button>


    <button onClick={( ) => {
      if (bgColor === 'white')
      bgColor = 'gray';
       else bgColor = 'white';
       if (borderColor === 'black')
       borderColor = 'white';
        else borderColor = 'black';
      if (cellColor === 'gray')
      cellColor = 'black';
         else cellColor = 'gray';
      setGrid(generateEmptyGrid());
    }}>
      { bgColor === 'white' ? 'darkmode' : 'lightmode'}
    </button>

    <button onClick={() => {
    setGrid(generateEmptyGrid());
    }}>
      clear cells
    </button>
    <div 
    style ={{ 
      display: 'grid',
      gridTemplateColumns: `repeat(${numCols}, ${numPix}px)`
    }}
    > 
      {grid.map((rows, i) => 
        rows.map((col, j) => 
          <div 
            key={`${i}-${j}`} // we need the key for an ID on the cells to know if they are alive or dead
            onClick={() => { 
              // in order to change the state without making it mutable, I'm using immer 'produce function
              const newGrid = produce(grid, gridCopy => { 
                // immer will make this a mutable change and generate a new grid
                gridCopy[i][j] = grid[i][j] ? 0 : 1; // toggle dead/alive
              });
              setGrid(newGrid)
              // console.log('test')
            }}
              style={{
                width: cellW, 
                height: cellH, 
                backgroundColor: grid[i][j] ? `${cellColor}` : `${bgColor}`, 
                border: `solid 1px ${borderColor}`
            }} 
          />
        ))
      }
    </div>
    <h1>generation:{count}</h1>
    <p> Collums: {numCols}, Rows: {numRows}, Cells are {numPix}px, </p>
    <h2> About Conway's Game of Life</h2>
    <p>The Game of Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
    <p>A cell is born if</p>
    <ol>There are 3 live neighbours next to it</ol>
    <p>A cell dies if</p>
    <ol>It has fewer than 2 live neighbours to underpopulation, or more than 3 live neighbors to overpopulation</ol>
    </>
  );
}

export default App;
