import React from "react";
import Home from "./Pages/Home";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Toaster
        richColors
        position="top-center"
        dir="auto"
        visibleToasts={1}
      />
      <Home />
    </div>
  );
};

export default App;
