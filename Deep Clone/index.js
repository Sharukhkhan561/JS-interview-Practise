// this is a object and u want to copy this object 
const user = {
    name: "Sharukh",
    address: {
      city: "Noida"
    }
  };

  //Case: 1 Shallow copy
  const copy = { ...user };

copy.name = "Rahul";
copy.address.city = "Delhi";

console.log(user.name);         // "Sharukh"
console.log(user.address.city); // "Delhi" 😮


function deepClone(value, seen = new WeakMap()) {
    // Handle primitives and null
    if (value === null || typeof value !== "object") {
      return value;
    }
  
    // Handle circular references
    if (seen.has(value)) {
      return seen.get(value);
    }
  
    // Handle Date
    if (value instanceof Date) {
      return new Date(value.getTime());
    }
  
    // Handle RegExp
    if (value instanceof RegExp) {
      return new RegExp(value.source, value.flags);
    }
  
    // Handle Map
    if (value instanceof Map) {
      const clone = new Map();
      seen.set(value, clone);
  
      for (const [key, val] of value) {
        clone.set(deepClone(key, seen), deepClone(val, seen));
      }
  
      return clone;
    }
  
    // Handle Set
    if (value instanceof Set) {
      const clone = new Set();
      seen.set(value, clone);
  
      for (const item of value) {
        clone.add(deepClone(item, seen));
      }
  
      return clone;
    }
  
    // Handle arrays and objects
    const clone = Array.isArray(value)
      ? []
      : Object.create(Object.getPrototypeOf(value));
  
    seen.set(value, clone);
  
    for (const key of Reflect.ownKeys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
  
      if (descriptor && "value" in descriptor) {
        descriptor.value = deepClone(descriptor.value, seen);
      }
  
      Object.defineProperty(clone, key, descriptor);
    }
  
    return clone;
  }
  