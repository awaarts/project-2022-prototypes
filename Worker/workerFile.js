

onmessage = function(message) {
    workerNumber = message.data.workerNumber;
    value = message.data.value;
    total = message.data.total
    randomDelay = Math.floor(Math.random() * 15) * 1000
    console.log(randomDelay)
    console.log('calculating new value')
    this.setTimeout(() => {
        console.log('Messaged afgerond na ' + randomDelay / 1000 +  ' seconden')
        this.postMessage({total: total + value});
    }, randomDelay)
}