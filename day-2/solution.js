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
    //arr: truthArr,
    total: truthArr.length
  }
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
console.log(task2());