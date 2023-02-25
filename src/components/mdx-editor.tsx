import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";

type Note = {
  title: string;
  content: string;
};

type MarkdownEditorProps = {
  onSave: (note: Note) => void;
};

export const MarkdownEditor = ({ onSave }: MarkdownEditorProps) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const isSaveButtonDisabled =
    title.trim().length === 0 || code.trim().length === 0;
  return (
    <div className="card mt-5 h-[100%] flex-1  border border-gray-700 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title ">
          <input
            type="text"
            value={title}
            placeholder="Your task title 👩‍🚀"
            className="input-primary input input-lg w-full font-bold"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={code}
          theme={"dark"}
          width={"100%"}
          height={"auto"}
          minWidth={"100%"}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          className="flex-1 border border-gray-700"
          onChange={(e) => setCode(e)}
        />
      </div>
      <div className="card-actions mb-5 items-center justify-center gap-5 overflow-y-auto">
        <button
          onClick={() => {
            onSave({
              title,
              content: code,
            });

            setCode("");
            setTitle("");
          }}
          className="btn-outline btn-primary btn"
          disabled={isSaveButtonDisabled}
        >
          Send to space
        </button>

        <button className="btn-outline btn-accent btn">
          <EyeOpenIcon />
        </button>
      </div>
    </div>
  );
};
