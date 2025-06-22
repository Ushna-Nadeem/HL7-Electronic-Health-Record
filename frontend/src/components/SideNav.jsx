import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();

  function goToAddEHRpage() {
    navigate("/add-ehr");
  }
  return (
    <div className="flex flex-col w-max h-screen m-4 ">
      <div>
        <h1 className="mb-2">
          <span className="text-blue-600 text-4xl font-bold">Health</span>
          <span className="text-green-500 text-4xl font-bold">Care</span>
        </h1>
      </div>

      <div className="flex flex-col w-max min-h-screen m-2 gap-4 font-semibold shadow-lg p-14 bg-stone-100 rounded-md">
        <button className="flex gap-2 hover:underline" onClick={goToAddEHRpage}>
          Create EHR
          <span className="mt-1">
            <SlArrowRight />
          </span>
        </button>
        <a>Diseases</a>
        <a>Evaluation</a>
        <a>Surgeries</a>
        <a>Genetic Risks</a>
        <a>Social Economics</a>
        <a>Life Style</a>
        <a>Lab Tests</a>
        <a>Medication</a>
        <a>Vaccination</a>
      </div>
    </div>
  );
};

export default SideNav;
