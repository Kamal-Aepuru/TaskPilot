import { createRootRoute, createRouter } from "@tanstack/react-router";
import App from "./App";

import { tasksRoute } from './routes/tasksRoute';
import { taskListRoute } from './routes/taskListRoute';
import { taskDetailsRoute } from './routes/taskDetailsRoute';
import { homeRoute } from "./routes/homeRoute";

export const rootRoute = createRootRoute({
  component: App,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  tasksRoute.addChildren([
    taskListRoute,
    taskDetailsRoute
  ])
]);

export const router = createRouter({ routeTree });

