import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="flex bg-background text-foreground">Hello "__root"!</nav>
      <Outlet />
    </>
  ),
});
