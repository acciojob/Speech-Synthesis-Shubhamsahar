// Your script here.
let voices = [];
        let currentVoice = null;
        let speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US';

        // Populate voice select dropdown
        function populateVoiceList() {
            voices = window.speechSynthesis.getVoices();
            const voiceSelect = document.getElementById('voice-select');
            voiceSelect.innerHTML = '';

            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.value = index;
                voiceSelect.appendChild(option);
            });

            voiceSelect.addEventListener('change', () => {
                currentVoice = voices[voiceSelect.value];
                speech.voice = currentVoice;
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    speech.text = document.getElementById('text').value;
                    window.speechSynthesis.speak(speech);
                }
            });
        }

        // Initialize voices
        populateVoiceList();
        window.speechSynthesis.onvoiceschanged = populateVoiceList;

        // Update rate and pitch values
        document.getElementById('rate').addEventListener('input', () => {
            speech.rate = document.getElementById('rate').value;
            document.getElementById('rate-value').textContent = speech.rate;
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                speech.text = document.getElementById('text').value;
                window.speechSynthesis.speak(speech);
            }
        });

        document.getElementById('pitch').addEventListener('input', () => {
            speech.pitch = document.getElementById('pitch').value;
            document.getElementById('pitch-value').textContent = speech.pitch;
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                speech.text = document.getElementById('text').value;
                window.speechSynthesis.speak(speech);
            }
        });

        // Speak and stop buttons functionality
        document.getElementById('speak').addEventListener('click', () => {
            const text = document.getElementById('text').value;
            if (text.trim() !== '') {
                speech.text = text;
                speech.rate = document.getElementById('rate').value;
                speech.pitch = document.getElementById('pitch').value;
                window.speechSynthesis.speak(speech);
            }
        });

        document.getElementById('stop').addEventListener('click', () => {
            window.speechSynthesis.cancel();
        });
