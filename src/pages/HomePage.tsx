import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 style={{fontSize: "10rem"}}>HOME</h1>
      <Link to="/forgot-password"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ir al cambio de correo</button> </Link>
    </div>
  );
};

export default HomePage;
