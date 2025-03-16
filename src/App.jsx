import AppRouter from "./routes/AppRouter";
import { supabase } from "./services/supabaseClient";

function App() {
  return <AppRouter />;
}

export default App;
