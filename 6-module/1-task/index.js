/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.renderTableHead();
    this.renderTable(rows);
  }

  renderTableHead() {
    this.elem.innerHTML = `<thead>
                              <tr>
                                  <th>Имя</th>
                                  <th>Возраст</th>
                                  <th>Зарплата</th>
                                  <th>Город</th>
                                  <th></th>
                              </tr>
                          </thead>`
  }

  renderTable(rows){

    const tableBody = document.createElement('tbody');
    this.elem.appendChild(tableBody);

    rows.forEach(row => {

      const tableRow = document.createElement('tr');

      this.fillRowData(row, tableRow);
      this.renderDeleteButton(tableRow);
      tableBody.appendChild(tableRow);

    })
  }

  fillRowData(row, tableRow) {

    for (let data in row) {

      const tableData = document.createElement('td');
      tableData.textContent = row[data];
      tableRow.appendChild(tableData)

    }

  }

  renderDeleteButton(tableRow){
    const button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', this.onClick);
    tableRow.appendChild(button);
  }

  onClick(){
    const tableRow = this.closest('tr');
    tableRow.remove();
  }

}
