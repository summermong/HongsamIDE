/** @format */

import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useMonaco } from '@monaco-editor/react';
import SolarizedLigthTheme from 'monaco-themes/themes/Solarized-light.json';

export default function CodeEditor() {
  const editorRef = useRef(null);
  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 14,
    minimap: {
      enabled: true,
    },
    suggest: {
      // 자동완성 제안 활성화
      snippetsPreventQuickSuggestions: false,
      suggestions: [],
    },
  };

  const javaDefaultValue = `
  public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
      
        int num1 = 5;
        int num2 = 10;
        int sum = num1 + num2;
        System.out.println("Sum: " + sum);
        
        for (int i = 1; i <= 10; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        int number = 7;
        if (number % 2 == 0) {
            System.out.println(number + "은(는) 짝수입니다.");
        } else {
            System.out.println(number + "은(는) 홀수입니다.");
        }
    }
}
`;

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };
  const showValue = () => {
    alert(editorRef.current.getValue());
    console.log(editorRef.current.getValue());
  };

  // useEffect(() => {
  //   if (monaco) {
  //     console.log('here is the monaco instance:', monaco);

  //     monaco.editor.defineTheme('solarizedLigth', SolarizedLigthTheme);

  //     monaco.editor.setTheme('solarizedLigth');
  //   }
  // }, [monaco]);

  return (
    <div className='bg-slate-100'>
      <button onClick={() => showValue()}>Run</button>
      <Editor
        height='70vh'
        width='80vw'
        defaultLanguage='java'
        defaultValue={javaDefaultValue}
        onMount={handleEditorDidMount}
        options={editorOptions}
      />
    </div>
  );
}
