# JavaScript Scope, Shadowing & Execution – README

This document explains **JavaScript scope**, **shadowing**, **hoisting behavior**, **async execution**, and **`this` binding**, using the examples provided in the code.

---

## 1️⃣ Scope in JavaScript

**Scope** determines where variables and functions are accessible in your code.

### Types of Scope

* **Global Scope** – Accessible anywhere in the program
* **Function Scope** – Accessible only inside the function
* **Block Scope** – Accessible only inside `{}` blocks (with `let` and `const`)

### Keywords & Scope

| Keyword | Scope Type                         |
| ------- | ---------------------------------- |
| `var`   | Function-scoped (not block-scoped) |
| `let`   | Block-scoped                       |
| `const` | Block-scoped                       |

---

## 2️⃣ Scope Chain

When a variable is accessed, JavaScript looks for it:

1. In the current scope
2. In the parent scope
3. Continues up to the global scope

This lookup mechanism is called the **Scope Chain**.

---

## 3️⃣ Lexical Scope

**Lexical Scope** means that a function can access variables from its **parent scope**, determined by where the function is **written**, not where it is called.

---

## 4️⃣ Variable Shadowing

**Variable shadowing** occurs when a variable declared in an inner scope has the same name as one in an outer scope.

### Example 1

```js
let x = 10;

function foo() {
  let x = 20; // shadows outer x
  console.log(x);
}

foo();      // 20
console.log(x); // 10
```

🔹 Inner `x` hides the outer `x` inside the function.

---

## 5️⃣ Hoisting & Shadowing with `var`

### Example 2

```js
var y = 5;
(function(){
  console.log(y);
  var y = 10;
  console.log(y);
})();
```

### Output

```
undefined
10
```

### Why?

* `var y` inside the function is **hoisted** and initialized as `undefined`
* The outer `y = 5` is shadowed

Equivalent to:

```js
(function(){
  var y;
  console.log(y); // undefined
  y = 10;
  console.log(y); // 10
})();
```

---

## 6️⃣ Async / Await Execution Order

### Code

```js
async function test() {
  console.log(1);
  await delay();
  console.log(2);
}

test();
console.log(3);
```

### Output

```
1
3
2
```

### Explanation

* `console.log(1)` runs immediately
* `await` pauses execution and moves remaining code to **microtask queue**
* `console.log(3)` runs next
* `console.log(2)` runs after promise resolves

---

## 7️⃣ Block Scope with `let` & `const`

```js
let z = 1;
{
  let z = 2;
  {
    const z = 3;
    console.log(z);
  }
  console.log(z);
}
console.log(z);
```

### Output

```
3
2
1
```

Each block creates a **new scope**, and inner variables shadow outer ones.

---

## 8️⃣ `this` Keyword – Normal vs Arrow Function

### Objects

```js
const person1 = {
  firstName: "Ginny",
  getName: function() {
    return this.firstName;
  }
}

const person2 = {
  firstName: "Jhonny",
  getName: () => {
    return this.firstName;
  }
}
```

### Function Reference

```js
const getName1 = person1.getName;
const getName2 = person2.getName;

console.log(person1.getName(), getName1(), person2.getName(), getName2());
```

### Output (in browser)

```
Ginny
undefined
undefined
undefined
```

### Why?

| Case                | Explanation                                           |
| ------------------- | ----------------------------------------------------- |
| `person1.getName()` | `this` refers to `person1`                            |
| `getName1()`        | Detached from object → `this` is `undefined`          |
| `person2.getName()` | Arrow function has no `this` → inherits global `this` |
| `getName2()`        | Same arrow function → `undefined`                     |

🔴 **Arrow functions should NOT be used as object methods** when `this` is needed.

---

## 9️⃣ Key Takeaways (Interview Ready)

* JavaScript uses **lexical scoping**
* `let` and `const` are block-scoped, `var` is not
* Shadowing hides outer variables
* `var` hoisting can cause unexpected `undefined`
* `await` pauses execution but doesn’t block the thread
* Arrow functions do not have their own `this`

---

## ✅ Summary

This file demonstrates **core JavaScript fundamentals** that are frequently tested in interviews, especially for **Frontend / React developers**. Understanding these concepts is essential for writing predictable, bug-free code.

---

Happy Coding 🚀
