function getMinMax(str) {

  const dataArr = str.split(" ");

  const numbersArr = dataArr.filter(data => !isNaN(data)).map(data => +data);
  numbersArr.sort((a, b) =>  a - b );

  const maxNum = numbersArr[numbersArr.length - 1];

  return { min: numbersArr[0], max: maxNum }
}
