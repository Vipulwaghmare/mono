import CodeBlock from "@/components/code-block";
import RenderingWithKeys from "@/components/examples/react-keys/RenderingWithKeys";
import { MainWrapper } from "@/components/typography";
import React from "react";

export default function WhyWeNeedKeysInReact() {
  return (
    <MainWrapper title="Why We Need Keys In React">
      <div>
        <p>Have you used keys in React?</p>
        <p>
          If not, then we mostly use them when we loop through an array using
          array.map() inside JSX as shown below.{" "}
        </p>
        <CodeBlock>{`<div>
{users.map(user => <div key={user.userId}>{user.name}</div>)}
</div>`}</CodeBlock>
        <p>
          {`If you don't use key, it throws a warning that we need to use a key.
          But why exactly?`}
        </p>
        <p>
          {`The key is used so React can identify the elements in the array correctly. Let's
          look into code above, as you can see we have users array and we are
          looping through it. It displays user name in a div. It's a simple
          logic, but for react it's all same divs. You can see that user names
          are different so they are different divs, but for React it doesn't
          know. So we pass keys to React so that it can identify the divs
          correctly.`}
        </p>
        <p>{`But why do React need to know that? Let's understand with examples below`}</p>
        <h4>Using Index as keys</h4>
        <p>
          {`People say that you shouldn't use index as keys. But, you can.`} If
          your <b>array is static</b> i.e. You are not removing any elements
          then using index as keys is fine.
        </p>
        <p>
          {`But if your array is changing, you are removing elements then? Let's understand`}
        </p>
        <p>
          Think like this you are there are 3 elements in an array.{" "}
          {`['Harry', 'Ron', 'Hermione']`} React knows them by their index cuz
          you used index as keys. Now you remove item on 1st index, Ron. Now you
          have 2 elements. React only know thing by their index, thus it thinks
          Harry is same since index 0, which is same for both render. Now in
          first render, react knew that the element was Ron but in 2nd render it
          got changed to Hermione. React will update that element. Ideally,
          Hermione should have been same cuz it never changed.{" "}
        </p>
        <p>
          {`Now this thing doesn't usually show, when you check app you might not
          see any error. But it givesu unexpected errors sometimes. If you have
          tests, well they may fail sometimes. Sometimes you will check that it
          should display Hermione but it will display Ron and it will rarely
          happen and may fail your test occasionally.`}
        </p>
        <RenderingWithKeys />
      </div>
    </MainWrapper>
  );
}
