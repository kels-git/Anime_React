// src/routes/routeConfig.ts

import { lazy } from 'react';
import { MenuPath } from '../enum/layout-enum';

export const routeConfig = [
  {
    path: MenuPath.ANIME_LISTING,
    element: lazy(() => import('../pages/AnimeListing')),
  },
  {
    path: MenuPath.ANIME_DETAILS,
    element: lazy(() => import('../pages/AnimeDetails')),
  },
] as const;
