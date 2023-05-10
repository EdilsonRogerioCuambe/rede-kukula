import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc } from 'firebase/firestore'; // Importando o addDoc, collection e doc do firebase/firestore para fazer a inserção de dados no banco de dados
import { db, storage } from '../../database/db'; // Importando o banco de dados o db vai ser usado para fazer a conexão com o banco de dados e o storage para fazer o upload da imagem
import { toast } from 'react-toastify'; // Importando o toastify para mostrar mensagens de erro ou sucesso
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para fazer a navegação entre as páginas
import ReactQuill from 'react-quill'; // Importando o react-quill para fazer o editor de texto
import 'react-quill/dist/quill.snow.css'; // Importando o css do react-quill
import { Loading } from '../../components'; // Importando o componente Loading
import { ref, getDownloadURL, uploadString } from 'firebase/storage'; // Importando o ref, getDownloadURL e uploadString do firebase/storage para fazer o upload da imagem
const AddNoticia = () => {

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const modules = { // Configurações do editor de texto
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['image']
    ]
  };

  const formats = [ // Configurações do editor de texto
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block'
  ];

  const navigate = useNavigate();

  const handleUpload = () => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imagem);
    fileReader.onload = (e) => {
      const dataURL = e.target.result;
      uploadString(ref(storage, `noticias/${imagem.name}`), dataURL, 'data_url')
        .then(uploadTaskSnapshot => {
          const uploadTask = uploadTaskSnapshot.task;
          uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast.info(`Progresso do upload: ${progress}%`, {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }, (error) => {
            console.log(error);
          }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImagem(downloadURL);
            });
          });
        });
    }
  }

  useEffect(() => {
    if (imagem) {
      const objectUrl = URL.createObjectURL(imagem);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreview(null);
  }, [imagem]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (titulo === '' || descricao === '' || imagem === null || conteudo === '') {
      toast.error('Preencha todos os campos!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    handleUpload();

    const noticia = {
      titulo,
      descricao,
      conteudo,
      imagem: imagem.name,
    }

    try {
      await addDoc(collection(db, 'noticias'), noticia);
      toast.success('Notícia adicionada com sucesso!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/');
    } catch (error) {
      toast.error('Erro ao adicionar notícia!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className='max-w-7xl py-20 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="mx-auto text-center my-2">
          <h1 className="text-4xl font-bold text-green-900">Adicionar Notícia</h1>
        </div>
        <div className="bg-white shadow-md rounded px-8 pb-8 mb-4 flex flex-col my-2">
          {
            preview ? (
              <img
                src={preview}
                alt="Imagem da notícia"
                className="rounded-md object-cover w-full h-64"
              />
            ) : (
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">Imagem</label>
            )
          }
          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  className="mt-1 focus:ring-green-700 focus:border-green-700 block w-full shadow-sm sm:text-sm rounded-md p-2 border-2 border-green-500"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                <input
                  type="text"
                  name="descricao"
                  id="descricao"
                  className="mt-1 focus:ring-green-700 focus:border-green-700 block w-full shadow-sm sm:text-sm rounded-md p-2 border-2 border-green-500"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">Imagem</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg cursor-pointer border-4 border-dashed w-full h-24 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                    <svg
                      className="w-10 h-10 text-green-500 group-hover:text-green-600"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v36m24-36v36M6 20h36M6 12h36m0 16H6"
                      />
                    </svg>
                    <p className="pointer-none text-sm text-gray-400 group-hover:text-green-600 pt-1 tracking-wider">
                      Arraste e solte uma imagem aqui ou clique para selecionar uma imagem
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setImagem(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="conteudo" className="block text-sm font-medium text-gray-700">Conteúdo</label>
              <ReactQuill
                theme="snow"
                value={conteudo}
                modules={modules}
                formats={formats}
                onChange={setConteudo}
                className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleSubmit}
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNoticia;