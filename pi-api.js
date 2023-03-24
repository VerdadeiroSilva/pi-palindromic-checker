// fetch("https://api.pi.delivery/v1/pi?start=0&numberOfDigits=100")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

function isPrime(num) {
  // console.log(">>>> isPrime?", num);
  if (num === 2) return true;
  if (num < 2 || num % 2 === 0) return false;
  for (let i = 3; i * i <= num; i += 2) if (num % i === 0) return false;
  return true;
}
function isPalindromic(sequence) {
  let reverse = sequence.split("").reverse().join("");
  return reverse === sequence ? true : false;
}

function prizeWinner(num) {
  return isPalindromic(num) && isPrime(num) && num.length > 20 && num[0] != "0"
    ? true
    : false;
}

let pi_slice = "0";

async function* apiCaller() {

  let chunkSize = 820;
  let step = 0;
  while (true){
    await fetch(`https://api.pi.delivery/v1/pi?start=${Number(step * chunkSize)}&numberOfDigits=${chunkSize}`)
    .then((response) => {
      response.json().then(body => pi_slice += body.content);
    })
    step++;
    yield pi_slice;
    console.log(pi_slice);

  }
}

let a = apiCaller();

console.log(a.next().value);
