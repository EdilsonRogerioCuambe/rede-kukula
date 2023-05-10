import React, { useState, useEffect } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../../database/db';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  getStorage,
  ref,
} from '@firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { DownloadSimple, Eye } from 'phosphor-react';

const Docs = () => {

  const [docs, setDocs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docsCollection = query(collection(db, 'documentos'));
      const docsSnapshot = await getDocs(docsCollection);
      const docsList = docsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(docsList);
      setDocs(docsList);
    };

    fetchData();
  }, []);

  
  const handleEyeClick = (doc) => {
    setShowDetails(true);
  };

 
    const baixarPDF = async (doc) => {
      const input = document.getElementById('divToPrint');
      
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${doc.nome}.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
    };
  

  return (
    <>
    
    <div >
  <div class="flex flex-col max-width-7xl mt-16 items-center justify-center">
    <div class="overflow-x-auto lg:-mx-8">
      <div class="inline-block py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="w-full text-left text-sm font-light table align-middle mb-0 bg-white p-12 border-red-200 rounded-lg border-3 border-collapse py-16 border-spacing" cellpadding="8">
            <thead class=" font-extrabold dark:border-neutral-500 bg-light">
              <tr>
                <th scope="col" class="px-8 py-4 ">Foto</th>
                <th scope="col" class="px-6 py-4">Nome</th>
                <th scope="col" class="px-6 py-4">Numero BI</th>
                <th scope="col" class="px-6 py-4">Curso</th>
                <th scope="col" class="px-6 py-4">Província</th>
              </tr>
            </thead>
            {docs.map((doc) => (
              <tbody className='mt-12 '>
                <tr
                  class=" rounded-lg border-3 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-blue1 dark:hover:bg-green-300  dark:hover:text-white mt-8">
                  <td ><img src={doc.foto} alt="" class="w-10 h-10 ml-8 rounded-full items-center justify-center flex flex-col " /></td>
                  
                  <td class="whitespace-nowrap px-6 py-4 font-sans font-medium">{doc.nome}</td>
                  <td class=" font-medium whitespace-nowrap px-6 py-4 font-sans ">{doc.numeroBI}</td>
                  <td class="whitespace-nowrap px-6 py-4 font-sans font-medium">{doc.curso}</td>
                  <td class="whitespace-nowrap px-6 py-4 font-sans font-medium">{doc.provincia}</td>
                  <td className='flex flex-row gap-8 justify-center items-center py-4 font-sans font-mediu'>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Docs