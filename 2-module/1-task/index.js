function sumSalary(salaries) {

  let salary = 0

  for (let oneProp in salaries) {

    const prop = salaries[oneProp]

    if(propIsFiniteNumber(prop)) {
      salary += prop
    }

  }

  return salary
}

function propIsFiniteNumber(key){
  return typeof key === 'number' && isFinite(key) && !isNaN(key)
}
