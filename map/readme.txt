map() iterates over an array, applies a callback to each existing element, and returns a new array containing the
 transformed values. It does not modify the original array by itself.


 How does it work?
1. Validate the input: Throw a TypeError if the receiver is null or undefined, or if the callback is not a function.
2. Convert the receiver to an object: This allows array-like objects to be handled.
3. Create a result array: The output has the original length.
4. Iterate over existing indexes: i in array skips holes in sparse arrays.
5. Execute the callback: Pass the current value, index, and original array, with thisArg as its this value.
6. Return the result: The original array is not modified by the method itself.

const numbers = [10, 20, 30];

const result = numbers.myMap((value, index, arr) => {
  return value + index;
});

console.log(result);
// [10, 21, 32]

Notice that the callback receives three arguments: value, index, and arr