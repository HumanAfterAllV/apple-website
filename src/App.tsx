import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

export default function App(): JSX.Element {
    return(
        <main className='bg-black'>
            <NavBar/>
            <Hero/>
            <Highlights/>
            <Model/>
            <Features/>
            <HowItWorks/>
            <Footer/>
        </main>
    )
}