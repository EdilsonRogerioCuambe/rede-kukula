import DataTable from "react-data-table-component";
import React, { useState, useEffect } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../../database/db';



const DocsProvincia = () => {

  const [docs, setDocs] = useState([]);
  const [filter, setFilter] = useState([]);
  const [docsList, setDocsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docsCollection = query(collection(db, 'documentos'));
      const docsSnapshot = await getDocs(docsCollection);
      const fetchedDocsList = docsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(fetchedDocsList);
      setDocsList(fetchedDocsList);
      setDocs(fetchedDocsList);
      setFilter(fetchedDocsList);
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: 'Nome',
      selector: 'nome',
      sortable: true,
    },
    {
      name: 'Província',
      selector: 'provincia',
      sortable: true,
    },
    {
      name: 'Curso',
      selector: 'curso',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
  ];

  const tableStyle = {
    headRow: {
      style: {
        borderRadius: '5px',
        overflowX: 'auto',
        padding: '20px',
        maxHeight: '500px',
      }
    },
    headCells: {
      style: {
        fontsize: '32px',
        fontWeight: '600',
        textTransform: 'uppercase'
      }
    },

    cells: {
      style: {
        fontsize: '32px',
        padding: '12px'
      }
    }




  }

  const handleFilter = (event) => {
    const newData = docsList.filter(
      (row) =>
        (row.nome ? row.nome.toLowerCase().includes(event.target.value.toLowerCase()) : false) ||
        (row.provincia ? row.provincia.toLowerCase().includes(event.target.value.toLowerCase()) : false) ||
        (row.curso ? row.curso.toLowerCase().includes(event.target.value.toLowerCase()) : false) ||
        (row.email ? row.email.toLowerCase().includes(event.target.value.toLowerCase()) : false)
    );
    setDocs(event.target.value ? newData : docsList);
  };

  return (
    <div style={{ padding: '50px 10%', marginTop: '24px' }}>
      <div class="mb-3">
        <div class="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent rounded bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            onChange={handleFilter}
            aria-label="Search"
            aria-describedby="button-addon1" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={docs}
        highlightOnHover
        striped
        dense
        pagination
        customStyles={tableStyle}
        className='shadow-sm shadow-blue1 rounded-t-lg p-8 '
      />
    </div>
  );
}

export default DocsProvincia;