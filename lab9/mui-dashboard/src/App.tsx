import React from 'react';
import { CssBaseline } from '@mui/material';
import { Layout } from './Layout';
import { Dashboard } from './Dashboard';
import { AssetForm } from './AssetForm';

const App: React.FC = () => {
  return (
    <>
      {/* CssBaseline скидає стандартні відступи браузера для правильної роботи MUI */}
      <CssBaseline />
      <Layout>
        <Dashboard />
        <AssetForm />
      </Layout>
    </>
  );
};

export default App;