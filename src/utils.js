export const randomNumbers = (level) => {
  // first generate level + 1 unique numbers
  const uniqueNumbers = Array(level + 1).fill().map((item, index) => index + 1)

  // now create a duplicate numbers
  const duplicateNumbers = []
  uniqueNumbers.forEach(number => {
    duplicateNumbers.push(number, number)
  })

  // now sort duplicate numbers randomly
  return duplicateNumbers.sort(() => Math.random() - 0.5)
}

export const secondsTohhmmss = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8)
}