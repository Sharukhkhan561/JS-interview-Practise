Step 1: Add a method to Function.prototype
Function.prototype.myBind = function (context, ...args) {


This makes myBind() available on functions.

When you call greet.myBind(user, "Delhi"), inside myBind, this refers to the original greet function.

Step 2: Save the original function

const originalFunction = this;


We store the function because this inside the returned function will refer to a different calling context.

Step 3: Return a new function
return function (...newArgs) {


bind() does not execute the original function immediately. It returns another function that you can call later.

Step 4: Combine the arguments
[...args, ...newArgs]


- args contains arguments passed during binding.
- newArgs contains arguments passed when calling the returned function.
For example:
greet.myBind(user, "Delhi")("India");
The final argument list becomes ["Delhi", "India"].

Step 5: Use apply()
return originalFunction.apply(context, [
  ...args,
  ...newArgs
]);


apply() calls the original function with the specified this value and an array of arguments.