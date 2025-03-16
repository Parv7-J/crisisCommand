import { BrowserRouter as Router } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <Router>
      <MainPage>
        <AppRouter />
      </MainPage>
    </Router>
  );
}

export default App;
