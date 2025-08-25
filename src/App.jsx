import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Servicios from "./components/Servicios";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Servicios />
      </main>
    </>
  );
}
