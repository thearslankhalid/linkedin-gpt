import Layout from "@/components/layout";
import { Routes, Route } from 'react-router';

import GeneratePost from "@/app/generate-post";

function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route
              index
              element={
                <GeneratePost />
              }
            />
        </Route>
    </Routes>
  );
}

export default App;
