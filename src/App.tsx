import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import LoginPage from "./core/login/page";
import HomePage from "./core/news/page";
import DetailPage from "./core/news/detail/page";
import GestorPage from "./core/admin/page";
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/detalle/:id/"} element={<DetailPage />} />
            <Route path={"/gestor/"} element={<GestorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
