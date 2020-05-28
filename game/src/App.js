import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';

let numRows = 25;
let numCols = 25;
let numPix = 25;
let cellColor = 'black';
let bgColor = 'gray';
let borderColor = 'white';
let cellW = 25;
let cellH = 25;

const operations = [
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
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  console.log(grid);

  
const [running, setRunning] = useState(false);

const runningRef = useRef();
runningRef.current = running // the current value of Ref is whatever the value of running is

const generateEmptyGrid = () => {
  const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

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
  setTimeout(runSimulation, 200)
}, [])



  return (
    <>
    <button onClick={() =>{
      setRunning(!running);
      if (!running) {
      runningRef.current = true;
      runSimulation();
    } 
    }}
    >{ running ? 'stop' : 'start'}
    </button>
    <button onClick={() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)));
    }

    setGrid(rows);
    }}>
      20% seed
    </button>
    <button onClick={() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.6 ? 1 : 0)));
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
      setGrid(generateEmptyGrid());
    }}>
      25x25
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
      cellW = 50;
      cellH = 50;
      numPix = cellW
      setGrid(generateEmptyGrid());
    }}>
      big cells
    </button>
    <button onClick={( ) => {
      cellW = 25;
      cellH = 25;
      numPix = cellW
      setGrid(generateEmptyGrid());
    }}>
      normal cells
    </button>
    <button onClick={( ) => {
      cellW = 10;
      cellH = 10;
      numPix = cellW
      setGrid(generateEmptyGrid());
    }}>
      small cells
    </button>
    <button onClick={( ) => {
      if (numPix === 25)
       numPix = 30;
       else numPix = 25;
      setGrid(generateEmptyGrid());
    }}>
      spaces
    </button>
    <button onClick={( ) => {
      if (bgColor === 'gray')
      bgColor = 'white';
       else bgColor = 'gray';
       if (borderColor === 'white')
       borderColor = 'black';
        else borderColor = 'white';
      if (cellColor === 'black')
      cellColor = 'gray';
         else cellColor = 'black';
      setGrid(generateEmptyGrid());
    }}>
      whitemode
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
            key={`${i}-${j}`}
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
                backgroundColor: grid[i][j] ? `${cellColor}` : `${bgColor}`, // set gray to undefined for default
                border: `solid 1px ${borderColor}`
            }} 
          />
        ))
      }}
    </div>
    </>
  );
}

export default App;
