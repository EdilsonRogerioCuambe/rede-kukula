import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="bg-gray-100 text-gray-900 text-center py-5 border-t border-gray-300 shadow relative bottom-0 w-full z-10">
        <p className="text-sm leading-6">
          Desenvolvido por{' '}
          <a
            href="https://www.linkedin.com/in/eduardo-ferreira-7b1b3b1b3/"
            target="_blank"
            rel="noreferrer"
            className="text-green-500 hover:text-green-700"
          >
            Edilson Cuambe
          </a>{' '}
          &{' '}
          <a
            href="https://www.linkedin.com/in/eduardo-ferreira-7b1b3b1b3/"
            target="_blank"
            rel="noreferrer"
            className="text-green-500 hover:text-green-700"
          >
            Elencio Calado
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;