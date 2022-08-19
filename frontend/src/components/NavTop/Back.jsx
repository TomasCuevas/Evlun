import { useNavigate } from 'react-router-dom';

//* icons *//
import { BsArrowLeftShort } from 'react-icons/bs';

export const Back = () => {
  const navigate = useNavigate();

  const onNavigate = () => navigate(-1);

  return (
    <div className="flex items-center justify-start" onClick={onNavigate}>
      <BsArrowLeftShort className="cursor-pointer text-3xl text-decorateorange/70 hover:text-decorateorange" />
    </div>
  );
};
