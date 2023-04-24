import { useState } from "react";
import { DeltaStatic, Sources } from "quill";

//* interfaces *//
import { UnprivilegedEditor } from "@/interfaces";

interface Return {
  html: string;
  text: string;
  onInputChange(
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ): void;
  reset(): void;
}

export const useQuill = (): Return => {
  const [html, setHtml] = useState<string>("");
  const [text, setText] = useState<string>("");

  const onInputChange = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {
    setHtml(value);
    setText(editor.getText().trim());
  };

  const reset = () => {
    setHtml("");
    setText("");
  };

  return {
    // getters
    html,
    text,

    // methods
    onInputChange,
    reset,
  };
};
