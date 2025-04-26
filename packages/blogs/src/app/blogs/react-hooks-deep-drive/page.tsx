import Image from "next/image";
import CodeBlock from "@/components/code-block";

export default function ReactHooksDeepDive() {
  return (
    <div>
      <main className="main">
        <article className="blog-content">
          <header className="blog-header">
            <h1 className="blog-title">React Hooks: A Deep Dive</h1>
            <div className="blog-meta">Published on April 20, 2024</div>
          </header>

          <Image
            className="blog-image"
            src="/placeholder.svg?height=500&width=800"
            alt="React code with hooks"
            width={800}
            height={500}
          />

          <p>
            {`React Hooks revolutionized how we write React components when they were introduced in React 16.8. They allow
            you to use state and other React features without writing a class component. Let's explore some of the most
            important hooks and how to use them effectively.`}
          </p>

          <h2>useState: Managing State in Functional Components</h2>
          <p>
            The <span className="bold">useState</span> hook is the most basic
            hook, allowing you to add state to functional components.
          </p>

          <CodeBlock>
            {`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
          </CodeBlock>

          <p>
            <span className="important-text">Important:</span> Always call hooks
            at the top level of your component, never inside loops, conditions,
            or nested functions.
          </p>

          <h2>useEffect: Side Effects in Function Components</h2>
          <p>
            The <span className="bold">useEffect</span> hook lets you perform
            side effects in function components, similar to componentDidMount,
            componentDidUpdate, and componentWillUnmount in class components.
          </p>

          <CodeBlock>
            {`import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
    
    // Similar to componentWillUnmount
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
          </CodeBlock>

          <h2>useContext: Consuming Context in Function Components</h2>
          <p>
            The <span className="italic">useContext</span> hook makes it easier
            to consume context in your components.
          </p>

          <CodeBlock>
            {`import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I'm styled by theme context!
    </button>
  );
}`}
          </CodeBlock>

          <h2>useReducer: Complex State Management</h2>
          <p>
            For more complex state logic,{" "}
            <span className="bold">useReducer</span> provides a Redux-like
            approach.
          </p>

          <CodeBlock>
            {`import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}`}
          </CodeBlock>

          <p>
            By mastering React Hooks, you can write more concise, reusable, and
            maintainable React components. Remember to follow the Rules of Hooks
            to ensure your components work as expected.
          </p>
        </article>
      </main>
    </div>
  );
}
