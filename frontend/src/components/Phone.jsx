import { useState } from "react";
import phoneHand from "../assets/images/phoneHand1.png";
import { TbHanger } from "react-icons/tb";
import { TbSquareX } from "react-icons/tb";
import { TbCircleLetterP } from "react-icons/tb";

const Phone = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [activeDiv, setActiveDiv] = useState(null);
  const [bgColor, setBgColor] = useState('bg-slate-600'); // Initial background color

  const moveTop = () => {
    setIsVisible(!isVisible);
  };

  const unHide = () => {
    setIsHidden(!isHidden);
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
    setBgColor(color); // Set background color to the passed color
  };

  return (
    <div className="">
      <div className="absolute bottom-0 right-0 p-8">
        <button onClick={() => {
          moveTop();
          handleFirstButton();
        }}>
          <img src={phoneHand} className="z-10 w-44 h-44 transition-all hover:-translate-y-2 hover:scale-105 ease-in-out delay-100 duration-200 hover:-rotate-6"/>
        </button>
      </div>
      <div className={`z-10 fixed top-0 right-0 w-full h-screen transition-all ease-in-out ${isVisible ? "fixed top-0 duration-1000" : "fixed top-[100%] duration-1000"}`}>
        <div className="flex justify-center items-center ">

        <div className={`top-20 absolute rounded-3xl xl h-3/4 w-1/4 ${bgColor} transition-transform transform duration-1000 ease-in-out`}>
            <div className="absolute rounded-3xl left-[-9px] bottom-[-9px] h-full w-full bg-cyan-100 border-black border-8">
                <div className="justify-center flex">
                    <ul className="w-3/4 h-20 items-center top-2 flex flex-row justify-center p-6 gap-6 bg-white rounded-full my-4">
                    <li><button onClick={handleThirdButton}><TbCircleLetterP className="w-16 h-16 hover:scale-105 transition-all ease-in-out"/></button></li>
                    <li><button onClick={handleSecondButton}><TbHanger className="w-16 h-16 hover:scale-105 transition-all ease-in-out"/></button></li>
                    <li><button onClick={handleFirstButton}><TbSquareX onClick={moveTop} className="w-14 h-14 hover:scale-105 transition-all ease-in-out"/></button></li>
                    </ul>
                </div>
                {activeDiv === 'second' && (
                <div className="grid grid-cols-3 gap-6 p-4 h-2/3">
                  <button onClick={() => changeBackground('bg-black')} className="rounded-xl h-full w-full bg-black"></button>
                  <button onClick={() => changeBackground('bg-green-500')} className="rounded-xl h-full w-full bg-green-500"></button>
                  <button onClick={() => changeBackground('bg-orange-600')} className="rounded-xl h-full w-full bg-orange-600"></button>
                  <button onClick={() => changeBackground('bg-blue-500')} className="rounded-xl h-full w-full bg-blue-500"></button>
                  <button onClick={() => changeBackground('bg-yellow-500')} className="rounded-xl h-full w-full bg-yellow-500"></button>
                  <button onClick={() => changeBackground('bg-red-500')} className="rounded-xl h-full w-full bg-red-500"></button>
                  <button onClick={() => changeBackground('bg-gray-500')} className="rounded-xl h-full w-full bg-gray-500"></button>
                  <button onClick={() => changeBackground('bg-purple-500')} className="rounded-xl h-full w-full bg-purple-500"></button>
                  <button onClick={() => changeBackground('bg-white')} className="rounded-xl h-full w-full bg-white border-2"></button>
                </div>
                )}
                <div className="left-1/4 bottom-4 absolute bg-black rounded-xl w-1/2 h-2">
                </div> 
                {activeDiv === 'first' && (
                <div className="h-1/2 w-full flex justify-center">
                    <h1 className="flex justify-center items-center font-bold font-mono text-3xl ">Bienvenido</h1>
                </div>
                )}
                {activeDiv === 'third' && (
                <div className="h-1/2 w-full flex justify-center">
                <h1 className="flex justify-center items-center font-bold font-mono text-3xl ">Points Counter Here</h1>
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
