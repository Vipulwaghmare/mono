import CodeBlock from "@/components/code-block";
import { ImportantNote, MainWrapper } from "@/components/typography";

export default function ExecutionContext() {
  return (
    <MainWrapper title="Execution Context">
      <b>What is Exection Context?</b>
      <p>
        Execution context is an environment in which JS code is evaluated and
        executed. Each piece of code runs inside the execution context.
      </p>
      <p>
        It has <b>Three Types</b>
      </p>
      <ul>
        <li>Global Execution Context</li>
        <li>Functional Execution Context</li>
        <li>Eval Execution Context: For eval() functions</li>
      </ul>
      <br />
      <p>
        Each Execution context has <b>Two Phases</b>
      </p>
      <ul>
        <li>Creation Phase</li>
        <li>Execution Phase</li>
      </ul>
      <br />
      <h2>Global Execution Context</h2>
      <p>
        As soon as a JS file is run a Global Execution context is created. If it
        runs on the Browser its <b>Window</b> and in NodeJs its <b>Global</b>.
      </p>
      <p>
        <b>Creation Phase:</b> JS goes through all the code and it allocates
        memory to all variables and functions. For variables their value is set
        as undefined. For functions declared with function keyword, its value is
        the function definition. Here value of this keyword is also set as
        Windows or Global object in case of Browser or NodeJs.
      </p>
      <p>
        <b>Execution Phase:</b> JS goes through all the code line by line and
        executes it. Here the value is assigned to the variables where they are
        declared. functions are called where they are called.{" "}
        <i>
          For each function execution, it creates a new smaller execution
          context called Functional Execution context.
        </i>
      </p>
      <ImportantNote>
        <b>Global Execution Context</b> is created only once. It is the first
        execution context pushed in the call stack thus it is the one which is
        removed at last.
      </ImportantNote>
      <h2>Functional Execution Context</h2>
      <p>
        {`It works same as Global Execution Context but it's inside the Global
        execution context and it's limited to scope of the function`}
      </p>
      <p>
        <b>Creation Phase:</b> Parameters are initialized. Variables and
        functions are initialized same as GEC. Value of <b>This</b> depends on
        where the function is being executed.
      </p>
      <p>
        <b>Execution Phase:</b> Code is executed line by line, variables are
        assigned values where they are declared.
      </p>
      <h4>{`Let's understand with some code`}</h4>
      <h5>1. Variable declarations</h5>
      <CodeBlock>
        {`console.log(x); 
var x = 20;
console.log(x);
`}
      </CodeBlock>
      <p>If you execute above code</p>
      <table>
        <thead>
          <tr>
            <td>Creation Phase</td>
            <td>Execution Phase</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              x = undefined <br />x is initialzed with value undefined
            </td>
            <td>
              Line 1: x is undefined <br />
              Line 2: x = 20 <br />
              Line 3: It will log value of x as 20
            </td>
          </tr>
        </tbody>
      </table>
      <h5>2. Variable declarations with let</h5>
      <CodeBlock>
        {`console.log(x); 
let x = 20;
console.log(x);
`}
      </CodeBlock>
      <p>If you execute above code</p>
      <table>
        <thead>
          <tr>
            <td>Creation Phase</td>
            <td>Execution Phase</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              x = undefined <br />
            </td>
            <td>
              {`Line 1: Cannot access 'x' before initialization`} <br />
              Error since the variables declared with let and const are in
              temperal dead zone. So you cannot access them before they are
              declared.
            </td>
          </tr>
        </tbody>
      </table>

      <h5>3. For functions declared with function keywords</h5>
      <CodeBlock>
        {`let x = 20;
foo();
function foo() {
  console.log('value in foo', x);
}
console.log(x);
`}
      </CodeBlock>
      <p>If you execute above code</p>
      <table>
        <thead>
          <tr>
            <td>Creation Phase</td>
            <td>Execution Phase</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "30%" }}>
              x = undefined <br />
              {`foo = function foo() { ... }`}
            </td>
            <td>
              Line 1: x = 20 <br />
              Line 2: It will invoke the function and log x as 20 <br />
              <i>
                Unlike variables function can be invoked before declaration
                because function are not undefined and has their definitions in
                creation phase.
              </i>
              <br />
              Line 3-5: Nothing happening <br />
              Line 6: x = 20 <br />
            </td>
          </tr>
        </tbody>
      </table>

      <h5>
        4. For functions declared with function keywords with functional scope
        execution
      </h5>
      <CodeBlock>
        {`let x = 20;
function foo() {
  let y = 30;
  console.log(y);
}
console.log(x);
foo();
`}
      </CodeBlock>
      <p>If you execute above code</p>
      <table>
        <thead>
          <tr>
            <td>Creation Phase</td>
            <td>Execution Phase</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: "30%" }}>
              x = undefined <br />
              {`foo = function foo() { ... }`}
            </td>
            <td>
              Line 1: x = 20 <br />
              Line 2-4: Nothing happening <br />
              Line 5: Logs x as 20 <br />
              Line 6: Invokes the function and creates a functinol execution
              context
              <br />
              <table>
                <thead>
                  <tr>
                    <td>Creation Phase</td>
                    <td>Execution Phase</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "30%" }}>
                      y = undefined <br />
                    </td>
                    <td>
                      Line 3: y = 30 <br />
                      Line 4: It will log y as 30
                    </td>
                  </tr>
                </tbody>
              </table>
              <i>
                It will destroy the above execution context once function
                execution is complete.
              </i>
            </td>
          </tr>
        </tbody>
      </table>
    </MainWrapper>
  );
}
