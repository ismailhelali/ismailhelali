// script.js
document.getElementById('speak-btn').addEventListener('click', function() {
    var text = document.getElementById('text-to-speak').value;
    speakText(text);
});

function speakText(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-US'; // Set the language here
    window.speechSynthesis.speak(msg);
}
