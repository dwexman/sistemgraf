import Navbar from "./components/layout/Navbar";
import Inicio from "./pages/inicio/Inicio";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Inicio />
      </main>
    </>
  );
}
