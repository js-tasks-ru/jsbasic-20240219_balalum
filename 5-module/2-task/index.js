function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');

  text.hidden = false;

  btn.addEventListener('click', () => text.hidden = !text.hidden);
}
