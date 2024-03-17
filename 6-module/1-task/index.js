export default class UserTable {
  constructor(rows) {
    this.rows = rows;

    this.render();
    this.deleteStr();
  }

  render() {
    this.elem = document.createElement('table');
    this.elem.innerHTML = '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead><tbody></tbody>';

    let tbody = this.elem.lastElementChild;

    this.rows.forEach(function(item) {
      let tr = document.createElement('tr');
      tbody.append(tr);
      tr.insertAdjacentHTML('beforeEnd', `<td>${item.name}</td><td>${item.age}</td><td>${item.salary}</td><td>${item.city}</td><td><button>X</button></td>`)
    });

    return this.elem;
  }

  deleteStr() {
    this.elem.addEventListener('click', event => {
      let btn = event.target.closest('button');
      let str = event.target.closest('tr');

      if(btn) {
        str.remove()
      }
    })
  }
}
