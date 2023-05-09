import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore'; // Importando o addDoc, collection e doc do firebase/firestore para fazer a inserção de dados no banco de dados
import { db, storage } from '../../database/db'; // Importando o banco de dados o db vai ser usado para fazer a conexão com o banco de dados e o storage para fazer o upload da imagem
import { toast } from 'react-toastify'; // Importando o toastify para mostrar mensagens de erro ou sucesso
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate para fazer a navegação entre as páginas
import { ref, getDownloadURL, uploadString } from 'firebase/storage'; // Importando o ref, getDownloadURL e uploadString do firebase/storage para fazer o upload da imagem

function AddDoc() {

  const [certificado12, setCertificado12] = useState(null);
  const [declaracao, setDeclaracao] = useState(null);
  const [certificado10, setCertificado10] = useState(null);
  const [certificadoInstituto, setCertificadoInstituto] = useState(null);
  const [fotoBI, setFotoBI] = useState(null);
  const [curso, setCurso] = useState('');
  const [segundaOpcao, setSegundaOpcao] = useState('');
  const [provincia, setProvincia] = useState('');
  const [email, setEmail] = useState('');
  const [contato, setContato] = useState('');
  const [estado, setEstado] = useState('');
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState(null);
  const [numeroBI, setNumeroBI] = useState('');
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const convertFileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (certificado12 && declaracao && certificado10 && fotoBI && curso && certificadoInstituto && segundaOpcao && contato && nome && foto && numeroBI && provincia && email &&  estado) {
      setLoading(true);
      const certificado12Ref = ref(storage, `certificado12/${certificado12.name}`);
      const declaracaoRef = ref(storage, `declaracao/${declaracao.name}`);
      const certificado10Ref = ref(storage, `certificado10/${certificado10.name}`);
      const certificadoInstitutoRef = ref(storage, `certificadoInstituto/${certificadoInstituto.name}`);
      const fotoBIRef = ref(storage, `fotoBI/${fotoBI.name}`);
      const fotoRef = ref(storage, `foto/${foto.name}`);

      const certificado12DataURL = await convertFileToDataURL(certificado12);
      const declaracaoDataURL = await convertFileToDataURL(declaracao);
      const certificado10DataURL = await convertFileToDataURL(certificado10);
      const certificadoInstitutoDataURL = await convertFileToDataURL(certificadoInstituto);
      const fotoBIDataURL = await convertFileToDataURL(fotoBI);
      const fotoDataURL = await convertFileToDataURL(foto);

      const certificado12Upload = await uploadString(certificado12Ref, certificado12DataURL, 'data_url');
      const declaracaoUpload = await uploadString(declaracaoRef, declaracaoDataURL, 'data_url');
      const certificado10Upload = await uploadString(certificado10Ref, certificado10DataURL, 'data_url');
      const certificadoInstitutoUpload = await uploadString(certificadoInstitutoRef, certificadoInstitutoDataURL, 'data_url');
      const fotoBIUpload = await uploadString(fotoBIRef, fotoBIDataURL, 'data_url');
      const fotoUpload = await uploadString(fotoRef, fotoDataURL, 'data_url');

      if (certificado12Upload && declaracaoUpload && certificado10Upload && fotoBIUpload && fotoUpload) {
        const certificado12Url = await getDownloadURL(certificado12Ref);
        const declaracaoUrl = await getDownloadURL(declaracaoRef);
        const certificado10Url = await getDownloadURL(certificado10Ref);
        const certificadoInstitutoUrl = await getDownloadURL(certificadoInstitutoRef);
        const fotoBIUrl = await getDownloadURL(fotoBIRef);
        const fotoUrl = await getDownloadURL(fotoRef);

        await addDoc(collection(db, 'documentos'), {
          certificado12: certificado12Url,
          declaracao: declaracaoUrl,
          certificado10: certificado10Url,
          certificadoInstituto: certificadoInstitutoUrl,
          fotoBI: fotoBIUrl,
          curso,
          segundaOpcao,
          contato,
          nome,
          foto: fotoUrl,
          numeroBI,
          provincia,
          email,
          estado
        });
        setLoading(false);
        toast.success('Documento adicionado com sucesso!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/documentos');
      } else {
        setLoading(false);
        toast.error('Erro ao adicionar documento!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('Preencha todos os campos!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (foto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(foto);
    } else {
      setPreview(null);
    }
  }, [foto]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue1-50 py-12 px-4 sm:px-6 lg:px-8 border-2">
        <div className="max-w-md w-full space-y-8 border-2 border-blue1 rounded-t-lg rounded-b-lg shadow-sm shadow-blue1 mt-6 ">
          <div>
            <h2 className="mt-6 text-center text-xl font-medium text-green-900">
              Submeter Documentação de Candidatura
            </h2>
          </div>
          <form className="mt-4 space-y-4 px-6 ">
            <div className="rounded-md  -space-y-px flex flex-col gap-4">
              <div>
                <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="nome"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="appearance-none my-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-900 focus:border-green-900 focus:z-10 focus-ring-8 sm:text-sm"
                  placeholder="Nome"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="numeroBI" className="text-sm font-medium text-gray-700">
                  Número do BI
                </label>
                <input
                  id="numeroBI"
                  name="numeroBI"
                  type="text"
                  autoComplete="numeroBI"
                  required
                  value={numeroBI}
                  onChange={(e) => setNumeroBI(e.target.value)}
                  className="appearance-none my-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-900 focus:border-green-900 focus:z-10 sm:text-sm"
                  placeholder="Número do BI"
                />
              </div>
              <div>
                <label htmlFor="curso" className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Curso
                </label>
                <div class="relative">
                <select
                  className="appearance-none relative my-2 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-900 focus:border-green-900 focus:z-10 sm:text-sm"
                  id="curso"
                  autoComplete="curso"
                  required
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  placeholder="Primeira Opção"
                >
                  
                  <option className=' text-gray-700'>Curso</option>
                  <option>Administração Publica</option>
                  <option>Humanidades</option>
                  <option>Engenharia de Alimentos</option>
                  <option>Engenharia da Computação </option>
                  <option>Química</option>
                  <option>Engenharia de Alimentos</option>
                  <option>Física</option>
                  <option>Agronomia</option>
                  <option>Enfermagem</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                  </div>
              </div>

              <div>
                <label htmlFor="segundaOpcao" className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Segunda Opção
                </label>
                <div class="relative">
                <select
                  
                  id="segundaOpcao"
                  name="segundaOpcao"
                  type="text"
                  autoComplete="segundaOpcao"
                  required
                  value={segundaOpcao}
                  onChange={(e) => setSegundaOpcao(e.target.value)}
                  className="appearance-none my-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-900 focus:border-green-900 focus:z-10 sm:text-sm"
                  placeholder="Segunda Opção"
                >
                  
                  <option className=' text-gray-700  border-gray-300 placeholder-gray-500 '>Segunda Opcao</option>
                  <option>Administração Publica</option>
                  <option>Humanidades</option>
                  <option>Engenharia de Alimentos</option>
                  <option>Engenharia da Computação </option>
                  <option>Química</option>
                  <option>Engenharia de Alimentos</option>
                  <option>Física</option>
                  <option>Agronomia</option>
                  <option>Enfermagem</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                  </div>
              </div>

              <div>
                <label htmlFor="segundaOpcao" className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Estado
                </label>
                <div class="relative">
                <select
                  
                  id="estado"
                  name="estado"
                  type="text"
                  autoComplete="segundaOpcao"
                  required
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="appearance-none my-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-900 focus:border-green-900 focus:z-10 sm:text-sm"
                  placeholder="Estado Pretendido"
                >
                  
                  <option className=' text-gray-700  border-gray-300 placeholder-gray-500 '>Estado</option>
                  <option>Ceara</option>
                  <option>Bahia</option>
                  
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                  </div>
              </div>
          
              <div >
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="Provincia">
                  Provincia
                </label>
                <div class="relative">
                  <select className="appearance-none relative my-2 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-900 focus:border-green-900 focus:z-10 sm:text-sm"
                  id="Provincia"
                  autoComplete="curso"
                  required
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}>
                    <option>Provincia</option>
                    <option>Maputo</option>
                    <option>Imhambane</option>
                    <option>Gaza</option>
                    <option>Manica</option>
                    <option>Sofala</option>
                    <option>Zambezia</option>
                    <option>Niassa</option>
                    <option>Tete</option>
                    <option>Cabo Delgado</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="contato"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-900 focus:border-green-900 focus:z-10 sm:text-sm"
                  placeholder="ensira o seu email"
                />
              </div>

              <div>
                <label htmlFor="contato" className="text-sm font-medium text-gray-700">
                  Contato
                </label>
                <input
                  id="contato"
                  name="contato"
                  type="text"
                  autoComplete="contato"
                  required
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-900 focus:border-green-900 focus:z-10 sm:text-sm"
                  placeholder="Contato"
                />
              </div>
              <div>
                <label htmlFor="certificado12" className="text-sm font-medium text-gray-700">
                  Certificado 12ª Classe
                </label>
                <input
                  id="certificado12"
                  name="certificado12"
                  type="file"
                  autoComplete="certificado12"
                  required
                  onChange={(e) => setCertificado12(e.target.files[0])}
                  className="relative m-0 my-2 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Certificado 12º Ano"
                />
              </div>
              <div>
                <label htmlFor="declaracao" className="text-sm font-medium text-gray-700">
                  Declaração 11ª Classe
                </label>
                <input
                  id="declaracao"
                  name="declaracao"
                  type="file"
                  autoComplete="declaracao"
                  required
                  onChange={(e) => setDeclaracao(e.target.files[0])}
                  className="relative m-0 my-2 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Declaração"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="certificado10" className="text-sm font-medium text-gray-700">
                  Certificado 10ª Classe
                </label>
                <input
                  className="relative my-2 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  type="file"
                  id="formFile"
                  name="certificado10"
                  onChange={(e) => setCertificado10(e.target.files[0])}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="CertificadoInstituto" className="text-sm font-medium text-gray-700">
                  Certificado do Instituto
                </label>
                <input
                  className="relative my-2 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  type="file"
                  id="formFile"
                  name="CertificadoInstituto"
                  onChange={(e) => setCertificadoInstituto(e.target.files[0])}
                />
              </div>

              <div>
                <label htmlFor="foto" className="text-sm font-medium text-gray-700">
                  Foto
                </label>
                <input
                  id="foto"
                  name="foto"
                  type="file"
                  autoComplete="foto"
                  required
                  onChange={(e) => setFoto(e.target.files[0])}
                  className="relative my-2 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Foto"
                />
              </div>
              <div>
                <label htmlFor="fotoBI" className="text-sm font-medium text-gray-700">
                  Foto BI
                </label>
                <input
                  id="fotoBI"
                  name="fotoBI"
                  type="file"
                  autoComplete="fotoBI"
                  required
                  onChange={(e) => setFotoBI(e.target.files[0])}
                  className="relative my-2 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Foto BI"
                />
              </div>
            </div>
          </form>
          <div className=" px-6 py-6 text-center sm:px-6">
            <button
              type="submit"
              className="appearance-none relative block w-full px-3 py-2 border text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDoc;