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
function NavigationEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles: Record<string, string> = {
      "/": "Um pedacinho do Nordeste",
      "/cardapio": "Cardápio",
      "/pedido": "Seu pedido",
      "/nossa-historia": "Nossa identidade",
      "/contato": "Contato",
    };
    document.title = `${titles[pathname] || "Página não encontrada"} | Cuscuzeria Gourmet`;
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
        <h1>Não foi possível abrir esta página.</h1>
        <p>Recarregue o site para tentar novamente.</p>
        <button onClick={() => window.location.reload()}>Recarregar</button>
      </main>
    ) : (
      this.props.children
    );
  }
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <NavigationEffects />
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="cardapio" element={<Catalog />} />
              <Route path="pedido" element={<Cart />} />
              <Route path="nossa-historia" element={<Story />} />
              <Route path="contato" element={<Contact />} />
              <Route
                path="*"
                element={
                  <section className="wrap section">
                    <h1>Página não encontrada.</h1>
                    <Link to="/">Voltar ao início</Link>
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
