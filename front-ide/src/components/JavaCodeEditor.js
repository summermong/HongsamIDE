/** @format */

import React, { useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import SolarizedLigthTheme from 'monaco-themes/themes/Solarized-light.json';
import { javaDefaultValue } from '../defaultValues';

import ResultTerm from './ResultTerm';
import IdeTopBar from './IdeTopBar';

export default function JavaCodeEditor() {
  const monaco = useMonaco();
  const editorRef = useRef(null);

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 14,
    minimap: {
      enabled: false,
    },
    suggest: {
      // 자동완성 제안 활성화
      snippetsPreventQuickSuggestions: false,
      suggestions: [],
    },
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!monaco) return;

    console.log('here is the monaco instance:', monaco);

    monaco.editor.defineTheme('solarizedLigth', SolarizedLigthTheme);

    monaco.editor.setTheme('solarizedLigth');
  }, [monaco]);
  const showValue = () => {
    alert(editorRef.current.getValue());
    console.log(editorRef.current.getValue());
  };

  return (
    <>
      <IdeTopBar showValue={showValue} />
      <div style={{ height: 'calc(100vh - 42px)', marginTop: '42px' }}>
        <Editor
          height='70vh'
          width='70vw'
          defaultLanguage='java'
          defaultValue={javaDefaultValue}
          onMount={handleEditorDidMount}
          options={editorOptions}
        />
        <ResultTerm />
      </div>
    </>
  );
}
