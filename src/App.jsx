
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Inicio from "./pages/inicio/Inicio";
import Servicios from "./pages/servicios/Servicios";
import Blog from "./pages/blog/Blog";
import ScrollManager from "./components/ScrollManager";
import Equipo from "./pages/equipo/Equipo";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ScrollManager />
        <Navbar />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/equipo" element={<Equipo />} /> 

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
