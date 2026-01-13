import { useState } from 'react'
import Sidebar from "./components/Sidebar"

function App() {
  const [activePage,setActivePage] =useState('about')
  return (
  <main className="mx-3 md:mx-auto my-4 md:mt-16 mb-20 md:mb-24 min-w-64.75 lg:max-w-300 lg:flex lg:justify-center lg:items-stretch lg:gap-6">
      <Sidebar />

      <div className="relative w-full lg:min-w-[75%] lg:w-[75%] lg:mx-0">
        <Navbar activePage={activePage} setActivePage={setActivePage} />

        <div className="bg-eerie-black-2 border border-jet rounded-[20px] p-4 md:p-8 shadow-(--shadow-1) z-1 lg:min-h-full lg:shadow-(--shadow-5)">
          <About isActive={activePage === 'about'} />
          <Skills isActive={activePage === 'skills'} />
          <Projects isActive={activePage === 'projects'} />
          <Contact isActive={activePage === 'contact'} />
        </div>
      </div>
    </main>
  )
}

export default App
