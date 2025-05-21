// let x = 20;
// function foo() {
//   console.log("value in foo", x);
// }
// console.log(x);
// foo();

// console.log(a);
// console.log(b); // error b is not defined
// var a = (b = 30);

// var a = 5;
// console.log(a++);
// console.log(a);

// console.log(1 < 2 < 3); // true
// console.log(3 > 2 > 1); // false

// const foo = () => {
//   console.log(this.name);
// };

// foo.call({ name: "vipul" });

const foo = function () {
  console.log(this.name);
  const boo = () => {
    console.log(this.name);
  };
  boo();
};

foo.call({ name: "vipul" });
