import React from "react";
import { inputStyles } from "../forms";

interface SelectionTabProps {
    option: string[];
    setSelectedOption: (option: string) => void;
}
const SelectionTab: React.FC<SelectionTabProps> = ({option, setSelectedOption}) => {

    const [isWhenToCollectInformation, setIsWhenToCollectInformation] = React.useState<string>(option[0]);

    const handleSelectedOption = (option: string) => {
        setIsWhenToCollectInformation(option);
        setSelectedOption(option);
    };

  return (
    <div className={inputStyles + ' flex justify-between gap-2 w-full'}>
        {option.map((option, index) => (
            <button 
                key={index} 
                type='button' 
                className={`border capitalize text-[14px] w-[calc(100%/3)] rounded-lg px-4 py-2 ${isWhenToCollectInformation === option ? 'bg-blue-600 border-blue-600 text-white' : 'bg-[#E7E7E7] text-gray-900 hover:bg-blue-400'} transition-colors`}
                onClick={() => handleSelectedOption(option)}
            >{option}</button>
        ))}
    </div>
  )
}

export default SelectionTab