function parseHARLog(har) {
    let bigString = '';
    const extractText = document.getElementById('extracted-text');
    har.entries.map((entry) => {
        let bigString = '';
        if (entry.request.url.includes('transcript')) {
            entry.getContent(async (body, encoding) => {
                const parsedObject = await JSON.parse(body);
                parsedObject.value.map((value) => {
                    bigString += ` ${value.eventData.text}`
                })
                extractText.innerHTML = bigString;
            });
        }
    });
}

function onExtractClicked(e) {
    chrome.devtools.network.getHAR(parseHARLog)
}

const extractButton = document.getElementById('extract-button');

extractButton.addEventListener('click', onExtractClicked);
