import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPublicaciones } from '../../utils/api';
import PropTypes from 'prop-types';

const searchSchema = z.object({
  search: z.string().optional(),
});

function PublicacionesSideBar({ publicaciones = [] }) {
  const publicacionesAnteriores = publicaciones.slice(3);

  const [searchResults, setSearchResults] = useState([]);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(searchSchema),
    mode: 'onChange',
    defaultValues: {
      search: '',
    },
  });

  const handleSearch = async (data) => {
    const dataPublicaciones = await getPublicaciones(data);
    const {
      response: { data: searchPublicaciones },
    } = dataPublicaciones;
    setSearchResults(searchPublicaciones || []);
    reset();
  };

  const displayPublicaciones = searchResults.length > 0 ? searchResults : publicacionesAnteriores;

  return (
    <div className="publicaciones__sidebar">
      <div className="publicaciones__sidebar__title">
        <h2>Publicaciones Anteriores</h2>
        <form
          className="publicaciones__sidebar__form"
          onSubmit={handleSubmit(handleSearch)}
        >
          <input
            {...register('search')}
            name="search"
            type="text"
            placeholder="Buscar"
            className="publicaciones__sidebar__form__input"
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="publicaciones__sidebar__form__button"
          >
            {isSubmitting ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>
      <div className="publicaciones__sidebar__list">
        <ul>
          {displayPublicaciones.map((publicacion) => (
            <Link
              to={`/publicaciones/${publicacion.fieldData.primaryKey}`}
              key={publicacion.fieldData.primaryKey}
            >
              <li>{publicacion.fieldData.titulo}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

PublicacionesSideBar.propTypes = {
  publicaciones: PropTypes.arrayOf(
    PropTypes.shape({
      fieldData: PropTypes.shape({
        primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        titulo: PropTypes.string.isRequired,
        PDF: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
};

export default PublicacionesSideBar;