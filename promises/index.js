const p1 = Promise.resolve(10);
const p2 = new Promise(resolve =>
  setTimeout(() => resolve(20), 1000)
);
const p3 = Promise.resolve(30);

Promise.all([p1, p2, p3])
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Output: [10, 20, 30]
//Even if p3 resolves before p2, the results stay in the original order: [10, 20, 30].

//implement promise.all from scratch

function promiseAll(iterable) {
    return new Promise((resolve, reject) => {
      const items = Array.from(iterable);
      const results = new Array(items.length);
  
      // Promise.all([]) resolves to []
      if (items.length === 0) {
        resolve([]);
        return;
      }
  
      let completed = 0;
  
      items.forEach((item, index) => {
        Promise.resolve(item)
          .then(value => {
            results[index] = value;
            completed++;
  
            // Resolve only when every input fulfills
            if (completed === items.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  }
  