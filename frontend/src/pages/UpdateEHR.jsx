import { useState } from 'react';
import axios from 'axios';
import SideNav from "../components/SideNav";

const UpdateEHR = () => {
  const [patientID, setPatientID] = useState('');
  const [formData, setFormData] = useState({
    personalInformation: {
      name: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      contactDetails: {
        phoneNumber: '',
        email: ''
      }
    },
    nextOfKin: {
      name: '',
      relation: '',
      contactNumber: ''
    },
    visitInformation: {
      visitId: '',
      assignedLocation: '',
      referringDoctor: '',
      visitDate: ''
    }
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    setFormData(prevData => {
      let newData = {...prevData};
      let current = newData;
      
      for(let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/ehr/update-ehr/${patientID}`,
        formData
      );

      if (response.data.success) {
        setMessage('EHR updated successfully');
        setPatientID('');
        setFormData({
          personalInformation: {
            name: '',
            dateOfBirth: '',
            gender: '',
            address: '',
            contactDetails: {
              phoneNumber: '',
              email: ''
            }
          },
          nextOfKin: {
            name: '',
            relation: '',
            contactNumber: ''
          },
          visitInformation: {
            visitId: '',
            assignedLocation: '',
            referringDoctor: '',
            visitDate: ''
          }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating EHR');
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200">
        <SideNav />
      </div>

      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Update Electronic Health Record</h1>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Patient ID: <span className="text-red-500">*</span></label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
              required
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Name: <span className="text-red-500">*</span></label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="personalInformation.name"
                  value={formData.personalInformation.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth: <span className="text-red-500">*</span></label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  name="personalInformation.dateOfBirth"
                  value={formData.personalInformation.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Gender: <span className="text-red-500">*</span></label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="personalInformation.gender"
                  value={formData.personalInformation.gender}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Address: <span className="text-red-500">*</span></label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="personalInformation.address"
                  value={formData.personalInformation.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="personalInformation.contactDetails.phoneNumber"
                  value={formData.personalInformation.contactDetails.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="personalInformation.contactDetails.email"
                  value={formData.personalInformation.contactDetails.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Next of Kin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="nextOfKin.name"
                  value={formData.nextOfKin.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Relation:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="nextOfKin.relation"
                  value={formData.nextOfKin.relation}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="nextOfKin.contactNumber"
                  value={formData.nextOfKin.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Visit Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Visit ID:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="visitInformation.visitId"
                  value={formData.visitInformation.visitId}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Assigned Location:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="visitInformation.assignedLocation"
                  value={formData.visitInformation.assignedLocation}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Referring Doctor:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="visitInformation.referringDoctor"
                  value={formData.visitInformation.referringDoctor}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Visit Date:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  name="visitInformation.visitDate"
                  value={formData.visitInformation.visitDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-6 text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update EHR
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateEHR;
