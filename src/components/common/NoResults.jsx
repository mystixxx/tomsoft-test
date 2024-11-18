import PropTypes from 'prop-types';

const NoResults = ({
  title = "Nema rezultata",
  message = "Nismo pronašli ono što tražite. Pokušajte ponovno.",
}) => {
  return (
    <div className="text-white text-center p-8 mt-5 bg-[#21222D] rounded-lg">
      <div className="max-w-[300px] mx-auto mb-6">
        <img
          src="/assets/no_results.svg"
          alt="No results"
          className="w-full h-auto"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400">{message}</p>
    </div>
  );
};

NoResults.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

export default NoResults;
