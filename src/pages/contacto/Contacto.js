import React from 'react';
import { Link } from 'react-router-dom';

const Contacto = () => {
  return (
    <>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-green-900 sm:text-4xl">
              Contacto
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Para mais informações, por favor contacte-nos através do email:
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              <Link to="mailto:edilson@aluno.unilab.edu.br" className='text-green-600 hover:text-green-900'>
                edilson@aluno.unilab.edu.br
              </Link>
            </p>
            <p className="max-w-2xl text-xl text-gray-500 lg:mx-auto">
              ou através do número:
            </p>
            <p>
              <Link to="tel:+258 84 000 000" className='text-green-600 text-xl mt-4 hover:text-green-900 max-w-2xl lg:mx-auto'>
                +258 84 000 000
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacto;