function camelize(str) {
  return str
    .split('-')
    .map((item, i) => i === 0 ? item : item[0].toUpperCase() + item.slice(1))
    .join('');
}
