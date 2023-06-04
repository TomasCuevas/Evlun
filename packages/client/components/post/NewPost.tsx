import { useState, FormEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

//* components *//
import { Form, FormButtonPrimary } from "@/components/form";

//* helpers *//
import { postValidation } from "@/helpers";

//* hooks *//
import { useQuill } from "@/hooks";

//* store *//
import { useAuthStore, usePostsStore } from "@/store";

//* interface *//
interface Props {
  postRef?: string;
}

export const NewPost: React.FC<Props> = ({ postRef }) => {
  const { user } = useAuthStore();
  const { onCreatePost } = usePostsStore();

  const { html, text, onInputChange, reset } = useQuill();
  const [isSending, setIsSending] = useState(false);

  //! submit post
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!postValidation(text.trim()) || isSending || text.length < 1) return;

    setIsSending(true);
    try {
      await onCreatePost({ content: html, text: text, postRef });
      reset();
    } catch (error) {
      alert("Error al crear el post.");
    }

    setIsSending(false);
  };

  return (
    <article className="flex w-full gap-[10px] border-b border-orange/50  bg-orange/10 px-4 pt-[30px]">
      <section className="flex min-w-[45px] max-w-[10%] flex-col">
        <Link href={`/${user!.username}`} passHref>
          <a>
            <img
              src={user!.avatar}
              alt={user!.name}
              className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
            />
          </a>
        </Link>
      </section>
      <section className="w-[calc(100%_-_55px)]">
        <Form className="flex flex-col" onSubmit={onSubmit}>
          <ReactQuill
            value={html}
            onChange={onInputChange}
            placeholder={
              postRef ? "Publica tu respuesta" : "¿Qué está pasando?"
            }
            className="h-full max-h-[calc(100vh_-_150px)] overflow-y-auto text-lg text-white placeholder:text-white/50"
          />
          <div className="my-[10px] mx-0 flex w-full items-center justify-end">
            <FormButtonPrimary
              isDisabled={
                !postValidation(text.trim()) || isSending || text.length < 1
              }
              label="Postear"
              type="submit"
              className="cursor-pointer rounded-2xl bg-orange py-[10px] px-[20px] text-sm font-medium text-white disabled:bg-orange/10 disabled:text-white/10"
            />
          </div>
        </Form>
      </section>
    </article>
  );
};
