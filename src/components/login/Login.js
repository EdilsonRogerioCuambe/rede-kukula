import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithGoogle } from '../../database/db';
import imagens from '../../assets';
import { Loading } from '../../components';
import { ArrowRight, FacebookLogo, GoogleLogo } from 'phosphor-react';

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

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
  <img class="h-16 w-auto mx-auto mb-4" src={imagens.Imagme5} alt="Logo" />
    <div class="text-center">
      <img class="h-16 w-auto mx-auto mb-4" src={imagens.logo} alt="Logo" />
      <h2 class="text-2xl font-extrabold text-gray-900">Faça login na sua conta e conecte-se à rede</h2>
    </div>
    <div class="mt-8">
      <div class="mb-4">
        <button class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-green-500 hover:bg-green-600 text-white">
          <GoogleLogo size={24} weight="bold" />
          <span>Entrar com Google</span>
        </button>
      </div>
      <div class="mb-4">
        <button class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
          <FacebookLogo size={24} weight="bold" />
          <span>Entrar com Facebook</span>
        </button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Login