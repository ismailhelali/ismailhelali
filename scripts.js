// script.js
document.getElementById('speak-btn').addEventListener('click', () => {
    let text = document.getElementById('text-to-speak').value;
    let voiceSelect = document.getElementById('voice-selection');
    let rate = document.getElementById('rate').value;
    let pitch = document.getElementById('pitch').value;
    speakText(text, voiceSelect.value, rate, pitch);
});

let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    var voiceSelect = document.getElementById('voice-selection');
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        if (voice.default) {
            option.textContent += ' -- DEFAULT';
        }
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

window.speechSynthesis.onvoiceschanged = function() {
    populateVoiceList();
};

function speakText(text, voiceName, rate, pitch) {
    if (speechSynthesis.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (text !== '') {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices.find(voice => voice.name === voiceName);
        utterance.pitch = pitch;
        utterance.rate = rate;
        speechSynthesis.speak(utterance);
        document.getElementById('status').textContent = 'Speaking...';
        utterance.onend = function(event) {
            document.getElementById('status').textContent = 'Done speaking.';
        }
    }
}

populateVoiceList();
    
