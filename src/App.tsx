import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { Suspense } from "react";
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import LoginPage from "./core/login/page";
import HomePage from "./core/news/page";
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/"} element={<HomePage />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}
export default App;
