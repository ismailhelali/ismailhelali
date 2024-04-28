// script.js
document.addEventListener('DOMContentLoaded', function() {
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
});

let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();

    if (voices.length === 0) {
        window.speechSynthesis.getVoices(); // try to force voice loading
    }

    var voiceSelect = document.getElementById('voice-selection');
    voiceSelect.innerHTML = ''; // Clear existing entries
    voices.forEach((voice, index) => {
        var option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        if (voice.default) {
            option.textContent += ' -- DEFAULT';
        }
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

document.getElementById('speak-btn').addEventListener('click', function() {
    var text = document.getElementById('text-to-speak').value;
    var selectedOption = document.getElementById('voice-selection').selectedOptions[0].getAttribute('data-name');
    var rate = parseFloat(document.getElementById('rate').value);
    var pitch = parseFloat(document.getElementById('pitch').value);
    speakText(text, selectedOption, rate, pitch);
});

function speakText(text, voiceName, rate, pitch) {
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find(voice => voice.name === voiceName);
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = function(event) {
        document.getElementById('status').textContent = 'Speaking...';
    };
    utterance.onend = function(event) {
        document.getElementById('status').textContent = 'Done speaking.';
    };

    speechSynthesis.speak(utterance);
}
