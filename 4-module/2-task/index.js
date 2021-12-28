function makeDiagonalRed(table) {

  const tableRows = [...table.rows]

  tableRows.forEach((row, index) => {
    row.cells[index].style.backgroundColor = 'red'
  })

  return table
}
