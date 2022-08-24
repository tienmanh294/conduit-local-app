import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import NewArticlePage from './pages/NewArticle';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/Profile';
import PersistLogin from './components/persistlogin/PersistLogin';
import LayoutRoute from './components/layout/LayoutRoute';
import ArticlePage from './pages/Article';
import Missing from './pages/Missing';
import EditArticle from './pages/EditArticle';
import RequireAuth from './components/user/RequireAuth';
import Unauthorized from './components/user/Unauthorized';
import AdminPage from './pages/Admin';
import NewVideoArticlePage from './pages/NewVideoArticle';
import './Styles/main.scss';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LayoutRoute />}>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="login/*" element={<LoginPage />} />
          <Route path="register/*" element={<RegisterPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          
          <Route element={<PersistLogin />}>
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="article/:slug" element={<ArticlePage />} />
            </Route> */}
            
            <Route path="/" element={<HomePage />} />
            
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="editor" element={<NewArticlePage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="editor/:slug" element={<EditArticle />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/:userID/*" element={<ProfilePage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="admin" element={<AdminPage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="video" element={<NewVideoArticlePage />} />
            </Route>
          </Route>
          {/* <Route path="/:userID/*" element={<ProfilePage />} /> */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
