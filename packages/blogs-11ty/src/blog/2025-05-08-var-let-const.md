---
title: Var, Let & Const
description: Everything you need to know about how to declare variables in JS.
author: Vipul Waghmare
date: 2024-06-02T11:28:51.046Z
tags:
  - post
image: packages/blogs-11ty/src/blog/var-let-const.png
imageAlt: var, let and const keywords
---

You must have heard about var, let and const in Javascript. In this blog we are gonna learn everything about them.

Let's first start with **var**. When Js was first introduced, it was the only way to declare variables.

```javascript
var name = "Vipul";
```

There were lot's of issues with this which we will discuss further. But due to those issues, new keywords were added in JS in ES6 to declare variables which were **Let** & **Const**

## Let's Understand the difference between these keywords

### 1. Redeclaration

Let's start with very simple difference between these three. It's simple

> _Variables declared with var and let can be redeclared or reassigned. Variables declared with const can't be declared again._

```
var name = "Bruce";
let lastName = "Wayne";
const age = 35;
name = "Bat"
lastname = "man";
age = 36;
```

Now if you execute above code. we can see that variables declared with var and let can be successfully reassigned with new values but for age it gives following error: *Uncaught TypeError: Assignment to constant variable.*

> Let & const behave same except for this one difference. Let variables can be reassigned and const variables can not be reassigned

### 2. Hoisting

First Let's understand what is hoisting in JS. Hoist means to pull up.

> Hoisting is a behaviour where all the variables are function declarations are moved to the top of their scope before code execution.

Let's understand with code example

```
console.log(name); // Undefined
var name = 'Vipul';
```

Now in above example, the variable is declared after the console.log but if we log the variable, it will log undefined. This behaviour is called hoisting. Before the code execution, the variable is moved to the top of the scope thus we can access it even though it is declared anywhere.

So you can imagine it like this for var

```
var name;
console.log(name); // Undefined
name = 'Vipul';
```

How does it differs with var, let and const?

```
console.log(name); // Undefined
console.log(lastName); // Uncaught ReferenceError: lastName is not defined
console.log(age); // Uncaught ReferenceError: age is not defined
var name = 'Vipul';
let lastName = 'Waghmare';
const age = 27;
```

If you execute above code, you'll get same logs as given. Name will log correcly but lastName and age will give error. You might think that for var, it gets hoisted thus it logs correctly but let and const doesn't get hoisted but that's not the case. variables gets hoisted for all three, but they are not initialized for let and const thus we get error.

> Variables are hoisted for all var, let and const. For let and const they are only initialized where they are actually declared. Using them before that gives error. For var we can use them before they are declared it gives undefined value.
>
> Temporal Dead Zone, it is time between the start of the scope and the actual variable declaration. Accessing let and const variables here throws reference error.

### 3. Scope

Let and const behave the same so we will only talk about let. In short, let have block scope and var has function scope. but what does this mean?

#### Block scope

Let's talk about **block scope** first. Block is basically code written in a set of paranthesis **{ this is a block }**

```
if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); // Uncaught ReferenceError: b is not defined
```

In above code, there is if block. The variable a is declared inside this block but we can still access it outside the block. This might gives some unexpected behavious. But for let we can only access it in the given block.

#### Functional scope

```
function test() {
  var c = 1;
  let d = 2;
}
test()
console.log(c); // Uncaught ReferenceError: c is not defined
console.log(d); // Uncaught ReferenceError: d is not defined
```

As seen for functional scope, variables defined in a function is not available outside the function for both let and var.

### 4. Global Object

In browsers if you log the window, it logs the global object. Variables declared with var becomes part of this global object, but for let and const they don't become part of this global object
