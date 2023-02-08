import { useContext, useState, FormEvent } from "react";
import NextLink from "next/link";
import { useQueryClient } from "@tanstack/react-query";

//* hooks *//
import { useForm } from "../../hooks";

//* components *//
import { Form, FormButtonPrimary } from "../form";

//* services *//
import { newPostService } from "../../services";

//* helpers *//
import { postValidation } from "../../helpers";

//* context *//
import { AuthContext } from "../../context";

//* interface *//
interface Props {
  postRef?: string;
}

export const NewPost: React.FC<Props> = ({ postRef }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [height, setHeight] = useState(48);
  const { content, onInputChange, isSending, setIsSending } = useForm({
    content: "",
  });

  const onInput = (input: FormEvent<HTMLTextAreaElement>) => {
    const heightInput = (input.target as any).scrollHeight;
    if (heightInput === height) return;
    setHeight(heightInput);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!postValidation(content) || isSending) return;

    const formData = new FormData();
    formData.append("content", content);
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
      onInputChange({ target: { value: "", name: "content" } });
      setHeight(48);
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
      <section className="w-full">
        <Form className="flex flex-col" onSubmit={onSubmit}>
          <textarea
            className="w-full resize-none overflow-hidden border-b border-transparent bg-transparent py-[10px] px-0 text-lg text-white outline-none placeholder:text-white/50 disabled:text-white/70"
            disabled={isSending}
            maxLength={250}
            name="content"
            onChange={(event) => {
              onInputChange(event);
              onInput(event);
            }}
            placeholder={
              postRef ? "Publica tu respuesta" : "¿Qué está pasando?"
            }
            style={{ height }}
            value={content}
          />
          <div className="my-[10px] mx-0 flex w-full items-center justify-end">
            <FormButtonPrimary
              isDisabled={!postValidation(content) || isSending}
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
