import Page from "./pages/Page";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Page />
    </div>
  );
}

export default App;
