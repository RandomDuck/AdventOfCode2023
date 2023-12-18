const fs = require('fs');

function readData(path) {
  const data = fs.readFileSync(path, 'utf8');
  dataArray = data.split('\n');
  return dataArray;
}

const thresholds = {r: 12, g: 13, b:14};

function findNonDigitPositions(inputString) {
  const pattern = /[^0-9.]/;  // Match any character that is not a digit or dot
  const positions = [];

  for (i = 0; i < inputString.length; i++){
    pattern.test(inputString[i]) && positions.push(i);
  } 

  return positions;
}

function parseArrayOfNonDigits(data) {
  const digit2dArr = [];
  data.forEach(e=>digit2dArr.push(findNonDigitPositions(e)));
  return digit2dArr;
}


function task1() {
  console.log(readData('./day-3/data.csv'))
  return parseArrayOfNonDigits(readData('./day-3/data.csv'));
}

function task2() {
  const parsedData = readData('./day-2/data.csv').map(e=>splitGames(e));
  const data = parsedData.map(e => {
    const rgbmin = {r:0,g:0,b:0}
    e.rounds.map(e => {
      e.forEach(e => {
        rgbmin[e[0]] = rgbmin[e[0]] > e[1] ? rgbmin[e[0]] : e[1];
      })
    })
    return rgbmin
  });
  return {
    //arr: data.map(e=>((e.r<1?1:e.r)*(e.b<1?1:e.b)*(e.g<1?1:e.g))),
    sum: data.map(e=>((e.r<1?1:e.r)*(e.b<1?1:e.b)*(e.g<1?1:e.g))).reduce((e,x)=>e+x,0)
  }
}

console.log(task1());
// console.log(task2());