import { useState } from "react";
import phoneHand from "../assets/images/phoneHand1.png";
import { TbHanger } from "react-icons/tb";
import { TbSquareX } from "react-icons/tb";
import { TbCircleLetterP } from "react-icons/tb";

const Phone = () => {
  const [isVisible, setIsVisible] = useState(false);

  const moveTop = () => {
    setIsVisible(!isVisible);
  };
  

  return (
    <div className="">
      <div className="absolute bottom-0 right-0 p-8">
        <button onClick={moveTop}>
          <img src={phoneHand} className="z-10 w-44 h-44 transition-all hover:-translate-y-2 hover:scale-105 ease-in-out delay-100 duration-200 hover:-rotate-6"/>
        </button>
      </div>
      <div className={`-z-10 fixed top-0 right-0 w-full h-screen transition-all ease-in-out ${isVisible ? "fixed top-0 duration-700" : "fixed top-[100%] duration-700"}`}>
        <div className="flex justify-center items-center ">

        <div className={`top-20 absolute rounded-2xl h-3/4 w-1/4 bg-slate-600 transition-transform transform duration-1000 ease-in-out`}>
            <div className="absolute rounded-2xl left-[-8px] bottom-[-8px] h-full w-full bg-cyan-200 border-black border-8">
                <div className="">
                    <ul className="w-full items-center top-2 flex flex-row justify-end p-6 gap-6 bg-white rounded-full my-4">
                    <li><button><TbCircleLetterP className="w-16 h-16"/></button></li>
                    <li><button><TbHanger className="w-16 h-16"/></button></li>
                    <li><button><TbSquareX onClick={moveTop} className="w-14 h-14"/></button></li>
                    </ul>
                </div>
                <div className="grid grid-cols-3 gap-4 p-6 h-1/2">
                  <div className="">item</div>
                  <div>item</div>
                  <div>item</div>
                  <div>item</div>
                  <div>item</div>
                  <div>item</div>
                  <div>item</div>
                  <div>item</div>


                </div>   
                <div className="left-1/4 bottom-6 absolute bg-black rounded-xl w-1/2 h-2">
                </div> 
            </div>
        
        
      
    </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
