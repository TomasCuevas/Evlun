import Link from "next/link";

export const NewToEvlun: React.FC = () => {
  return (
    <div className="mt-4 flex w-full flex-col rounded-2xl border border-orange/50 p-3">
      <h3 className="text-xl font-bold text-white">¿Nuevo en Evlun?</h3>
      <Link href="/auth/register">
        <button className="mt-4 rounded-full bg-white p-2 font-bold text-black hover:bg-gray-200">
          Crear cuenta
        </button>
      </Link>
    </div>
  );
};
