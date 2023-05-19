/* eslint-disable react/no-unescaped-entities */
import { useState, FormEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { createPost } from "actions/api";

interface FormData {
  title: string;
  content: string;
}

export default function NewPost() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const queryClient = useQueryClient();

  const createPostMutation = useMutation(
    (post: FormData) =>
      createPost({
        ...post,
        username: session?.user?.name || "",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts"); // Invalida a query "posts" para atualizar a lista de posts
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createPostMutation.mutateAsync(formData);

    setFormData({
      title: "",
      content: "",
    });
  };

  return (
    <div className="flex flex-col w-full max-w-[96%] m-[24px] border-[1px] border-postBorder rounded-[16px] h-fit p-[24px]">
      <h1 className="font-bold text-[22px]">What's on your mind?</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label
          htmlFor="title"
          className="block text-[16px] text-black mt-[24px]"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Hello World"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border-[1px] rounded-lg border-darkGray mt-[8px]"
          required
        />
        <label
          htmlFor="content"
          className="block text-[16px] text-black mt-[24px]"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Comment here"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="border-[1px] rounded-lg border-darkGray mt-[8px]"
          required
        />

        <button
          type="submit"
          className="bg-blue w-fit self-end mt-[24px] py-2 px-6 rounded-[8px] font-bold text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
}
