import './App.css';
import { createElement } from 'react';
import './numPick.css';
// import initPuzzle from './sudokuPuzzleGenerator';

const focusColorOnly = 'rgb(253, 202, 148)'; 
const focusColor = focusColorOnly + ' none repeat scroll 0% 0% / auto padding-box border-box';

let startTime = 0;
let currentTime = 0;
let boardSize = 9;
let pickFromPuzzles = [];

let answerPuzzle = [['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0']
                    ];

let sudokuPuzzle = [['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0', '0', '0', '0', '0']
                    ];

var sudokuChoices = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'Pen', 'New'];

let isCandidate = false;

// var sudokuPuzzle = [['0', '4', '0', '6', '0', '0', '9', '0', '3', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '0', '0', '3', '0', '2', '0', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '7', '0', '0', '8', '0', '0', '0', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '1', '6', '0', '0', '0', '5', '9', '0', '9', '11', '4', '7', '4', '3', '2'],
//                     ['7', '8', '2', '1', '0', '0', '0', '0', '6', '9', '11', '4', '7', '4', '3', '2'],
//                     ['3', '0', '0', '2', '6', '0', '0', '8', '7', '9', '11', '4', '7', '4', '3', '2'],
//                     ['1', '0', '4', '0', '0', '0', '8', '3', '9', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '3', '0', '0', '0', '5', '4', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '4', '0', '0', '0', '0', '0', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '3', '0', '0', '0', '5', '4', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '3', '0', '0', '0', '5', '4', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '3', '0', '0', '0', '5', '4', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '3', '0', '0', '0', '5', '4', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '3', '0', '0', '0', '5', '4', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '3', '0', '0', '0', '5', '4', '9', '11', '4', '7', '4', '3', '2'],
//                     ['0', '0', '0', '3', '0', '0', '0', '5', '4', '9', '11', '4', '7', '4', '3', '2']];

// var sudokuChoices = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];

let editingCell = null;

function App() {
  return createElement(
    'div',
    { className: "App" },
    createElement(createLevelChooser, {className: 'levelChooseContainer'}),
    createElement(divPuzzle, {className: 'divPuzzle'}),
    createElement( congratulatory, {className: 'congratulations'})
  );
}

function createLevelChooser(){
  return createElement(
    'div',
    {className: 'levelChooseContainer'},
    null,
    createElement('div', {
      className: 'level',
      id: 'easy'
    }, 'Easy'),
    createElement('div', {
      className: 'level',
      id: 'medium'
    }, 'Medium'),
    createElement('div', {
      className: 'level',
      id: 'hard'
    }, 'Hard')
  );
}

function divPuzzle(){
  return createElement(
    'div',
    { className: 'divPuzzle'},
    null,
    createElement( numPick, {className: 'numPick-container'}),
    createElement( sudokuComponents, { className: 'Sudoku', id: 'sudoku-1'}),
  );
}

function congratulatory() {
  return createElement(
    'div',
    {
      className: 'congratulations',
    },
    null,
    createElement('div', {
      className: 'congrats',
    },
    'Congratulations! Total time is:'
    ),
    createElement('div', {
      className: 'time'
    },
    '00:00'
    )
  )
}

function sudokuComponents() {
  let components = [];
  let counter = 0;
  for(let i = 0; i< sudokuPuzzle.length; i++)
  {
    for(let j = 0; j< sudokuPuzzle[0].length; j++)
    {
      var cell = createElement(
        'div',
        { 
          className: "Cell Answer",
          id: "board-" + counter
        },
      );
      components.push(cell);
      counter++;
    }
  }

  return createElement(
    'div',
    { 
      className: 'Sudoku',
      id: 'sudoku-1'
    },
    components,
    createElement('div',  { 
      className: 'thick-grid vertical-1'
    }),
    createElement('div',  { 
      className: 'thick-grid vertical-2'
    }),
    createElement('div',  { 
      className: 'thick-grid horizontal-1'
    }),
    createElement('div',  { 
      className: 'thick-grid horizontal-2'
    }),
  );

}

function numPick() {
  let pickerComponents = [];

  for( let k = 0; k < sudokuChoices.length; k++)
  {
    var pickValue = createElement(
      'div',
      {
        className: "Choice",
        id: "picker-" + k,
      },
      sudokuChoices[k]
    );
    pickerComponents.push(pickValue);
  }
  
  return createElement(
    'div',
    {
      className: 'numPick-container'
    },
    pickerComponents
  );
}

function populateCell(name)
{
  let ruleBreak = false;
  editingCell.innerHTML = ''; 

  let boardNumber = parseInt(editingCell.id.substring(6));
  let startForColumn = boardNumber % boardSize;
  
  for(; startForColumn < (boardSize * boardSize); )
  {
    let columnFocus = document.getElementById('board-' + startForColumn.toString() );
    if(columnFocus.innerHTML === name)
    {
      columnFocus.style.color = 'red';
      ruleBreak = ruleBreak || true;
    }
    else
    {
      columnFocus.style.color = 'black';
      ruleBreak = ruleBreak || false;
    }
    startForColumn = startForColumn + 9;
  }

  let startForRow = Math.floor(boardNumber/boardSize) * boardSize;
  for( let rowCounter = 0; rowCounter < boardSize; rowCounter++ )
  {
    let rowFocus = document.getElementById('board-' + startForRow.toString() );
    if(rowFocus.innerHTML === name)
    {
      rowFocus.style.color = 'red';
      ruleBreak = ruleBreak || true;
    }
    else
    {
      rowFocus.style.color = 'black';
      ruleBreak = ruleBreak || false;
    }
    startForRow++;
  }

  let BoxRowStart = (Math.floor(boardNumber/Math.sqrt(boardSize) ) * Math.sqrt(boardSize)) % boardSize;
  let BoxColumnStart = Math.floor(boardNumber/(boardSize * Math.sqrt(boardSize))) * (boardSize * Math.sqrt(boardSize));

  for( let boxCounter1 = 0; boxCounter1 < Math.sqrt(boardSize) ; boxCounter1++ )
  {
    for( let boxCounter2 = 0; boxCounter2 < Math.sqrt(boardSize) ; boxCounter2++ )
    {
      let boxFocus = document.getElementById('board-' + (BoxRowStart + BoxColumnStart + boxCounter2).toString() );
      if(boxFocus.innerHTML === name)
      {
        boxFocus.style.color = 'red';
        ruleBreak = ruleBreak || true;
      }
      else
      {
        boxFocus.style.color = 'black';
        ruleBreak = ruleBreak || false;
      }
    }
    BoxColumnStart = BoxColumnStart + boardSize;
  }

  if(isCandidate)
  {
    editingCell.style.color = 'var(--acc-color4)';
  }
  else if(ruleBreak)
  {
    editingCell.style.color = 'red';
  }
  else if(editingCell === null)
  {
    return;
  }
  else
  {
    editingCell.style.color = 'black';
  }

  if(Object.is(name, '0'))
  {
    editingCell.innerHTML = '';
  }
  else
  {
    editingCell.innerHTML = name;
  }

  // congratulate();
  if(isPuzzleFinished(ruleBreak))
  {
    setTimeout(congratulate, 400);
  }
}

// Add event listener on keypress
document.addEventListener('keydown', (event) => {
  let name = event.key;
  let keyID = event.code;

  if(keyID.includes('Arrow'))
  {
    let finalFocusColor = focusColor;

    if(editingCell === null)
    {
      return;
    }
    let boardNumber = parseInt(editingCell.id.substring(6));
    let originalBoardNumber = boardNumber;
    let startForColumn = boardNumber % boardSize;

    if(Object.is(name, 'ArrowLeft'))
    {
      if(!(boardNumber%boardSize === 0))
      {
        boardNumber--;
        editingCell = document.getElementById('board-' + boardNumber.toString());
        startForColumn = boardNumber % boardSize;
        refreshCellBackgrounds();
      }
    }

    else if(Object.is(name, 'ArrowRight'))
    {
      if(!(boardNumber%boardSize === (boardSize-1) ))
      {
        boardNumber++;
        editingCell = document.getElementById('board-' + boardNumber.toString());
        startForColumn = boardNumber % boardSize;
        refreshCellBackgrounds();
      }
    }

    else if(Object.is(name, 'ArrowUp'))
    {
      if(!(boardNumber-boardSize < 0))
      {
        boardNumber = boardNumber - boardSize;
        editingCell = document.getElementById('board-' + boardNumber.toString());
        startForColumn = boardNumber % boardSize;
        refreshCellBackgrounds();
      }
    }

    else if(Object.is(name, 'ArrowDown'))
    {
      if( !(boardNumber+boardSize > ((boardSize*boardSize) - 1) ) )
      {
        boardNumber = boardNumber + boardSize;
        editingCell = document.getElementById('board-' + boardNumber.toString());
        startForColumn = boardNumber % boardSize;
        refreshCellBackgrounds();
      }
    }
    
    for(; startForColumn < (boardSize * boardSize); )
    {
      let columnFocus = document.getElementById('board-' + startForColumn.toString() );
      columnFocus.animate({
        background: `${finalFocusColor}`
      }, { duration: 200, fill: 'forwards'})
      startForColumn = startForColumn + 9;
    }

    let startForRow = Math.floor(boardNumber/boardSize) * boardSize;
    for( let rowCounter = 0; rowCounter < boardSize; rowCounter++ )
    {
      let rowFocus = document.getElementById('board-' + startForRow.toString() );
      rowFocus.animate({
        background: `${finalFocusColor}`
      }, { duration: 200, fill: 'forwards'})
      startForRow++;
    }

    let BoxRowStart = (Math.floor(boardNumber/Math.sqrt(boardSize) ) * Math.sqrt(boardSize)) % boardSize;
    let BoxColumnStart = Math.floor(boardNumber/(boardSize * Math.sqrt(boardSize))) * (boardSize * Math.sqrt(boardSize));

    for( let boxCounter1 = 0; boxCounter1 < Math.sqrt(boardSize) ; boxCounter1++ )
    {
      for( let boxCounter2 = 0; boxCounter2 < Math.sqrt(boardSize) ; boxCounter2++ )
      {
        let boxFocus = document.getElementById('board-' + (BoxRowStart + BoxColumnStart + boxCounter2).toString() );
        boxFocus.animate({
          background: `${finalFocusColor}`
        }, { duration: 200, fill: 'forwards'});
      }
      BoxColumnStart = BoxColumnStart + boardSize;
    }

    if(!editingCell.className.includes('Filled'))
    {
      editingCell.animate({
        // background: 'var(--accent-color4)'
        borderRadius: '40%'
      }, { duration: 100, fill: 'forwards'})
    }
  }

  // else if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105)) { 
  else if (name.includes('0') || 
            name.includes('1') ||
            name.includes('2') ||
            name.includes('3') ||
            name.includes('4') ||
            name.includes('5') ||
            name.includes('6') ||
            name.includes('7') ||
            name.includes('8') ||
            name.includes('9') )
  {
    
    if(editingCell === null)
    {
      return;
    }
    
    if(editingCell.className.includes('Filled')){
      return;
    }

    populateCell(name);
  }
  else if(Object.is(keyID, 'Backspace') && (editingCell !== null) && !(editingCell.className.includes('Filled')))
  {
    editingCell.innerHTML = '';
  }

  else{
    return;
  }
}, false);

window.onmousedown = function (e)
{ 

  let element = document.getElementById(e.target.id);

  if( element === null)
  {
    // unfocusCell(editingCell);
    editingCell = null;
    refreshCellBackgrounds();
    return;
  }

  if( Object.is(element.innerHTML, 'Easy'))
  {
    pickFromPuzzles = easyPuzzles;
    initializePuzzle(element);
  } 
  else if( Object.is(element.innerHTML, 'Medium'))
  {
    pickFromPuzzles = mediumPuzzles;
    initializePuzzle(element);
  }
  else if( Object.is(element.innerHTML, 'Hard'))
  {
    pickFromPuzzles = hardPuzzles;
    initializePuzzle(element);
  }

  if(element.getAttribute('id').includes('picker') && (editingCell != null) && !(Object.is(element.innerHTML, 'Pen')) && !(Object.is(element.innerHTML, 'New')))
  {
    if(Object.is(element.innerHTML, 'X'))
    {
      editingCell.innerHTML = '';  
    }
    else{
    //   let ruleBreak = false;
    //   editingCell.innerHTML = ''; 

    //   let boardNumber = parseInt(editingCell.id.substring(6));
    //   let startForColumn = boardNumber % boardSize;
      
    //   for(; startForColumn < (boardSize * boardSize); )
    //   {
    //     let columnFocus = document.getElementById('board-' + startForColumn.toString() );
    //     if(columnFocus.innerHTML === element.innerHTML)
    //     {
    //       ruleBreak = true;
    //       break;
    //     }
    //     startForColumn = startForColumn + 9;
    //   }

    //   let startForRow = Math.floor(boardNumber/boardSize) * boardSize;
    //   for( let rowCounter = 0; rowCounter < boardSize; rowCounter++ )
    //   {
    //     let rowFocus = document.getElementById('board-' + startForRow.toString() );
    //     if(rowFocus.innerHTML === element.innerHTML)
    //     {
    //       ruleBreak = true;
    //       break;
    //     }
    //     startForRow++;
    //   }

    //   let BoxRowStart = (Math.floor(boardNumber/Math.sqrt(boardSize) ) * Math.sqrt(boardSize)) % boardSize;
    //   let BoxColumnStart = Math.floor(boardNumber/(boardSize * Math.sqrt(boardSize))) * (boardSize * Math.sqrt(boardSize));

    //   for( let boxCounter1 = 0; boxCounter1 < Math.sqrt(boardSize) ; boxCounter1++ )
    //   {
    //     for( let boxCounter2 = 0; boxCounter2 < Math.sqrt(boardSize) ; boxCounter2++ )
    //     {
    //       let boxFocus = document.getElementById('board-' + (BoxRowStart + BoxColumnStart + boxCounter2).toString() );
    //       if(boxFocus.innerHTML === element.innerHTML)
    //       {
    //         ruleBreak = true;
    //         break;
    //       }
    //     }
    //     BoxColumnStart = BoxColumnStart + boardSize;
    //   }

    //   if(isCandidate)
    //   {
    //     editingCell.style.color = 'var(--acc-color4)';
    //   }
    //   else if(ruleBreak)
    //   {
    //     editingCell.style.color = 'red';
    //   }
    //   else if(editingCell === null)
    //   {
    //     return;
    //   }
    //   else
    //   {
    //     editingCell.style.color = 'black';
    //   }
    //   editingCell.innerHTML = element.innerHTML;  

    //   if(isPuzzleFinished(ruleBreak))
    //   {
    //     console.log('tada!!');
    //   }
      populateCell(element.innerHTML);
    }
    return;
  }
  else if(Object.is(element.innerHTML, 'Pen'))
  {
    isCandidate = !isCandidate;
    let pencilChoice = document.getElementsByClassName('Choice');
    if(isCandidate)
    {
      for(let i = 0; i < pencilChoice.length; i++)
      {
        pencilChoice[i].animate({
          fontWeight: 'normal',
          color: 'white',
          background: 'black',
        }, {duration: 200, fill: 'forwards'});
      }
    }
    else
    {
      for(let i = 0; i < pencilChoice.length; i++)
      {
        pencilChoice[i].animate({
          fontWeight: 'bold',
          color: 'black',
          background: 'var(--acc-color3)',
        }, {duration: 200, fill: 'forwards'});
      }
    }
    return;
  }
  else if(Object.is(element.innerHTML, 'New'))
  {
    refreshFontColors();
    refreshCellBackgrounds();
    initializePuzzle();
  }
  refreshCellBackgrounds();
  pickEditingCell(element, e);
}

window.onmouseover = function (e)
{

  if((e.target == null) && (e.relatedTarget == null))
  {
    editingCell = null;
    return;
  }

  try{
    let element = document.getElementById(e.target.id);
    let relatedElement = document.getElementById(e.relatedTarget.id);

    if((element != null) && (Object.is(element.className, "Choice"))){
      focusChoice(element);
    }

    if((relatedElement != null) && (Object.is(relatedElement.className, "Choice"))){
      unfocusChoice(relatedElement);
    }
  }
  catch(error){
    console.log(error)
    return;
  }

}

function congratulate()
{
  const sudokuPuzzle = document.getElementById('sudoku-1');
  sudokuPuzzle.style.overflow = 'visible';

  let congrats = document.getElementsByClassName("congratulations");
  let numPickdiv = document.getElementsByClassName("numPick-container");
  let allCells = document.getElementsByClassName("Cell");
  let initRandomChoice = [];
  let thickGrids = document.getElementsByClassName("thick-grid");

  for( let thickGridCounter = 0; thickGridCounter < thickGrids.length; thickGridCounter++ )
  {
    thickGrids[thickGridCounter].animate({
      visibility: 'hidden'
    }, {duration: 1, fill: 'forwards'}) ;
  }

  const endDate = new Date();
  currentTime = endDate.getTime();
  let timeDiff = currentTime - startTime;
  let thisTime = document.getElementsByClassName('time');

  let seconds = Math.floor(timeDiff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  thisTime[0].innerHTML = padTo2Digits(hours)+ ":" +padTo2Digits(minutes)+ ":" +padTo2Digits(seconds);

  congrats[0].animate({
    visibility: 'visible'
  }, {duration: 1000, fill: 'forwards'})

  for(let initChoice = 0; initChoice < (boardSize*boardSize); initChoice++)
  {
    initRandomChoice.push(initChoice);
  }

  for(let cellCounter = ((boardSize*boardSize)); cellCounter > 0; cellCounter-- )
  {
    var randomIndex = initRandomChoice[Math.floor(Math.random()* initRandomChoice.length)];
    var rect = allCells[parseInt(randomIndex)].getBoundingClientRect();
    var mathRandom = Math.random() * (500) + (500);
    var randomScale = (mathRandom);
    allCells[randomIndex].animate({
      transform: `translateY(${1000 + rect.top}px)`,
      scale: `${randomScale}%`,
    }, {duration: (Math.random() * 1000 + 500), fill: 'forwards', easing: 'ease-in'})

    let index = initRandomChoice.indexOf(randomIndex);
    if( index > -1 )
    {
      initRandomChoice.splice(index, 1);
    }
  }

  numPickdiv[0].animate({
    visibility: 'hidden'
  }, {duration: 200, fill: 'forwards'})
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function isPuzzleFinished(ruleBreak)
{
  if(ruleBreak)
  {
    return false;
  }

  let allCells = document.getElementsByClassName("Cell");
  for(let cellCounter = 0; cellCounter < (boardSize*boardSize); cellCounter++ )
  {
    let cellColor = getComputedStyle(allCells[cellCounter]);
    if( (!Object.is(cellColor.color, 'rgb(0, 0, 0)')) || (allCells[cellCounter].innerHTML === '') )
    {
      return false;
    }
  }

  return true;
}

function focusChoice(element)
{
  element.animate({
    transform: 'scale(0.9)',
    zIndex: 2
  }, {duration: 100, fill: 'forwards'});
}

function unfocusChoice(element)
{
  element.animate({
    transform: 'scale(0.8)',
    zIndex: 1
  }, {duration: 100, fill: 'forwards'});
}

function focusCell(element)
{
  let finalFocusColor = focusColor;
  let initialColor = 'var(--accent-color3)';
  let style = getComputedStyle(element);

  let boardNumber = parseInt(element.id.substring(6));
  let startForColumn = boardNumber % boardSize;
  
  for(; startForColumn < (boardSize * boardSize); )
  {
    let columnFocus = document.getElementById('board-' + startForColumn.toString() );
    columnFocus.animate({
      background: `${finalFocusColor}`
    }, { duration: 200, fill: 'forwards'})
    startForColumn = startForColumn + 9;
  }

  let startForRow = Math.floor(boardNumber/boardSize) * boardSize;
  for( let rowCounter = 0; rowCounter < boardSize; rowCounter++ )
  {
    let rowFocus = document.getElementById('board-' + startForRow.toString() );
    rowFocus.animate({
      background: `${finalFocusColor}`
    }, { duration: 200, fill: 'forwards'})
    startForRow++;
  }

  let BoxRowStart = (Math.floor(boardNumber/Math.sqrt(boardSize) ) * Math.sqrt(boardSize)) % boardSize;
  let BoxColumnStart = Math.floor(boardNumber/(boardSize * Math.sqrt(boardSize))) * (boardSize * Math.sqrt(boardSize));

  for( let boxCounter1 = 0; boxCounter1 < Math.sqrt(boardSize) ; boxCounter1++ )
  {
    for( let boxCounter2 = 0; boxCounter2 < Math.sqrt(boardSize) ; boxCounter2++ )
    {
      let boxFocus = document.getElementById('board-' + (BoxRowStart + BoxColumnStart + boxCounter2).toString() );
      boxFocus.animate({
        background: `${finalFocusColor}`
      }, { duration: 200, fill: 'forwards'});
    }
    BoxColumnStart = BoxColumnStart + boardSize;
  }

  editingCell = element;
  editingCell.animate({
    // background: 'var(--accent-color4)'
    borderRadius: '40%'
  }, { duration: 200, fill: 'forwards'})
}

function unfocusCell(element)
{
  if(element === null)
  {
    return;
  }
  element.animate({
    background: 'var(--accent-color3)'
  }, {duration: 200, fill: 'forwards'});
  editingCell = null;
}

function refreshCellBackgrounds() {
  var allCells = document.getElementsByClassName("Cell");
  for(let i = 0; i < allCells.length; i++ )
  {
    allCells[i].animate({
      background: 'var(--accent-color3)',
      borderRadius: '5%'
    }, { duration: 100, fill: 'forwards'})
  }
}

function refreshFontColors() {
  isCandidate = false;
  let pencilChoice = document.getElementsByClassName('Choice');

  for(let i = 0; i < pencilChoice.length; i++)
  {
    pencilChoice[i].animate({
      fontWeight: 'bold',
      color: 'black',
      background: 'var(--acc-color3)',
    }, {duration: 100, fill: 'forwards'});
  }
}

function pickEditingCell(objectElement, mouseEvent) {

  if( !(objectElement === null) && (Object.is(objectElement.className, "Cell Answer")))
  {
    if(editingCell != null)
    {
      unfocusCell(editingCell);
      editingCell = null;
    }
    focusCell(objectElement);
  }
  else if( !(objectElement === null) && (Object.is(objectElement.className, "Cell Filled")))
  {
    unfocusCell(editingCell);
    editingCell = null;
  }
  else if(Object.is(objectElement.innerHTML, "Pen"))
  {
    return;
  }
  else
  {
    editingCell = null;
  }
}

function initializePuzzle(element)
{
  let randomChoice = Math.floor(Math.random(0, 1) * pickFromPuzzles.length)
  if((randomChoice % 2) !== 0 )
  {
    randomChoice--;
  }

  answerPuzzle = pickFromPuzzles[randomChoice];
  sudokuPuzzle = pickFromPuzzles[randomChoice + 1];

  initializeSudokuComponents();

  let levelChooser = document.getElementsByClassName('levelChooseContainer');
  levelChooser[0].animate({
    transform: 'scale(10)',
    opacity: '0%',
    visibility: 'hidden',
    transitionTimingFunction: 'ease in'
  }, {duration: 1200, fill: 'forwards'});

  let puzzle = document.getElementsByClassName('divPuzzle');

  puzzle[0].animate({
    opacity: '100%'
  }, {duration: 1200, fill: 'forwards'});

  const currentDate = new Date();
  startTime = currentDate.getTime();
}

function initializeSudokuComponents() {
  let counter = 0;

  let cells = document.getElementsByClassName("Cell");

  for(let k = 0; k< cells.length; k++)
  {
    cells[k].innerHTML = '';
    cells[k].style.color = 'black';
    cells[k].classList.remove('Answer');
    cells[k].classList.remove('Filled');
  }

  for(let i = 0; i< sudokuPuzzle.length; i++)
  {
    for(let j = 0; j< sudokuPuzzle[0].length; j++)
    {
      if(Object.is(sudokuPuzzle[i][j], '0')){
        cells[counter].classList.add('Answer');
      }
      else{
        cells[counter].innerHTML = sudokuPuzzle[i][j];
        cells[counter].classList.add('Filled');
      }
      counter++;
    }
  }
}

let easyPuzzles = [
  [
    ['1', '8', '4', '5', '3', '7', '9', '6', '2']
    ,
    ['9', '5', '3', '6', '2', '1', '7', '4', '8']
    ,
    ['2', '7', '6', '8', '4', '9', '1', '5', '3']
    ,
    ['5', '4', '7', '2', '1', '3', '8', '9', '6']
    ,
    ['8', '3', '2', '9', '6', '4', '5', '7', '1']
    ,
    ['6', '1', '9', '7', '8', '5', '2', '3', '4']
    ,
    ['7', '6', '1', '3', '5', '2', '4', '8', '9']
    ,
    ['4', '9', '8', '1', '7', '6', '3', '2', '5']
    ,
    ['3', '2', '5', '4', '9', '8', '6', '1', '7']
    ,
    ]
    ,
    [
    ['0', '8', '0', '0', '3', '0', '0', '6', '2']
    ,
    ['9', '5', '3', '6', '2', '1', '7', '4', '8']
    ,
    ['0', '7', '0', '8', '0', '9', '1', '5', '3']
    ,
    ['5', '4', '0', '2', '1', '3', '8', '0', '6']
    ,
    ['0', '0', '2', '0', '6', '4', '5', '0', '1']
    ,
    ['0', '0', '9', '7', '8', '5', '2', '0', '0']
    ,
    ['7', '6', '1', '3', '5', '2', '0', '8', '9']
    ,
    ['4', '9', '8', '0', '0', '0', '0', '2', '0']
    ,
    ['3', '0', '0', '4', '0', '0', '0', '0', '0']
    ,
    ]
    ,
    [
    ['6', '2', '7', '4', '1', '3', '8', '9', '5']
    ,
    ['1', '9', '8', '6', '5', '2', '3', '4', '7']
    ,
    ['5', '3', '4', '8', '9', '7', '1', '6', '2']
    ,
    ['9', '4', '3', '1', '7', '5', '2', '8', '6']
    ,
    ['8', '5', '1', '2', '3', '6', '4', '7', '9']
    ,
    ['2', '7', '6', '9', '4', '8', '5', '3', '1']
    ,
    ['4', '1', '5', '3', '6', '9', '7', '2', '8']
    ,
    ['7', '8', '9', '5', '2', '4', '6', '1', '3']
    ,
    ['3', '6', '2', '7', '8', '1', '9', '5', '4']
    ,
    ]
    ,
    [
    ['6', '0', '7', '0', '0', '0', '0', '9', '0']
    ,
    ['1', '0', '8', '6', '5', '2', '3', '0', '7']
    ,
    ['5', '3', '4', '8', '0', '0', '1', '0', '2']
    ,
    ['9', '0', '3', '1', '7', '5', '0', '8', '6']
    ,
    ['8', '5', '1', '2', '3', '6', '4', '0', '0']
    ,
    ['0', '7', '0', '9', '4', '8', '5', '3', '0']
    ,
    ['0', '0', '5', '0', '6', '9', '7', '2', '0']
    ,
    ['7', '8', '0', '0', '2', '0', '0', '1', '3']
    ,
    ['0', '6', '0', '7', '8', '1', '0', '0', '0']
    ,
    ]
    ,
    [
    ['8', '7', '2', '4', '3', '1', '5', '6', '9']
    ,
    ['9', '4', '5', '8', '6', '7', '2', '1', '3']
    ,
    ['1', '3', '6', '5', '2', '9', '7', '8', '4']
    ,
    ['5', '2', '4', '1', '9', '6', '3', '7', '8']
    ,
    ['3', '8', '1', '7', '4', '2', '9', '5', '6']
    ,
    ['6', '9', '7', '3', '8', '5', '1', '4', '2']
    ,
    ['7', '6', '3', '9', '5', '4', '8', '2', '1']
    ,
    ['2', '1', '8', '6', '7', '3', '4', '9', '5']
    ,
    ['4', '5', '9', '2', '1', '8', '6', '3', '7']
    ,
    ]
    ,
    [
    ['8', '0', '2', '4', '0', '1', '5', '6', '9']
    ,
    ['9', '4', '5', '0', '6', '7', '0', '1', '0']
    ,
    ['0', '0', '6', '5', '0', '9', '0', '8', '4']
    ,
    ['0', '2', '0', '1', '0', '6', '0', '7', '8']
    ,
    ['0', '8', '1', '7', '0', '0', '9', '5', '6']
    ,
    ['6', '0', '0', '0', '0', '0', '1', '0', '2']
    ,
    ['0', '6', '0', '0', '5', '4', '0', '2', '1']
    ,
    ['2', '1', '8', '0', '0', '3', '4', '9', '5']
    ,
    ['4', '5', '9', '2', '0', '0', '6', '0', '7']
    ,
    ]
    ,
    [
    ['3', '2', '4', '1', '7', '5', '9', '6', '8']
    ,
    ['6', '7', '8', '9', '3', '4', '1', '2', '5']
    ,
    ['1', '9', '5', '2', '8', '6', '3', '7', '4']
    ,
    ['2', '5', '6', '8', '4', '9', '7', '3', '1']
    ,
    ['4', '1', '3', '7', '6', '2', '8', '5', '9']
    ,
    ['7', '8', '9', '3', '5', '1', '6', '4', '2']
    ,
    ['9', '6', '2', '5', '1', '7', '4', '8', '3']
    ,
    ['8', '4', '1', '6', '2', '3', '5', '9', '7']
    ,
    ['5', '3', '7', '4', '9', '8', '2', '1', '6']
    ,
    ]
    ,
    [
    ['0', '0', '0', '1', '7', '5', '9', '0', '0']
    ,
    ['6', '7', '0', '9', '0', '0', '1', '2', '0']
    ,
    ['1', '9', '0', '2', '0', '6', '3', '7', '0']
    ,
    ['2', '5', '6', '0', '4', '0', '7', '0', '0']
    ,
    ['4', '0', '3', '7', '0', '2', '0', '5', '0']
    ,
    ['7', '8', '9', '3', '5', '0', '6', '4', '2']
    ,
    ['0', '0', '2', '5', '0', '7', '0', '8', '3']
    ,
    ['0', '4', '1', '6', '2', '3', '5', '9', '7']
    ,
    ['5', '3', '0', '0', '0', '8', '2', '0', '0']
    ,
    ]
    ,
    [
    ['7', '2', '6', '9', '1', '4', '3', '8', '5']
    ,
    ['9', '8', '3', '5', '2', '7', '1', '6', '4']
    ,
    ['4', '5', '1', '6', '8', '3', '9', '7', '2']
    ,
    ['6', '4', '7', '8', '3', '1', '5', '2', '9']
    ,
    ['8', '1', '2', '7', '5', '9', '4', '3', '6']
    ,
    ['3', '9', '5', '2', '4', '6', '7', '1', '8']
    ,
    ['2', '7', '9', '3', '6', '5', '8', '4', '1']
    ,
    ['5', '6', '4', '1', '7', '8', '2', '9', '3']
    ,
    ['1', '3', '8', '4', '9', '2', '6', '5', '7']
    ,
    ]
    ,
    [
    ['7', '0', '0', '9', '1', '4', '3', '8', '5']
    ,
    ['9', '0', '3', '5', '0', '7', '1', '6', '4']
    ,
    ['4', '5', '1', '6', '0', '0', '0', '0', '0']
    ,
    ['6', '0', '7', '0', '0', '0', '5', '0', '9']
    ,
    ['0', '1', '2', '0', '5', '9', '0', '3', '6']
    ,
    ['3', '0', '5', '0', '4', '0', '0', '1', '0']
    ,
    ['2', '7', '9', '3', '6', '5', '0', '0', '1']
    ,
    ['5', '6', '4', '1', '7', '0', '2', '0', '0']
    ,
    ['1', '0', '0', '4', '0', '2', '6', '5', '0']
    ,
    ]
    ,
    [
    ['2', '4', '9', '6', '7', '1', '8', '3', '5']
    ,
    ['8', '5', '6', '3', '4', '2', '9', '1', '7']
    ,
    ['3', '1', '7', '5', '8', '9', '2', '6', '4']
    ,
    ['1', '9', '3', '7', '5', '8', '6', '4', '2']
    ,
    ['4', '8', '5', '9', '2', '6', '1', '7', '3']
    ,
    ['7', '6', '2', '1', '3', '4', '5', '9', '8']
    ,
    ['6', '2', '8', '4', '9', '3', '7', '5', '1']
    ,
    ['9', '7', '4', '8', '1', '5', '3', '2', '6']
    ,
    ['5', '3', '1', '2', '6', '7', '4', '8', '9']
    ,
    ]
    ,
    [
    ['2', '4', '0', '0', '7', '0', '8', '3', '5']
    ,
    ['8', '0', '6', '0', '0', '0', '0', '0', '0']
    ,
    ['3', '0', '0', '0', '8', '0', '2', '6', '0']
    ,
    ['1', '9', '3', '7', '5', '8', '6', '4', '0']
    ,
    ['4', '8', '5', '0', '2', '6', '1', '0', '0']
    ,
    ['7', '6', '2', '0', '3', '0', '5', '0', '8']
    ,
    ['6', '2', '0', '4', '0', '3', '0', '0', '1']
    ,
    ['9', '7', '4', '8', '1', '5', '0', '2', '6']
    ,
    ['0', '0', '0', '2', '0', '7', '4', '8', '9']
    ,
    ]
    ,
    [
    ['5', '6', '4', '3', '2', '8', '9', '7', '1']
    ,
    ['7', '8', '3', '5', '1', '9', '6', '4', '2']
    ,
    ['9', '2', '1', '4', '7', '6', '3', '5', '8']
    ,
    ['2', '1', '5', '9', '4', '3', '8', '6', '7']
    ,
    ['8', '9', '7', '6', '5', '2', '4', '1', '3']
    ,
    ['3', '4', '6', '7', '8', '1', '5', '2', '9']
    ,
    ['6', '5', '8', '1', '3', '7', '2', '9', '4']
    ,
    ['1', '3', '9', '2', '6', '4', '7', '8', '5']
    ,
    ['4', '7', '2', '8', '9', '5', '1', '3', '6']
    ,
    ]
    ,
    [
    ['0', '6', '4', '0', '2', '8', '9', '7', '1']
    ,
    ['7', '8', '3', '5', '1', '0', '6', '4', '2']
    ,
    ['9', '0', '1', '0', '0', '6', '0', '5', '8']
    ,
    ['2', '0', '0', '9', '4', '3', '8', '0', '0']
    ,
    ['0', '0', '7', '6', '5', '2', '4', '1', '0']
    ,
    ['3', '4', '6', '0', '8', '1', '0', '2', '0']
    ,
    ['0', '0', '8', '1', '0', '7', '2', '9', '0']
    ,
    ['1', '0', '0', '2', '6', '0', '0', '8', '5']
    ,
    ['4', '0', '0', '0', '9', '0', '0', '3', '0']
    ,
    ]
    ,
    [
    ['5', '4', '8', '7', '9', '6', '3', '1', '2']
    ,
    ['1', '2', '9', '4', '3', '8', '7', '6', '5']
    ,
    ['3', '7', '6', '1', '5', '2', '8', '4', '9']
    ,
    ['9', '5', '1', '6', '2', '7', '4', '3', '8']
    ,
    ['8', '3', '7', '5', '4', '9', '6', '2', '1']
    ,
    ['2', '6', '4', '8', '1', '3', '5', '9', '7']
    ,
    ['6', '8', '2', '9', '7', '4', '1', '5', '3']
    ,
    ['4', '9', '5', '3', '8', '1', '2', '7', '6']
    ,
    ['7', '1', '3', '2', '6', '5', '9', '8', '4']
    ,
    ]
    ,
    [
    ['5', '4', '8', '0', '9', '6', '0', '1', '2']
    ,
    ['1', '2', '0', '4', '3', '8', '7', '6', '5']
    ,
    ['3', '0', '0', '1', '5', '2', '0', '4', '0']
    ,
    ['9', '5', '1', '0', '2', '0', '4', '3', '8']
    ,
    ['8', '0', '7', '5', '4', '9', '6', '0', '0']
    ,
    ['0', '6', '0', '8', '0', '0', '5', '0', '0']
    ,
    ['0', '8', '2', '0', '0', '4', '0', '0', '3']
    ,
    ['4', '0', '0', '3', '8', '1', '2', '0', '6']
    ,
    ['7', '1', '0', '2', '0', '0', '9', '0', '0']
    ,
    ]
    ,
    [
    ['9', '8', '6', '1', '4', '2', '3', '7', '5']
    ,
    ['4', '7', '2', '9', '5', '3', '1', '6', '8']
    ,
    ['3', '5', '1', '6', '8', '7', '9', '4', '2']
    ,
    ['8', '3', '4', '2', '9', '5', '6', '1', '7']
    ,
    ['5', '2', '7', '3', '1', '6', '4', '8', '9']
    ,
    ['1', '6', '9', '8', '7', '4', '5', '2', '3']
    ,
    ['2', '1', '5', '7', '6', '9', '8', '3', '4']
    ,
    ['6', '4', '3', '5', '2', '8', '7', '9', '1']
    ,
    ['7', '9', '8', '4', '3', '1', '2', '5', '6']
    ,
    ]
    ,
    [
    ['0', '8', '6', '1', '0', '2', '3', '0', '5']
    ,
    ['0', '0', '2', '0', '5', '0', '1', '0', '8']
    ,
    ['0', '5', '1', '6', '0', '0', '9', '4', '0']
    ,
    ['0', '3', '4', '0', '9', '0', '6', '1', '0']
    ,
    ['0', '0', '7', '0', '1', '6', '0', '8', '9']
    ,
    ['1', '6', '9', '0', '7', '4', '0', '2', '3']
    ,
    ['0', '0', '5', '7', '6', '9', '8', '3', '4']
    ,
    ['6', '4', '0', '5', '0', '0', '0', '9', '0']
    ,
    ['0', '9', '8', '4', '3', '1', '2', '5', '0']
    ,
    ]
    ,
    [
    ['4', '1', '6', '7', '5', '2', '3', '9', '8']
    ,
    ['5', '7', '8', '9', '3', '6', '2', '1', '4']
    ,
    ['2', '3', '9', '1', '4', '8', '5', '6', '7']
    ,
    ['3', '8', '5', '6', '7', '4', '9', '2', '1']
    ,
    ['7', '9', '2', '8', '1', '5', '6', '4', '3']
    ,
    ['1', '6', '4', '2', '9', '3', '8', '7', '5']
    ,
    ['9', '5', '3', '4', '6', '7', '1', '8', '2']
    ,
    ['8', '4', '1', '3', '2', '9', '7', '5', '6']
    ,
    ['6', '2', '7', '5', '8', '1', '4', '3', '9']
    ,
    ]
    ,
    [
    ['4', '1', '6', '0', '5', '0', '3', '9', '8']
    ,
    ['5', '7', '0', '0', '3', '6', '2', '1', '4']
    ,
    ['2', '3', '9', '1', '0', '8', '0', '0', '0']
    ,
    ['3', '8', '5', '6', '7', '4', '0', '0', '1']
    ,
    ['0', '9', '2', '0', '0', '5', '0', '0', '3']
    ,
    ['1', '6', '0', '2', '9', '3', '0', '7', '0']
    ,
    ['0', '0', '0', '0', '0', '7', '1', '8', '2']
    ,
    ['0', '4', '0', '3', '2', '9', '7', '5', '6']
    ,
    ['0', '2', '7', '0', '0', '0', '4', '0', '0']
    ,
    ]
    ,
    [
    ['9', '4', '6', '7', '2', '5', '8', '1', '3']
    ,
    ['5', '3', '1', '4', '6', '8', '7', '2', '9']
    ,
    ['7', '8', '2', '1', '3', '9', '4', '6', '5']
    ,
    ['6', '7', '5', '8', '1', '2', '9', '3', '4']
    ,
    ['4', '2', '3', '6', '9', '7', '1', '5', '8']
    ,
    ['8', '1', '9', '3', '5', '4', '6', '7', '2']
    ,
    ['3', '5', '4', '9', '7', '6', '2', '8', '1']
    ,
    ['2', '6', '8', '5', '4', '1', '3', '9', '7']
    ,
    ['1', '9', '7', '2', '8', '3', '5', '4', '6']
    ,
    ]
    ,
    [
    ['0', '0', '6', '7', '2', '5', '8', '1', '3']
    ,
    ['5', '0', '0', '0', '6', '8', '7', '2', '0']
    ,
    ['7', '8', '2', '1', '3', '9', '0', '0', '0']
    ,
    ['0', '0', '5', '0', '1', '0', '0', '3', '4']
    ,
    ['0', '2', '0', '6', '0', '7', '1', '0', '8']
    ,
    ['8', '0', '9', '0', '5', '4', '0', '0', '2']
    ,
    ['3', '0', '4', '0', '0', '0', '0', '8', '1']
    ,
    ['0', '6', '8', '5', '4', '1', '0', '0', '7']
    ,
    ['1', '9', '7', '2', '8', '0', '5', '4', '6']
    ,
    ]
    ,
    [
    ['8', '7', '3', '5', '2', '4', '1', '6', '9']
    ,
    ['6', '2', '9', '1', '7', '8', '3', '4', '5']
    ,
    ['4', '1', '5', '6', '9', '3', '2', '8', '7']
    ,
    ['5', '3', '4', '9', '8', '2', '7', '1', '6']
    ,
    ['9', '8', '1', '7', '6', '5', '4', '3', '2']
    ,
    ['7', '6', '2', '4', '3', '1', '5', '9', '8']
    ,
    ['3', '9', '6', '2', '1', '7', '8', '5', '4']
    ,
    ['1', '5', '7', '8', '4', '6', '9', '2', '3']
    ,
    ['2', '4', '8', '3', '5', '9', '6', '7', '1']
    ,
    ]
    ,
    [
    ['8', '0', '3', '0', '2', '4', '1', '6', '9']
    ,
    ['0', '2', '0', '1', '0', '8', '3', '4', '5']
    ,
    ['4', '0', '5', '0', '0', '0', '2', '0', '0']
    ,
    ['0', '0', '4', '9', '0', '2', '0', '1', '6']
    ,
    ['9', '0', '0', '0', '6', '0', '0', '3', '2']
    ,
    ['7', '6', '0', '4', '3', '1', '5', '9', '8']
    ,
    ['0', '0', '6', '2', '0', '0', '8', '5', '0']
    ,
    ['1', '0', '0', '8', '4', '6', '9', '2', '3']
    ,
    ['2', '4', '8', '0', '5', '9', '6', '0', '0']
    ,
    ]
    ,
    [
    ['8', '3', '2', '7', '1', '9', '6', '4', '5']
    ,
    ['5', '9', '6', '8', '4', '3', '7', '1', '2']
    ,
    ['7', '1', '4', '6', '2', '5', '8', '3', '9']
    ,
    ['6', '7', '5', '1', '9', '4', '2', '8', '3']
    ,
    ['3', '4', '9', '2', '5', '8', '1', '7', '6']
    ,
    ['2', '8', '1', '3', '7', '6', '9', '5', '4']
    ,
    ['9', '2', '8', '4', '3', '7', '5', '6', '1']
    ,
    ['1', '6', '3', '5', '8', '2', '4', '9', '7']
    ,
    ['4', '5', '7', '9', '6', '1', '3', '2', '8']
    ,
    ]
    ,
    [
    ['0', '3', '0', '7', '1', '0', '0', '0', '0']
    ,
    ['5', '9', '0', '8', '0', '3', '7', '0', '2']
    ,
    ['7', '1', '0', '6', '0', '5', '8', '0', '9']
    ,
    ['0', '0', '5', '1', '9', '0', '0', '0', '0']
    ,
    ['3', '0', '9', '2', '5', '8', '1', '7', '6']
    ,
    ['0', '8', '1', '3', '0', '6', '9', '0', '0']
    ,
    ['0', '0', '8', '4', '3', '0', '5', '6', '1']
    ,
    ['1', '6', '3', '5', '0', '2', '4', '9', '0']
    ,
    ['4', '5', '7', '0', '0', '0', '3', '2', '8']
    ,
    ]
    ,
    [
    ['8', '1', '7', '3', '9', '4', '6', '2', '5']
    ,
    ['3', '5', '4', '6', '1', '2', '7', '9', '8']
    ,
    ['2', '6', '9', '7', '8', '5', '3', '4', '1']
    ,
    ['6', '4', '3', '5', '7', '9', '8', '1', '2']
    ,
    ['1', '8', '5', '4', '2', '6', '9', '3', '7']
    ,
    ['9', '7', '2', '1', '3', '8', '5', '6', '4']
    ,
    ['4', '3', '8', '9', '5', '1', '2', '7', '6']
    ,
    ['5', '9', '1', '2', '6', '7', '4', '8', '3']
    ,
    ['7', '2', '6', '8', '4', '3', '1', '5', '9']
    ,
    ]
    ,
    [
    ['0', '1', '0', '0', '9', '4', '6', '2', '5']
    ,
    ['0', '5', '0', '6', '1', '0', '0', '0', '8']
    ,
    ['2', '0', '0', '7', '8', '0', '3', '4', '1']
    ,
    ['6', '0', '3', '0', '7', '9', '0', '0', '2']
    ,
    ['1', '8', '5', '4', '0', '6', '9', '0', '0']
    ,
    ['9', '0', '0', '1', '0', '8', '0', '6', '4']
    ,
    ['0', '0', '8', '9', '5', '0', '2', '0', '6']
    ,
    ['5', '9', '1', '0', '6', '7', '4', '8', '0']
    ,
    ['0', '2', '6', '8', '4', '3', '0', '5', '0']
    ,
    ]
    ,
    [
    ['2', '1', '7', '4', '3', '6', '8', '5', '9']
    ,
    ['4', '9', '5', '7', '2', '8', '3', '1', '6']
    ,
    ['3', '8', '6', '1', '5', '9', '2', '4', '7']
    ,
    ['9', '6', '4', '5', '7', '3', '1', '8', '2']
    ,
    ['8', '2', '1', '9', '6', '4', '5', '7', '3']
    ,
    ['5', '7', '3', '2', '8', '1', '9', '6', '4']
    ,
    ['1', '4', '8', '3', '9', '7', '6', '2', '5']
    ,
    ['6', '3', '2', '8', '4', '5', '7', '9', '1']
    ,
    ['7', '5', '9', '6', '1', '2', '4', '3', '8']
    ,
    ]
    ,
    [
    ['2', '0', '7', '4', '3', '0', '8', '5', '9']
    ,
    ['0', '0', '5', '7', '0', '0', '0', '1', '6']
    ,
    ['3', '8', '6', '0', '0', '9', '2', '4', '7']
    ,
    ['9', '0', '4', '0', '0', '3', '1', '8', '2']
    ,
    ['0', '0', '1', '0', '0', '0', '0', '7', '3']
    ,
    ['5', '0', '3', '0', '0', '1', '9', '0', '0']
    ,
    ['0', '4', '0', '3', '9', '7', '6', '2', '5']
    ,
    ['6', '3', '2', '0', '0', '5', '7', '0', '0']
    ,
    ['7', '5', '9', '6', '0', '2', '4', '3', '0']
    ,
    ]
    ,
    [
    ['9', '4', '2', '3', '5', '7', '6', '8', '1']
    ,
    ['7', '8', '3', '6', '9', '1', '4', '2', '5']
    ,
    ['5', '1', '6', '2', '8', '4', '3', '9', '7']
    ,
    ['4', '7', '5', '9', '3', '2', '1', '6', '8']
    ,
    ['3', '9', '8', '1', '7', '6', '5', '4', '2']
    ,
    ['2', '6', '1', '8', '4', '5', '7', '3', '9']
    ,
    ['8', '3', '7', '5', '6', '9', '2', '1', '4']
    ,
    ['6', '2', '4', '7', '1', '8', '9', '5', '3']
    ,
    ['1', '5', '9', '4', '2', '3', '8', '7', '6']
    ,
    ]
    ,
    [
    ['9', '4', '0', '0', '0', '7', '0', '0', '1']
    ,
    ['7', '8', '3', '6', '9', '0', '0', '2', '5']
    ,
    ['0', '1', '6', '0', '8', '4', '3', '9', '0']
    ,
    ['4', '0', '0', '9', '0', '2', '1', '6', '0']
    ,
    ['3', '9', '0', '0', '0', '0', '5', '4', '0']
    ,
    ['0', '6', '1', '0', '0', '0', '0', '3', '0']
    ,
    ['8', '3', '7', '5', '6', '0', '0', '1', '0']
    ,
    ['6', '2', '0', '7', '1', '8', '9', '5', '3']
    ,
    ['1', '5', '9', '4', '2', '0', '0', '7', '6']
    ,
    ]
    ,
    [
    ['2', '6', '9', '1', '7', '3', '8', '4', '5']
    ,
    ['8', '1', '3', '9', '4', '5', '6', '7', '2']
    ,
    ['7', '4', '5', '6', '8', '2', '9', '1', '3']
    ,
    ['5', '2', '1', '4', '3', '8', '7', '6', '9']
    ,
    ['9', '8', '6', '2', '1', '7', '5', '3', '4']
    ,
    ['3', '7', '4', '5', '9', '6', '2', '8', '1']
    ,
    ['4', '5', '2', '7', '6', '1', '3', '9', '8']
    ,
    ['1', '3', '7', '8', '2', '9', '4', '5', '6']
    ,
    ['6', '9', '8', '3', '5', '4', '1', '2', '7']
    ,
    ]
    ,
    [
    ['2', '6', '9', '1', '7', '3', '8', '4', '5']
    ,
    ['0', '0', '3', '9', '4', '5', '6', '0', '2']
    ,
    ['0', '4', '0', '0', '8', '2', '0', '1', '3']
    ,
    ['0', '2', '1', '0', '0', '0', '7', '0', '0']
    ,
    ['0', '0', '0', '0', '1', '7', '5', '0', '0']
    ,
    ['3', '7', '4', '0', '9', '6', '2', '8', '0']
    ,
    ['4', '5', '2', '0', '6', '0', '3', '9', '0']
    ,
    ['1', '3', '7', '0', '0', '9', '0', '5', '0']
    ,
    ['6', '9', '0', '3', '5', '4', '1', '0', '0']
    ,
    ]
    ,
    [
    ['2', '4', '3', '6', '8', '5', '1', '9', '7']
    ,
    ['7', '1', '9', '2', '3', '4', '8', '5', '6']
    ,
    ['5', '6', '8', '1', '7', '9', '4', '2', '3']
    ,
    ['3', '2', '5', '8', '4', '1', '6', '7', '9']
    ,
    ['8', '9', '4', '5', '6', '7', '2', '3', '1']
    ,
    ['6', '7', '1', '9', '2', '3', '5', '8', '4']
    ,
    ['4', '3', '6', '7', '5', '2', '9', '1', '8']
    ,
    ['9', '8', '2', '3', '1', '6', '7', '4', '5']
    ,
    ['1', '5', '7', '4', '9', '8', '3', '6', '2']
    ,
    ]
    ,
    [
    ['2', '0', '3', '0', '8', '0', '1', '9', '0']
    ,
    ['0', '1', '0', '2', '0', '4', '8', '5', '6']
    ,
    ['5', '6', '8', '0', '7', '9', '0', '2', '0']
    ,
    ['0', '2', '5', '8', '4', '1', '6', '7', '0']
    ,
    ['8', '9', '0', '5', '0', '7', '0', '0', '0']
    ,
    ['0', '7', '1', '0', '0', '3', '5', '0', '0']
    ,
    ['4', '3', '6', '0', '5', '0', '9', '1', '8']
    ,
    ['0', '0', '2', '3', '1', '0', '7', '0', '5']
    ,
    ['0', '5', '0', '4', '9', '8', '0', '6', '2']
    ,
    ]
    ,
    [
    ['9', '3', '4', '5', '6', '8', '7', '2', '1']
    ,
    ['7', '5', '1', '2', '9', '3', '6', '4', '8']
    ,
    ['6', '2', '8', '4', '1', '7', '5', '9', '3']
    ,
    ['3', '8', '6', '1', '5', '2', '4', '7', '9']
    ,
    ['2', '1', '7', '3', '4', '9', '8', '5', '6']
    ,
    ['5', '4', '9', '8', '7', '6', '1', '3', '2']
    ,
    ['8', '7', '3', '6', '2', '5', '9', '1', '4']
    ,
    ['1', '9', '2', '7', '8', '4', '3', '6', '5']
    ,
    ['4', '6', '5', '9', '3', '1', '2', '8', '7']
    ,
    ]
    ,
    [
    ['9', '3', '4', '5', '6', '0', '7', '2', '1']
    ,
    ['0', '5', '1', '2', '0', '3', '0', '4', '8']
    ,
    ['0', '2', '0', '0', '0', '7', '5', '0', '0']
    ,
    ['3', '8', '6', '1', '5', '2', '0', '7', '0']
    ,
    ['0', '1', '7', '3', '0', '9', '8', '5', '6']
    ,
    ['0', '0', '9', '8', '7', '0', '1', '0', '2']
    ,
    ['8', '7', '3', '0', '2', '0', '9', '1', '4']
    ,
    ['1', '9', '2', '0', '8', '4', '0', '0', '0']
    ,
    ['4', '0', '0', '0', '0', '0', '0', '0', '7']
    ,
    ]
    ,
    [
    ['8', '7', '3', '6', '5', '1', '2', '9', '4']
    ,
    ['9', '5', '1', '3', '4', '2', '6', '7', '8']
    ,
    ['4', '6', '2', '8', '9', '7', '1', '3', '5']
    ,
    ['6', '2', '8', '5', '3', '4', '7', '1', '9']
    ,
    ['7', '1', '9', '2', '6', '8', '4', '5', '3']
    ,
    ['5', '3', '4', '7', '1', '9', '8', '2', '6']
    ,
    ['2', '4', '5', '9', '7', '6', '3', '8', '1']
    ,
    ['3', '8', '6', '1', '2', '5', '9', '4', '7']
    ,
    ['1', '9', '7', '4', '8', '3', '5', '6', '2']
    ,
    ]
    ,
    [
    ['0', '7', '0', '6', '0', '1', '2', '9', '4']
    ,
    ['0', '0', '1', '3', '0', '0', '6', '0', '8']
    ,
    ['4', '6', '2', '8', '9', '0', '1', '0', '5']
    ,
    ['6', '2', '8', '5', '3', '0', '7', '1', '0']
    ,
    ['0', '0', '0', '0', '6', '0', '4', '5', '3']
    ,
    ['5', '0', '4', '0', '0', '9', '0', '2', '6']
    ,
    ['2', '4', '0', '0', '7', '6', '0', '8', '0']
    ,
    ['0', '8', '6', '1', '2', '0', '9', '4', '7']
    ,
    ['1', '0', '7', '0', '0', '3', '0', '6', '2']
    ,
    ]
    ,
];

let mediumPuzzles = [
  [
    ['7', '2', '4', '9', '5', '6', '1', '8', '3']
    ,
    ['6', '8', '3', '2', '7', '1', '9', '5', '4']
    ,
    ['1', '5', '9', '4', '8', '3', '7', '6', '2']
    ,
    ['8', '6', '1', '5', '9', '4', '3', '2', '7']
    ,
    ['3', '4', '7', '8', '6', '2', '5', '9', '1']
    ,
    ['5', '9', '2', '3', '1', '7', '8', '4', '6']
    ,
    ['4', '1', '5', '6', '3', '9', '2', '7', '8']
    ,
    ['9', '7', '6', '1', '2', '8', '4', '3', '5']
    ,
    ['2', '3', '8', '7', '4', '5', '6', '1', '9']
    ,
    ]
    ,
    [
    ['0', '2', '0', '9', '0', '0', '1', '0', '0']
    ,
    ['6', '8', '0', '0', '0', '1', '9', '0', '4']
    ,
    ['0', '0', '0', '4', '8', '3', '0', '0', '2']
    ,
    ['0', '0', '1', '0', '9', '4', '3', '2', '0']
    ,
    ['0', '4', '0', '8', '6', '2', '0', '9', '1']
    ,
    ['5', '9', '2', '0', '1', '7', '0', '0', '0']
    ,
    ['4', '1', '0', '6', '0', '9', '0', '0', '8']
    ,
    ['0', '7', '6', '1', '0', '0', '4', '0', '5']
    ,
    ['0', '0', '8', '0', '0', '0', '0', '0', '9']
    ,
    ]
    ,
    [
    ['5', '9', '3', '6', '1', '4', '2', '8', '7']
    ,
    ['2', '1', '6', '8', '7', '5', '3', '9', '4']
    ,
    ['7', '8', '4', '9', '3', '2', '5', '1', '6']
    ,
    ['9', '6', '5', '1', '2', '8', '7', '4', '3']
    ,
    ['3', '7', '1', '5', '4', '6', '8', '2', '9']
    ,
    ['4', '2', '8', '3', '9', '7', '6', '5', '1']
    ,
    ['1', '5', '9', '7', '8', '3', '4', '6', '2']
    ,
    ['8', '4', '7', '2', '6', '1', '9', '3', '5']
    ,
    ['6', '3', '2', '4', '5', '9', '1', '7', '8']
    ,
    ]
    ,
    [
    ['5', '0', '0', '6', '0', '0', '2', '8', '0']
    ,
    ['0', '0', '6', '8', '7', '5', '3', '0', '0']
    ,
    ['0', '0', '0', '0', '3', '2', '5', '1', '6']
    ,
    ['9', '0', '0', '1', '2', '0', '7', '0', '3']
    ,
    ['0', '0', '0', '5', '0', '0', '8', '0', '9']
    ,
    ['0', '2', '0', '3', '0', '0', '0', '5', '0']
    ,
    ['0', '0', '9', '0', '0', '3', '4', '6', '2']
    ,
    ['8', '4', '7', '0', '6', '1', '9', '3', '0']
    ,
    ['0', '0', '0', '0', '0', '9', '1', '7', '0']
    ,
    ]
    ,
    [
    ['1', '2', '7', '8', '6', '4', '9', '5', '3']
    ,
    ['6', '9', '3', '2', '7', '5', '8', '4', '1']
    ,
    ['4', '8', '5', '3', '9', '1', '7', '6', '2']
    ,
    ['3', '7', '2', '1', '4', '9', '6', '8', '5']
    ,
    ['8', '1', '4', '5', '3', '6', '2', '9', '7']
    ,
    ['5', '6', '9', '7', '8', '2', '3', '1', '4']
    ,
    ['7', '5', '6', '4', '2', '8', '1', '3', '9']
    ,
    ['2', '4', '8', '9', '1', '3', '5', '7', '6']
    ,
    ['9', '3', '1', '6', '5', '7', '4', '2', '8']
    ,
    ]
    ,
    [
    ['1', '2', '7', '8', '0', '4', '9', '0', '0']
    ,
    ['0', '9', '3', '0', '7', '5', '0', '0', '0']
    ,
    ['4', '8', '0', '3', '9', '0', '0', '0', '2']
    ,
    ['3', '0', '2', '1', '0', '0', '0', '8', '5']
    ,
    ['8', '1', '4', '0', '0', '0', '0', '0', '7']
    ,
    ['5', '0', '0', '0', '0', '2', '0', '1', '4']
    ,
    ['0', '0', '6', '0', '2', '0', '0', '3', '9']
    ,
    ['0', '0', '8', '0', '0', '0', '5', '7', '6']
    ,
    ['0', '0', '1', '0', '5', '7', '0', '2', '0']
    ,
    ]
    ,
    [
    ['8', '7', '5', '4', '6', '9', '3', '1', '2']
    ,
    ['9', '2', '1', '7', '5', '3', '6', '4', '8']
    ,
    ['3', '6', '4', '2', '8', '1', '5', '7', '9']
    ,
    ['1', '9', '7', '6', '3', '4', '2', '8', '5']
    ,
    ['4', '3', '8', '5', '2', '7', '9', '6', '1']
    ,
    ['2', '5', '6', '1', '9', '8', '7', '3', '4']
    ,
    ['5', '8', '2', '3', '1', '6', '4', '9', '7']
    ,
    ['6', '4', '9', '8', '7', '2', '1', '5', '3']
    ,
    ['7', '1', '3', '9', '4', '5', '8', '2', '6']
    ,
    ]
    ,
    [
    ['0', '0', '5', '4', '0', '9', '3', '0', '2']
    ,
    ['0', '2', '0', '7', '5', '0', '6', '0', '0']
    ,
    ['3', '0', '4', '0', '0', '1', '0', '0', '0']
    ,
    ['0', '9', '0', '6', '3', '4', '2', '0', '5']
    ,
    ['4', '3', '0', '5', '2', '7', '0', '0', '1']
    ,
    ['2', '5', '0', '1', '9', '0', '0', '0', '4']
    ,
    ['0', '0', '2', '3', '0', '0', '0', '9', '7']
    ,
    ['0', '0', '9', '0', '0', '0', '1', '0', '0']
    ,
    ['7', '0', '3', '9', '0', '5', '0', '0', '6']
    ,
    ]
    ,
    [
    ['4', '7', '1', '9', '5', '3', '2', '6', '8']
    ,
    ['3', '6', '2', '1', '8', '4', '5', '9', '7']
    ,
    ['8', '5', '9', '6', '2', '7', '4', '1', '3']
    ,
    ['9', '1', '8', '2', '3', '6', '7', '4', '5']
    ,
    ['5', '2', '3', '4', '7', '1', '9', '8', '6']
    ,
    ['6', '4', '7', '5', '9', '8', '3', '2', '1']
    ,
    ['7', '3', '4', '8', '1', '9', '6', '5', '2']
    ,
    ['2', '8', '6', '7', '4', '5', '1', '3', '9']
    ,
    ['1', '9', '5', '3', '6', '2', '8', '7', '4']
    ,
    ]
    ,
    [
    ['4', '0', '0', '9', '5', '3', '0', '0', '0']
    ,
    ['0', '6', '2', '0', '0', '4', '0', '9', '7']
    ,
    ['0', '5', '9', '6', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '3', '0', '0', '0', '5']
    ,
    ['5', '2', '3', '4', '7', '1', '0', '8', '6']
    ,
    ['0', '0', '0', '5', '9', '0', '3', '0', '0']
    ,
    ['0', '0', '0', '8', '1', '0', '6', '5', '2']
    ,
    ['0', '8', '6', '7', '0', '5', '1', '0', '9']
    ,
    ['0', '9', '5', '0', '0', '0', '0', '7', '4']
    ,
    ]
    ,
    [
    ['4', '5', '9', '6', '1', '8', '7', '3', '2']
    ,
    ['3', '1', '2', '9', '5', '7', '4', '8', '6']
    ,
    ['6', '8', '7', '3', '2', '4', '5', '9', '1']
    ,
    ['8', '9', '1', '5', '3', '2', '6', '4', '7']
    ,
    ['5', '7', '6', '4', '9', '1', '3', '2', '8']
    ,
    ['2', '4', '3', '8', '7', '6', '9', '1', '5']
    ,
    ['1', '2', '4', '7', '6', '3', '8', '5', '9']
    ,
    ['9', '6', '8', '1', '4', '5', '2', '7', '3']
    ,
    ['7', '3', '5', '2', '8', '9', '1', '6', '4']
    ,
    ]
    ,
    [
    ['0', '5', '9', '6', '1', '8', '0', '0', '2']
    ,
    ['0', '0', '0', '0', '5', '0', '4', '8', '0']
    ,
    ['0', '0', '7', '0', '0', '0', '0', '9', '0']
    ,
    ['8', '0', '1', '0', '3', '0', '6', '4', '7']
    ,
    ['0', '7', '6', '4', '9', '1', '3', '0', '0']
    ,
    ['0', '0', '3', '0', '7', '0', '0', '0', '5']
    ,
    ['0', '0', '0', '7', '6', '3', '0', '5', '0']
    ,
    ['0', '6', '0', '1', '4', '5', '2', '0', '0']
    ,
    ['7', '3', '0', '0', '8', '0', '1', '6', '0']
    ,
    ]
    ,
    [
    ['3', '8', '9', '4', '7', '6', '2', '1', '5']
    ,
    ['6', '5', '4', '2', '1', '3', '7', '8', '9']
    ,
    ['1', '2', '7', '8', '9', '5', '3', '4', '6']
    ,
    ['2', '6', '5', '3', '8', '7', '1', '9', '4']
    ,
    ['7', '9', '1', '5', '6', '4', '8', '3', '2']
    ,
    ['4', '3', '8', '9', '2', '1', '6', '5', '7']
    ,
    ['9', '1', '2', '6', '5', '8', '4', '7', '3']
    ,
    ['8', '4', '6', '7', '3', '9', '5', '2', '1']
    ,
    ['5', '7', '3', '1', '4', '2', '9', '6', '8']
    ,
    ]
    ,
    [
    ['0', '8', '0', '4', '7', '0', '2', '1', '0']
    ,
    ['0', '5', '4', '2', '1', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '8', '9', '0', '3', '0', '6']
    ,
    ['0', '6', '5', '0', '0', '0', '1', '0', '4']
    ,
    ['0', '0', '0', '5', '0', '4', '8', '3', '2']
    ,
    ['4', '3', '0', '9', '0', '0', '6', '5', '7']
    ,
    ['9', '0', '2', '6', '0', '0', '4', '0', '3']
    ,
    ['0', '4', '0', '0', '3', '0', '0', '0', '0']
    ,
    ['0', '7', '0', '1', '0', '2', '0', '6', '8']
    ,
    ]
    ,
    [
    ['7', '1', '9', '8', '5', '2', '3', '4', '6']
    ,
    ['3', '5', '6', '7', '1', '4', '9', '2', '8']
    ,
    ['2', '4', '8', '6', '9', '3', '5', '7', '1']
    ,
    ['4', '9', '3', '5', '6', '8', '2', '1', '7']
    ,
    ['1', '6', '2', '3', '4', '7', '8', '9', '5']
    ,
    ['8', '7', '5', '1', '2', '9', '6', '3', '4']
    ,
    ['9', '2', '1', '4', '8', '6', '7', '5', '3']
    ,
    ['5', '8', '7', '9', '3', '1', '4', '6', '2']
    ,
    ['6', '3', '4', '2', '7', '5', '1', '8', '9']
    ,
    ]
    ,
    [
    ['7', '1', '0', '0', '0', '2', '3', '4', '6']
    ,
    ['3', '0', '0', '7', '0', '0', '0', '0', '8']
    ,
    ['2', '4', '0', '0', '0', '0', '5', '7', '1']
    ,
    ['4', '0', '0', '5', '0', '0', '0', '0', '0']
    ,
    ['1', '6', '0', '3', '0', '7', '8', '9', '5']
    ,
    ['8', '0', '5', '1', '2', '9', '6', '3', '4']
    ,
    ['0', '0', '1', '0', '0', '0', '0', '0', '3']
    ,
    ['0', '0', '0', '9', '0', '0', '4', '6', '0']
    ,
    ['0', '0', '4', '0', '7', '0', '1', '0', '9']
    ,
    ]
    ,
    [
    ['4', '6', '7', '9', '5', '3', '1', '2', '8']
    ,
    ['3', '8', '2', '7', '4', '1', '5', '6', '9']
    ,
    ['5', '1', '9', '2', '6', '8', '3', '4', '7']
    ,
    ['1', '4', '3', '8', '9', '6', '7', '5', '2']
    ,
    ['7', '5', '6', '3', '2', '4', '9', '8', '1']
    ,
    ['2', '9', '8', '1', '7', '5', '4', '3', '6']
    ,
    ['8', '7', '5', '4', '1', '2', '6', '9', '3']
    ,
    ['6', '2', '1', '5', '3', '9', '8', '7', '4']
    ,
    ['9', '3', '4', '6', '8', '7', '2', '1', '5']
    ,
    ]
    ,
    [
    ['0', '6', '0', '0', '5', '3', '1', '0', '8']
    ,
    ['0', '8', '0', '7', '4', '1', '0', '6', '9']
    ,
    ['0', '0', '9', '0', '0', '0', '3', '0', '0']
    ,
    ['1', '0', '3', '0', '0', '0', '7', '0', '2']
    ,
    ['7', '0', '6', '3', '0', '0', '0', '0', '1']
    ,
    ['2', '9', '0', '1', '7', '0', '4', '3', '0']
    ,
    ['8', '0', '0', '0', '1', '2', '0', '9', '3']
    ,
    ['0', '2', '1', '5', '0', '0', '0', '7', '4']
    ,
    ['0', '3', '0', '0', '8', '0', '0', '0', '5']
    ,
    ]
    ,
    [
    ['1', '3', '2', '9', '6', '7', '5', '4', '8']
    ,
    ['4', '6', '9', '3', '8', '5', '1', '2', '7']
    ,
    ['5', '8', '7', '2', '1', '4', '3', '9', '6']
    ,
    ['3', '9', '8', '5', '4', '6', '2', '7', '1']
    ,
    ['6', '7', '1', '8', '2', '3', '9', '5', '4']
    ,
    ['2', '5', '4', '1', '7', '9', '8', '6', '3']
    ,
    ['9', '4', '5', '7', '3', '8', '6', '1', '2']
    ,
    ['7', '1', '3', '6', '9', '2', '4', '8', '5']
    ,
    ['8', '2', '6', '4', '5', '1', '7', '3', '9']
    ,
    ]
    ,
    [
    ['1', '0', '2', '0', '0', '0', '0', '0', '0']
    ,
    ['4', '6', '0', '0', '8', '5', '0', '2', '7']
    ,
    ['0', '0', '0', '2', '0', '4', '0', '9', '6']
    ,
    ['3', '9', '8', '5', '4', '6', '0', '7', '1']
    ,
    ['6', '7', '0', '0', '0', '3', '0', '5', '4']
    ,
    ['0', '5', '4', '0', '0', '0', '8', '6', '0']
    ,
    ['0', '0', '5', '7', '3', '0', '6', '1', '0']
    ,
    ['0', '0', '0', '0', '9', '2', '4', '0', '0']
    ,
    ['0', '0', '6', '4', '0', '0', '7', '0', '0']
    ,
    ]
    ,
    [
    ['5', '2', '7', '8', '3', '1', '6', '4', '9']
    ,
    ['8', '3', '4', '9', '5', '6', '2', '7', '1']
    ,
    ['6', '1', '9', '7', '2', '4', '8', '3', '5']
    ,
    ['7', '8', '2', '3', '1', '5', '9', '6', '4']
    ,
    ['1', '4', '6', '2', '7', '9', '5', '8', '3']
    ,
    ['3', '9', '5', '6', '4', '8', '1', '2', '7']
    ,
    ['2', '5', '1', '4', '8', '3', '7', '9', '6']
    ,
    ['4', '6', '8', '1', '9', '7', '3', '5', '2']
    ,
    ['9', '7', '3', '5', '6', '2', '4', '1', '8']
    ,
    ]
    ,
    [
    ['0', '2', '7', '0', '3', '0', '6', '0', '0']
    ,
    ['0', '0', '0', '0', '0', '6', '0', '0', '1']
    ,
    ['0', '1', '9', '7', '0', '0', '0', '3', '5']
    ,
    ['0', '0', '0', '3', '1', '5', '0', '6', '4']
    ,
    ['1', '0', '0', '0', '0', '9', '0', '8', '3']
    ,
    ['3', '9', '5', '6', '4', '0', '1', '0', '0']
    ,
    ['2', '5', '0', '4', '8', '3', '7', '0', '0']
    ,
    ['0', '6', '8', '1', '0', '7', '0', '0', '2']
    ,
    ['0', '7', '3', '0', '0', '0', '0', '0', '8']
    ,
    ]
    ,
    [
    ['4', '5', '6', '9', '2', '1', '3', '8', '7']
    ,
    ['2', '1', '7', '8', '5', '3', '4', '6', '9']
    ,
    ['3', '9', '8', '6', '7', '4', '5', '1', '2']
    ,
    ['9', '6', '4', '3', '8', '2', '1', '7', '5']
    ,
    ['8', '7', '5', '4', '1', '9', '2', '3', '6']
    ,
    ['1', '3', '2', '5', '6', '7', '9', '4', '8']
    ,
    ['6', '8', '9', '1', '4', '5', '7', '2', '3']
    ,
    ['7', '4', '3', '2', '9', '6', '8', '5', '1']
    ,
    ['5', '2', '1', '7', '3', '8', '6', '9', '4']
    ,
    ]
    ,
    [
    ['4', '0', '0', '0', '0', '0', '3', '8', '7']
    ,
    ['0', '1', '0', '8', '0', '3', '0', '6', '9']
    ,
    ['0', '0', '8', '0', '7', '4', '0', '0', '0']
    ,
    ['0', '6', '0', '3', '0', '2', '1', '7', '0']
    ,
    ['0', '0', '0', '4', '0', '9', '2', '0', '0']
    ,
    ['1', '3', '0', '0', '6', '0', '9', '0', '8']
    ,
    ['0', '8', '9', '1', '0', '0', '7', '2', '3']
    ,
    ['7', '0', '0', '2', '0', '6', '8', '0', '0']
    ,
    ['5', '2', '1', '7', '0', '0', '0', '9', '0']
    ,
    ]
    ,
    [
    ['7', '1', '8', '5', '3', '6', '4', '9', '2']
    ,
    ['4', '6', '2', '7', '9', '1', '5', '3', '8']
    ,
    ['9', '5', '3', '4', '8', '2', '6', '1', '7']
    ,
    ['6', '2', '7', '1', '5', '9', '3', '8', '4']
    ,
    ['3', '9', '1', '8', '2', '4', '7', '5', '6']
    ,
    ['5', '8', '4', '6', '7', '3', '1', '2', '9']
    ,
    ['8', '3', '5', '9', '6', '7', '2', '4', '1']
    ,
    ['2', '4', '6', '3', '1', '8', '9', '7', '5']
    ,
    ['1', '7', '9', '2', '4', '5', '8', '6', '3']
    ,
    ]
    ,
    [
    ['0', '1', '0', '0', '0', '6', '4', '0', '0']
    ,
    ['0', '0', '2', '0', '0', '0', '5', '3', '0']
    ,
    ['9', '5', '3', '4', '8', '2', '0', '1', '0']
    ,
    ['0', '0', '7', '1', '0', '9', '0', '0', '0']
    ,
    ['0', '0', '1', '0', '2', '4', '7', '0', '0']
    ,
    ['5', '0', '0', '6', '0', '3', '1', '2', '0']
    ,
    ['0', '3', '0', '9', '0', '0', '0', '4', '1']
    ,
    ['2', '0', '0', '0', '0', '8', '0', '0', '5']
    ,
    ['1', '0', '9', '2', '4', '5', '8', '6', '3']
    ,
    ]
    ,
    [
    ['7', '8', '1', '5', '4', '6', '3', '9', '2']
    ,
    ['3', '9', '4', '7', '2', '1', '8', '5', '6']
    ,
    ['5', '6', '2', '3', '8', '9', '1', '7', '4']
    ,
    ['6', '3', '9', '1', '5', '8', '4', '2', '7']
    ,
    ['2', '1', '5', '9', '7', '4', '6', '3', '8']
    ,
    ['4', '7', '8', '6', '3', '2', '9', '1', '5']
    ,
    ['1', '4', '6', '2', '9', '7', '5', '8', '3']
    ,
    ['8', '5', '7', '4', '1', '3', '2', '6', '9']
    ,
    ['9', '2', '3', '8', '6', '5', '7', '4', '1']
    ,
    ]
    ,
    [
    ['7', '8', '0', '0', '0', '0', '0', '9', '0']
    ,
    ['0', '0', '4', '7', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '2', '3', '8', '9', '1', '7', '4']
    ,
    ['0', '0', '9', '1', '5', '0', '4', '0', '0']
    ,
    ['2', '0', '5', '0', '0', '4', '0', '3', '0']
    ,
    ['4', '7', '0', '6', '3', '0', '9', '0', '5']
    ,
    ['0', '4', '6', '2', '0', '7', '5', '8', '0']
    ,
    ['0', '5', '7', '4', '0', '0', '0', '0', '9']
    ,
    ['9', '0', '0', '0', '0', '5', '0', '4', '1']
    ,
    ]
    ,
    [
    ['9', '6', '2', '8', '7', '1', '4', '5', '3']
    ,
    ['1', '8', '5', '3', '4', '2', '6', '9', '7']
    ,
    ['4', '3', '7', '9', '6', '5', '2', '8', '1']
    ,
    ['5', '2', '3', '4', '1', '9', '7', '6', '8']
    ,
    ['8', '9', '4', '7', '2', '6', '3', '1', '5']
    ,
    ['6', '7', '1', '5', '3', '8', '9', '4', '2']
    ,
    ['3', '1', '9', '2', '8', '4', '5', '7', '6']
    ,
    ['2', '4', '8', '6', '5', '7', '1', '3', '9']
    ,
    ['7', '5', '6', '1', '9', '3', '8', '2', '4']
    ,
    ]
    ,
    [
    ['9', '6', '2', '0', '7', '1', '0', '0', '0']
    ,
    ['1', '0', '5', '0', '4', '0', '0', '0', '7']
    ,
    ['0', '3', '0', '0', '6', '0', '0', '8', '0']
    ,
    ['5', '0', '3', '0', '0', '0', '0', '6', '8']
    ,
    ['8', '9', '4', '0', '2', '6', '0', '0', '0']
    ,
    ['0', '0', '0', '5', '0', '8', '0', '0', '2']
    ,
    ['3', '0', '0', '0', '8', '4', '5', '7', '6']
    ,
    ['2', '0', '8', '6', '5', '7', '1', '0', '0']
    ,
    ['7', '5', '0', '0', '9', '0', '0', '2', '0']
    ,
    ]
    ,
    [
    ['2', '6', '7', '5', '3', '8', '4', '9', '1']
    ,
    ['1', '4', '5', '7', '9', '2', '3', '8', '6']
    ,
    ['9', '3', '8', '6', '1', '4', '2', '5', '7']
    ,
    ['6', '7', '2', '1', '8', '9', '5', '4', '3']
    ,
    ['5', '8', '9', '3', '4', '7', '1', '6', '2']
    ,
    ['3', '1', '4', '2', '6', '5', '8', '7', '9']
    ,
    ['8', '5', '6', '9', '2', '1', '7', '3', '4']
    ,
    ['4', '2', '3', '8', '7', '6', '9', '1', '5']
    ,
    ['7', '9', '1', '4', '5', '3', '6', '2', '8']
    ,
    ]
    ,
    [
    ['2', '6', '0', '5', '0', '0', '0', '9', '0']
    ,
    ['1', '0', '5', '0', '0', '2', '0', '0', '6']
    ,
    ['9', '0', '8', '0', '1', '4', '2', '5', '7']
    ,
    ['0', '7', '2', '1', '8', '9', '0', '4', '0']
    ,
    ['0', '0', '9', '3', '4', '7', '1', '6', '0']
    ,
    ['3', '1', '4', '0', '6', '0', '0', '7', '0']
    ,
    ['0', '0', '0', '9', '2', '0', '0', '3', '0']
    ,
    ['0', '0', '3', '0', '7', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '6', '2', '8']
    ,
    ]
    ,
    [
    ['2', '5', '6', '7', '4', '3', '9', '1', '8']
    ,
    ['9', '3', '1', '8', '6', '2', '7', '5', '4']
    ,
    ['8', '7', '4', '1', '9', '5', '6', '3', '2']
    ,
    ['6', '1', '9', '2', '3', '4', '8', '7', '5']
    ,
    ['5', '2', '3', '9', '8', '7', '4', '6', '1']
    ,
    ['7', '4', '8', '6', '5', '1', '2', '9', '3']
    ,
    ['1', '9', '7', '5', '2', '8', '3', '4', '6']
    ,
    ['3', '8', '5', '4', '7', '6', '1', '2', '9']
    ,
    ['4', '6', '2', '3', '1', '9', '5', '8', '7']
    ,
    ]
    ,
    [
    ['2', '5', '6', '7', '4', '0', '9', '0', '8']
    ,
    ['9', '3', '1', '0', '6', '0', '7', '5', '0']
    ,
    ['0', '7', '0', '1', '0', '0', '0', '0', '2']
    ,
    ['0', '0', '0', '2', '3', '4', '8', '0', '0']
    ,
    ['5', '2', '0', '0', '8', '7', '0', '0', '0']
    ,
    ['0', '4', '8', '0', '0', '1', '0', '9', '3']
    ,
    ['0', '0', '7', '0', '0', '8', '0', '4', '6']
    ,
    ['0', '0', '0', '0', '7', '0', '1', '0', '9']
    ,
    ['4', '0', '2', '0', '0', '0', '0', '8', '7']
    ,
    ]
    ,
    [
    ['1', '6', '4', '8', '3', '9', '5', '7', '2']
    ,
    ['3', '2', '8', '5', '4', '7', '9', '1', '6']
    ,
    ['5', '9', '7', '1', '6', '2', '3', '4', '8']
    ,
    ['7', '5', '3', '9', '1', '8', '6', '2', '4']
    ,
    ['2', '1', '9', '4', '5', '6', '8', '3', '7']
    ,
    ['4', '8', '6', '2', '7', '3', '1', '5', '9']
    ,
    ['8', '7', '2', '3', '9', '1', '4', '6', '5']
    ,
    ['6', '3', '5', '7', '8', '4', '2', '9', '1']
    ,
    ['9', '4', '1', '6', '2', '5', '7', '8', '3']
    ,
    ]
    ,
    [
    ['0', '0', '0', '8', '3', '9', '0', '7', '0']
    ,
    ['3', '2', '8', '5', '4', '7', '0', '1', '0']
    ,
    ['5', '9', '7', '1', '6', '2', '3', '4', '0']
    ,
    ['0', '0', '3', '0', '0', '8', '0', '0', '0']
    ,
    ['2', '0', '9', '4', '0', '0', '8', '0', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '0', '0', '0']
    ,
    ['0', '7', '0', '3', '9', '1', '0', '0', '5']
    ,
    ['0', '3', '5', '7', '0', '4', '2', '0', '1']
    ,
    ['0', '4', '0', '6', '0', '0', '7', '0', '3']
    ,
    ]
    ,
    [
    ['9', '6', '3', '5', '2', '4', '8', '7', '1']
    ,
    ['7', '5', '4', '3', '8', '1', '6', '2', '9']
    ,
    ['2', '8', '1', '7', '9', '6', '4', '3', '5']
    ,
    ['5', '9', '2', '4', '7', '8', '3', '1', '6']
    ,
    ['6', '4', '8', '1', '3', '9', '7', '5', '2']
    ,
    ['1', '3', '7', '2', '6', '5', '9', '4', '8']
    ,
    ['4', '7', '9', '6', '1', '2', '5', '8', '3']
    ,
    ['3', '1', '6', '8', '5', '7', '2', '9', '4']
    ,
    ['8', '2', '5', '9', '4', '3', '1', '6', '7']
    ,
    ]
    ,
    [
    ['9', '6', '3', '5', '0', '0', '8', '7', '0']
    ,
    ['0', '0', '0', '3', '0', '1', '0', '0', '0']
    ,
    ['0', '0', '1', '0', '0', '6', '4', '3', '0']
    ,
    ['5', '9', '0', '4', '0', '8', '3', '1', '0']
    ,
    ['6', '4', '0', '1', '3', '9', '7', '5', '2']
    ,
    ['0', '3', '7', '0', '0', '5', '0', '0', '8']
    ,
    ['0', '0', '0', '0', '1', '0', '5', '0', '0']
    ,
    ['0', '0', '0', '8', '0', '0', '0', '0', '4']
    ,
    ['8', '2', '0', '9', '4', '3', '0', '6', '0']
    ,
    ]
    ,
    [
    ['9', '1', '5', '4', '6', '2', '8', '3', '7']
    ,
    ['7', '3', '4', '5', '8', '1', '2', '9', '6']
    ,
    ['8', '6', '2', '9', '3', '7', '4', '1', '5']
    ,
    ['4', '5', '1', '2', '7', '6', '3', '8', '9']
    ,
    ['2', '8', '6', '3', '4', '9', '5', '7', '1']
    ,
    ['3', '9', '7', '1', '5', '8', '6', '2', '4']
    ,
    ['6', '7', '3', '8', '1', '5', '9', '4', '2']
    ,
    ['1', '2', '8', '6', '9', '4', '7', '5', '3']
    ,
    ['5', '4', '9', '7', '2', '3', '1', '6', '8']
    ,
    ]
    ,
    [
    ['0', '1', '5', '4', '0', '2', '0', '3', '0']
    ,
    ['7', '3', '0', '5', '8', '1', '2', '9', '6']
    ,
    ['0', '0', '2', '0', '3', '7', '4', '1', '0']
    ,
    ['4', '5', '1', '0', '0', '0', '0', '8', '9']
    ,
    ['0', '8', '0', '3', '0', '0', '0', '7', '1']
    ,
    ['0', '9', '7', '0', '0', '8', '6', '0', '0']
    ,
    ['0', '7', '0', '8', '0', '0', '9', '0', '0']
    ,
    ['1', '2', '0', '0', '9', '0', '0', '5', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '1', '0', '8']
    ,
    ]
    ,
];

let hardPuzzles = [
  [
    ['4', '9', '5', '1', '8', '6', '7', '2', '3']
    ,
    ['8', '6', '2', '5', '3', '7', '4', '9', '1']
    ,
    ['3', '1', '7', '2', '4', '9', '6', '8', '5']
    ,
    ['1', '4', '9', '3', '7', '5', '8', '6', '2']
    ,
    ['6', '5', '8', '9', '2', '4', '3', '1', '7']
    ,
    ['7', '2', '3', '6', '1', '8', '5', '4', '9']
    ,
    ['5', '8', '4', '7', '9', '2', '1', '3', '6']
    ,
    ['9', '7', '1', '4', '6', '3', '2', '5', '8']
    ,
    ['2', '3', '6', '8', '5', '1', '9', '7', '4']
    ,
    ]
    ,
    [
    ['4', '9', '0', '0', '8', '0', '0', '0', '3']
    ,
    ['0', '0', '0', '0', '0', '0', '0', '9', '1']
    ,
    ['0', '0', '7', '0', '4', '9', '6', '0', '0']
    ,
    ['1', '0', '0', '3', '7', '0', '0', '6', '0']
    ,
    ['6', '0', '0', '9', '0', '4', '3', '0', '0']
    ,
    ['7', '0', '0', '0', '0', '0', '5', '0', '9']
    ,
    ['0', '0', '4', '0', '9', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '4', '6', '0', '2', '5', '0']
    ,
    ['0', '0', '0', '8', '0', '0', '9', '0', '4']
    ,
    ]
    ,
    [
    ['8', '5', '2', '6', '4', '7', '1', '3', '9']
    ,
    ['1', '6', '9', '3', '8', '5', '4', '7', '2']
    ,
    ['7', '3', '4', '9', '1', '2', '8', '5', '6']
    ,
    ['5', '2', '6', '1', '7', '8', '9', '4', '3']
    ,
    ['4', '8', '1', '5', '9', '3', '6', '2', '7']
    ,
    ['3', '9', '7', '2', '6', '4', '5', '1', '8']
    ,
    ['2', '1', '8', '4', '3', '9', '7', '6', '5']
    ,
    ['6', '7', '3', '8', '5', '1', '2', '9', '4']
    ,
    ['9', '4', '5', '7', '2', '6', '3', '8', '1']
    ,
    ]
    ,
    [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0']
    ,
    ['1', '6', '9', '0', '8', '0', '0', '0', '2']
    ,
    ['0', '3', '0', '9', '0', '2', '0', '0', '6']
    ,
    ['5', '2', '0', '0', '0', '0', '9', '0', '0']
    ,
    ['4', '8', '0', '5', '0', '0', '0', '2', '0']
    ,
    ['0', '0', '0', '2', '0', '0', '5', '0', '0']
    ,
    ['0', '0', '0', '4', '0', '9', '0', '6', '0']
    ,
    ['6', '7', '0', '8', '0', '1', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '2', '6', '3', '8', '1']
    ,
    ]
    ,
    [
    ['8', '5', '2', '4', '7', '1', '6', '9', '3']
    ,
    ['9', '7', '1', '8', '3', '6', '4', '5', '2']
    ,
    ['3', '4', '6', '2', '9', '5', '8', '1', '7']
    ,
    ['1', '9', '3', '6', '2', '8', '5', '7', '4']
    ,
    ['7', '6', '5', '9', '4', '3', '1', '2', '8']
    ,
    ['4', '2', '8', '1', '5', '7', '9', '3', '6']
    ,
    ['5', '1', '4', '7', '6', '2', '3', '8', '9']
    ,
    ['6', '3', '7', '5', '8', '9', '2', '4', '1']
    ,
    ['2', '8', '9', '3', '1', '4', '7', '6', '5']
    ,
    ]
    ,
    [
    ['0', '0', '2', '0', '7', '0', '0', '0', '0']
    ,
    ['9', '7', '0', '0', '0', '6', '0', '5', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '8', '1', '0']
    ,
    ['0', '0', '3', '0', '2', '0', '5', '0', '4']
    ,
    ['7', '0', '0', '0', '0', '3', '1', '0', '8']
    ,
    ['4', '0', '0', '0', '5', '0', '0', '3', '0']
    ,
    ['0', '1', '0', '7', '6', '2', '0', '8', '0']
    ,
    ['0', '3', '0', '5', '0', '0', '2', '4', '1']
    ,
    ['0', '8', '0', '0', '0', '0', '0', '0', '0']
    ,
    ]
    ,
    [
    ['6', '2', '9', '1', '7', '5', '3', '4', '8']
    ,
    ['8', '5', '1', '9', '3', '4', '6', '2', '7']
    ,
    ['3', '4', '7', '6', '8', '2', '1', '5', '9']
    ,
    ['2', '7', '3', '5', '1', '6', '9', '8', '4']
    ,
    ['1', '8', '6', '4', '9', '7', '5', '3', '2']
    ,
    ['4', '9', '5', '3', '2', '8', '7', '1', '6']
    ,
    ['5', '3', '2', '8', '6', '9', '4', '7', '1']
    ,
    ['7', '6', '4', '2', '5', '1', '8', '9', '3']
    ,
    ['9', '1', '8', '7', '4', '3', '2', '6', '5']
    ,
    ]
    ,
    [
    ['0', '2', '9', '0', '0', '5', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '3', '0', '6', '0', '7']
    ,
    ['3', '0', '7', '6', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '1', '0', '9', '0', '4']
    ,
    ['0', '0', '0', '0', '0', '0', '0', '0', '2']
    ,
    ['0', '0', '5', '0', '0', '0', '7', '0', '6']
    ,
    ['5', '3', '2', '8', '0', '9', '0', '0', '1']
    ,
    ['7', '0', '4', '0', '5', '0', '0', '0', '3']
    ,
    ['9', '0', '0', '0', '0', '3', '0', '6', '5']
    ,
    ]
    ,
    [
    ['4', '2', '3', '6', '9', '7', '1', '5', '8']
    ,
    ['5', '1', '9', '3', '8', '2', '6', '7', '4']
    ,
    ['6', '8', '7', '4', '5', '1', '3', '9', '2']
    ,
    ['1', '9', '5', '8', '4', '3', '7', '2', '6']
    ,
    ['3', '7', '6', '5', '2', '9', '4', '8', '1']
    ,
    ['8', '4', '2', '7', '1', '6', '5', '3', '9']
    ,
    ['7', '3', '1', '2', '6', '8', '9', '4', '5']
    ,
    ['9', '5', '8', '1', '3', '4', '2', '6', '7']
    ,
    ['2', '6', '4', '9', '7', '5', '8', '1', '3']
    ,
    ]
    ,
    [
    ['0', '0', '3', '6', '9', '0', '0', '0', '0']
    ,
    ['5', '1', '0', '3', '8', '0', '6', '0', '0']
    ,
    ['0', '0', '0', '0', '5', '1', '0', '0', '2']
    ,
    ['1', '9', '0', '0', '0', '0', '7', '0', '6']
    ,
    ['0', '7', '0', '0', '0', '0', '0', '0', '1']
    ,
    ['8', '4', '2', '0', '0', '0', '0', '3', '0']
    ,
    ['0', '3', '0', '0', '6', '0', '0', '4', '0']
    ,
    ['0', '0', '0', '0', '3', '0', '0', '0', '7']
    ,
    ['0', '0', '0', '9', '7', '0', '8', '1', '0']
    ,
    ]
    ,
    [
    ['6', '4', '3', '1', '7', '5', '2', '8', '9']
    ,
    ['2', '1', '5', '4', '8', '9', '7', '6', '3']
    ,
    ['7', '8', '9', '6', '2', '3', '5', '1', '4']
    ,
    ['4', '6', '7', '2', '1', '8', '9', '3', '5']
    ,
    ['3', '9', '2', '5', '6', '4', '1', '7', '8']
    ,
    ['1', '5', '8', '9', '3', '7', '4', '2', '6']
    ,
    ['5', '2', '1', '3', '9', '6', '8', '4', '7']
    ,
    ['9', '7', '6', '8', '4', '2', '3', '5', '1']
    ,
    ['8', '3', '4', '7', '5', '1', '6', '9', '2']
    ,
    ]
    ,
    [
    ['0', '4', '3', '1', '0', '5', '0', '0', '9']
    ,
    ['0', '0', '0', '0', '0', '0', '0', '0', '3']
    ,
    ['0', '8', '9', '0', '2', '3', '5', '1', '0']
    ,
    ['0', '6', '0', '0', '0', '0', '9', '0', '0']
    ,
    ['0', '9', '0', '5', '0', '4', '0', '0', '8']
    ,
    ['1', '0', '0', '0', '0', '7', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '0', '0', '7']
    ,
    ['0', '7', '6', '8', '0', '0', '3', '5', '0']
    ,
    ['0', '0', '0', '0', '5', '0', '6', '9', '2']
    ,
    ]
    ,
    [
    ['1', '2', '9', '3', '5', '8', '4', '7', '6']
    ,
    ['5', '6', '8', '7', '2', '4', '1', '3', '9']
    ,
    ['4', '7', '3', '9', '1', '6', '8', '2', '5']
    ,
    ['2', '8', '4', '6', '7', '3', '9', '5', '1']
    ,
    ['6', '1', '7', '5', '9', '2', '3', '8', '4']
    ,
    ['3', '9', '5', '4', '8', '1', '7', '6', '2']
    ,
    ['9', '5', '1', '8', '6', '7', '2', '4', '3']
    ,
    ['8', '3', '6', '2', '4', '9', '5', '1', '7']
    ,
    ['7', '4', '2', '1', '3', '5', '6', '9', '8']
    ,
    ]
    ,
    [
    ['1', '2', '0', '0', '5', '8', '0', '0', '0']
    ,
    ['0', '0', '8', '0', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '9', '0', '6', '0', '2', '5']
    ,
    ['2', '0', '0', '6', '7', '0', '0', '5', '0']
    ,
    ['0', '0', '7', '0', '0', '2', '3', '0', '0']
    ,
    ['3', '9', '5', '4', '0', '1', '0', '0', '0']
    ,
    ['0', '0', '1', '8', '0', '0', '0', '0', '3']
    ,
    ['8', '0', '0', '0', '0', '9', '5', '0', '0']
    ,
    ['0', '4', '0', '0', '0', '0', '0', '9', '8']
    ,
    ]
    ,
    [
    ['7', '6', '1', '5', '4', '2', '9', '8', '3']
    ,
    ['5', '3', '8', '6', '1', '9', '2', '7', '4']
    ,
    ['4', '9', '2', '7', '3', '8', '1', '5', '6']
    ,
    ['8', '5', '3', '1', '7', '6', '4', '2', '9']
    ,
    ['6', '2', '9', '4', '8', '3', '5', '1', '7']
    ,
    ['1', '4', '7', '2', '9', '5', '3', '6', '8']
    ,
    ['9', '1', '6', '3', '5', '7', '8', '4', '2']
    ,
    ['3', '7', '4', '8', '2', '1', '6', '9', '5']
    ,
    ['2', '8', '5', '9', '6', '4', '7', '3', '1']
    ,
    ]
    ,
    [
    ['0', '6', '0', '0', '0', '2', '9', '0', '0']
    ,
    ['0', '3', '8', '0', '1', '0', '0', '7', '0']
    ,
    ['4', '9', '2', '0', '3', '0', '0', '5', '0']
    ,
    ['0', '0', '3', '0', '0', '6', '0', '0', '0']
    ,
    ['0', '0', '9', '4', '0', '3', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '3', '0', '8']
    ,
    ['0', '0', '6', '0', '0', '0', '8', '4', '0']
    ,
    ['0', '0', '4', '8', '2', '0', '0', '0', '0']
    ,
    ['2', '8', '5', '0', '0', '0', '7', '3', '0']
    ,
    ]
    ,
    [
    ['6', '2', '9', '3', '5', '4', '8', '1', '7']
    ,
    ['7', '8', '3', '9', '1', '6', '2', '4', '5']
    ,
    ['4', '1', '5', '2', '8', '7', '9', '3', '6']
    ,
    ['9', '5', '6', '4', '2', '3', '7', '8', '1']
    ,
    ['2', '4', '1', '8', '7', '5', '6', '9', '3']
    ,
    ['8', '3', '7', '1', '6', '9', '4', '5', '2']
    ,
    ['3', '9', '2', '6', '4', '1', '5', '7', '8']
    ,
    ['5', '6', '4', '7', '3', '8', '1', '2', '9']
    ,
    ['1', '7', '8', '5', '9', '2', '3', '6', '4']
    ,
    ]
    ,
    [
    ['6', '0', '0', '0', '0', '4', '0', '0', '0']
    ,
    ['0', '0', '3', '0', '1', '0', '2', '0', '0']
    ,
    ['4', '1', '0', '2', '0', '0', '0', '3', '0']
    ,
    ['0', '5', '6', '4', '2', '3', '0', '8', '1']
    ,
    ['0', '0', '1', '0', '0', '5', '0', '0', '0']
    ,
    ['0', '0', '7', '0', '0', '9', '4', '0', '0']
    ,
    ['0', '0', '0', '0', '0', '1', '0', '7', '0']
    ,
    ['5', '6', '0', '7', '0', '8', '0', '0', '9']
    ,
    ['0', '7', '0', '0', '0', '0', '0', '6', '0']
    ,
    ]
    ,
    [
    ['1', '2', '3', '4', '6', '7', '5', '8', '9']
    ,
    ['4', '8', '7', '9', '5', '3', '6', '1', '2']
    ,
    ['9', '6', '5', '8', '1', '2', '4', '3', '7']
    ,
    ['2', '1', '6', '5', '3', '4', '9', '7', '8']
    ,
    ['5', '3', '8', '6', '7', '9', '2', '4', '1']
    ,
    ['7', '4', '9', '1', '2', '8', '3', '6', '5']
    ,
    ['8', '5', '1', '3', '9', '6', '7', '2', '4']
    ,
    ['3', '9', '2', '7', '4', '1', '8', '5', '6']
    ,
    ['6', '7', '4', '2', '8', '5', '1', '9', '3']
    ,
    ]
    ,
    [
    ['0', '2', '0', '0', '0', '0', '5', '0', '0']
    ,
    ['4', '0', '0', '0', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '1', '2', '4', '3', '7']
    ,
    ['0', '0', '0', '0', '3', '4', '9', '0', '8']
    ,
    ['0', '3', '8', '0', '0', '0', '0', '4', '0']
    ,
    ['7', '0', '9', '1', '0', '8', '0', '6', '0']
    ,
    ['8', '0', '0', '0', '9', '0', '7', '0', '0']
    ,
    ['3', '9', '0', '7', '4', '1', '0', '0', '0']
    ,
    ['6', '0', '0', '2', '0', '0', '0', '0', '0']
    ,
    ]
    ,
    [
    ['7', '5', '3', '1', '4', '9', '2', '6', '8']
    ,
    ['9', '1', '4', '6', '8', '2', '7', '5', '3']
    ,
    ['6', '8', '2', '3', '5', '7', '9', '4', '1']
    ,
    ['4', '9', '8', '2', '1', '6', '3', '7', '5']
    ,
    ['5', '6', '1', '8', '7', '3', '4', '9', '2']
    ,
    ['2', '3', '7', '5', '9', '4', '1', '8', '6']
    ,
    ['1', '4', '5', '7', '3', '8', '6', '2', '9']
    ,
    ['3', '7', '6', '9', '2', '5', '8', '1', '4']
    ,
    ['8', '2', '9', '4', '6', '1', '5', '3', '7']
    ,
    ]
    ,
    [
    ['0', '5', '0', '1', '0', '9', '2', '6', '0']
    ,
    ['0', '0', '0', '6', '0', '2', '0', '0', '3']
    ,
    ['0', '8', '0', '3', '5', '7', '9', '0', '0']
    ,
    ['0', '0', '8', '0', '0', '0', '0', '0', '0']
    ,
    ['0', '6', '0', '0', '7', '0', '0', '9', '0']
    ,
    ['0', '0', '0', '0', '9', '0', '0', '0', '0']
    ,
    ['1', '0', '5', '7', '3', '0', '6', '2', '0']
    ,
    ['3', '0', '0', '9', '0', '5', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '6', '1', '0', '0', '7']
    ,
    ]
    ,
    [
    ['7', '1', '3', '8', '9', '4', '5', '2', '6']
    ,
    ['9', '6', '5', '2', '3', '7', '8', '1', '4']
    ,
    ['4', '8', '2', '1', '5', '6', '3', '9', '7']
    ,
    ['1', '2', '9', '3', '6', '8', '7', '4', '5']
    ,
    ['5', '3', '8', '7', '4', '9', '2', '6', '1']
    ,
    ['6', '4', '7', '5', '2', '1', '9', '8', '3']
    ,
    ['8', '7', '6', '9', '1', '3', '4', '5', '2']
    ,
    ['3', '5', '4', '6', '8', '2', '1', '7', '9']
    ,
    ['2', '9', '1', '4', '7', '5', '6', '3', '8']
    ,
    ]
    ,
    [
    ['0', '1', '0', '8', '0', '4', '5', '2', '0']
    ,
    ['0', '0', '0', '2', '3', '0', '8', '0', '4']
    ,
    ['4', '8', '0', '1', '0', '0', '3', '9', '0']
    ,
    ['0', '0', '0', '3', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '8', '7', '4', '0', '2', '0', '1']
    ,
    ['0', '0', '0', '0', '0', '0', '9', '8', '0']
    ,
    ['8', '0', '0', '0', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '4', '6', '0', '0', '0', '7', '9']
    ,
    ['0', '0', '1', '4', '0', '0', '0', '3', '0']
    ,
    ]
    ,
    [
    ['8', '4', '2', '1', '9', '5', '6', '3', '7']
    ,
    ['1', '9', '6', '3', '8', '7', '2', '4', '5']
    ,
    ['7', '3', '5', '2', '4', '6', '9', '8', '1']
    ,
    ['3', '2', '4', '8', '6', '1', '5', '7', '9']
    ,
    ['9', '7', '1', '5', '3', '2', '8', '6', '4']
    ,
    ['6', '5', '8', '4', '7', '9', '1', '2', '3']
    ,
    ['4', '1', '3', '6', '5', '8', '7', '9', '2']
    ,
    ['2', '6', '9', '7', '1', '4', '3', '5', '8']
    ,
    ['5', '8', '7', '9', '2', '3', '4', '1', '6']
    ,
    ]
    ,
    [
    ['0', '4', '0', '1', '0', '5', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '4', '0', '0', '0', '0']
    ,
    ['0', '0', '4', '0', '6', '1', '5', '7', '0']
    ,
    ['0', '7', '1', '5', '3', '2', '0', '6', '4']
    ,
    ['0', '0', '8', '4', '7', '0', '0', '2', '0']
    ,
    ['0', '0', '3', '0', '0', '0', '0', '0', '0']
    ,
    ['2', '6', '0', '0', '1', '0', '0', '5', '0']
    ,
    ['0', '0', '7', '9', '2', '0', '4', '1', '0']
    ,
    ]
    ,
    [
    ['2', '5', '9', '3', '7', '1', '6', '8', '4']
    ,
    ['7', '4', '8', '6', '9', '5', '3', '2', '1']
    ,
    ['3', '1', '6', '2', '8', '4', '5', '7', '9']
    ,
    ['9', '7', '5', '1', '4', '2', '8', '3', '6']
    ,
    ['8', '3', '4', '9', '6', '7', '2', '1', '5']
    ,
    ['1', '6', '2', '8', '5', '3', '9', '4', '7']
    ,
    ['6', '2', '3', '4', '1', '9', '7', '5', '8']
    ,
    ['5', '9', '1', '7', '3', '8', '4', '6', '2']
    ,
    ['4', '8', '7', '5', '2', '6', '1', '9', '3']
    ,
    ]
    ,
    [
    ['0', '0', '0', '0', '0', '0', '0', '8', '0']
    ,
    ['0', '4', '0', '6', '0', '0', '3', '2', '0']
    ,
    ['0', '1', '0', '0', '8', '4', '0', '0', '9']
    ,
    ['0', '0', '0', '0', '0', '0', '0', '3', '0']
    ,
    ['0', '0', '4', '9', '0', '0', '0', '1', '0']
    ,
    ['0', '0', '0', '0', '5', '3', '0', '0', '0']
    ,
    ['0', '0', '0', '4', '1', '0', '7', '0', '8']
    ,
    ['0', '0', '0', '7', '3', '0', '4', '6', '0']
    ,
    ['4', '0', '7', '5', '2', '0', '1', '9', '3']
    ,
    ]
    ,
    [
    ['1', '6', '4', '9', '3', '5', '7', '8', '2']
    ,
    ['8', '3', '5', '2', '6', '7', '1', '9', '4']
    ,
    ['7', '2', '9', '4', '1', '8', '3', '5', '6']
    ,
    ['9', '7', '3', '8', '5', '4', '2', '6', '1']
    ,
    ['4', '8', '2', '1', '7', '6', '5', '3', '9']
    ,
    ['6', '5', '1', '3', '2', '9', '8', '4', '7']
    ,
    ['5', '1', '8', '6', '4', '2', '9', '7', '3']
    ,
    ['2', '9', '6', '7', '8', '3', '4', '1', '5']
    ,
    ['3', '4', '7', '5', '9', '1', '6', '2', '8']
    ,
    ]
    ,
    [
    ['0', '0', '4', '9', '0', '0', '0', '0', '2']
    ,
    ['0', '3', '0', '2', '0', '0', '0', '0', '0']
    ,
    ['7', '0', '0', '4', '1', '0', '0', '0', '0']
    ,
    ['0', '7', '0', '8', '5', '0', '2', '6', '1']
    ,
    ['0', '8', '2', '1', '7', '6', '5', '3', '0']
    ,
    ['0', '0', '0', '3', '0', '0', '0', '0', '7']
    ,
    ['0', '1', '8', '0', '0', '2', '0', '0', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '4', '1', '0']
    ,
    ['3', '0', '0', '0', '0', '0', '0', '2', '0']
    ,
    ]
    ,
    [
    ['5', '3', '1', '2', '9', '4', '7', '6', '8']
    ,
    ['2', '7', '8', '1', '3', '6', '4', '5', '9']
    ,
    ['9', '6', '4', '7', '5', '8', '3', '1', '2']
    ,
    ['8', '5', '6', '3', '2', '1', '9', '7', '4']
    ,
    ['7', '1', '9', '8', '4', '5', '2', '3', '6']
    ,
    ['4', '2', '3', '6', '7', '9', '5', '8', '1']
    ,
    ['1', '4', '2', '5', '8', '3', '6', '9', '7']
    ,
    ['3', '8', '7', '9', '6', '2', '1', '4', '5']
    ,
    ['6', '9', '5', '4', '1', '7', '8', '2', '3']
    ,
    ]
    ,
    [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0']
    ,
    ['0', '7', '8', '1', '3', '6', '0', '5', '9']
    ,
    ['0', '6', '4', '0', '5', '0', '0', '0', '0']
    ,
    ['0', '0', '0', '3', '0', '0', '0', '0', '0']
    ,
    ['0', '0', '9', '0', '0', '0', '0', '3', '0']
    ,
    ['4', '2', '3', '6', '7', '0', '5', '0', '0']
    ,
    ['1', '0', '0', '0', '8', '3', '0', '9', '0']
    ,
    ['0', '0', '7', '0', '6', '2', '1', '0', '5']
    ,
    ['0', '0', '0', '0', '1', '0', '0', '0', '3']
    ,
    ]
    ,
    [
    ['2', '1', '3', '9', '4', '8', '7', '5', '6']
    ,
    ['7', '5', '9', '2', '3', '6', '4', '8', '1']
    ,
    ['4', '8', '6', '7', '1', '5', '9', '3', '2']
    ,
    ['5', '2', '4', '6', '9', '3', '8', '1', '7']
    ,
    ['6', '7', '1', '5', '8', '4', '2', '9', '3']
    ,
    ['9', '3', '8', '1', '7', '2', '5', '6', '4']
    ,
    ['8', '6', '7', '3', '2', '9', '1', '4', '5']
    ,
    ['1', '9', '5', '4', '6', '7', '3', '2', '8']
    ,
    ['3', '4', '2', '8', '5', '1', '6', '7', '9']
    ,
    ]
    ,
    [
    ['0', '0', '0', '0', '0', '0', '7', '5', '6']
    ,
    ['0', '5', '0', '2', '3', '0', '0', '0', '0']
    ,
    ['0', '8', '0', '0', '1', '0', '0', '3', '0']
    ,
    ['0', '2', '0', '0', '9', '0', '0', '1', '7']
    ,
    ['6', '7', '0', '5', '0', '0', '0', '0', '0']
    ,
    ['9', '3', '0', '0', '0', '0', '5', '0', '0']
    ,
    ['0', '6', '0', '3', '0', '9', '1', '4', '0']
    ,
    ['0', '0', '0', '0', '0', '7', '0', '0', '0']
    ,
    ['3', '0', '2', '0', '5', '1', '0', '7', '0']
    ,
    ]
    ,
    [
    ['8', '5', '6', '9', '4', '1', '2', '7', '3']
    ,
    ['7', '1', '9', '5', '3', '2', '8', '6', '4']
    ,
    ['3', '2', '4', '7', '6', '8', '9', '5', '1']
    ,
    ['1', '6', '5', '4', '9', '7', '3', '2', '8']
    ,
    ['4', '8', '7', '2', '1', '3', '6', '9', '5']
    ,
    ['2', '9', '3', '6', '8', '5', '1', '4', '7']
    ,
    ['6', '4', '1', '3', '5', '9', '7', '8', '2']
    ,
    ['9', '3', '2', '8', '7', '4', '5', '1', '6']
    ,
    ['5', '7', '8', '1', '2', '6', '4', '3', '9']
    ,
    ]
    ,
    [
    ['8', '0', '0', '9', '0', '0', '0', '0', '0']
    ,
    ['0', '1', '9', '5', '3', '2', '0', '0', '0']
    ,
    ['0', '2', '0', '7', '0', '0', '9', '5', '0']
    ,
    ['0', '0', '0', '4', '0', '7', '0', '0', '0']
    ,
    ['0', '0', '7', '0', '1', '3', '0', '0', '5']
    ,
    ['0', '0', '0', '6', '8', '5', '0', '0', '0']
    ,
    ['6', '0', '1', '3', '0', '0', '7', '0', '0']
    ,
    ['0', '0', '0', '0', '7', '0', '5', '0', '0']
    ,
    ['0', '0', '8', '0', '2', '0', '4', '3', '0']
    ,
    ]
    ,
    [
    ['5', '2', '8', '3', '7', '4', '6', '1', '9']
    ,
    ['9', '4', '7', '1', '6', '2', '5', '3', '8']
    ,
    ['1', '6', '3', '8', '5', '9', '4', '2', '7']
    ,
    ['3', '8', '4', '6', '2', '7', '1', '9', '5']
    ,
    ['6', '5', '1', '9', '8', '3', '2', '7', '4']
    ,
    ['7', '9', '2', '4', '1', '5', '3', '8', '6']
    ,
    ['4', '3', '6', '2', '9', '8', '7', '5', '1']
    ,
    ['8', '1', '5', '7', '3', '6', '9', '4', '2']
    ,
    ['2', '7', '9', '5', '4', '1', '8', '6', '3']
    ,
    ]
    ,
    [
    ['5', '0', '8', '0', '0', '0', '6', '1', '0']
    ,
    ['0', '0', '0', '0', '6', '0', '0', '0', '8']
    ,
    ['1', '6', '0', '8', '5', '9', '4', '0', '0']
    ,
    ['0', '0', '4', '0', '0', '7', '0', '9', '0']
    ,
    ['0', '0', '0', '9', '0', '0', '0', '0', '4']
    ,
    ['0', '0', '2', '0', '1', '5', '0', '8', '0']
    ,
    ['0', '3', '0', '0', '0', '8', '0', '0', '0']
    ,
    ['0', '1', '0', '0', '3', '6', '0', '4', '0']
    ,
    ['0', '0', '9', '0', '4', '0', '0', '0', '3']
    ,
    ]
    ,
    [
    ['9', '3', '7', '6', '1', '4', '5', '2', '8']
    ,
    ['4', '6', '2', '5', '8', '7', '1', '3', '9']
    ,
    ['5', '1', '8', '3', '2', '9', '6', '4', '7']
    ,
    ['3', '2', '9', '7', '6', '5', '8', '1', '4']
    ,
    ['7', '8', '6', '1', '4', '3', '2', '9', '5']
    ,
    ['1', '4', '5', '2', '9', '8', '7', '6', '3']
    ,
    ['8', '5', '1', '4', '3', '2', '9', '7', '6']
    ,
    ['2', '9', '3', '8', '7', '6', '4', '5', '1']
    ,
    ['6', '7', '4', '9', '5', '1', '3', '8', '2']
    ,
    ]
    ,
    [
    ['9', '3', '0', '0', '0', '4', '0', '0', '0']
    ,
    ['0', '6', '0', '5', '0', '0', '0', '3', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '6', '4', '7']
    ,
    ['3', '0', '9', '0', '0', '0', '0', '0', '4']
    ,
    ['0', '8', '0', '1', '0', '3', '2', '9', '0']
    ,
    ['0', '0', '5', '2', '0', '0', '7', '0', '3']
    ,
    ['0', '0', '0', '0', '3', '2', '0', '7', '6']
    ,
    ['0', '0', '3', '8', '0', '0', '0', '5', '0']
    ,
    ['0', '0', '0', '0', '0', '0', '3', '8', '0']
    ,
    ]
    ,
];

export default App;
