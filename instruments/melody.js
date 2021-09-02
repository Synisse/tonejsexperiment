import * as Tone from 'tone';

export function setupMainMelodyInstrument(aBlastSpeedParams, blastSpeedInstrumentCallback, blastSpeedChance, defaultSpeed) {
    const melodyScale = ['C3', 'D3', 'E3', 'F3', 'G3', 'B3', 'A3'];

    const melodySynth = new Tone.Synth({
      oscillator : {
        type : "fmsquare",
        volume: -10,
        frequency: 90
      }
    }).toDestination();

    let prevNote;

    const melodyLoop = new Tone.Loop(time => {
      if (!aBlastSpeedParams.isBlastSpeeding) {
        // check if going to blastspeed
        aBlastSpeedParams.isBlastSpeeding = Math.random() < blastSpeedChance;

        if(aBlastSpeedParams.isBlastSpeeding) {
          blastSpeedInstrumentCallback();
        }
      }

      const randomNote = melodyScale[Math.floor(Math.random() * melodyScale.length)];
      // if (prevNote != randomNote) {
        melodySynth.triggerAttackRelease(randomNote, defaultSpeed, time);
      // }
      prevNote = randomNote;
    }, defaultSpeed).start();
  }