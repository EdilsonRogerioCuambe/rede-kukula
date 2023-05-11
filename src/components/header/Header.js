import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {imagens} from '../../assets';
import Dropdown from './Dropdown';
import {
  auth,
  logout,
} from '../../database/db';
import { Loading } from '../../components';
import { SignOut } from 'phosphor-react';
import "./Header.css";



const Header = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
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

  if (loading) return (
    <Loading
      mensagem={'Carregando dados'}
    />
  );

  return (
    <>
      <div className="px-5 pt-5 max-w-9xl mx-auto">
        <div className="py-3 px-5 bg-white rounded shadow-md">
          <div className="-mx-1">
            <button
              className="lg:hidden flex items-center justify-between w-full px-2 py-2 text-sm font-medium leading-5 text-left text-gray-700 bg-white rounded-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-gray"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded="true"
            >
              <span className="flex items-center">
                <i className="mdi mdi-menu mr-2"></i>
                Menu
              </span>
              <i className="mdi mdi-chevron-down"></i>
            </button>

            <ul
              className={`${isOpen ? "block" : "hidden"
                } lg:flex lg:items-center lg:justify-between w-full`}
            >

              <li className="flex-1">
                <Link to="/">
                  <img
                    src={imagens.logo}
                    alt="Logo"
                    className="h-12"
                  />
                </Link>
              </li>


              <Dropdown
                text="Documentos"
                icon="mdi mdi-file-document-outline"
              >
                <li className="relative">
                  <Link
                    to="/documentos"
                    className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                  > <span className="flex-1">
                      Documentos
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to="/DocumentosporProvincia"
                    className="px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer"
                  > <span className="flex-1">
                      Documentos Por Província
                    </span>
                  </Link>
                </li>
              </Dropdown>
              {/* Adicione outros Dropdowns aqui */}
              <li className="flex-1">
                <Link
                  to="/noticias"
                  className='px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer'
                >
                  <span className="flex-1">
                    <i className="mdi mdi-newspaper"></i>
                    Notícias
                  </span>
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  to="/sobre"
                  className='px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer'
                >
                  <span className="flex-1">
                    <i className="mdi mdi-information-outline"></i>
                    Sobre
                  </span>
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  to="/contato"
                  className='px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer'
                >
                  <span className="flex-1">
                    <i className="mdi mdi-email-outline"></i>
                    Contato
                  </span>
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  to="/add-noticia"
                  className='px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer'
                >
                  <span className="flex-1">
                    <i className="mdi mdi-plus"></i>
                    Adicionar notícia
                  </span>
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  to="/add-doc"
                  className='px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer'
                >
                  <span className="flex-1">
                    <i className="mdi mdi-plus"></i>
                    Adicionar Doc
                  </span>
                </Link>
              </li>
              {
                user ? (
                  <>
                    <ul
                      className="flex items-center justify-between flex-1 lg:flex-none"
                    >
                      <Dropdown
                        text={user.displayName}
                        icon="mdi mdi-account-circle-outline"
                      >
                        <li className="relative flex flex-row">
                          <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="h-12 object-cover rounded-md"
                            onLoad={handleImageLoaded}
                            style={{ display: imageLoaded ? "block" : "none" }}
                          />
                          <button
                            className="justify-center items-center flex w-full py-2 text-sm font-medium leading-5 text-left text-gray-700 bg-white rounded-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                            onClick={() => {
                              logout();
                              navigate('/');
                            }}
                          >
                            <span className="flex-row flex">
                              <SignOut size={24} /> <span
                                className='px-5'
                              >Sair</span>
                            </span>
                          </button>
                        </li>
                      </Dropdown>
                    </ul>
                  </>
                ) : (
                  <>
                    <li className="flex-1">
                      <Link
                        to="/login"
                        className='px-4 py-2 flex w-full items-start hover:bg-gray-100 no-underline hover:no-underline transition-colors duration-100 cursor-pointer'
                      >
                        <span className="flex-1">
                          <i className="mdi mdi-login"></i>
                          Login
                        </span>
                      </Link>
                    </li>
                  </>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;