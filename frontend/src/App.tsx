import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import * as routes from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { AllTasksPage } from "./pages/AllTasksPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { ViewTaskPage } from "./pages/ViewTaskPage";
import "./styles/global.scss";
import { Segment } from "./components/Segment";

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={"/"}
              element={<Segment title="Welcome to Tasker!" />}
            />
            <Route path={routes.newTasksRoute} element={<NewTaskPage />} />
            <Route path={routes.allTasksRoute} element={<AllTasksPage />} />
            <Route path={routes.viewTasksRoute(':taskId')} element={<ViewTaskPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
