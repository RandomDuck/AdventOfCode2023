const fs = require('fs');

function readData(path) {
  const data = fs.readFileSync(path, 'utf8');
  dataArray = data.split('\n');
  return dataArray;
}

const thresholds = {r: 12, g: 13, b:14};

function splitGames(data) {
  function callMap(e) {
    return [e.split(' ')[2].charAt(0), Number(e.split(' ')[1])];
  }

  return {
    game: data.split(':')[0],
    rounds: data.split(':')[1].split(';').map(e=>e.split(',').map(callMap))
  }
}

function task1() {
  const parsedData = readData('./day-2/data.csv').map(e=>splitGames(e));
  const truthArr = parsedData.map(e=>[e.game.split(' ')[1],e.rounds.map(e=>e.map(e=>thresholds[e[0]] >= e[1]).some(e=>e===false)).some(e=>e===true)]);
  return {
    possible: truthArr.length - truthArr.reduce((e,x)=>e+(x[1]?1:0),0),
    possibleSum: truthArr.reduce((e,x)=>e+(!x[1]?Number(x[0]):0),0),
    impossible: truthArr.reduce((e,x)=>e+(x[1]?1:0),0),
    impossibleSum: truthArr.reduce((e,x)=>e+(x[1]?Number(x[0]):0),0),
    total: truthArr.length,
    arr: truthArr
  }
}

function task2() {
}

console.log(task1());
console.log(task2());