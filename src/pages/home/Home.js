import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { imagens } from '../../assets';
import {
  auth,
  db,
  storage,
} from '../../database/db';
import { Card, VideoCard, Footer } from '../../components';
import { getDocs, collection, } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { videos } from '../../assets';

const Home = () => {
  const navigate = useNavigate();
  const [listaNoticias, setListaNoticias] = useState([]);

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

  return (
    <>
      <div className='max-w-7xl py-2 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="mx-auto relative"> {/* Add relative positioning */}
          <img
            src={imagens.estudante}
            alt="Estudante"
            className="h-72 mt-4 w-full mx-auto rounded-lg shadow-md object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center"> {/* Add absolute positioning */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-green-900 uppercase bg-white bg-opacity-30 py-2 px-4 rounded">Associação KUKULA PABHODZI</h1>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-900 mt-8">Últimas notícias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {
            listaNoticias.map((noticia, index) => (
              <Link to={`/noticia/${noticia.id}`} key={noticia.id}>
                <Card
                  key={index}
                  titulo={noticia.titulo}
                  imagem={noticia.imagem}
                  descricao={noticia.descricao.substring(0, 100) + '...'}
                  link={`/noticia/${noticia.id}`}
                />
              </Link>
            ))
          }
        </div>
        <h2 className="text-2xl font-bold text-green-900 mt-8">Depoimentos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8 mt-8 sm:justify-center">
          <VideoCard titulo="Depoimento 1" src={videos.damasco} />
          <VideoCard titulo="Depoimento 2" src={videos.isia} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;