"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CodeSnippetVisualizer from "./CodeSnippet";

const TextItem = ({ style, content }) => {
  switch (style) {
    case "heading":
      return <h1 className="text-2xl text-left font-bold mb-4">{content}</h1>;
    case "subheading":
      return <h2 className="text-xl text-left font-semibold mb-3">{content}</h2>;
    case "paragraph":
      return <p className="mb-2 text-left ">{content}</p>;
    default:
      return null;
  }
};

const CodeSnippet = ({ content }) => (
  <div className="my-4">
    <CodeSnippetVisualizer code={content} language="Python"/>
  </div>
);

const TypedResponse = ({ question }) => (
  <div className="my-4">
    <p className="mb-2">{question}</p>
    <input type="text" className="border p-2 w-full" />
  </div>
);

const MultipleChoice = ({ question, answerChoices }) => (
  <div className="my-4">
    <p className="mb-2">{question}</p>
    {answerChoices.map((choice, index) => (
      <div key={index} className="flex items-center mb-2">
        <input
          type="radio"
          id={`choice-${index}`}
          name="multipleChoice"
          value={choice}
          className="mr-2"
        />
        <label htmlFor={`choice-${index}`}>{choice}</label>
      </div>
    ))}
  </div>
);

const ImageItem = ({ content }) => (
  <div className="my-4">
    <Image src={content} alt="Lesson image" width={500} height={300} />
  </div>
);

export default function Review() {
  const [data, setData] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
  
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(tempData);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <main className="container text-left mx-auto px-4 py-8">
      {data.map((item, index) => {
        switch (item.type) {
          case "text":
            return <TextItem key={index} {...item} />;
          case "codeExample":
            return <CodeSnippet key={index} {...item} />;
          case "question":
            return item.questionType === "typedResponse" ? (
              <TypedResponse key={index} {...item} />
            ) : (
              <MultipleChoice key={index} {...item} />
            );
          case "image":
            return <ImageItem key={index} {...item} />;
          default:
            return null;
        }
      })}
    </main>
  );
}


const tempData = [
  {
      "type": "text",
      "style": "heading",
      "content": "Welcome to your first lesson! You will learn how inputs and outputs work in Python."
  },
  {
      "type": "text",
      "style": "subheading",
      "content": "Welcome to your first lesson! You will learn how inputs and outputs work in Python."
  },
  {
      "type": "text",
      "style": "paragraph",
      "content": "Welcome to your first lesson! You will learn how inputs and outputs work in Python."
  },
  {
      "type": "codeExample",
      "content": "/codeExamples/PythonBasics/HelloWorld/0"
  },
  {
      "type": "question",
      "questionType": "typedResponse",
      "question": "How do you print to the console in Python?"
  },
  {
      "type": "question",
      "questionType": "multipleChoice",
      "answerChoices": [
          "def functionName():",
          "function functionName():",
          "def functionName(){}",
          "func functionName(){}"
      ],
      "question": "What is the correct function declaration in Python"
  },
  {
      "type": "image",
      "content": "/images/PythonBasics/HelloWorld/0"
  },
  {
      "type": "text",
      "style": "paragraph",
      "content": "You can save their name into a variable, which stores it for later use."
  }
];