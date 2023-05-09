import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../../database/db';
import { ref, getDownloadURL } from 'firebase/storage';
import { Loading } from '../../components';
import { Link } from 'react-router-dom';


const Noticias = () => {

  const [listaNoticias, setListaNoticias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const newsCollection = await getDocs(collection(db, 'noticias')); // Pega todas as noticias do banco de dados
      const newsData = newsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Pega o ID e os dados de cada noticia
      const noticias = await Promise.all(newsData.map(async noticias => { // Pega a url da imagem de cada noticia
        const url = await getDownloadURL(ref(storage, `noticias/${noticias.imagem}`)); // Pega a url da imagem de cada noticia
        return { // Retorna um objeto com os dados da noticia e a url da imagem
          ...noticias,
          imagem: url,
        }
      }));
      setListaNoticias(noticias);
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="max-w-7xl py-20 mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {listaNoticias.map(noticias => (
          <Link to={`/noticia/${noticias.id}`} key={noticias.id}>
            <div key={noticias.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-500">
              <img
                src={noticias.imagem}
                alt={noticias.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{noticias.titulo}</h2>
                <p className="text-gray-500 mt-2">{noticias.descricao.substring(0, 100)}...</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Noticias;