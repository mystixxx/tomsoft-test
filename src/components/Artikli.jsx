import { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { Table, SearchBar, LoadingSpinner, NoResults } from './common';

const TABLE_HEADERS = ['ID', 'Artikl', 'Naziv'];

const Artikli = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: articles, isLoading, error } = useArticles(searchTerm);

  const handleSearch = (value) => {
    setSearchTerm(value.trim());
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <NoResults 
        title="Greška pri dohvaćanju podataka"
        message="Molimo pokušajte ponovno kasnije"
      />
    );
  }

  const renderRow = (article) => (
    <>
      <td className="py-4 px-4 text-light-gray">
        {String(article.id).padStart(2, '0')}
      </td>
      <td className="py-4 px-4 text-white font-medium">
        {article.artikl}
      </td>
      <td className="py-4 px-4 text-white font-medium">
        {article.naziv}
      </td>
    </>
  );

  return (
    <div>
      <SearchBar 
        value={searchTerm}
        onSearch={handleSearch}
        placeholder="Pretraži artikle..."
      />
      {articles?.length > 0 ? (
        <Table 
          title="Popis Artikala"
          headers={TABLE_HEADERS}
          data={articles}
          renderRow={renderRow}
        />
      ) : (
        <NoResults 
          title="Nema pronađenih artikala"
          message="Pokušajte s drugim pojmom pretrage"
        />
      )}
    </div>
  );
};

export default Artikli; 