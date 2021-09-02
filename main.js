import './style.css'

import * as Tone from 'tone';
import { setupExampleSong } from './songs/examplesmix';
import { setupMainMelodyInstrument } from './instruments/melody';
import { setupBlastSpeedNoiseInstrument } from './instruments/blastNoise';
import { setupSnareInstrument } from './instruments/snare';

Tone.Transport.bpm.value = 160;
const blastSpeedChance = 0.15;
const defaultSpeed = '8n';
const blastNoteSpeed = '16n';
const snareSpeed = '4n';
const snareTriChance = 0.65;

const blastSpeedParams = {
  isBlastSpeeding: false,
  currentBlastSpeedNotes: 0,
  blastSpeedBass: null,
  blastSpeedNotes: 8
}

function onBlastSpeedTrigger() {
  if(blastSpeedParams.blastSpeedBass.state === 'stopped') {
    blastSpeedParams.blastSpeedBass.start('4n');
  } else {
    blastSpeedParams.blastSpeedBass.stop();
  }
}

setupMainMelodyInstrument(blastSpeedParams, onBlastSpeedTrigger, blastSpeedChance, defaultSpeed);
setupBlastSpeedNoiseInstrument(blastSpeedParams, onBlastSpeedTrigger, blastNoteSpeed);
setupSnareInstrument(snareSpeed, snareTriChance);

// setupExampleSong();

setTimeout(100);

Tone.Transport.start();

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  <button id="play-button">Play/Pause</button>
`

document.getElementById("play-button").addEventListener("click", function() {
  if (Tone.Transport.state !== 'started') {
    Tone.Transport.start();
    // ramp up to 800 bpm over 10 seconds
    // Tone.Transport.bpm.rampTo(800, 3);
  } else {
    Tone.Transport.stop();
  }
});
