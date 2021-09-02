import * as Tone from 'tone';

export function setupBlastSpeedNoiseInstrument(aBlastSpeedParams, blastSpeedInstrumentCallback, aBlastNoteSpeed) {
    const bassKick = new Tone.MembraneSynth({
        oscillator: {
          type: 'square'
        },
        volume: -8
      }).toDestination();

      // init bass loop
      aBlastSpeedParams.blastSpeedBass = new Tone.Loop(time => {
        if(aBlastSpeedParams.isBlastSpeeding && aBlastSpeedParams.currentBlastSpeedNotes < aBlastSpeedParams.blastSpeedNotes) {
            aBlastSpeedParams.currentBlastSpeedNotes++;
        }
        else {
          // reset blast speed notes if returning from blast speed
          if (aBlastSpeedParams.currentBlastSpeedNotes > 0) {
            aBlastSpeedParams.currentBlastSpeedNotes = 0;
            aBlastSpeedParams.isBlastSpeeding = false;
            blastSpeedInstrumentCallback();
          }
        }

        // bass kick
        bassKick.triggerAttackRelease('B1', aBlastNoteSpeed, time);
        // snare
        // snareSound.triggerAttackRelease(aBlastNoteSpeed, time);

        // setup blast speed
      }, aBlastNoteSpeed)
}