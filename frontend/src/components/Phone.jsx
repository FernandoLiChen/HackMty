import { useState, useEffect } from "react";
import axios from "axios"; // Importar Axios para hacer peticiones HTTP
import phoneHand from "../assets/images/phoneHand1.png";
import banorteLogo from "../assets/images/logo.png";
import { TbHanger, TbSquareX, TbCircleLetterP } from "react-icons/tb";
import { useAuth0 } from "@auth0/auth0-react"; // Importar Auth0

const Phone = () => {
  const { user, isAuthenticated } = useAuth0(); // Obtener información del usuario autenticado
  const [isVisible, setIsVisible] = useState(false);
  const [activeDiv, setActiveDiv] = useState(null);
  const [bgColor, setBgColor] = useState('bg-slate-600'); // Initial background color
  const [borderColor, setBorderColor] = useState('border-slate-800'); // Initial border color
  const [points, setPoints] = useState(0); // Start with 0 points
  const [unlockedItems, setUnlockedItems] = useState({}); // Track unlocked items

  // Obtener los puntos del usuario al cargar el componente
  useEffect(() => {
    const fetchPoints = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get(`http://localhost:3001/api/user-points/${user.sub}`); // user.sub es el auth0UserId
          setPoints(response.data.points);
        } catch (error) {
          console.error('Error al obtener los puntos del usuario:', error);
        }
      }
    };

    fetchPoints();
  }, [isAuthenticated, user]);

  const moveTop = () => {
    setIsVisible(!isVisible);
  };

  const handleFirstButton = () => {
    setActiveDiv('first');
  };

  const handleSecondButton = () => {
    setActiveDiv('second');
  };

  const handleThirdButton = () => {
    setActiveDiv('third');
  };

  const changeBackground = (color) => {
    setBgColor(color); // Cambiar color de fondo
    const colorMap = {
      'bg-black': 'border-gray-600',
      'bg-green-500': 'border-green-700',
      'bg-orange-600': 'border-orange-800',
      'bg-blue-500': 'border-blue-700',
      'bg-yellow-500': 'border-yellow-600',
      'bg-red-500': 'border-red-700',
      'bg-gray-500': 'border-gray-700',
      'bg-purple-500': 'border-purple-700',
      'bg-amber-300': 'border-amber-500'
    };
    setBorderColor(colorMap[color] || 'border-slate-800'); // Color de borde basado en el fondo
  };

  const handleUnlock = (color) => {
    if (!unlockedItems[color] && points >= items.find(item => item.color === color).cost) {
      setUnlockedItems(prev => ({ ...prev, [color]: true }));
      changeBackground(color);
    }
  };

  const items = [
    { color: 'bg-black', cost: 10 },
    { color: 'bg-green-500', cost: 15 },
    { color: 'bg-orange-600', cost: 25 },
    { color: 'bg-blue-500', cost: 30 },
    { color: 'bg-yellow-500', cost: 35 },
    { color: 'bg-red-500', cost: 40 },
    { color: 'bg-gray-500', cost: 45 },
    { color: 'bg-purple-500', cost: 50 },
    { color: 'bg-amber-300', cost: 55 },
  ];

  return (
    <div className="">
      <div className="absolute bottom-0 right-0 p-8">
        <button onClick={moveTop}>
          <img src={phoneHand} className="z-10 h-16 w-16 lg:w-44 lg:h-44 transition-all hover:-translate-y-2 hover:scale-105 ease-in-out delay-100 duration-200 hover:-rotate-6" />
        </button>
      </div>
      {/* Verifica si el panel central es visible */}
      <div className={`fixed top-0 right-0 w-full h-screen transition-all ease-in-out ${isVisible ? "fixed top-0 duration-1000" : "fixed top-[100%] duration-1000"}`}>
        <div className="flex justify-center items-center">
          <div className={`absolute top-20 rounded-3xl h-3/5 w-2/4 lg:h-3/4 lg:w-1/5 ${bgColor} transition-transform transform duration-1000 ease-in-out`}>
            <div className={`absolute rounded-3xl left-[-11px] bottom-[-11px] bg-gray-200 h-full w-full ${borderColor} border-8`}>
              <div className="justify-center flex">
                <ul className="w-3/4 h-16 items-center top-2 flex flex-row justify-center p-6 gap-2 lg:gap-0 xl:gap-6 bg-black rounded-full my-4 pb-4">
                  <li>
                    <button className="text-white" onClick={handleThirdButton}>
                      <TbCircleLetterP className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-10 hover:scale-105 transition-all ease-in-out" />
                    </button>
                  </li>
                  <li>
                    <button className="text-white" onClick={handleSecondButton}>
                      <TbHanger className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-10 hover:scale-105 transition-all ease-in-out" />
                    </button>
                  </li>
                  <li>
                    <button className="text-white" onClick={moveTop}>
                      <TbSquareX className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 hover:scale-105 transition-all ease-in-out" />
                    </button>
                  </li>
                </ul>
              </div>
              {activeDiv === 'second' && (
                <div className="grid grid-cols-3 gap-6 p-4 h-2/3">
                  {items.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <button
                        onClick={() => handleUnlock(item.color)}
                        className={`rounded-xl h-full w-full ${item.color} ${points >= item.cost ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                        disabled={points < item.cost} // Deshabilitar si no tiene suficientes puntos
                      >
                      </button>
                      <div className="font-mono justify-center flex">
                        {unlockedItems[item.color] ? "Unlocked" : `Unlock at ${item.cost} points`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="left-1/4 bottom-4 absolute bg-black rounded-xl w-1/2 h-2">
              </div>
              {activeDiv === 'first' && (
                <div className="h-1/2 w-full flex flex-col justify-center">
                  <h1 className="flex justify-center items-center font-bold font-mono text-xl md:text-3xl pt-6">Bienvenido</h1>
                  <div className="flex justify-center items-center w-full h-1/2 p-8">
                    <img className="w-2/5 sm:1/4" src={banorteLogo} alt="Banorte Logo" />
                  </div>
                </div>
              )}
              {activeDiv === 'third' && (
                <div className="h-1/2 w-full flex justify-center">
                  <h1 className="flex justify-center items-center font-bold font-mono text-3xl">Points : {points}</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
