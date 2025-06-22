const {
  createNewEHR,
  allEHR,
  specificEHR,
  updateEHR,
  deleteEHR,
  allEHRPatient,
  addNewMedicalHistory,
  addNewCurrentMedication,
  addNewLabResult,
  generate_HL7_ADT_Message,
  generate_HL7_ORU_Message,
} = require("../controllers/ehrController");

const express = require("express");

const router = express.Router();

// Route to create a new Electronic Health Record (EHR) of a patient
router.post("/new-ehr", createNewEHR);

// Route to get all EHRs in the system
router.get("/all-ehr", allEHR);

// Route to get all EHRs of a particular patient
router.get("/all-ehr-patient/:patientID", allEHRPatient);

// Route to get a specific EHR in the system
router.get("/specific-ehr/:ehrID", specificEHR);

// Route to update a particular EHR of a patient
router.patch("/update-ehr/:patientID", updateEHR);

// Route to delete a particular EHR of a patient
router.delete("/delete-ehr/:patientID", deleteEHR);

// Route to add a new medical history entry
router.patch("/medical-history/:patientID", addNewMedicalHistory);

// Route to add a new current medication entry
router.patch("/current-medication/:patientID", addNewCurrentMedication);

// Route to add a new lab results entry
router.patch("/lab-results/:patientID", addNewLabResult);

// Route to generate an HL7 ADT message for a particular patient
router.get("/hl7-adt/:patientID", generate_HL7_ADT_Message);

// Route to generate an HL7 ORU message for a particular patient
router.get("/hl7-oru/:patientID", generate_HL7_ORU_Message);

module.exports = router;
