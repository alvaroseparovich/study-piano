import { MIDI_TABLE } from "./MIDI_TABLE.mjs";

const noteTable = []

export class NoteTableItem {
  midi
  frequency
  constructor({midi, frequency}){
    this.midi = midi,
    this.frequency = frequency
  }
}

Object.entries(MIDI_TABLE).map(vals => {
  noteTable[vals[1].note] = new NoteTableItem ({
    midi: vals[0],
    frequency: vals[1].frequency
  })
})

export const NOTE_TABLE = noteTable