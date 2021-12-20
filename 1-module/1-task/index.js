function factorial(n) {

  let factorial = 1;

  for(let i = 0; i < n; i++) {

    if(n - i > 1) {
      factorial *= n - i
    }

  }

  return factorial

}

