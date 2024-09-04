"use client";
import React, { useState } from 'react';
import { Highlight, themes, defaultProps } from "prism-react-renderer"

import { Copy, Check } from 'lucide-react';

const CodeSnippetVisualizer = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative">
      <Highlight {...defaultProps} theme={themes.nightOwl} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 rounded-lg overflow-auto`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                <span className="table-cell text-right pr-4 select-none opacity-50 text-sm">
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 bg-gray-200 rounded"
      >
        {copied ? <Check className="text-green-500" /> : <Copy />}
      </button>
    </div>
  );
};

export default CodeSnippetVisualizer;