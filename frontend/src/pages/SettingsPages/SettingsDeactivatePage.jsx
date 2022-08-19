//* components *//
import { Main } from '../../components/Main/Main';
import { ProfileDeactivate } from '../../components/Settings';

//* layout *//
import { Nav, NavTopSettings } from '../../layouts';

//* hooks *//
import { useAuthStore } from '../../hooks/useAuthStore';

export const SettingsDeactivatePage = () => {
  const { startDisabledAccount } = useAuthStore();

  const disabledAccount = async () => {
    await startDisabledAccount();
  };

  return (
    <>
      <Main>
        <NavTopSettings navText="Desactivar la cuenta" />
        <ProfileDeactivate />
        <section className="mt-[30px] flex flex-col px-[5%]">
          <span className="border-b border-decorateorange py-3 text-xl font-extrabold text-text">
            Esta acción desactivará tu cuenta
          </span>
          <span className="border-b border-decorateorange py-3 text-base font-light text-text/80">
            Estás por iniciar el proceso de desactivación de tu cuenta de Evlun.
            Tu nombre visible, tu @usuario y tu perfil público ya no se podrán
            ver en Evlun.
          </span>
          <div
            onClick={disabledAccount}
            className="mt-5 flex h-[50px] w-full cursor-pointer items-center justify-center rounded-full border border-error/50 font-bold text-error/60 transition-all duration-300 hover:border-error hover:text-error"
          >
            <span>Desactivar</span>
          </div>
        </section>
        <Nav />
      </Main>
    </>
  );
};
