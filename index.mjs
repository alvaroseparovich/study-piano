import { KeyboardSound } from './KeyboardSound.mjs'

const KEY_NUMBER = "key-scale-order-"
const KEY_DOWN = "key-down"
const SCALE_OF = "key-note-"
const SCALE = "scale-"
const majorScaleOrder = [1, 1, 0.5, 1, 1, 1, 0.5]
const minorScaleOrder = [1, 0.5, 1, 1, 0.5, 1, 1]
const harmonicMinorScaleOrder = [1, 0.5, 1, 1, 0.5, 1.5, 0.5]
const melodicMinorScaleOrder = [1, 0.5, 1, 1, 1, 1, 0.5]
const defaultKey = "C"
const keyboardSound = new KeyboardSound ()
let currentKey = defaultKey
let currentScale = 'majorScaleOrder'
// cromatic should be created

const tableOfScales = {
  majorScaleOrder,
  minorScaleOrder,
  harmonicMinorScaleOrder,
  melodicMinorScaleOrder
}

const chord = [1,3,5]

async function pressAllScale(scaleNote, scaleOrder = majorScaleOrder) {
  clearKeys()
  await wait(0.2)
  const tonic = document.querySelector(`.key.${scaleNote}`)
  const tonicNumber = getElementClassKeyNumber(tonic)
  const tonicNumberFloat = classToFloat(tonicNumber)

  let currentNumberController = tonicNumberFloat
  for(
    let currentNumberOnScale = 0;
    currentNumberOnScale < scaleOrder.length;
    currentNumberOnScale++
    )
    {
      if (currentNumberController >= 6 ) { currentNumberController -= 6 }

      let keyToPress = getKeyByNumber(currentNumberController)
      pressKey(keyToPress)
      currentNumberController += scaleOrder[currentNumberOnScale]
      await wait(0.1)
    }
}

function getElementClassKeyNumber(KeyNodeItem) {
  return getSomeElementClassPospend(KeyNodeItem, KEY_NUMBER)
}

function getSomeElementClassPospend(NodeItem, prepend) {
  let classKeyNumber = Array.from(NodeItem.classList).find(classString =>{
    return classString.startsWith(prepend)
  })
  return classKeyNumber.substring(prepend.length)
}

function getKeyByNumber(number, keyboard = document) {
  let classNumber = floatToClass(number)
  // console.log(number)
  
  let key = keyboard.querySelector('.' + KEY_NUMBER + classNumber)
  return Array.from(key.classList).find(classString =>{
    return classString.startsWith(KEY_NUMBER)
  }).substring(KEY_NUMBER.length)
}

function pressKey(number, keyboard = document) {
  let key =keyboard.querySelector('.' + KEY_NUMBER + number)
  key.classList.add(KEY_DOWN)
  const keyNote = getSomeElementClassPospend(key, SCALE_OF)
  keyboardSound.play(`${keyNote.replace('s','#')}${4}`)
}

function clearKeys(keyboard = document) {
  keyboard.querySelectorAll('.key').forEach(key => {
    key.classList.remove('key-down')
  })
}
function classToFloat(string) {
  return parseFloat(string.replace('-', '.'))
}
function floatToClass(float) {
  return String(float).replace('.', '-')
}

function preventClickOnLetter(element) {
  if (element.tagName == 'SPAN') return element.parentNode
  return element
}

function scaleOf(event){
  let element = preventClickOnLetter(event.target)
  console.log(element)
  document.querySelector('.current-title span.note').textContent = element.textContent
  currentKey = getSomeElementClassPospend(element, SCALE_OF)

  pressAllScale(currentKey, tableOfScales[currentScale])
}

function scaleSelection(event) {
  let element = event.target
  currentScale = getSomeElementClassPospend(element, SCALE)
  document.querySelector('.current-title span.scale').textContent = element.textContent
  
  pressAllScale(currentKey, tableOfScales[currentScale])
}

async function wait(seg) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seg * 1000);
  });
}

// StartUp
document.querySelectorAll('.scales-butons .keyboard div').forEach(button =>
  button.onclick = scaleOf
)

document.querySelectorAll('.scales-selection-butons button').forEach(button =>
  button.onclick = scaleSelection
)

document.querySelector('#start-sound')
  .addEventListener('click', async () => {
    try{
      await Tone.start()
      console.log('audio is ready')
    } catch (err) {
      console.error(err)
    }
})
