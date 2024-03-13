function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');

  text.hidden = false;

  btn.addEventListener('click', () => {
    if (text.hidden === true) {
      text.hidden = false;
    } else if (text.hidden === false) {
      text.hidden = true;
    }
  });
}
