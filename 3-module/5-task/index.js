function getMinMax(str) {
  let arrNumbers = str
    .split(' ')
    .filter(item => Number.isFinite(+item));

  let maxNumber = Math.max(...arrNumbers);
  let minNumber = Math.min(...arrNumbers);

  let result = {};
  result.min = minNumber;
  result.max = maxNumber;
  return result;
}
