import React, { useState } from 'react';

const Dropdown = ({ children, text, icon }) => {
  
  const [showChildren, setShowChildren] = useState(false);

  return (
    <>
      <li className="block relative">
        <a href="#" className="flex items-center h-10 leading-10 px-4 rounded cursor-pointer no-underline hover:no-underline transition-colors duration-100 mx-1 hover:bg-gray-100" onClick={(e) => { e.preventDefault(); setShowChildren(!showChildren) }}>
          <span className="mr-3 text-xl"> <i className={icon}></i> </span>
          <span>{text}</span>
          <span className="ml-2"> <i className="mdi mdi-chevron-down"></i> </span>
        </a>
        {showChildren && (
          <div className="bg-white shadow-md rounded border border-gray-300 text-sm absolute top-auto left-0 min-w-full w-56 z-30 mt-1">
            <span className="absolute top-0 left-0 w-3 h-3 bg-white border transform rotate-45 -mt-1 ml-6"></span>
            <div className="bg-white rounded w-full relative z-10 py-1">
              <ul className="list-reset">
                {children}
              </ul>
            </div>
          </div>
        )}
      </li>
    </>
  )
}

export default Dropdown;