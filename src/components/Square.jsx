const Square = ({ value, onClick }) => {

  return (

    <div
      onClick={onClick}
      className="w-24 h-24 bg-gray-800 border border-gray-600 flex justify-center items-center text-4xl font-bold cursor-pointer text-white"
    >
      {value}
    </div>

  );
};

export default Square;