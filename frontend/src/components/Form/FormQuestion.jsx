import { Link } from 'react-router-dom';

export const FormQuestion = ({ question, linkQuestion, link }) => {
  return (
    <div className="flex gap-[5px] text-base font-medium">
      <p className="gap-[5px] text-text">{question}</p>
      <Link to={link} className="text-decorateorange underline">
        {linkQuestion}
      </Link>
    </div>
  );
};
