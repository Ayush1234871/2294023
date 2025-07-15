import React, { useEffect } from "react";
import { log } from "./utils/logger";
import URLShortenerPage from "./pages/URLShortenerPage";

function App() {
  useEffect(() => {
    log("frontend", "info", "component", "App mounted successfully");
  }, []);

  return (
    <div>
      <URLShortenerPage />
    </div>
  );
}

export default App;
