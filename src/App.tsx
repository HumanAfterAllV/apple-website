import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Highlights from "./components/Highlights";

export default function App(): JSX.Element {
    return(
        <main className='bg-black'>
            <NavBar/>
            <Hero/>
            <Highlights/>
        </main>
    )
}