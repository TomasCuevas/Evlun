import { Navigate, Route, Routes } from 'react-router-dom';

//* pages *//
import {
  SettingsAccountPage,
  SettingsChangeYourPasswordPage,
  SettingsCountryPage,
  SettingsDeactivatePage,
  SettingsEmailPage,
  SettingsGenderPage,
  SettingsPhonePage,
  SettingsProfile,
  SettingsUsernamePage,
  SettingsYourDataPage,
} from '../pages/SettingsPages';

export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/account" element={<SettingsAccountPage />} />
      <Route path="/your_evlun_data" element={<SettingsYourDataPage />} />
      <Route path="/password" element={<SettingsChangeYourPasswordPage />} />
      <Route path="/deactivate" element={<SettingsDeactivatePage />} />
      <Route path="/screen_name" element={<SettingsUsernamePage />} />
      <Route path="/phone" element={<SettingsPhonePage />} />
      <Route path="/email" element={<SettingsEmailPage />} />
      <Route path="/country" element={<SettingsCountryPage />} />
      <Route path="/gender" element={<SettingsGenderPage />} />
      <Route path="/profile" element={<SettingsProfile />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
