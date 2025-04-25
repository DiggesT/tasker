import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import * as routes from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { AllTasksPage } from "./pages/AllTasksPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { ViewTaskPage } from "./pages/ViewTaskPage";
// import { NotFoundPage } from "./pages/other/NotFoundPage";
import "./styles/global.scss";

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={"/"} element={<h1>Welcome to Tasker!</h1>} />
            <Route path={routes.allTasksRoute} element={<AllTasksPage />} />
            <Route path={routes.newTasksRoute} element={<NewTaskPage />} />
            <Route path={routes.viewTasksRoute} element={<ViewTaskPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
