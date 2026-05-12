// const Home = ({setGameMode }) => {
//   return (
//     <div className='bg-gray-500'>
//         <div>
//             <h1>Tic Tac Toe</h1>
//             <div>
//                 <button onClick={handleClick}
//                 className='mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-700 active:bg-blue-700 text-white font-semibold rounded-lg'
//                 >
//                     👤 VS 💻
//                 </button>
//             </div>
//         </div>

//     </div>
//   )
// }

// export default Home


const Home = ({ setGameMode }) => {

  return (

    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">

      <div className=" flex flex-col items-center gap-6 w-full max-w-md">

        {/* Title */}
        <h1 className=" text-white text-4xl sm:text-5xl font-bold text-center">
          Tic Tac Toe
        </h1>

        {/* VS Computer */}
        <button
          onClick={() => setGameMode("single")}
          className=" w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-bl text-lg font-semibold rounded-xl transition-all duration-200"
        >
          👤 VS 💻
        </button>

        {/* Multiplayer */}
        <button
          onClick={() => setGameMode("multi")}
          className="w-full py-3 bg-green-600 hover:bg-green-700 active:bg-green-80 text-white text-lg font-semibold rounded-xl transition-all duration-200"
        >
          👤 VS 👤
        </button>

      </div>

    </div>

  );
};

export default Home;