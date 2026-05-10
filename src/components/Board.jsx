import Square from "./Square";

const Board = ({ board, handleClick }) => {

  return (

    <div className="grid grid-cols-3 gap-3">

      {board.map((cell, index) => (

        <Square
          key={index}
          cell={cell}
          index={index}
          handleClick={handleClick}
        />

      ))}

    </div>

  );
};

export default Board;