import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithGoogle } from '../../database/db';
import imagens from '../../assets';
import { Loading } from '../../components';
import { ArrowRight, GoogleLogo } from 'phosphor-react';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        progress: undefined
      });
      setLoading(false);
    };
  };

  if (loading) {
    return <Loading
      mensagem={'Carregando dados'}
    />
  }

  return (
    <>
      <div className="min-h-screen rounded-t-md flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
        <div className="max-w-sm w-full space-y-8 flex flex-col">
          <div>
            <img
              className="border-2 border-green-700 rounded-full h-40 w-40 mx-auto object-contain "
              src={imagens.logo}
              alt="Rede Kukula"
            />
          </div>
          <h2 className=" text-center text-2xl font-extrabold text-gray-900">Faça login na sua conta</h2>
          <form className=" space-y-6 " >
            <div className="rounded-lg shadow-sm flex flex-col gap-8">
              <div>
                <label htmlFor="email-address" className="">
                  Endereço de Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2  border-2 border-solid border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg rounded-b-lg focus:outline-none focus:ring-blue1 focus:border-blue1 focus:z-10 sm:text-sm"
                  placeholder="Endereço de Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border-2 border-solid border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg rounded-b-lg focus:outline-none focus:ring-blue1 focus:border-blue1 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative gap-2  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
              >
                Entrar com Google
                <GoogleLogo size={24} weight="bold" />
              </button>
            </div>

            <div className="text-sm flex items-center justify-between gap-8 mb-16">
              <a href="#hg" className="font-medium text-red-600 hover:text-red-500 mb-6 ">
                Esqueceu sua senha?
              </a>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-4 mb-4">

              <div className="text-sm">
                <a href="#gfh" className="font-medium text-red-600 hover:text-red-500">
                  Ja se conectou na rede?
                </a>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  class="inline-block rounded-t-lg rounded-b-lg bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black border  border-2 border-solid border-green-300 flex flex-row gap-2 justify-center items-center">

            <Link to='/Register'>
            Acesse
            </Link>
                
                  <ArrowRight size={24} weight="light" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login