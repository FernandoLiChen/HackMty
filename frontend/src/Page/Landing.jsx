import {useState, useEffect} from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { BsTelephone } from "react-icons/bs";

const Landing = () => {
  const callButton = () => {
    window.location.href = 'tel:6699866471';
  };
  
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen(!isOpen)
  }

  const [isScrolled, setIsScrolled] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

    return (
      <nav className={`fixed w-full top-0 transition-colors duration-300 z-50 ${isScrolled || isOpen ? 'bg-white' : 'bg-transparent'}`}>
        <div id="container" className="flex justify-between border-b border-black items-center h-12 mx-auto px-8 py-8   text-black">
          <div id="img container" className="top  h-22 md:pl-16">
            <img className="w-20 h-[5.5rem] hover:scale-110 transition-transform ease-in-out" src="./images/logo1.png"></img>
      </div>

      <div id="middleContainer"className="">
      <ul className="hidden md:flex font-sans gap-10 ">
        <a href="#Inicio" target="_top"><li className="px-4 py-[1.45rem]  uppercase text-xs border-b-[3px] border-b-transparent transition ease-in-out delay-150 hover:border-b-black">Inicio</li></a>
        <a href="#Servicios"><li className=" px-4 py-[1.45rem] uppercase border-b-[3px] border-b-transparent hover:border-b-black text-xs transition ease-in-out delay-150">Servicios</li></a>
        <a href="#Contacto"><li className=" px-4 py-[1.45rem]  uppercase border-b-[3px] border-b-transparent hover:border-b-black text-xs transition ease-in-out delay-150">Contacto</li></a>
      </ul>
      </div>
      <div id="button-container" className="md:pr-16">
      <button className="" onClick={callButton}><div className="hidden md:flex hover:scale-110 transition-transform"><BsTelephone size={25} className=""/>
      </div></button>
      </div>
      <div className="md:hidden flex justify-around gap-16">
        <button onClick={callButton}><BsTelephone size={23} className=""/></button>
        <button onClick={handleMenu} className="md:hidden">
        {!isOpen ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}
        </button>
      </div>
      <div id="menu" className={!isOpen ? "fixed left-[-100%]" : "md:hidden fixed left-0 top-0 w-[60%] h-full border-r border-r-black bg-white ease-in-out duration-500"}>
        <div className="m-2"><img className="w-24 h-22" src="/sanfriLogo.png"></img>
        </div>

        <ul className="uppercase pt-4">
          <li className="p-4 border-b border-b-black"><a href="">INICIO</a></li>
          <li className="p-4 border-b border-b-black"><a href="">SERVICIOS</a></li>
          <li className="p-4 border-b border-b-black"><a href="">Contacto</a></li>
          
          
        </ul>
        
      </div>
    </div>
    </nav>
  )
}

export default Landing;