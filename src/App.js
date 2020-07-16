import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button'

let numRows = 20; // setting initial values for these varibables we'll update later
let numCols = 25;
let numPix = 25;
let cellColor = 'gray';
let bgColor = 'white';
let borderColor = 'black';
let cellW = 25;
let cellH = 25;
let count = 0;
let time = 200;
let showAbout = 'none'
let footer = `30vh`


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
    <div style={{
      backgroundColor: `${bgColor}`,
      paddingTop: `10px`,
    }}>
      <h1 style={{
        color: `${borderColor}`
      }}>
         Coltyn's Game of Life
         </h1>
    <p style={{
      color: `${borderColor}`
    }}>Generation: {count}</p>
    <div style={{
      marginBottom: `2px`,
      marginLeft: `10vw`,
      marginRight: `10vw`,
      display: `flex`,
      justifyContent: `center`,
    }}>
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }} onClick={() =>{
      setRunning(!running);
      if (!running) {
      runningRef.current = true;
      count = 0;
      runSimulation();
    } 
    }}
    >{ running ? 'Stop' : 'Start'}
    </button>
    
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0)));
      count = 0;
    }
    setGrid(rows);
    }}>
      20% Seed
    </button>

    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.6 ? 1 : 0)));
      count = 0;
    }
    setGrid(rows);
    }}>
      40% Seed
    </button>

    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => (Math.random() > 0.3 ? 1 : 0)));
    }
    setGrid(rows);
    }}>
      70% Seed
    </button>

    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }} onClick={( ) => {
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
          <div></div>
      { bgColor === 'white' ? 'Darkmode' : 'Lightmode'}
    </button>{' '}
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={() => {
    setGrid(generateEmptyGrid());
    }}>
      Clear Cells
    </button>
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
    }}onClick={( ) => {
      numRows = 20;
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
      Reset
    </button>
    </div>

    <div style={{
      marginBottom: `2px`,
      marginLeft: `10vw`,
      marginRight: `10vw`,
      display: `flex`,
      justifyContent: `center`,
    }}>
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      numRows = 50;
      numCols = 50;
      setGrid(generateEmptyGrid());
    }}>
      50x50
    </button>

    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      numRows = 29;
      numCols = 64;
      setGrid(generateEmptyGrid());
    }}>
      Widescreen 
    </button>

    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      numRows++;
      setGrid(generateEmptyGrid());
    }}>
      +Row
    </button>
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      numRows--;
      setGrid(generateEmptyGrid());
    }}>
      -Row
    </button>

    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      numCols++;
      setGrid(generateEmptyGrid());
    }}>
      +Column
    </button>
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      numCols--;
      setGrid(generateEmptyGrid());
    }}>
      -Column
    </button>

    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      numRows++;
      numCols++;
      setGrid(generateEmptyGrid());
    }}>
      +Both
    </button>
    </div>
    <div style={{
      marginBottom: `2px`,
      marginLeft: `10vw`,
      marginRight: `10vw`,
      display: `flex`,
      justifyContent: `center`,
    }}>
    <div></div>
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }} onClick={( ) => {
      cellW++;
      cellH++;
      numPix = cellW
      setGrid(generateEmptyGrid());
    }}>
      Bigger cells
    </button>

    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      cellW--;
      cellH--;
      numPix = cellW
      setGrid(generateEmptyGrid());
    }}>
      Smaller cells
    </button>

    {/* <button onClick={( ) => {
       numPix++;
      setGrid(generateEmptyGrid());
    }}> 
          Increase Space between Cells
    </button>    */}
        <div></div>
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      time = 50;
      setGrid(generateEmptyGrid());
   }}>
     Fast speed
   </button>

   <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginRight: `2px`,
    }}onClick={( ) => {
      time = 500;
      setGrid(generateEmptyGrid());
   }}>
     Slow speed
   </button>
   </div>
      

   <div></div>
    <div 
    class="grid"
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
    <p style={{
      color: `${borderColor}`
    }}> Collums: {numCols}, Rows: {numRows}, Cells are {numPix}px </p>
    <button style={{
           	boxShadow: `inset 0px -3px 7px 0px ${cellColor}`,
             background:`${cellColor}`,
             backgroundColor:`${cellColor}`,
             borderRadius:`3px`,
             border:`1px solid #0b0e07`,
             display:`inline-block`,
             cursor:`pointer`,
             color:`#ffffff`,
             fontFamily:`Arial`,
             fontSize:`15px`,
             padding:`9px 23px`,
             textDecoration:`none`,
             textShadow:`0px 1px 0px #263666`,
             marginBottom: `${footer}`,
    }}
    onClick={() => {
      if (showAbout === 'none')
      showAbout = 'contents';
       else showAbout = 'none';
      if (footer === '30vh')
      footer = '0';
       else footer = '30vh';
       setGrid(generateEmptyGrid());
    }}>Toggle About Section</button>
    <div style={{
      display: `${showAbout}`,
      border:`solid 1px ${borderColor}`,
      backgroundColor: `yellow`,
      color: `${borderColor}`,
    }}
    >
    <h2> About Conway's Game of Life</h2>
    <p>The Game of Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
    <p>A cell is born if:</p>
    <ol>There are 3 live neighbours next to it</ol>
    <p>A cell dies if:</p>
    <ol style={{
      marginBottom:`20px`,
    }}>It has fewer than 2 live neighbours to underpopulation, or more than 3 live neighbors to overpopulation</ol>
    </div>
    </div>
  );
}

export default App;
