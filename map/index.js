const numbers = [1, 2, 3, 4];

const doubled = numbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4]

//implement map function from scratch
Array.prototype.myMap = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError("Array.prototype.myMap called on null or undefined");
    }
  
    if (typeof callback !== "function") {
      throw new TypeError("Callback must be a function");
    }
  
    const array = Object(this);
    const length = array.length >>> 0;
    const result = new Array(length);
  
    for (let i = 0; i < length; i++) {
      // Match native map behavior for sparse arrays
      if (i in array) {
        result[i] = callback.call(
          thisArg,
          array[i],
          i,
          array
        );
      }
    }
  
    return result;
  };
  