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

        <RenderingWithKeys />
      </div>
    </MainWrapper>
  );
}
