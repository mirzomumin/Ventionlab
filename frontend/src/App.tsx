import './App.css';
import './shared/i18n/config';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import { SignInPage } from './pages/SignInPage';
import { HomePage } from './pages/HomePage';
import { PrivateRoute } from './common/routes/PrivateRoute';
import { MainLayout } from './layouts/MainLayout';
import { NotFound } from './pages/NotFound';
import { LangProvider } from './shared/context/LangContext';
import { ProfilePage } from './pages/ProfilePage';
import { CustomThemeProvider } from './shared/context/CustomThemeProvider';
import { ChatsPage } from './pages/ChatsPage';

function App() {
  return (
    <LangProvider>
      <CustomThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/courses" element={<h1>Courses</h1>} />
                <Route path="/internships" element={<h1>Internships</h1>} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </CustomThemeProvider>
    </LangProvider>
  );
}

export default App;
