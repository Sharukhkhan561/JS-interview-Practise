1. First, understand what Promise.all() does
Promise.all() takes an iterable of promises and returns a single promise that:
- Resolves when every input fulfills, with results in the original input order.
- Rejects as soon as an input rejects, using that rejection reason.
- Accepts ordinary values as well as promises.
- Resolves immediately for an empty iterable with an empty array.

Even if p3 resolves before p2, the results stay in the original order: [10, 20, 30].

Here's how the implementation works:
1

Convert the iterable into an array

Array.from(iterable) lets us access each input by index.



2

Handle the empty array

If there are no inputs, resolve with [] immediately.



3

Normalize each input

Promise.resolve(item) handles both promises and regular values.



4

Preserve the original order

results[index] = value stores each result at its original position, regardless of completion order.



5

Track completed promises

Increment completed after each fulfillment. Resolve the final array only when all inputs fulfill. Any rejection rejects the returned promise.



4. Important interview edge cases
Case 1: One promise rejects
promiseAll([
  Promise.resolve(1),
  Promise.reject("API failed"),
  Promise.resolve(3)
])
  .then(console.log)
  .catch(console.error);

// Output: "API failed"


The returned promise rejects with the rejection reason. Other operations are not automatically cancelled.

Case 2: Regular values
promiseAll([1, Promise.resolve(2), 3])
  .then(console.log);

// Output: [1, 2, 3]


Case 3: Different completion times
const delay = (value, time) =>
  new Promise(resolve => setTimeout(() => resolve(value), time));

promiseAll([
  delay("First", 1000),
  delay("Second", 100),
  delay("Third", 500)
]).then(console.log);

// Output: ["First", "Second", "Third"]


Completion order is Second → Third → First, but result order remains First → Second → Third.
5. One improvement to mention at senior level
The implementation above is good for explaining the core algorithm.
 However, a production-quality polyfill should also consider subtleties around iterator errors
  and accessing a promise-like object's then property.

A particularly useful implementation detail is to use a per-input rejection handler rather than relying 
on a trailing .catch(reject). This avoids treating an exception thrown by your own fulfillment handler as
 if it were necessarily an input rejection.

The core algorithm has O(n) time and O(n) result storage, excluding the execution time of the underlying 
asynchronous operations.
6. Interview-ready verbal answer
You can say:

“I would implement Promise.all() using a new Promise, a results array, and a counter to track fulfilled inputs.
 I normalize each value using Promise.resolve(), then attach fulfillment and rejection handlers. I store each 
 result by its original index to preserve ordering, and resolve the returned promise once all inputs fulfill. 
 If any input rejects, the returned promise rejects with that reason. I also handle the empty iterable by resolving with an empty array.”