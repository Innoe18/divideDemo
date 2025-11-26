const canvas = document.getElementById('mergeCanvas');
const ctx = canvas.getContext('2d');
let array = [40, 10, 70, 20, 90, 50, 30, 60];
let steps = [];
let stepIndex = -1;
const barWidth = 50;

// ==================== Visualization ====================
function drawArray(arr, highlights = {}) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    arr.forEach((value, i) => {
        ctx.fillStyle = highlights[i] || '#007BFF';
        ctx.fillRect(i * barWidth + 20, canvas.height - value * 2, barWidth - 10, value * 2);
        ctx.fillStyle = '#222';
        ctx.fillText(value, i * barWidth + 35, canvas.height - value * 2 - 5);
    });
}

// ==================== Step Engine ====================
function recordStep(action, description, arrCopy) {
    steps.push({action, description, arrCopy});
}

function nextStep() {
    if(stepIndex < steps.length - 1) stepIndex++;
    updateStep();
}

function prevStep() {
    if(stepIndex > 0) stepIndex--;
    updateStep();
}

function resetVisualizer() {
    stepIndex = -1;
    steps = [];
    array = [40, 10, 70, 20, 90, 50, 30, 60];
    drawArray(array);
    document.getElementById('mergeExplanation').innerText = 'Press "Next Step" to see the first operation.';
    buildSteps([...array], 0, array.length - 1);
}

function updateStep() {
    if(stepIndex < 0) return;
    const step = steps[stepIndex];
    drawArray(step.arrCopy, step.highlights);
    document.getElementById('mergeExplanation').innerText = step.description;
}

// ==================== Merge Sort Logic ====================
function buildSteps(arr, left, right) {
    if(left >= right) return;
    const mid = Math.floor((left + right)/2);

    recordStep('divide', `Dividing array indices ${left} to ${right}. Midpoint at ${mid}.`, [...arr]);

    buildSteps(arr, left, mid);
    buildSteps(arr, mid+1, right);
    mergeStep(arr, left, mid, right);
}

function mergeStep(arr, left, mid, right) {
    let leftArr = arr.slice(left, mid+1);
    let rightArr = arr.slice(mid+1, right+1);
    let i=0, j=0, k=left;

    while(i<leftArr.length && j<rightArr.length){
        let description = `Merging indices ${left} to ${right}: comparing ${leftArr[i]} and ${rightArr[j]}. `;
        if(leftArr[i]<=rightArr[j]){
            arr[k] = leftArr[i];
            description += `Choose ${leftArr[i]} from left subarray.`;
            i++;
        } else {
            arr[k] = rightArr[j];
            description += `Choose ${rightArr[j]} from right subarray.`;
            j++;
        }
        recordStep('merge', description, [...arr]);
        k++;
    }

    while(i<leftArr.length){
        arr[k] = leftArr[i];
        recordStep('merge', `Remaining left element ${leftArr[i]} placed at index ${k}.`, [...arr]);
        i++; k++;
    }

    while(j<rightArr.length){
        arr[k] = rightArr[j];
        recordStep('merge', `Remaining right element ${rightArr[j]} placed at index ${k}.`, [...arr]);
        j++; k++;
    }

    recordStep('merged', `Completed merge of indices ${left} to ${right}. Result: [${arr.slice(left,right+1)}]`, [...arr]);
}

// ==================== Initialization ====================
resetVisualizer();
document.getElementById('nextStep').addEventListener('click', nextStep);
document.getElementById('prevStep').addEventListener('click', prevStep);
document.getElementById('reset').addEventListener('click', resetVisualizer);  