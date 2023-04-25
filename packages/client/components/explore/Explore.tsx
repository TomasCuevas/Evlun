import { FormEvent, useEffect } from "react";

//* icons *//
import { BsSearch } from "react-icons/bs";

//* components *//
import { Form } from "@/components/form";

//* hooks *//
import { useForm } from "@/hooks";

//* stores *//
import { useSearchesStore, useUiStore } from "@/store";

export const Explore: React.FC = () => {
  const { usersSearched, onSearchUsers } = useSearchesStore();
  const { onSwitchExploreModal } = useUiStore();

  const { search, onInputChange } = useForm({
    search: "",
  });

  const startSearchUsers = async () => {
    await onSearchUsers(search);
    if (search.length < 1) return onSwitchExploreModal(false);
    onSwitchExploreModal(true);
  };

  useEffect(() => {
    return () => {
      onSearchUsers("");
    };
  }, []);

  return (
    <div className="flex h-[30px] w-full items-center rounded-full bg-orange/20 px-[20px] xs:h-[40px]">
      <Form
        onSubmit={(event: FormEvent) => event.preventDefault()}
        className="flex w-full items-center gap-[15px]"
        autocomplete={false}
      >
        <BsSearch className="text-orange" />
        <input
          type="text"
          className="h-[80%] w-full border-none bg-transparent text-base font-light text-white outline-none placeholder:text-white/50"
          name="search"
          value={search}
          onKeyUp={startSearchUsers}
          onFocus={() => {
            if (usersSearched.length > 0) onSwitchExploreModal(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              onSwitchExploreModal(false);
            }, 100);
          }}
          onChange={onInputChange}
          placeholder="Buscar usuario en Evlun"
        />
      </Form>
    </div>
  );
};
