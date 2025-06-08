import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';

const Home = () => <div>Welcome to Task Manager. Go to <a href="/tasks">Tasks</a></div>;

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});
