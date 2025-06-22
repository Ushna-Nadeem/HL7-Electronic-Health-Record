import { useState } from "react";
import axios from "axios";

const NewEHRForm = () => {
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientDOB, setPatientDOB] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [nextKinName, setNextKinName] = useState("");
  const [nextKinRelation, setNextKinRelation] = useState("");
  const [nextKinPhone, setNextKinPhone] = useState("");
  const [visitID, setVisitID] = useState("");
  const [assignedLocation, setAssignedLocation] = useState("");
  const [referringDoctor, setReferringDoctor] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [diagnosisDate, setDiagnosisDate] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [medicineStartDate, setMedicineStartDate] = useState("");
  const [medicineEndDate, setMedicineEndDate] = useState("");
  const [labTestName, setLabTestName] = useState("");
  const [labTestResults, setLabTestResults] = useState("");
  const [labTestDate, setLabTestDate] = useState("");

  async function createEHR(ev) {
    try {
      ev.preventDefault();

      const endpoint = `${import.meta.env.VITE_REACT_APP_BASE_URL}:${
        import.meta.env.VITE_EHR_PORT
      }/api/ehr/new-ehr`;

      const ehr = {
        patientID: patientID,

        personalInformation: {
          name: patientName,
          dateOfBirth: patientDOB,
          gender: patientGender,
          address: patientAddress,

          contactDetails: {
            phoneNumber: patientContact,
            email: patientEmail,
          },
        },

        nextOfKin: {
          name: nextKinName,
          relation: nextKinRelation,
          contactNumber: nextKinPhone,
        },

        visitInformation: {
          visitId: visitID,
          assignedLocation: assignedLocation,
          referringDoctor: referringDoctor,
          visitDate: visitDate,
        },

        medicalHistory: {
          diagnosis: diagnosis,
          treatment: treatment,
          date: diagnosisDate,
        },

        currentMedications: [
          {
            medicationName: medicineName,
            dosage: dosage,
            frequency: frequency,
            startDate: medicineStartDate,
            endDate: medicineEndDate,
          },
        ],

        labResults: [
          {
            testName: labTestName,
            result: labTestResults,
            date: labTestDate,
          },
        ],
      };

      await axios
        .post(endpoint, ehr)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col ml-4 mt-16">
      <h1 className="text-3xl font-extrabold">Create a New EHR</h1>
      <form className="flex flex-row flex-wrap" onSubmit={createEHR}>
        <div className="flex flex-wrap bg-cyan-100 flex-col p-8 m-4 justify-start  w-max gap-4 rounded-3xl">
          <h1 className="text-xl text-blue-700 font-semibold">
            Personal Information
          </h1>

          <input
            type="text"
            placeholder="Patient ID"
            className="bg-slate-200 p-2 rounded-2xl"
            value={patientID}
            onChange={(ev) => setPatientID(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Name"
            className="bg-slate-200 p-2 rounded-2xl"
            value={patientName}
            onChange={(ev) => setPatientName(ev.target.value)}
          ></input>

          <input
            type="date"
            placeholder="Date of Birth"
            className="bg-slate-200 p-2 rounded-2xl"
            value={patientDOB}
            onChange={(ev) => setPatientDOB(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Gender"
            className="bg-slate-200 p-2 rounded-2xl"
            value={patientGender}
            onChange={(ev) => setPatientGender(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Address"
            className="bg-slate-200 p-2 rounded-2xl"
            value={patientAddress}
            onChange={(ev) => setPatientAddress(ev.target.value)}
          ></input>
        </div>

        <div className="flex flex-wrap flex-col bg-cyan-100 p-8 m-4 justify-start place-content-center w-max gap-4 rounded-3xl">
          <h1 className="text-xl text-blue-700 font-semibold">
            Contact Information
          </h1>

          <input
            type="text"
            placeholder="Phone Number"
            className="bg-slate-200 p-2 rounded-2xl"
            value={patientContact}
            onChange={(ev) => setPatientContact(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Email"
            className="bg-slate-200 p-2 rounded-2xl"
            value={patientEmail}
            onChange={(ev) => setPatientEmail(ev.target.value)}
          ></input>
        </div>

        <div className="flex flex-wrap flex-col bg-cyan-100 p-8 m-4 justify-start place-content-center w-max gap-4 rounded-3xl">
          <h1 className="text-xl text-blue-700 font-semibold">
            Next of Kin Information
          </h1>

          <input
            type="text"
            placeholder="Name"
            className="bg-slate-200 p-2 rounded-2xl"
            value={nextKinName}
            onChange={(ev) => setNextKinName(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Relation"
            className="bg-slate-200 p-2 rounded-2xl"
            value={nextKinRelation}
            onChange={(ev) => setNextKinRelation(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Phone Number"
            className="bg-slate-200 p-2 rounded-2xl"
            value={nextKinPhone}
            onChange={(ev) => setNextKinPhone(ev.target.value)}
          ></input>
        </div>

        <div className="flex flex-wrap flex-col bg-cyan-100 p-8 m-4 justify-start place-content-center w-max gap-4 rounded-3xl">
          <h1 className="text-xl text-blue-700 font-semibold">
            Visit Information
          </h1>

          <input
            type="text"
            placeholder="Visit ID"
            className="bg-slate-200 p-2 rounded-2xl"
            value={visitID}
            onChange={(ev) => setVisitID(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Assigned Location"
            className="bg-slate-200 p-2 rounded-2xl"
            value={assignedLocation}
            onChange={(ev) => setAssignedLocation(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Referring Doctor"
            className="bg-slate-200 p-2 rounded-2xl"
            value={referringDoctor}
            onChange={(ev) => setReferringDoctor(ev.target.value)}
          ></input>

          <input
            type="date"
            placeholder="Visit Date"
            className="bg-slate-200 p-2 rounded-2xl"
            value={visitDate}
            onChange={(ev) => setVisitDate(ev.target.value)}
          ></input>
        </div>

        <div className="flex flex-wrap flex-col bg-cyan-100 p-8 m-4 justify-start place-content-center w-max gap-4 rounded-3xl">
          <h1 className="text-xl text-blue-700 font-semibold">
            Medical History
          </h1>

          <input
            type="text"
            placeholder="Diagnosis"
            className="bg-slate-200 p-2 rounded-2xl"
            value={diagnosis}
            onChange={(ev) => setDiagnosis(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Treatment"
            className="bg-slate-200 p-2 rounded-2xl"
            value={treatment}
            onChange={(ev) => setTreatment(ev.target.value)}
          ></input>

          <input
            type="date"
            placeholder="Date of Diagnosis"
            className="bg-slate-200 p-2 rounded-2xl"
            value={diagnosisDate}
            onChange={(ev) => setDiagnosisDate(ev.target.value)}
          ></input>
        </div>

        <div className="flex flex-wrap flex-col bg-cyan-100 p-8 m-4 justify-start place-content-center w-max gap-4 rounded-3xl">
          <h1 className="text-xl text-blue-700 font-semibold">
            Medication Information
          </h1>

          <input
            type="text"
            placeholder="Name"
            className="bg-slate-200 p-2 rounded-2xl"
            value={medicineName}
            onChange={(ev) => setMedicineName(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Dosage"
            className="bg-slate-200 p-2 rounded-2xl"
            value={dosage}
            onChange={(ev) => setDosage(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Frequency"
            className="bg-slate-200 p-2 rounded-2xl"
            value={frequency}
            onChange={(ev) => setFrequency(ev.target.value)}
          ></input>

          <input
            type="date"
            placeholder="Start Date"
            className="bg-slate-200 p-2 rounded-2xl"
            value={medicineStartDate}
            onChange={(ev) => setMedicineStartDate(ev.target.value)}
          ></input>

          <input
            type="date"
            placeholder="End Date"
            className="bg-slate-200 p-2 rounded-2xl"
            value={medicineEndDate}
            onChange={(ev) => setMedicineEndDate(ev.target.value)}
          ></input>
        </div>

        <div className="flex flex-wrap flex-col bg-cyan-100 p-8 m-4 justify-start place-content-center w-max gap-4 rounded-3xl">
          <h1 className="text-xl text-blue-700 font-semibold">
            Lab Test Information
          </h1>

          <input
            type="text"
            placeholder="Name"
            className="bg-slate-200 p-2 rounded-2xl"
            value={labTestName}
            onChange={(ev) => setLabTestName(ev.target.value)}
          ></input>

          <input
            type="text"
            placeholder="Results"
            className="bg-slate-200 p-2 rounded-2xl"
            value={labTestResults}
            onChange={(ev) => setLabTestResults(ev.target.value)}
          ></input>

          <input
            type="date"
            placeholder="Date of Test"
            className="bg-slate-200 p-2 rounded-2xl"
            value={labTestDate}
            onChange={(ev) => setLabTestDate(ev.target.value)}
          ></input>
        </div>

        <div className=" flex flex-col w-full m-1 place-content-center justify-center">
          <button
            type="submit"
            className="bg-sky-600 py-2 text-2xl rounded-2xl font-semibold text-white"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEHRForm;
