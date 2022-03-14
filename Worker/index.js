console.log('starting workers');

const workers = [
worker1 = new Worker('workerFile.js'),
worker2 = new Worker('workerFile.js'),
worker3 = new Worker('workerFile.js')
];

const inputs = document.getElementsByTagName("input")
const results = document.getElementsByTagName("p")

function addHours(workerNumber) {
    const worker = workers[workerNumber -1];
    const input = inputs[workerNumber - 1]
    const value = parseInt(input.value);

    const result = results[workerNumber - 1].innerHTML;
    const totalValue = result.slice(result.indexOf(':') + 2, result.length);
    let total = 0;
    if (totalValue && !isNaN(totalValue)) {
        total = parseInt(totalValue)
    }
 
    if (value) {
        worker.onmessage = function(event) {
            newValue = event.data.total;
            showResult(workerNumber, newValue);
        }
        worker.postMessage({workerNumber: workerNumber, value: value, total: total});
    } else {
        alert('vul een waarde in om de worker te starten')
    }
}

function showResult(workerNumber, resultValue) {
    const result = results[workerNumber -1];
    result.innerHTML = "totaal uren: " + resultValue
}