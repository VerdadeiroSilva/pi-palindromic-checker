// This algorithm is an simple Gosper Series implementation
// A generator function yield a digit of pi every time i call their next() method.
function* gosperYielder() {
  //We first declare some big ints
  let q = 1n;
  let r = 180n;
  let t = 60n;
  let i = 2n;
  while (true) {
    //The series consists in see pi as an infinite composition of fractions...
    //So, we make a fraction.
    let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n);

    //Yield the result of this step.
    yield Number(digit);

    //And prepare for the next one...
    let u = i * 3n;
    u = (u + 1n) * 3n * (u + 2n);
    r = u * 10n * (q * (i * 5n - 2n) + r - t * digit);
    q *= 10n * i * (i++ * 2n - 1n);
    t *= u;
  }
}

// so here, for example, i call yielder
let iter = gosperYielder();
let digits = "";

// and calculate how many digits i want (ok, not like that, but...)
// here, we want to calculate until an 9 digit palindromic number shows
const palindromicSize = 21;

// a function to check if a number is prime
function isPrime(num) {
  console.log(">>>> isPrime?", num, typeof num);
  if (num === 2) return true;
  if (num < 2 || num % 2 === 0) return false;
  for (let i = 3; i * i <= num; i += 2) if (num % i === 0) return false;
  return true;
}

// a function to check if a number is palindromic, 9 digit and prime
function prizeWinner(number_array) {
  let reverse = number_array.split("").reverse().join("");
  if (
    number_array[0] != "0" &&
    number_array.length > palindromicSize - 1 &&
    number_array === reverse &&
    isPrime(Number(number_array))
  )
    return true;
  else return false;
}

// and the loop until the function return false
while (!prizeWinner(digits.slice(-1 * palindromicSize))) {
  digits += iter.next().value;
  //   console.log(digits.slice(-1))
}

// So, i believe that the first 9-digit palindromic number in pi is , in position 6586
console.log(
  `Palindromic: ${digits.slice(-1 * palindromicSize)}\nPosition: ${
    digits.length
  }`
);
