import { type RouterOutputs } from "@/utils/api";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type NoteOutput = RouterOutputs["note"]["get"][0];

type NoteCardProps = {
  note: NoteOutput;
  onDelete: (note_id: string) => void;
};

export const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={`bg-base-700 h-100 card mt-5   border border-gray-700  shadow-xl  transition-all ${
        isOpen ? "flex-1" : ""
      }`}
    >
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isOpen ? "collapse-open" : ""
          } collapse `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="collapse-title text-xl font-bold">{note?.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="card-actions mx-2 flex justify-end">
          <button
            className="btn-outline btn-error btn-xs btn px-5"
            onClick={() => onDelete(note.id)}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
