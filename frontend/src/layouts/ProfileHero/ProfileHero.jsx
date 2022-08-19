//* components *//
import {
  AvatarOptions,
  Banner,
  Biography,
  FollowingsFollowers,
  LocationMoment,
  NameUsername,
} from '../../components/ProfileHero';

export const ProfileHero = () => {
  return (
    <>
      <Banner />
      <AvatarOptions />
      <NameUsername />
      <Biography />
      <LocationMoment />
      <FollowingsFollowers />
    </>
  );
};
