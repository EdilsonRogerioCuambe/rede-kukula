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

          </form>
        </div>
      </div>
    </>
  )
}

export default Login