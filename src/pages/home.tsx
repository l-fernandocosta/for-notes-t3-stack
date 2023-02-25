import { MarkdownEditor } from "@/components/mdx-editor";
import { NoteCard } from "@/components/note-card.component";
import { PrivateLayout } from "@/components/private-layout.component";
import { api, type RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

type TopicOutput = RouterOutputs["topic"]["get"]["user_topics"][0];

const HomePage = () => {
  const { data: session } = useSession();
  const [selectedTopic, setSelectedTopic] = useState<TopicOutput | null>(null);
  const isSelected = (topic_id: string) => selectedTopic?.id === topic_id;

  const {
    data: topics,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = api.topic.get.useQuery(undefined, {
    enabled: session?.user !== undefined,
    onSuccess: (data) => {
      setSelectedTopic(selectedTopic ?? data.user_topics[0] ?? null);
    },
  });

  const { data: notes, refetch: refetch_notes } = api.note.get.useQuery(
    { topicId: selectedTopic?.id ?? "" },
    {
      enabled: session?.user !== undefined,
    }
  );

  const create_topic = api.topic.create.useMutation({
    onSuccess: () => void refetch(),
  });

  const create_notes = api.note.create.useMutation({
    onSuccess: () => void refetch_notes(),
  });

  const delete_note = api.note.delete.useMutation({
    onSuccess: () => void refetch_notes(),
  });

  return (
    <PrivateLayout>
      <div className="mx-5 mt-5 grid grid-cols-4 gap-5">
        <div className=" px-2">
          <div className="divider" />
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                create_topic.mutate({
                  title: e.currentTarget.value,
                });
                e.currentTarget.value = "";
              }
            }}
            placeholder="Add a category 🚀"
            className="input-bordered input input-sm w-full"
          />
        </div>
        <div className="px-2 py-1">
          <div className="divider" />
          {isLoading || isRefetching ? (
            <progress className="over progress progress-primary w-56"></progress>
          ) : (
            <ul className="w-100 menu rounded-box gap-2 bg-base-100 p-2 ">
              {topics?.user_topics.map((topic) => (
                <li key={topic.id}>
                  <a
                    href={"#"}
                    onClick={() => setSelectedTopic(topic)}
                    className={`${isSelected(topic.id) ? "bg-primary" : ""} 
                    `}
                  >
                    {topic.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className=" lex-1f col-span-2 flex h-[85vh] flex-col overflow-y-auto px-2">
          <MarkdownEditor
            onSave={({ title, content }) => {
              void create_notes.mutate({
                title,
                content,
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />
          {notes?.map((note) => (
            <NoteCard
              note={note}
              key={note.id}
              onDelete={() => delete_note.mutate({ id: note.id })}
            />
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
};

export default HomePage;
