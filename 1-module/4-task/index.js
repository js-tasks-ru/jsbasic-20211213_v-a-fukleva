function checkSpam(str) {
  const string = str.toLowerCase();
  let isSpam = false;

  if(string.includes('1xbet') || string.includes('xxx')){
    isSpam = true;
  }

  return isSpam;
}
