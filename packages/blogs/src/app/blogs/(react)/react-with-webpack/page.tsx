import CodeBlock from "@/components/code-block";
import { MainWrapper } from "@/components/typography";

export default function ReactWithWebpack() {
  return (
    <MainWrapper title="React with Webpack">
      <div>
        <h2>What is Webpack?</h2>
        <p>
          Webpack is a module bundler. It takes all the files in your project
          and bundles them into a single file.
        </p>
        <p>
          Today we are learning how to setup react with webpack. This is
          considering you already know how to use React. This is not tutorial on
          React. This is how to setup React with Webpack from scratch.
        </p>
      </div>
      <div>
        <h4>Step 0: Initialize Project</h4>
        <p>
          First, we need to initialize our project. We can do this by running
          the following command:
        </p>
        <CodeBlock>{`npm init -y`}</CodeBlock>
        <p>This will create a package.json file in the root of our project.</p>
        <p>
          Create a index.html file & index.js file at the root of the project.
        </p>
        <CodeBlock>{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>First React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="./index.js"></script>
</html>
`}</CodeBlock>
        <p>
          {`Add above basic template in the index.html file. This is a simple html
          file with a div inside body with id as "root".`}
        </p>
        <h4>Step 1: Install Webpack</h4>
        <p>
          First, we need to install webpack. We can do this by running the
          following command:
        </p>
        <CodeBlock>{`npm install webpack webpack-cli --save-dev`}</CodeBlock>
        <p>
          This will install webpack & webpack-cli and save it as a dev
          dependency. I am using version 5.99.9 of webpack & 6.0.1 of weback-cli
          which are latest as of now. webpack-cli will help us use webpack from
          command line. You can use `npx webpack` commands because of
          webpack-cli.
        </p>
        <h4>Step 2: Install React</h4>
        <p>
          Next, we need to install react. We can do this by running the
          following command:
        </p>
        <CodeBlock>{`npm install react react-dom`}</CodeBlock>
        <p>This will install react and react-dom. I am using version ^19.1.0</p>
      </div>
      <div>
        <p>
          {`Our setup seems done. We have all required dependencies. Now let's
          just import react in js file and it should work. Write below code in
          index.js file and start the live server on index.html`}
        </p>
        <CodeBlock>{`import React from "react";
import ReactDOM from "react-dom";
`}</CodeBlock>
        <p>{`Oops it doesn't work? Well we haven't setup webpack yet. So Let's do that`}</p>
        <p>
          First we will create a config file for webpack. create a file
          <b>`webpack.config.js`</b>. Here docs for reference.{" "}
          <a
            href="https://webpack.js.org/concepts/configuration/"
            target="_blank"
          >
            Config Docs
          </a>
          . For now we will keep it simple, use following code:
        </p>
        <CodeBlock>{`const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
};
`}</CodeBlock>
        <p>
          <b>What does it do?</b>
        </p>
        <p>
          Lets break it down. imports path, its importing path from node.
          Simple. We are exporting a config object. mode, we can set it up as
          development or production. entry, its the entry point of our
          application. output, its the output of our application.
        </p>
        <p>
          <b>Why we using module.exports?</b>{" "}
        </p>
        <p>
          {`It's because we are using CommonJS. When you run your code, this will
          get executed. As you have now used "module" in your package.json. Your
          app should not be supporting "imports" & "exports". Thus we are using
          commonJs syntax.`}
        </p>
        <p>
          <b>{`Let's run our code now`}</b>
        </p>
        <CodeBlock>{`npx webpack`}</CodeBlock>
        <p>{`What happened? it created a dist folder (as per our config file output). If you look in dist folder there is index.bundle.js. Inside it there is code, we still haven't written any code. So why is there so much code? Remember we have imported React and ReactDOM in our index.js. Well, webpack has bundled that into a single file. If you search keywords like useState or useEffect you can find them in there. But we don't need this right? we needed to see our app on the browser. `}</p>
        <p>
          {`What could be issue? We have added index.js as our entry point in our
          config file. Maybe change that to index.html. Let's try and run 
          <b>npx webpack</b>. It throws error? What happened now? Well our dear
          webpack doesn't understand html, so what now?`}
        </p>
        <p>
          {`We need something so webpack can understand html. For such occasions, we can use webpack plugins. What are webpack plugins? They are just npm packages which we can install and inject into webpack config file. Let's do following:`}
        </p>
        <CodeBlock>{`npm install -D html-webpack-plugin`}</CodeBlock>
        <p>
          This will help us bundle our HTML along with our js. We can use this
          as plugin in webpack. So we need to do changes in our webpack file.
          Check below code:
        </p>
        <CodeBlock>{`const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
`}</CodeBlock>
        <p>What we did here?</p>
        <p>
          {`We imported the plugin. added it in plugin and added our path of
          index.html in the template. How did I know what to write? It's all in
          the docs. You can read more in the docs. `}
        </p>
        <p>
          {`Now let's run our`} <b>npx webpack</b>. Look inside dist folder,
          there is index.html. We did it!
        </p>
        <p>
          {`Let's write some React so we can use our app. Update index.js with
          following:`}
        </p>
        <CodeBlock>{`import React from "react";
import ReactDOM from "react-dom/client";

const FirstComponent = () => {
  return <h1>Hi Mom</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FirstComponent />);
`}</CodeBlock>
        <p>
          {`Let's run <b>npx webpack</b> again. Now if we open index.html in our
          browser or open live server. Our app should work! It still doesn't??
          Why?`}
        </p>
        <p>
          {`It's because we have used JSX in our code. Our all dependencies,
          React, ReactDOM, webpack, webpack-cli, they don't understand JSX. So?
          We need someone who does? For this we will use babel.`}
        </p>
        <p>
          {` So you might have understood webpack doesn't do anything apart from
          bundling your code. But it supports plugins with which you can do a
          lot of things.`}
        </p>
        <p>
          I will go over some of the packagess now and what they do then we will
          install all of them in one go.
        </p>
        <table>
          <thead>
            <tr>
              <th>Plugin name</th>
              <th>What does it do?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>html-webpack-plugin</td>
              <td>Helps us bundle html</td>
            </tr>
            <tr>
              <td>webpack-dev-server</td>
              <td>
                Helps us with hot reload. We can do changes and see the changes
                live without any commands. You can use command{" "}
                <b>npx webpack serve</b>. The serve keyword is available because
                of this package.
              </td>
            </tr>
            <tr>
              <td>babel-loader</td>
              <td>
                This connect webpack to babel. They not gonna work together out
                of the box obviously. So we need this.
              </td>
            </tr>
            <tr>
              <td>@babel/core</td>
              <td>This is core library for babel. </td>
            </tr>
            <tr>
              <td>@babel/preset-env</td>
              <td>
                Babel will transform all your latest JS code into older version
                of JS which older browsers can understand.
                <a
                  href="https://babeljs.io/docs/babel-preset-env"
                  target="_blank"
                >
                  docs
                </a>
              </td>
            </tr>
            <tr>
              <td>@babel/preset-react</td>
              <td>
                This will transform the JSX into javascript. This will solve the
                error we encountered earlier.
              </td>
            </tr>
            {/* <tr>
              <td>xxxxxxxxxxddddxxxx</td>
              <td>xxxxxxxxxxxxxx</td>
            </tr> */}
          </tbody>
        </table>
        <p>Install all of them with below command</p>
        <CodeBlock>{`npm install -D html-webpack-plugin webpack-dev-server @babel/preset-env @babel/preset-react babel-loader`}</CodeBlock>
        <p>Lets do changes to config file as following</p>
        <CodeBlock>{`const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
`}</CodeBlock>
        <p>
          Add a <b>.babelrc</b> file and add followin{" "}
        </p>
        <CodeBlock>{`{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}`}</CodeBlock>
        <p>{`Now let's go through the code once.`}</p>
        <p>
          In babelrc we are adding the babel packages which will convert jsx and
          modern js Es6 to older versions.
        </p>
        <p>
          {`In webpack.config we have added babel-loader as loader for .js & .jsx
          files. We don't want it to run on node_modules so we have added it in
          exclude. Very simple`}
        </p>
        <p>Lets make our life simpler by adding npm commands in package.json</p>
        <CodeBlock>{`"start": "webpack serve --mode development",
build": "webpack --mode production"`}</CodeBlock>
        <p>
          Now if you run <b>npm run start</b> command this will start
          development server. <br />
          If you run <b>npm run build</b> command this will build the code.
        </p>
      </div>
    </MainWrapper>
  );
}
