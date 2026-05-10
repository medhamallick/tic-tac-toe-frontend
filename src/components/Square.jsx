const Square = ({ cell, handleClick, index }) => {
  return (

    <div
      onClick={() => handleClick(index)}
      className="w-24 h-24 bg-gray-800 border border-gray-600 flex justify-center items-center text-4xl font-bold cursor-pointer text-white"
    >
      {cell}
    </div>

  );
};

export default Square;