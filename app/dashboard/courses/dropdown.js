
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck
} from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({title, options ,filters,setFilters}) => {
    const buttonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    

    const handleOptionClick = (option) => {
        if (filters.includes(option)) {
            let newFilters = filters.filter((filter) => filter !== option);
            setFilters(newFilters);
           
        } 
        else{
            setFilters([...filters, option]);
        } 
        
    };

    return (
        <div className="dropdown">
            <button
                className="dropbtn"
                onClick={toggleDropdown}
                ref={buttonRef} // Attach ref to the button
            >
                {title}
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {options.map((option, index) => (
                        <div
                        onClick={() => handleOptionClick(option)}
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1em'
                            }}
                        >
                            <a
                                style={{ margin: 0, padding: 0, paddingRight: '1em' }}
                            >
                                {option}
                            </a>
                            <FontAwesomeIcon
                                icon={faCheck}
                                style={{
                                    color: 'var(--darkGrey)',
                                    display: filters.includes(option) ? '' : 'none'
                                }}
                                className="fa-xl m-0 p-0"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Dropdown;