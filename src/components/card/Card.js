import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
    titulo,
    imagem,
    descricao,
    link,
}) => {
    return (
        <>
            <div className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-500 ease-in-out">
                <img src={imagem} alt={titulo} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-xl font-bold">{titulo}</h3>
                    <p className="text-gray-600">{descricao}</p>
                    <Link to={link} className="text-green-500 hover:text-green-700 mt-2">
                        Leia mais
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Card;