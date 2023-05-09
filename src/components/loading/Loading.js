import React from 'react';

const Loading = ({mensagem}) => {
  return (
    <div className="flex justify-center items-center h-screen opacity-75">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
        <h2 className="text-3xl text-gray-900">{mensagem}</h2>
    </div>
  )
}

export default Loading;