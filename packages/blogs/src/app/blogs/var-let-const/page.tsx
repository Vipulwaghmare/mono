import CodeBlock from "@/components/code-block";
import { ImportantNote, MainWrapper } from "@/components/typography";

export default function VarLetConst() {
  return (
    <MainWrapper title="Var, Let & Const">
      <div>
        <p>
          You must have heard about var, let and const in Javascript. In this
          blog we are gonna learn everything about them.
        </p>
        <p>
          {`Let's `} first start with <b>var</b>. When Js was first introduced,
          it was the only way to declare variables.
        </p>
        <CodeBlock>{`var name = "Vipul";`}</CodeBlock>
        <p>
          There were {`lot's`} of issues with this which we will discuss
          further. But due to those issues, new keywords were added in JS in ES6
          to declare variables which were <b>Let</b> & <b>Const</b>
        </p>
        <h2>{`Let's`} Understand the difference between these keywords</h2>
        <h3>1. Redeclaration</h3>
        <p>
          {`Let's`} start with very simple difference between these three.{" "}
          {`It's`}
          simple
        </p>
        <ImportantNote>
          Variables declared with var and let can be redeclared or reassigned.
          Variables declared with const {`can't`} be declared again.
        </ImportantNote>
        <CodeBlock>{`var name = "Bruce";
let lastName = "Wayne";
const age = 35;
name = "Bat"
lastname = "man";
age = 36;`}</CodeBlock>
        <p>
          Now if you execute above code. we can see that variables declared with
          var and let can be successfully reassigned with new values but for age
          it gives following error:{" "}
          <i>Uncaught TypeError: Assignment to constant variable.</i>{" "}
        </p>
        <ImportantNote>
          Let & const behave same except for this one difference. Let variables
          can be reassigned and const variables can not be reassigned.
        </ImportantNote>
        {/* NEW DIFFERENCE */}
        <h3>2. Hoisting</h3>
        <p>
          First {`Let's`} understand what is hoisting in JS. Hoist means to pull
          up.
        </p>
        <ImportantNote>
          Hoisting is a behaviour where all the variables are function
          declarations are moved to the top of their scope before code
          execution.
        </ImportantNote>
        <p>{`Let's`} understand with code example</p>
        <CodeBlock>
          {`console.log(name); // Undefined
var name = 'Vipul';`}
        </CodeBlock>
        <p>
          Now in above example, the variable is declared after the console.log
          but if we log the variable, it will log undefined. This behaviour is
          called hoisting. Before the code execution, the variable is moved to
          the top of the scope thus we can access it even though it is declared
          anywhere.
        </p>
        <p>So you can imagine it like this for var</p>
        <CodeBlock>
          {`var name;
console.log(name); // Undefined
name = 'Vipul';`}
        </CodeBlock>
        <p>How does it differs with var, let and const?</p>
        <CodeBlock>
          {`console.log(name); // Undefined
console.log(lastName); // Uncaught ReferenceError: lastName is not defined
console.log(age); // Uncaught ReferenceError: age is not defined
var name = 'Vipul';
let lastName = 'Waghmare';
const age = 27;`}
        </CodeBlock>
        <p>
          If you execute above code, {`you'll`} get same logs as given. Name
          will log correcly but lastName and age will give error. You might
          think that for var, it gets hoisted thus it logs correctly but let and
          const {`doesn't`} get hoisted but {`that's`} not the case. variables
          gets hoisted for all three, but they are not initialized for let and
          const thus we get error.
        </p>
        <ImportantNote>
          Variables are hoisted for all var, let and const. For let and const
          they are only initialized where they are actually declared. Using them
          before that gives error. For var we can use them before they are
          declared it gives undefined value.
        </ImportantNote>
        <ImportantNote>
          Temporal Dead Zone, it is time between the start of the scope and the
          actual variable declaration. Accessing let and const variables here
          throws reference error.
        </ImportantNote>
        <h3>3. Scope</h3>
        <p>
          Let and const behave the same so we will only talk about let. In
          short, let have block scope and var has function scope. but what does
          this mean?
        </p>
        <h4>Block scope</h4>
        <p>
          {`Let's`} talk about <b>block scope</b> first. Block is basically code
          written in a set of paranthesis <b>{`{ this is a block }`}</b>
        </p>
        <CodeBlock>
          {`if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1
console.log(b); // Uncaught ReferenceError: b is not defined`}
        </CodeBlock>
        <p>
          In above code, there is if block. The variable a is declared inside
          this block but we can still access it outside the block. This might
          gives some unexpected behavious. But for let we can only access it in
          the given block.
        </p>
        <h4>Functional scope</h4>
        <CodeBlock>{`function test() {
  var c = 1;
  let d = 2;
}
test()
console.log(c); // Uncaught ReferenceError: c is not defined
console.log(d); // Uncaught ReferenceError: d is not defined`}</CodeBlock>
        <p>
          As seen for functional scope, variables defined in a function is not
          available outside the function for both let and var.
        </p>
        <h3>4. Global Object</h3>
        <p>
          In browsers if you log the window, it logs the global object.
          Variables declared with var becomes part of this global object, but
          for let and const they {`don't`} become part of this global object
        </p>
        <h2>Summary</h2>
        <table className="blog-table-container">
          <thead>
            <tr>
              <td>Feature</td>
              <td>var</td>
              <td>let</td>
              <td>const</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scope</td>
              <td>Function Scope</td>
              <td>Block Scope</td>
              <td>Block Scope</td>
            </tr>
            <tr>
              <td>Hoisting</td>
              <td>Yes (Undefined)</td>
              <td>Yes (In temporal Dead Zone)</td>
              <td>Yes (In temporal Dead Zone)</td>
            </tr>
            <tr>
              <td>Redeclaration</td>
              <td>Allowed</td>
              <td>Allowed</td>
              <td>Not allowed</td>
            </tr>
            <tr>
              <td>Global Object</td>
              <td>Becomes global object</td>
              <td>Not becomes global object</td>
              <td>Not becomes global object</td>
            </tr>
            {/* <tr>
              <td>Scope</td>
              <td>Block</td>
              <td>Block</td>
              <td>Block</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </MainWrapper>
  );
}
