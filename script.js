var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var sortingSelect = document.getElementById("sortingSelect");
var timeInput = document.getElementById("time");
var randomNumbers = [];
var timer = 20;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBlock(index, num) {
  ctx.beginPath();
  ctx.rect(index, 0, 1, num);
  ctx.fillStyle = "black";
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawAllblocks() {
  for (var i = 0; i < 300; i++) {
    drawBlock(i, randomNumbers[i]);
  }
}

function selectionSort(x) {
  for (var i = 0; i < x.length; i++) {
    var minIndex = i;

    for (var j = i + 1; j < x.length; j++) {
      if (x[j] < x[minIndex]) {
        minIndex = j;
      }
    }

    var temp = x[i];
    x[i] = x[minIndex];
    x[minIndex] = temp;
  }
}

function slowSelectionSort(x) {
  let i = 0;
  let outLoop = setInterval(() => {
    if (i == x.length) {
      clearInterval(outLoop);
    }

    var minIndex = i;

    for (var j = i + 1; j < x.length; j++) {
      if (x[j] < x[minIndex]) {
        minIndex = j;
      }
    }

    var temp = x[i];
    x[i] = x[minIndex];
    x[minIndex] = temp;

    clear();
    drawAllblocks();

    i++;
  }, timer);
}

function insertionSort(elements) {
  for (var j = 1; j < elements.length; j++) {
    var temp = elements[j];
    var possibleIndex = j;
    while (possibleIndex > 0 && temp < elements[possibleIndex - 1]) {
      elements[possibleIndex] = elements[possibleIndex - 1];
      possibleIndex--;
    }
    elements[possibleIndex] = temp;
  }
}

function slowInsertionSort(elements) {
  let j = 1;
  let outLoop = setInterval(() => {
    if (j == elements.length) {
      clearInterval(outLoop);
    }

    var temp = elements[j];
    var possibleIndex = j;

    while (possibleIndex > 0 && temp < elements[possibleIndex - 1]) {
      elements[possibleIndex] = elements[possibleIndex - 1];
      possibleIndex--;
    }

    elements[possibleIndex] = temp;
    clear();
    drawAllblocks();
    j++;
  }, timer);
}

function bubbleSort(arr) {
  let temp = 0;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

function slowBubbleSort(arr) {
  let temp = 0;
  let i = 0;
  let outLoop = setInterval(() => {
    if (i == arr.length) {
      clearInterval(outLoop);
    }

    for (var j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }

    clear();
    drawAllblocks();

    i++;
  }, timer);
}

function startSort() {
  timer = timeInput.value;

  //Fill array with random numbers
  for (var i = 0; i < 300; i++) {
    randomNumbers[i] = getRandomInt(0, 150);
  }

  switch (sortingSelect.value) {
    case "bubbleSort":
      slowBubbleSort(randomNumbers);
      break;

    case "insertionSort":
      slowInsertionSort(randomNumbers);
      break;

    case "selectionSort":
      slowSelectionSort(randomNumbers);
      break;

    default:
      break;
  }
}

function shellSort(arr) {
  let n = arr.length;


  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
  
    for (let i = gap; i < n; i += 1) {
    
      let temp = arr[i];
    
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        arr[j] = arr[j - gap];
    
      arr[j] = temp;
    }
  }
  return arr;
}

//Draw blocks
for (var i = 0; i < 300; i++) {
  drawBlock(i, randomNumbers[i]);
}
