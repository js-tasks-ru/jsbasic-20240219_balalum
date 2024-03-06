function getMinMax(str) {
  let arrNumbers = str
    .split(' ')
    .filter(item => Number.isFinite(+item));

  let maxNumber = Math.max.apply(null, arrNumbers);
  let minNumber = Math.min.apply(null, arrNumbers);

  let result = {};
  result.min = minNumber;
  result.max = maxNumber;
  return result;
}
