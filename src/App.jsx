import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";

export default function App() {
  return (
    <main className="bg-black">
        <Navbar />
        <Hero />
        <Highlights />
        <Model />
    </main>
  )
}

