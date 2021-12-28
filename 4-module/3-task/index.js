function highlight(table) {

    const tableBody = table.querySelector('tbody')
    const tableRows = tableBody.querySelectorAll('tr');

    tableRows.forEach(tr => {

      const statusData = tr.lastElementChild;
      const hasDataAttr = statusData.dataset.hasOwnProperty('available');
      const isAvaliable = statusData.dataset.available === 'true';

      if(hasDataAttr) {
        setAvaliableStatus(isAvaliable, tr)
      } else {
        tr.setAttribute('hidden', true)
      }

      const genderData = statusData.previousElementSibling;
      setGenderStatus(genderData, tr);

      const ageData = +genderData.previousElementSibling.textContent;
      filterAge(ageData, tr)

    })

    return table

}

function setAvaliableStatus(isAvaliable, tableRow) {
  return isAvaliable ? tableRow.classList.add('available') : tableRow.classList.add('unavailable')
}

function setGenderStatus(gender, tableRow) {
  return gender.textContent === 'm' ? tableRow.classList.add('male') : tableRow.classList.add('female');
}

function filterAge(age, tableRow) {
  return age < 18 ? tableRow.style.textDecoration = "line-through" : null
}
