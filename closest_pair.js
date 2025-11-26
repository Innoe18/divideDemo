const canvas = document.getElementById("pairCanvas");
const ctx = canvas.getContext("2d");
let points = [];

function generatePoints() {
  points = [];
  for (let i = 0; i < 12; i++) {
    points.push({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20
    });
  }
  drawPoints();
}

function drawPoints(closest = []) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#007BFF";
    ctx.fill();
  }
  if (closest.length === 2) {
    ctx.strokeStyle = "#00C851";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(closest[0].x, closest[0].y);
    ctx.lineTo(closest[1].x, closest[1].y);
    ctx.stroke();

    ctx.fillStyle = "#00C851";
    ctx.beginPath();
    ctx.arc(closest[0].x, closest[0].y, 8, 0, 2 * Math.PI);
    ctx.arc(closest[1].x, closest[1].y, 8, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function bruteForceClosest(pts) {
  let minDist = Infinity;
  let pair = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      let d = distance(pts[i], pts[j]);
      if (d < minDist) {
        minDist = d;
        pair = [pts[i], pts[j]];
      }
    }
  }
  return pair;
}

async function startClosestPair() {
  if (points.length < 2) {
    alert("Please generate points first!");
    return;
  }

  // Simulate divide & conquer (showing recursive halves)
  let left = points.slice().sort((a, b) => a.x - b.x);
  let mid = Math.floor(left.length / 2);
  let leftHalf = left.slice(0, mid);
  let rightHalf = left.slice(mid);

  drawPoints();
  ctx.strokeStyle = "#FF4444";
  ctx.beginPath();
  ctx.moveTo(left[mid].x, 0);
  ctx.lineTo(left[mid].x, canvas.height);
  ctx.stroke();

  await new Promise(r => setTimeout(r, 1000));

  let pairLeft = bruteForceClosest(leftHalf);
  let pairRight = bruteForceClosest(rightHalf);

  let bestPair = distance(pairLeft[0], pairLeft[1]) <
                 distance(pairRight[0], pairRight[1])
                 ? pairLeft : pairRight;

  drawPoints(bestPair);
}

drawPoints();
