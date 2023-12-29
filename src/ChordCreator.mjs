import { MIDI_TABLE } from "./consts/MIDI_TABLE.mjs";
import { NOTE_TABLE, NoteTableItem } from "./consts/NOTE_TABLE.mjs";
import * as ScalesOrder from "./consts/ScalesOrder.mjs"
import { triad } from "./consts/ChordsData.mjs";

const NOTES = ['A','B','C','D','E','F','G']

export class ChordCreator {

  /**
   * @param {number[]} scaleOrder
   */
  constructor(scaleOrder = ScalesOrder.majorScaleOrder) {
    this.scaleOrder = scaleOrder
  }

  /**
   * @returns {Array}
   */
  createChordTableFor(note = 'C-6', chordScheme = triad) {
    const noteTableItem = NOTE_TABLE[note]
    // const midiTableItem = MIDI_TABLE[noteTableItem.midi]
    
    const scaleTable = this.getMidiScaleNotes(noteTableItem.midi)
    const scaleTableTwoOctaves = [...scaleTable]
    scaleTableTwoOctaves.push(...scaleTable.slice(1).map(midi=>midi+12))
    console.log(scaleTable,scaleTableTwoOctaves)
    
    const chordsTable = {}
    for (let counter = 0; counter < NOTES.length; counter ++) {
      for (let chordCounter = 0; chordCounter < chordScheme.length; chordCounter++){
        if (!chordsTable[counter + 1]) chordsTable[counter + 1] = [] 
        chordsTable[counter + 1].push(scaleTableTwoOctaves[counter + (chordScheme[chordCounter] -1)])
      }
    }

    return chordsTable
  }

  getMidiScaleNotes(midi = 60) {
    return ScalesOrder.getScaleNoteOrderMidi(this.scaleOrder).map(grade => parseInt(grade) + parseInt(midi))
  }

}
