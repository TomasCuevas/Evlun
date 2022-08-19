/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import { es } from 'dayjs/locale/es';

//* icons *//
import { BsCalendar3, BsPinMap } from 'react-icons/bs';

//* hooks *//
import { useProfileStore } from '../../hooks/useProfileStore';

//* tailwind-classes *//
const itemClass = 'items-center flex gap-[10px]';
const iconClass = 'text-decorateorange text-lg';
const descriptionClass = 'text-sm text-text/80';

export const LocationMoment = () => {
  const { location, date } = useProfileStore();
  const month = dayjs(date).locale('es').format('MMMM');
  const year = dayjs(date).locale('es').format('YYYY');

  return (
    <div className="mt-4 flex w-full flex-nowrap gap-[15px] pl-[5%] pr-[5%]">
      {location && (
        <span className={itemClass}>
          <BsPinMap className={iconClass} />
          <span className={descriptionClass}>{location}</span>
        </span>
      )}
      <span className={itemClass}>
        <BsCalendar3 className={iconClass} />
        <span
          className={descriptionClass}
        >{`Se unio en ${month} de ${year}`}</span>
      </span>
    </div>
  );
};
