import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "./App";
import TaskList from "./pages/TaskList";

const rootRoute = createRootRoute({ component: App });

const taskListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: TaskList,
});

const routeTree = rootRoute.addChildren([taskListRoute]);

export const router = createRouter({ routeTree });
