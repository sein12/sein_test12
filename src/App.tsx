import Page from "./pages/Page";
import Navbar from "./components/Navbar.tsx";
import FormModal from "./components/modal/FormModal.tsx";

function App() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Navbar />
        <FormModal />
      </div>
    </>
  );
}

export default App;
