export class KeyboardSound {
  keyDefaultHold = 0.2
  constructor(){
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    // const now = Tone.now()
  }
  
  play(note, keyHoldInSeconds = this.keyDefaultHold, playKeyInSeconds = 0){
    const now = Tone.now()
    this.synth.triggerAttack(note, now + playKeyInSeconds);
    this.synth.triggerRelease(note, now + playKeyInSeconds + keyHoldInSeconds);
  }
}