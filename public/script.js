// window.onload = start;

document.addEventListener("DOMContentLoaded", start);

function start() {
    initRegexpSample(0);
    const firstSample = document.querySelector('#first-sample');
    const secondSample = document.querySelector('#second-sample');
    const saveButton = document.querySelector('#save-on-server');
    firstSample.onclick = () => initRegexpSample(0);
    secondSample.onclick = () => initRegexpSample(1);
    saveButton.onclick = () => {
        const samples = [...document.querySelectorAll('.sample-input')].map(elem => elem.value);
        const regexp = document.querySelector('#regexp-text').value;
        const sampleData = { regexp, samples };
        sendData(sampleData);
    } 

    createPromise('John')
        .then(message => {
            console.log(message);
            return getRegexpData(0);
        })
        .then(json => {
            return json;
        })
        .then(json => {
            console.log(json);
        })
        .catch(console.error);
}

function createPromise(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Successful, my dear " + name);
        }, 2000);
        setTimeout(() => {
            reject("Fault!");
        }, 3000);
    })
}


function sendData(data) {
    const requestText = JSON.stringify(data, null, 2);
    console.log(requestText);
    fetch('/api/savesampletoserver', {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json",
            "Content-Length": requestText.length.toString(),
        }),
        body: requestText
    }).then(response => response.json())
    .then(response => console.log(response.message))
}

function getRegexpData(sampleId) {
    return fetch('/getregexpsample?id=' + sampleId)
        .then((resolve) => {
            return resolve.json();
        })
}

function initRegexpSample(sampleId) {
    const regexpText = document.querySelector('#regexp-text');
    const samples = document.querySelector('.samples');
    samples.innerHTML = '';
    getRegexpData(sampleId).then((sampleData) => {
        regexpText.value = sampleData.regexp;
        sampleData.samples.forEach(sampleValue => {
            const sample = document.createElement('div');
            sample.className = "sample"
            sample.innerHTML = `<input class="input sample-input" type="text" value="${sampleValue}">
            <div class="answer no-match">No match</div>`;
            samples.appendChild(sample);
        });
    })
}