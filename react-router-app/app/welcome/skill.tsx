import { FaReact } from "react-icons/fa";
import { FaAws } from "react-icons/fa";

export default function Skill() {
    return (
        <div className="mt-5">
          <h1 className="text-4xl font-bold">Skill</h1>
          <div className="flex flex-row items-center justify-between text-xl">
            <h1>React</h1><FaReact />
          </div>
          <div className="flex flex-row items-center justify-between text-xl">
            <h1>AWS</h1><FaAws />
          </div>
        </div>
    );
  } 
  