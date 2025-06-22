 console.log(a);

 var a;

 function test() {
    console.log(x); // ?
    var x = 1;
    if (true) {
      var x = 2;
    }
    console.log(x); // ?
  }
  let result =test();
  console.log(result)
  

// Overshadow variable Example 1
  var foo = 'LION';

function showName(){
    foo = 'PANDA';
    return;
    function foo(){};
};
let res=showName();  // Guess o/p
console.log(res)
console.log(foo); // Guess o/p

