import {useState, useEffect} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import { FaWheelchair } from "react-icons/fa";
import { TbMapPin } from "react-icons/tb";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { GoLock } from "react-icons/go";
import LoginButton from "./components/loginButton";
import LogoutButton from "./components/logoutButton";
import Logo from "./assets/images/banorteee.png";
import { useAuth0 } from "@auth0/auth0-react";  // Importar useAuth0
import { useNavigate } from "react-router-dom";  // Importar useNavigate

const Landing = () => {
  const { isAuthenticated, isLoading } = useAuth0();  // Obtener el estado de autenticación
  const navigate = useNavigate();

  // Redirigir al dashboard si el usuario está autenticado
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Mostrar un mensaje de carga mientras se autentica el usuario
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <main>
      <div className={`fixed w-full top-0 transition-colors duration-300 z-50`}>
        <div id="container" className="flex justify-between items-center h-12 mx-auto py-8 bg-[url('./assets/images/banner.png')] text-white">
          <div id="img container" className="top h-22 md:pl-16">
            <img className="w-15 h-10" src={Logo} alt="Logo"/>
          </div>

          <div id="middleContainer" className="flex row items-center">
            <ul className="hidden md:flex font-sans gap-10 ">
              <a href="https://www.banorte.com/wps/portal/ixe/" target="_top"><li className="py-[1.45rem] uppercase text-xs font-medium">PREFERENTE</li></a>
              <a href="https://www.banorte.com/wps/portal/empresas/Home/circulo-pyme"><li className="py-[1.45rem] uppercase text-xs font-medium">PYMES</li></a>
              <a href="https://www.banorte.com/wps/portal/empresas/Home/empresas-corporativos/"><li className="py-[1.45rem] uppercase text-xs font-medium">EMPRESAS</li></a>
              <a href="https://www.banorte.com/wps/portal/empresas/Home/gobierno/"><li className="py-[1.45rem] uppercase text-xs font-medium">GOBIERNO</li></a>
              <a href="https://www.banorte.com/wps/portal/ixe-xima/"><li className="py-[1.45rem] uppercase text-xs font-medium">CASA DE BOLSA</li></a>
            </ul>
            <ul className="flex flex-row px-6 scale-125">
              <li><button className="px-1"><FaWheelchair /></button></li>
              <li><button className="px-1"><TbMapPin /></button></li>
              <li><button className="px-1"><HiMagnifyingGlassCircle /></button></li>
              <li><button className="px-1"><GoLock /></button></li>
            </ul>
          </div>
          <div className="md:hidden flex justify-around">
            <button onClick={handleMenu} className="md:hidden pr-4">
              {!isOpen ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}
            </button>
          </div>

          <div id="menu" className={!isOpen ? "fixed right-[-100%]" : "bg-slate-700 md:hidden fixed right-0 top-0 w-[60%] h-full border-r border-r-black ease-in-out duration-500"}>
            <div className="m-2"><img className="h-20" src={Logo} alt="Logo"/>
              <button onClick={handleMenu} className="md:hidden pr-4 ease-in-out transition-all">{!isOpen ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}</button>
            </div>

            <ul className="uppercase pt-4">
              <li className="p-4 border-b border-b-red-600"><a href="https://www.banorte.com/wps/portal/ixe/">PREFERENTE</a></li>
              <li className="p-4 border-b border-b-red-600"><a href="https://www.banorte.com/wps/portal/ixe-xima/">CASA DE BOLSA</a></li>
              <li className="p-4 border-b border-b-red-600"><a href="https://www.banorte.com/wps/portal/empresas/Home/empresas-corporativos/">EMPRESAS</a></li>
              <li className="p-4 border-b border-b-red-600"><a href="https://www.banorte.com/wps/portal/empresas/Home/circulo-pyme">CIRCULO PYME BANORTE</a></li>
              <li className="p-4 border-b border-b-red-600"><a href="https://www.banorte.com/wps/portal/gfb/">GRUPO FINANCIERO</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div id="hero-container" className="h-screen bg-[url('./assets/images/banortebanner.jpeg')] bg-cover">
        <div id="hero-container" className="h-screen lg:h-5/6 sm:bg-center lg:bg-cover lg:bg-top">
          <div id="text-container" className="h-5/6 md:grid md:max-w-screen px-4 py-24 mx-auto md:px-20 lg:gap-8 xl:gap-10 md:py-24 md:pt-32 2xl:py-44 xl:py-28 lg:py-20 lg:grid-cols-2 justify-items items-center">
            <div className="flex flex-col items-center justify-center ">
              <h1 className="sm:text-5xl max-w-screen  text-5xl font-bold tracking-tight leading-none md:text-5xl xl:text-7xl text-white"></h1>
            </div>

            <div className="flex flex-col items-center justify-center text-2xl p-10 pt-0">
              <h1 className="m-2 text-white font-mono w-full flex text-center items-center text-4xl font-bold">Unete a una experiencia Interactiva en BANORTE ACADEMY</h1>
              <div className="flex flex-row z-50">
                <div className="bg-red-600 text-white py-4 m-4 px-11 rounded-full hover:bg-red-700"><LoginButton /></div>
                <div className="bg-red-600 text-white py-4 m-4 px-11 rounded-full hover:bg-red-700"><LogoutButton /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className ="bg-red-600 absolute bottom-0 w-full text-white">
        <div className="gap-x-80">
          <div className= "flex flex-col">
            <ul className= "h-11 flex flex-row items-center justify-center text-gray-900 dark:text-white">
              <li className="md:me-6 py-[1.45rem] uppercase text-xs font-medium"><a href="https://www.banorte.com/wps/portal/gfb?uri=nm:oid:banorte-te-informa.terminos-legales">Terminos Legales</a></li>
              <li className="md:me-6 py-[1.45rem] uppercase text-xs font-medium"><a href="">|</a></li>
              <li className="md:me-6 py-[1.45rem] uppercase text-xs font-medium"><a href="https://www.banorte.com/wps/portal/gfb?uri=nm:oid:banorte-te-informa.aviso-de-privacidad">Aviso de Privacidad</a></li>
              <li className="md:me-6 py-[1.45rem] uppercase text-xs font-medium"><a href="">|</a></li>
              <li className="md:me-6 py-[1.45rem] uppercase text-xs font-medium"><a href="https://www.banorte.com/wps/portal/gfb?uri=nm:oid:banorte-te-informa.aviso-de-privacidad">Consulto los costos y las comisiones de nuestros productos</a></li>
            </ul>
            <div className="flex items-center justify-center mb-2 uppercase text-xs font-medium">2024 Grupo Financiero Banorte. Derechos Reservados</div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
