import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../../database/db';
import { collection, getDocs, query, orderBy, onSnapshot, doc, addDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useParams, useNavigate } from 'react-router-dom';
import { Loading } from '../../components';

const Noticia = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [comentar, setComentar] = useState("");

  const [noticia, setNoticia] = useState({});

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsRef = collection(db, 'noticias', id, 'comentarios');
    const commentsQuery = query(commentsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(commentsData);
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const fetchNews = async () => {
      const noticiaDoc = await getDoc(doc(db, 'noticias', id));
      const noticiaData = noticiaDoc.data();
      const url = await getDownloadURL(ref(storage, `noticias/${noticiaData.imagem}`));
      setNoticia({
        ...noticiaData,
        imagem: url,
      });
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comentar) return;

    try {
      const commentData = {
        content: comentar,
        userId: user.uid,
        userName: user.displayName,
        createdAt: new Date(),
        userPhoto: user.photoURL,
      };

      await addDoc(collection(db, 'noticias', id, 'comentarios'), commentData);
      setComentar('');
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  if (!noticia) {
    return <Loading />
  }

  return (
    <>
      <div className="max-w-7xl py-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-2">
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="w-full object-cover h-92"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{noticia.titulo}</h2>
            <p className="text-gray-500 mt-2">{noticia.descricao}</p>
            <p dangerouslySetInnerHTML={{ __html: noticia.conteudo }} className='mt-4 text-gray-700'></p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">Comentários</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">Nenhum comentário encontrado.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {comments.map((comment) => (
                <li key={comment.id} className="py-4 px-4 bg-white rounded-lg shadow-md overflow-hidden mt-2">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full mr-4"
                      src={comment.userPhoto}
                      alt={comment.userName}
                    />
                    <div className="text-sm">

                      <p className="font-medium text-gray-900">{comment.userName}</p>
                      <p className="text-gray-500">{comment.createdAt.toDate().toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{comment.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {user ? (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Adicionar comentário</h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded-md"
                placeholder="Escreva seu comentário aqui..."
                value={comentar}
                onChange={(e) => setComentar(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Enviar comentário
              </button>
            </form>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">Faça login para comentar nesta notícia.</p>
        )}
      </div>
    </>
  )
}

export default Noticia;