import { useContext, useState, FormEvent, useRef } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

//* components *//
import { Form, FormButtonPrimary } from "../form";

//* services *//
import { newPostService } from "../../services";

//* helpers *//
import { postValidation } from "../../helpers";

//* hooks *//
import { useQuill } from "../../hooks";

//* context *//
import { AuthContext } from "../../context";

//* interface *//
interface Props {
  postRef?: string;
}

export const NewPost: React.FC<Props> = ({ postRef }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { html, text, onInputChange, reset } = useQuill();
  const [isSending, setIsSending] = useState(false);

  //! submit post
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!postValidation(html) || isSending || text.length < 1) return;

    const formData = new FormData();
    formData.append("content", html);
    if (postRef) formData.append("postRef", postRef);

    setIsSending(true);
    const result = await newPostService(formData);
    setIsSending(false);

    if (postRef) {
      queryClient.invalidateQueries([`/answers/${postRef}`]);
    } else {
      queryClient.invalidateQueries(["/all"]);
    }

    if (result) {
      reset();
    } else {
      alert("No se pudo crear el post.");
    }
  };

  return (
    <article className="flex w-full gap-[10px] border-b border-orange  bg-orange/10 px-4 pt-[30px]">
      <section className="flex min-w-[45px] max-w-[10%] flex-col">
        <NextLink href={`/profile${user!.username}`} passHref>
          <a>
            <img
              src={user!.avatar}
              alt={user!.name}
              className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
            />
          </a>
        </NextLink>
      </section>
      <section className="w-[calc(100%_-_55px)]">
        <Form className="flex flex-col" onSubmit={onSubmit}>
          <ReactQuill
            value={html}
            onChange={onInputChange}
            placeholder={
              postRef ? "Publica tu respuesta" : "¿Qué está pasando?"
            }
            className="text-lg text-white placeholder:text-white/50"
          />
          <div className="my-[10px] mx-0 flex w-full items-center justify-end">
            <FormButtonPrimary
              isDisabled={!postValidation(html) || isSending || text.length < 1}
              label="Postear"
              type="submit"
              className="cursor-pointer rounded-2xl bg-orange py-[10px] px-[20px] text-sm font-medium text-bluedark disabled:bg-orange/10"
            />
          </div>
        </Form>
      </section>
    </article>
  );
};
