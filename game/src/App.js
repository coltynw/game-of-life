import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';

const numRows = 25;
const numCols = 25;

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
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.6 ? 1 : 0)));
    }

    setGrid(rows);
    }}>
      random
    </button>
    <button onClick={() => {
    setGrid(generateEmptyGrid());
    }}>
      clear
    </button>
    <div 
    style ={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numCols}, 25px)`
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
                width: 25, 
                height: 25, 
                backgroundColor: grid[i][j] ? 'black' : 'gray', // set gray to undefined for default
                border: 'solid 1px white'
            }} 
          />
        ))
      }}
    </div>
    </>
  );
}

export default App;
