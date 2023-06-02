import NextLink from "next/link";

//* interface *//
interface Props {
  question: string;
  linkPlaceholder: string;
  link: string;
}

export const FormQuestion: React.FC<Props> = ({
  question,
  linkPlaceholder,
  link,
}) => {
  return (
    <div className="flex gap-[5px] text-base font-normal">
      <p className="gap-[5px] text-white">{question}</p>
      <NextLink href={link} passHref>
        <a className="text-orange underline">{linkPlaceholder}</a>
      </NextLink>
    </div>
  );
};
