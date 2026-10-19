// const user = {
//     name: "Sharukh"
//   };
  
//   function greet(city, country) {
//     console.log(`Hi, I'm ${this.name} from ${city}, ${country}`);
//   }
  
//   const boundGreet = greet.bind(user, "Delhi");
  
//   boundGreet("India");
  
  // Output:
  // Hi, I'm Sharukh from Delhi, India

  //Custom bind function

  
Function.prototype.myBind = function (context, ...args) {
    const originalFunction = this;
  
    return function (...newArgs) {
      return originalFunction.apply(context, [
        ...args,
        ...newArgs
      ]);
    };
  };
  
  // Example
  const user = {
    name: "Sharukh"
  };
  
  function greet(city, country) {
    return `Hi, I'm ${this.name} from ${city}, ${country}`;
  }
  
  const boundGreet = greet.myBind(user, "Delhi");
  
  console.log(boundGreet("India"));
  // Hi, I'm Sharukh from Delhi, India
  