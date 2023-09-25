/** @format */

import React, { useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import SolarizedLigthTheme from 'monaco-themes/themes/Solarized-light.json';
import { javaDefaultValue } from '../../defaultValues';
import axios from 'axios';

import ResultTerm from './ResultTerm';
import IdeTopBar from './IdeTopBar';

export default function JavaCodeEditor() {
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const [code, setCode] = useState('');

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

    console.log('monaco instance:', monaco);

    monaco.editor.defineTheme('solarizedLigth', SolarizedLigthTheme);

    monaco.editor.setTheme('solarizedLigth');
  }, [monaco]);
  const showValue = async () => {
    const code = editorRef.current.getValue();
    alert(editorRef.current.getValue());
    console.log(JSON.stringify(editorRef.current.getValue()));
    console.log(code);
    const formData = new FormData();
    formData.append('code', JSON.stringify(code));
    console.log(formData);

    await axios
      .post('url', formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCode = async () => {
    await axios
      .get('url')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditorChange = (value, event) => {
    console.log('here is the current model value:', value);
    setCode(value);
    console.log('code : ', code);
  };
  useEffect(() => {
    fetchCode();
  }, []);

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
          onChange={handleEditorChange}
        />
        <ResultTerm />
      </div>
    </>
  );
}
