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
  