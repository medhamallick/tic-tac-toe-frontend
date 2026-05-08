import Square from "./Square";

const Board = ({ board, handleClick }) => {

  return (

    <div className="grid grid-cols-3 gap-3">

      {board.map((cell, index) => (

        <Square
          key={index}
          value={cell}
          onClick={() => handleClick(index)}
        />

      ))}

    </div>

  );
};

export default Board;