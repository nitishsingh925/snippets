"use client";
import * as actions from "@/actions";
import Editor from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import React, { useState } from "react";

interface ISnippetEditFormProps {
  snippet: Snippet;
}

const SnippetEditForm = ({ snippet }: ISnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);
  const handleEditorchange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(null, {
    id: snippet.id,
    code,
  });
  return (
    <div className="m-3">
      <h1>{snippet.title}</h1>
      <Editor
        height={"40vh"}
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        // minimap hide
        // options={{ minimap: { enabled: false } }}
        onChange={handleEditorchange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default SnippetEditForm;
