/**
 * Function used to extract transcripts from the HAR object
 * @param {object} entry this is the network object containing HAR for a psecific request
 */
function extractTranscriptAndShow(entry, parseFunction) {
    entry.getContent(async (body, encoding) => {
        const parsedObject = await JSON.parse(body);
        parseFunction(parsedObject, (bigString) => {
            extractText.innerHTML = bigString;
        });
    });
}

/**
 * HOF to process MSFT stream transcript object
 * @param {object} parsedObject containing JSON response body
 * @param {callback}
 */
function parseMSFTStream(parsedObject, callback) {
    let bigString = '';
    parsedObject.value.map((value) => {
        bigString += ` ${value.eventData.text}`
    });
    callback(bigString);
}

/**
 * HOF to process MediaSite transcript object
 * @param {object} parsedObject containing JSON response body
 * @param {callback}
 */
function parseMediaSiteStream(parsedObject, callback) {
    let bigString = '';
    parsedObject.d.Presentation.Transcript.map((script) => {
        bigString += ` ${script.Text}`
    });
    callback(bigString);
}

function parseHARLog(har) {
    har.entries.map((entry) => {
        if (entry.request.url.includes('transcript')) {
            extractTranscriptAndShow(entry, parseMSFTStream);
            return;
        }
        if (entry.request.url.includes('GetPlayerOptions')) {
            extractTranscriptAndShow(entry, parseMediaSiteStream);
            return;
        }
    });
}

const extractText = document.getElementById('extracted-text');
const extractButton = document.getElementById('extract-button');

function onExtractClicked(e) {
    chrome.devtools.network.getHAR(parseHARLog)
}

extractButton.addEventListener('click', onExtractClicked);