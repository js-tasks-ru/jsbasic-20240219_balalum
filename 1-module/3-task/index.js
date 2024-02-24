function ucFirst(str) {
  if (str === '') {
    return ''
  } else {
    let firstLetter = str[0];
    let firstLetterUp = firstLetter.toUpperCase();
    let string = firstLetterUp + str.slice(1);
    return string;
  }
}
