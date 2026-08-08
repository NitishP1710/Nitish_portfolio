import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import ParticleBackground from "./components/ParticleBackground";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col w-full">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </div>
      </main>
      
      <BackToTop />
    </ThemeProvider>
  )
}

export default App
