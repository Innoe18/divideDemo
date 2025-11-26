const canvas = document.getElementById("mergeCanvas");
const ctx = canvas.getContext("2d");
let array = [40, 10, 70, 20, 90, 50, 30, 60];
const barWidth = 50;

function drawArray(arr, colors = []) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arr.forEach((value, i) => {
    ctx.fillStyle = colors[i] || "#007BFF";
    ctx.fillRect(i * barWidth + 20, canvas.height - value * 2, barWidth - 10, value * 2);
    ctx.fillStyle = "#222";
    ctx.fillText(value, i * barWidth + 35, canvas.height - value * 2 - 5);
  });
}

async function mergeSortVisual(arr, l, r) {
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);

  await mergeSortVisual(arr, l, m);
  await mergeSortVisual(arr, m + 1, r);
  await mergeVisual(arr, l, m, r);
}

async function mergeVisual(arr, l, m, r) {
  const leftArr = arr.slice(l, m + 1);
  const rightArr = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;

  while (i < leftArr.length && j < rightArr.length) {
    arr[k] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
    drawArray(array, array.map((_, idx) => (idx >= l && idx <= r ? "#00C4CC" : "#007BFF")));
    await new Promise(resolve => setTimeout(resolve, 300));
    k++;
  }

  while (i < leftArr.length) arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
}

function startMergeSort() {
  array = [40, 10, 70, 20, 90, 50, 30, 60];
  drawArray(array);
  mergeSortVisual(array, 0, array.length - 1);
}

drawArray(array);
