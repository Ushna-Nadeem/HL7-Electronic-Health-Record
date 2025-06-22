import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Home</h1>
      <div className="text-center">
        <Link
          to="/add-ehr"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4 hover:bg-blue-700"
        >
          Create EHR
        </Link>
        <Link
          to="/update-ehr"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded ml-4 hover:bg-green-700"
        >
          Update EHR
        </Link>
      </div>
    </div>
  );
};

export default Home;
