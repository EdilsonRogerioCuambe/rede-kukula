import React, { useState, useEffect } from 'react';
import { Fragment } from 'react'

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import imagens from '../../assets';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  auth,
  db,
  storage,
  signInWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  resetPassword,
  logout,
} from '../../database/db';
import { Loading } from '../../components';
import { SignOut } from 'phosphor-react';


const Header = () => {

  const usuario = auth.currentUser;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('/');
  const [isOpen, setIsOpen] = useState(false); // Add this line
  const [user, setUser] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSetLink = (link) => {
    setActive(link);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // Add this function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return (
    <Loading
      mensagem={'Carregando dados'}
    />
  );
  return (
    <>
      <nav className='flex justify-between items-center h-16 bg-white text-black shadow-sm font-mono fixed w-full z-10 top-0' role='navigation'>

        <Link to='/'
          className='pl-8'
          onClick={() => handleSetLink('/')}
        >
          <img
            className='border-2 border-green-600 rounded-full h-12 w-12 mx-auto object-contain mr-2'
            src={imagens.logo}
            alt='Logo da Rede Kukula'
          />
        </Link>
        <div className='px-4 cursor-pointer md:hidden' onClick={toggleMenu}>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </div>
        <div className={`pr-8 md:block ${isOpen ? 'block' : 'hidden'}`}>
          <Link
            to='/'
            className={`p-2 border-b-2 ${active === '/' ? 'border-green-500' : 'border-transparent' // Step 3
              } hover:border-green-500`}
            onClick={() => handleSetLink('/')}
          >
            Início
          </Link>
          <Link
            to='/sobre'
            className={`p-2 border-b-2 ${active === '/sobre' ? 'border-green-500' : 'border-transparent' // Step 3
              } hover:border-green-500`}
            onClick={() => handleSetLink('/sobre')}
          >
            Sobre nós
          </Link>
          <Link
            to='/noticias'
            className={`py-2 px-4 border-b-2 ${active === '/noticias' ? 'border-green-500' : 'border-transparent' // Step 3
              } hover:border-green-500`}
            onClick={() => handleSetLink('/noticias')}
          >
            Noticias
          </Link>




          {user ? (
            <>
              <Menu as="div" className={`p-2 border-b-2 ${active === '/documentos' ? 'border-green-500' : 'border-transparent' // Step 3
                } hover:border-green-500 relative inline-block text-left`}>
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-0.5 rounded-md bg-white text-sm font-semibold text-gray-900 ">
                    Documentos
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"

                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}

                          >
                            Documentos
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/DocumentosporProvincia"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Documentacao por provincia
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item onClick={() => handleSetLink('/documentos')}>
                        {({ active }) => (
                          <a
                            href="/documentos"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            ver todos Documentos
                          </a>
                        )}
                      </Menu.Item>

                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Link
                to='/add-noticia'
                className={`p-2 border-b-2 ${active === '/add-noticia' ? 'border-green-500' : 'border-transparent' // Step 3
                  } hover:border-green-500`}
                onClick={() => handleSetLink('/add-noticia')}
              >
                Adicionar Noticia
              </Link>
              <Link
                to='/add-doc'
                className={`py-2  px-4 border-b-2 ${active === '/add-doc' ? 'border-green-500' : 'border-transparent' // Step 3
                  } hover:border-green-500`}
                onClick={() => handleSetLink('/add-doc')}
              >
                Add Documentos
              </Link>
            </>
          ) : (
            null
          )}
          <Link
            to='/contato'
            className={`py-2 px-4 border-b-2 ${active === '/contato' ? 'border-green-500' : 'border-transparent' // Step 3
              } hover:border-green-500`}
            onClick={() => handleSetLink('/contato')}
          >
            Contacto
          </Link>
        </div>
        {
          user ? (
            <div className={`pr-8 md:block ${isOpen ? 'block' : 'hidden'}`}>
              <ul className='flex items-center'>
                <li className='p-4'>
                  <Link to='/perfil'>
                    <img
                      className='border-2 border-green-600 rounded-full h-12 w-12 mx-auto object-contain mr-2'
                      src={usuario ? usuario.photoURL : "https://i.imgur.com/6VBx3io.png"}
                      alt={usuario ? usuario.displayName : "Usuário"}
                      onLoad={handleImageLoaded}
                      style={imageLoaded ? {} : { display: 'none' }}
                    />
                  </Link>
                </li>
                <li className='p-4'>
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-row gap-2 justify-center items-center'
                  >
                    Sair
                    <SignOut size={24} weight="bold" />
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className={`pr-8 md:block ${isOpen ? 'block' : 'hidden'}`}>
              <ul className='flex items-center'>
                <li className='p-4'>
                  <Link to='/login'>
                    <button
                      className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex flex-row gap-2 justify-center items-center'
                    >
                      Entrar
                    </button>
                  </Link>
                </li>
                <li className='p-4'>
                  <Link to='/cadastro'>
                    <button
                      className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex flex-row gap-2 justify-center items-center'
                    >
                      Cadastrar
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          )
        }
      </nav>
    </>
  )
}

export default Header;