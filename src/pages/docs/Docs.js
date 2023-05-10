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
      <div class="max-w-6xl mx-auto mt-18 px-4 sm:px-6 lg:px-8 rounded-sm">
        <table class="w-full divide-y divide-gray-200 table-fixed ">
          <thead class="bg-gray-700 text-white ">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium w-1/4">Foto</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium w-1/4">Nome</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium w-1/4">Numero BI</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium w-1/4">Curso</th>
              <th scope="col" class="px-6 py-4 text-left text-sm font-medium w-1/4">Província</th>
            </tr>
          </thead>
          {docs.map((doc) => (
            <tbody class="divide-y divide-gray-200">
              <tr class="bg-gray-100 rounded-md hover:bg-green-400 transition">
                <td class="px-6 py-4">
                  <img src={doc.foto} alt="" class="w-10 h-10 ml-8 rounded-full items-center justify-center flex flex-col" />
                </td>
                <td class="px-6 py-4 text-left text-sm font-medium w-1/4">{doc.nome}</td>
                <td class="px-6 py-4 text-left text-sm font-medium w-1/4">{doc.numeroBI}</td>
                <td class="px-6 py-4 text-left text-sm font-medium w-1/4">{doc.curso}</td>
                <td class="px-6 py-4 text-left text-sm font-medium w-1/4">{doc.provincia}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  )
}

export default Docs