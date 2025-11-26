const canvas = document.getElementById("binaryCanvas");
const ctx = canvas.getContext("2d");
let arr = [5, 10, 20, 35, 45, 60, 75, 90];
const barWidth = 60;

function drawArray(arr, low, high, mid, target, found = false) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arr.forEach((value, i) => {
    let color = "#007BFF";
    if (i < low || i > high) color = "#ddd";
    else if (i === mid) color = found ? "#00C851" : "#FF4444";

    ctx.fillStyle = color;
    ctx.fillRect(i * barWidth + 20, 100, barWidth - 10, value / 2 + 30);

    ctx.fillStyle = "#222";
    ctx.fillText(value, i * barWidth + 40, 90);
  });
}

async function binarySearchVisual(arr, low, high, target) {
  if (low > high) {
    drawArray(arr, low, high, -1, target);
    return;
  }

  const mid = Math.floor((low + high) / 2);
  drawArray(arr, low, high, mid, target);
  await new Promise(r => setTimeout(r, 800));

  if (arr[mid] === target) {
    drawArray(arr, low, high, mid, target, true);
    return;
  } else if (arr[mid] > target) {
    await binarySearchVisual(arr, low, mid - 1, target);
  } else {
    await binarySearchVisual(arr, mid + 1, high, target);
  }
}

function startBinarySearch() {
  const target = parseInt(document.getElementById("target").value);
  binarySearchVisual(arr, 0, arr.length - 1, target);
}

drawArray(arr, 0, arr.length - 1, -1);
