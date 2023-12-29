export const majorScaleOrder = [1, 1, 0.5, 1, 1, 1, 0.5]
export const minorScaleOrder = [1, 0.5, 1, 1, 1, 0.5, 1]
export const harmonicMinorScaleOrder = [1, 0.5, 1, 1, 0.5, 1.5, 0.5]
export const melodicMinorScaleOrder = [1, 0.5, 1, 1, 1, 1, 0.5]

export function getScaleNoteOrderMidi(scaleOrder = majorScaleOrder) {
  return scaleOrder.reduce((previousValue,currentValue,currentIndex) => {
    const newValue =  (currentValue * 2) + previousValue[currentIndex]
    previousValue.push(newValue)
    return previousValue
  }, [0])
}
