function camelize(str) {

  const wordsArray = str.split('');
  let dashIndex;

  const camelCaseArray = wordsArray.map((word, index) => {

    if (word === '-') {
      dashIndex = index;
    }

    if (dashIndex === index - 1) {

      return word.toUpperCase();

    } else {

      return word;

    }

  })

  const noDashedArray = camelCaseArray.filter(word => word !== '-');

  return noDashedArray.join('');
}
