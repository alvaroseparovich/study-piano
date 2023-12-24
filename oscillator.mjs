

async function startOscilator() {
  AUDIO_CONTEXT = new AudioContext()
  OSCILLATOR = AUDIO_CONTEXT.createOscillator()
  GAIN = AUDIO_CONTEXT.createGain()

  OSCILLATOR.connect(GAIN)
  GAIN.connect(AUDIO_CONTEXT.destination)
  console.log("osc", OSCILLATOR)
  console.log("aud", AUDIO_CONTEXT)

  OSCILLATOR.type = "sine"
  OSCILLATOR.frequency.value = 440
  GAIN.gain.value = 0.5

  OSCILLATOR.start()
  OSCILLATOR.stop(0.5)
}

function midiNumberToFrequency(midiNote) {
  const a = 440 // MIDI A central - note 69 - 440 herts
  return (a / 32) * (2 ** ((midiNote - 9) / 12))
}

// function playNoteByMidiNumber(midiNumber = 69, secondsLong = 0.5) {
//   OSCILLATOR.type = "sine"
//   OSCILLATOR.frequency.value = midiNumberToFrequency(midiNumber)
//   GAIN.gain.value = 0.5

//   OSCILLATOR.start()
//   OSCILLATOR.stop(secondsLong)
// }

// function playNote