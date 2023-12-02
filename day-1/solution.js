const fs = require('fs');

function readData(path) {
  const data = fs.readFileSync(path, 'utf8');
  dataArray = data.split('\n');
  return dataArray;
}

function task1() {
  const numAr = [];
  readData('./day-1/data.csv').forEach(element => {
    numbers = element.replace(/\D/g, '');
    switch (numbers.length) {
      case 2:
        numAr.push(Number(numbers));
        break;
      case 1:
        numAr.push(Number(numbers+numbers));
        break;
      default: 
        numAr.push(Number(numbers[0]+numbers[numbers.length-1]));
        break;
    }
  });;
  return {numAr, sum: numAr.reduce((save,current)=>save+current,0)};
}

function task2() {
  function replaceNumberWordsWithDigits(text) {
    function matchOverlap(input, re) {
      var r = [], m;
      // Prevent infinite loops
      if (!re.global) re = new RegExp(
          re.source, (re+'').split('/').pop() + 'g'
      );
      while (m = re.exec(input)) {
          re.lastIndex -= m[0].length - 1;
          r.push(m[0]);
      }
      return r;
    }

    const numberWords = {
        zero: '0',
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9'
    };
    const pattern = new RegExp(`(${Object.keys(numberWords).join('|')}|\\d)`,'gi');
    const matchedText = matchOverlap(text, pattern)
    const replacedText = matchedText.map(e=>e.length>1?numberWords[e.toLowerCase()]:e).join('');
    return replacedText;
  }

  const numAr = [];
  readData('./day-1/data.csv').forEach(element => {
    numbers = replaceNumberWordsWithDigits(element);
    switch (numbers.length) {
      case 2:
        numAr.push(Number(numbers));
        break;
      case 1:
        numAr.push(Number(numbers+numbers));
        break;
      default: 
        numAr.push(Number(numbers[0]+numbers[numbers.length-1]));
        break;
    }
  });;
  return {numAr, sum: numAr.reduce((save,current)=>save+current,0)};
}

console.log(task1().sum);
console.log(task2().sum);