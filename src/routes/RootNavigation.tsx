import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from './routeConfig';

export const RootNavigation = () => {

  const LoadingSpinner = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {routeConfig.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </Suspense>
  );
};