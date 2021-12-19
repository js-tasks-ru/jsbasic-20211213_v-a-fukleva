function ucFirst(str) {

  if(str) {

    const firstLetter = str[0].toUpperCase();
    return firstLetter + str.slice(1);

  } else {

    return ''

  }

}

