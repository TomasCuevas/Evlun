import { useContext, useEffect } from 'react';

//* icons *//
import { BsSearch } from 'react-icons/bs';

//* hooks *//
import { useForm } from '../../hooks/useForm';

//* context *//
import { SearchContext } from '../../context';

export const Explore = () => {
  const { onSearch } = useContext(SearchContext);
  const { search, onInputChange } = useForm({
    search: '',
  });

  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <div className="flex h-[30px] w-full items-center rounded-full border border-decorateorange bg-decorateorange/10 px-[20px]">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full items-center gap-[15px]"
        autoComplete="off"
      >
        <BsSearch className="text-decorateorange" />
        <input
          type="text"
          className="h-[80%] w-full border-none bg-transparent text-base font-light text-text outline-none placeholder:text-text/50"
          name="search"
          value={search}
          onChange={onInputChange}
          placeholder="Buscar usuario en Evlun"
        />
      </form>
    </div>
  );
};
