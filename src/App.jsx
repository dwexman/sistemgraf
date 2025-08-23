import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
      </main>
    </>
  );
}
