import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import TransactionView from "./views/Transaction";
import AddTransaction from "./views/Add";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<TransactionView />} />
          <Route path="/add" element={<AddTransaction />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
