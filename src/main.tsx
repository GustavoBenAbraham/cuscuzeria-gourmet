import { site } from "./config/site";
import { copy } from "./config/content";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { CartProvider } from "./hooks/useCart";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { Cart } from "./pages/Cart";
import { Story, Contact } from "./pages/Info";
import "./styles/global.css";
import "./styles/nordeste.css";
function NavigationEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles: Record<string, string> = Object.fromEntries(site.navigation.map(item => [site.routes[item.id as keyof typeof site.routes], item.title]));
    titles[site.routes.cart] = site.pages.cart.title;
    document.title = `${titles[pathname.replace(/\/$/, "") || "/"] || site.pages.notFoundTitle} | ${site.restaurant.name}`;
    document.querySelector("main")?.setAttribute("tabindex", "-1");
    document.querySelector("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="wrap section">
        <h1>{copy.main.errorTitle}</h1>
        <p>{copy.main.errorDescription}</p>
        <button onClick={() => window.location.reload()}>{copy.main.reload}</button>
      </main>
    ) : (
      this.props.children
    );
  }
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <CartProvider>
          <NavigationEffects />
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={site.routes.menu} element={<Catalog />} />
              <Route path={site.routes.cart} element={<Cart />} />
              <Route path={site.routes.story} element={<Story />} />
              <Route path={site.routes.contact} element={<Contact />} />
              <Route
                path="*"
                element={
                  <section className="wrap section">
                    <h1>{copy.main.notFoundTitle}</h1>
                    <Link to={site.routes.home}>{copy.main.backHome}</Link>
                  </section>
                }
              />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
