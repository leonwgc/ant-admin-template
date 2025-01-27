import { lazy } from 'react';

export const Users = lazy(() => import('./Users'));
export const AddUser = lazy(() => import('./Add'));
export const EditUser = lazy(() => import('./Edit'));