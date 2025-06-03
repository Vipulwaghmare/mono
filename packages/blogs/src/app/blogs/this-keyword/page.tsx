import CodeBlock from "@/components/code-block";
import { MainWrapper } from "@/components/typography";

export default function ThisKeyword() {
  return (
    <MainWrapper title="This Keyword">
      <div>
        <p>
          In JS, this keyword refers to an object, but which object? Well it
          depends on where the this is getting executed.
        </p>
        <p>{`Let's understand with code examples because that is easy XD.`}</p>
        <h3>1. Global this</h3>
        <p>
          What is value of this, if you just console.log it? Well, it depends on
          where you are running your code
        </p>
        <p>{`In browser => It's a window object`}</p>
        <p>{`In NodeJs => It's a global object`}</p>
        <p>{`In the next part we will talk in the browser context, so if you saw that this is global. Just remember that it'll be global object for nodejs.`}</p>
        <h3>2. Inside a function declared with function keyword</h3>
        <CodeBlock>{`function test() {
  console.log(this);
}
test(); // window (non-strict), undefined (strict)
`}</CodeBlock>
        <p>Technically, this</p>
        <p>{`What I say is look at the parent of what function, basically what is outside of curly braces of the function. Yeah it's this`}</p>
      </div>
      <div>
        <CodeBlock>
          {`const obj = {
    a: 1,
    b: function() {
        return this.a;
    },
    c: () => {
        return this.a;
    }
};

// Output 1: 1
console.log(obj.b());  

// Output 2: undefined
console.log(obj.c());  

const test = obj.b;

// Output 3: undefined
console.log(test());    

const testArrow = obj.c;

// Output 4: undefined
console.log(testArrow());`}
        </CodeBlock>
      </div>
    </MainWrapper>
  );
}
