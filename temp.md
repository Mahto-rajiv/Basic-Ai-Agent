```javascript
function isPrime(num) {
  // Handle edge cases: numbers less than 2 are not prime
  if (num < 2) {
    return { isPrime: false, factors: [] };
  }

  // Check for divisibility from 2 up to the square root of num
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      // Found a factor, so it's not prime.  Return factors.
      let factors = [i];
      if (i * i !== num) factors.push(num / i); //Avoid duplicates for perfect squares
      return { isPrime: false, factors: factors };
    }
  }

  // If no factors were found, it's prime
  return { isPrime: true, factors: [] };
}

// Example usage:
console.log(isPrime(2)); // Output: { isPrime: true, factors: [] }
console.log(isPrime(15)); // Output: { isPrime: false, factors: [3, 5] }
console.log(isPrime(17)); // Output: { isPrime: true, factors: [] }
console.log(isPrime(36)); // Output: { isPrime: false, factors: [2, 18] }  //or [6,6] if you don't handle the perfect square case
console.log(isPrime(1)); // Output: { isPrime: false, factors: [] }
console.log(isPrime(0)); // Output: { isPrime: false, factors: [] }
console.log(isPrime(-5)); // Output: { isPrime: false, factors: [] }
```

This improved version:

1. **Handles Edge Cases:** Explicitly checks for numbers less than 2 (which are not prime).
2. **Efficiency:** It only checks divisibility up to the square root of `num`. If a number has a divisor greater than its square root, it must also have a divisor smaller than its square root.
3. **Clear Output:** Returns an object with `isPrime` (boolean) and `factors` (array) properties, making the results easier to use.
4. **Perfect Square Handling:** The code now correctly handles perfect squares (like 36) by adding only unique factors to the `factors` array.

This function is more robust and efficient than a simpler implementation. Remember that for extremely large numbers, even more sophisticated primality testing algorithms might be necessary for optimal performance.
