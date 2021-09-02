import * as Tone from 'tone';

export function setupSnareInstrument(aSnareSpeed, aSnareTriChance) {
    const lowPass = new Tone.Filter({
      frequency: 10000,
    }).toDestination();

    const snareSound = new Tone.NoiseSynth({
      noise: {
        type: 'white',
        playbackRate: 0.5,
        volume: -15
      },
      envelope: {
        attack: 0.001,
        decay: 0.40,
        sustain: 0.001,
        release: 0.01,
      },
    }).connect(lowPass);

    const snareCounter = 3;
    const snareNotes = 4;
    const triCount = 1;
    const normalNotes = 8;
    let currentSnares = 0;
    let triMode = false;
    let currentTri = 0;
    let currentNormalNotes = 0;

    const snareLoop = new Tone.Loop(time => {
        // if tri mode is active
        if(triMode) {
            // check if current snare hits is below threshold
            if(currentSnares < snareCounter) {
                currentSnares++;
                snareSound.triggerAttackRelease('8n', time);
            }
            // play a silent 4th note
            else {
                currentSnares++;
                if(snareNotes === currentSnares) {
                    currentSnares = 0;

                    if(currentTri < triCount) {
                        currentTri++;
                    }
                    else {
                        console.log('setting false');
                        triMode = false;
                    }
                }
            }
        }
        else {
            currentTri = 0;
            // wait 7 notes before attemping for tri
            if(currentNormalNotes < normalNotes) {
                // only play [0x0x0x0x]
                if(currentNormalNotes % 2) {
                    console.log('playing note');
                    snareSound.triggerAttackRelease('4n', time);
                }
            }
            // play the 8th note and reset
            else {
                // snareSound.triggerAttackRelease('4n', time);
                currentNormalNotes = 0;
                triMode = Math.random() < aSnareTriChance
                console.log('trimode?: ', triMode);
            }

            currentNormalNotes++;
        }
    }, '8n').start();
  }