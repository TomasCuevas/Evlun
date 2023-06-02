import { FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";

//* icon *//
import { BsSearch } from "react-icons/bs";

//* components *//
import { Form } from "@/components/form";

//* stores *//
import { useSearchesStore, useUiStore } from "@/store";

export const Explore: React.FC = () => {
  const { usersSearched, onSearchUsers, resetUsers } = useSearchesStore();
  const { onSwitchExploreModal } = useUiStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: async (formValues) => {
      const { search } = formValues;

      if (search.length < 1) return onSwitchExploreModal(false);

      try {
        await onSearchUsers(search);
        onSwitchExploreModal(true);
      } catch (error) {}
    },
  });

  useEffect(() => {
    formik.setFieldValue("search", "");
    resetUsers();
  }, [router]);

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
          value={formik.values.search}
          onKeyUp={formik.submitForm}
          onFocus={() => {
            if (usersSearched.length > 0) onSwitchExploreModal(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              onSwitchExploreModal(false);
            }, 100);
          }}
          onChange={formik.handleChange}
          placeholder="Buscar usuario en Evlun"
        />
      </Form>
    </div>
  );
};
