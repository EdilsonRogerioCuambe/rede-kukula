import React from 'react';
import imagens from '../../assets';

const Sobre = () => {

  return (
    <>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-green-900 sm:text-4xl">
              Rede Kukula
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A Rede Kukula é uma organização sem fins lucrativos que tem como objetivo ajudar estudantes moçambicanos em condições necessitadas a concorrer a bolsas de estudos no exterior.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex bg-white rounded-lg shadow-lg overflow-hidden p-6">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Missão
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Proporcionar oportunidades de estudo para aqueles que não têm condições financeiras para arcar com os custos de uma educação de qualidade.
                  </dd>
                </div>
              </div>

              <div className="flex bg-white rounded-lg shadow-lg overflow-hidden p-6">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Valores
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Acreditamos que a educação é um dos principais pilares para o desenvolvimento de um país e trabalhamos para facilitar o acesso dos estudantes moçambicanos a programas de bolsas de estudos no exterior.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-green-900 mb-6">Sobre a Rede Kukula</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-lg text-gray-700 mb-4">
              A Rede Kukula é uma organização sem fins lucrativos que tem como objetivo principal ajudar estudantes moçambicanos em condições necessitadas a concorrer a bolsas de estudos no exterior. Acreditamos que a educação é um dos principais pilares para o desenvolvimento de um país e, por isso, trabalhamos para proporcionar oportunidades de estudo para aqueles que não têm condições financeiras para arcar com os custos de uma educação de qualidade.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Oferecemos diversos serviços para os estudantes que desejam concorrer a bolsas de estudos no exterior. Entre eles estão:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
              <li>Orientação educacional: a equipe da instituição oferece orientação educacional para ajudar os estudantes a escolherem os cursos e universidades que melhor se encaixam em seus perfis e objetivos profissionais.</li>
              <li>Treinamento para testes de proficiência em língua estrangeira: muitas bolsas de estudos exigem que os candidatos tenham conhecimento avançado em inglês ou em outra língua estrangeira. Por isso, a Rede Kukula oferece treinamentos específicos para ajudar os estudantes a se prepararem para esses testes.</li>
              <li>Preparação de documentos: a instituição também ajuda os estudantes a prepararem toda a documentação necessária para concorrer a bolsas de estudos, como cartas de recomendação, histórico escolar e redações.</li>
            </ul>
          </div>
          <div>
            <img src={imagens.imagem4} alt="Imagem 3"  className='w-full rounded-lg shadow-xl'/>
          </div>
        </div>
        <div className="text-lg text-gray-700 mb-4">
          Além disso, trabalhamos em parceria com diversas universidades e instituições de ensino no exterior para facilitar o acesso dos estudantes moçambicanos a programas de bolsas de estudos. Buscamos sempre oportunidades que não só forneçam bolsas, mas que também tenham um impacto significativo na vida dos estudantes e na sociedade moçambicana como um todo.
        </div>
        <div className="text-lg text-gray-700 mb-4">
          A Rede Kukula tem ajudado diversos estudantes a realizarem o sonho de estudar no exterior e alcançar seus objetivos profissionais. Se você deseja saber mais sobre a nossa organização ou como podemos ajudá-lo(a) a se inscrever em uma bolsa de estudos, visite o nosso website ou entre em contato conosco.
        </div>
      </div>
    </>
  )
}

export default Sobre