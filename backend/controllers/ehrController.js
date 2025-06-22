const EHRService = require("../models/EHR");
const simpleHl7 = require("simple-hl7");

// Function to create a new EHR of a particular patient
const createNewEHR = async (req, res) => {
  try {
    const {
      patientID,
      personalInformation,
      nextOfKin,
      visitInformation,
      medicalHistory,
      currentMedications,
      labResults,
    } = req.body;

    // Checking if any fields are missing
    if (
      !(
        patientID &&
        personalInformation &&
        nextOfKin &&
        visitInformation &&
        medicalHistory &&
        currentMedications &&
        labResults
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Some fields are missing. Provide all fields.",
      });
    }

    // Check if an EHR already exists for the given patientID
    const existingEHR = await EHRService.findOne({ patientID });

    if (existingEHR) {
      // If an existing EHR is found, return an error message
      return res.status(400).json({
        success: false,
        message: "EHR already exists for this patient.",
      });
    }

    // Creating a new EHR
    const newEHR = new EHRService({
      patientID,
      personalInformation,
      nextOfKin,
      visitInformation,
      medicalHistory,
      currentMedications,
      labResults,
    });

    // Saving to database
    await newEHR.save();
    res.status(201).json({ success: true, data: newEHR });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to retrieve all EHRs of all patients
const allEHR = async (req, res) => {
  try {
    const ehrRecords = await EHRService.find();
    res.status(200).json({ success: true, data: ehrRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to get all EHRs of a particular patient
const allEHRPatient = async (req, res) => {
  try {
    const ehrRecords = await EHRService.find({
      patientID: req.params.patientID,
    });
    if (ehrRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No EHR records found for this patient",
      });
    }
    res.status(200).json({ success: true, data: ehrRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to retrieve a specific EHR of a patient
const specificEHR = async (req, res) => {
  try {
    const ehrRecord = await EHRService.findOne({ ehrID: req.params.ehrID });
    if (!ehrRecord) {
      return res.status(404).json({ success: false, message: "EHR not found" });
    }
    res.status(200).json({ success: true, data: ehrRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to update EHR of a specific patient
const updateEHR = async (req, res) => {
  const { patientID } = req.params;
  const updateData = req.body; // Data to update

  try {
    // Find the EHR by patientID
    const ehr = await EHRService.findOne({ patientID });

    if (!ehr) {
      return res.status(404).json({
        success: false,
        message: "EHR not found for the given patient ID",
      });
    }

    if (!updateData) {
      return res.status(400).json({
        success: false,
        message: "Updated data not provided",
      });
    }

    // Update the EHR with the new data
    // Using `Object.assign()` to merge the updated data with the existing document
    Object.assign(ehr, updateData);

    // Save the updated EHR document
    await ehr.save();

    res.status(200).json({
      success: true,
      message: "EHR updated successfully",
      data: ehr,
    });
  } catch (err) {
    console.error("Error updating EHR:", err);
    res.status(500).json({
      message: "Internal Server error",
      error: err.message,
    });
  }
};

// Function to delete a specific EHR of a particular patient
const deleteEHR = async (req, res) => {
  const { patientID } = req.params;

  try {
    // Find and delete the EHR by patientID
    const result = await EHRService.deleteOne({ patientID });

    if (result.deletedCount === 0) {
      // If no record was deleted, it means the patientID doesn't exist
      return res.status(404).json({
        success: false,
        message: "EHR not found for the given patient ID",
      });
    }

    // If EHR is deleted successfully, return a success message
    res.status(200).json({
      success: true,
      message: "EHR deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function to update the medical history of patient
const addNewMedicalHistory = async (req, res) => {
  try {
    const { patientID } = req.params;
    const { diagnosis, treatment, date } = req.body;

    // Find the EHR by patientID
    const ehr = await EHRService.findOne({ patientID });

    if (!ehr) {
      return res
        .status(404)
        .json({ message: "EHR not found for the given patient ID" });
    }

    if (!(diagnosis && treatment && date)) {
      return res.status(400).json({
        success: false,
        message: "Some fields are missing. Provide all fields.",
      });
    }

    // Add the new medical history entry to the array
    ehr.medicalHistory.push({ diagnosis, treatment, date });

    // Save the updated EHR
    await ehr.save();

    res.status(200).json({
      message: "Medical history added successfully",
      data: ehr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addNewCurrentMedication = async (req, res) => {
  try {
    const { patientID } = req.params;
    const { medicationName, dosage, frequency, startDate, endDate } = req.body;

    // Find the EHR by patientID
    const ehr = await EHRService.findOne({ patientID });

    if (!ehr) {
      return res
        .status(404)
        .json({ message: "EHR not found for the given patient ID" });
    }

    if (!(medicationName && dosage && frequency && startDate && endDate)) {
      return res.status(400).json({
        success: false,
        message: "Some fields are missing. Provide all fields.",
      });
    }

    // Add the new current medication entry to the array
    ehr.currentMedications.push({
      medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
    });

    // Save the updated EHR
    await ehr.save();

    res.status(200).json({
      message: "Current medication added successfully",
      data: ehr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addNewLabResult = async (req, res) => {
  try {
    const { patientID } = req.params;
    const { testName, result, date } = req.body;

    // Find the EHR by patientID
    const ehr = await EHRService.findOne({ patientID });

    if (!ehr) {
      return res
        .status(404)
        .json({ message: "EHR not found for the given patient ID" });
    }

    if (!(testName && result && date)) {
      res.status(400).json({
        success: false,
        message: "Some fields are missing. Provide all fields.",
      });
    }

    // Add the new lab result entry to the array
    ehr.labResults.push({ testName, result, date });

    // Save the updated EHR
    await ehr.save();

    res.status(200).json({
      message: "Lab result added successfully",
      data: ehr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Generate ADT HL7 message with XML conversion
const generate_HL7_ADT_Message = async (req, res) => {
  try {
    const { patientID } = req.params;

    // Fetch patient data from MongoDB
    const patientData = await EHRService.findOne({ patientID });

    if (!patientData) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // First, convert the patient data to XML format
    const ehrXML = `<?xml version="1.0" encoding="UTF-8"?>
      <EHR>
        <Patient>
          <PatientID>${patientData.patientID}</PatientID>
          <PersonalInformation>
            <Name>${patientData.personalInformation.name}</Name>
            <DateOfBirth>${
              patientData.personalInformation.dateOfBirth
                ? patientData.personalInformation.dateOfBirth.toISOString()
                : ""
            }</DateOfBirth>
            <Gender>${patientData.personalInformation.gender}</Gender>
            <Address>${patientData.personalInformation.address}</Address>
          </PersonalInformation>
          <VisitInformation>
            <VisitID>${patientData.visitInformation.visitId}</VisitID>
            <AssignedLocation>${
              patientData.visitInformation.assignedLocation
            }</AssignedLocation>
            <ReferringDoctor>${
              patientData.visitInformation.referringDoctor
            }</ReferringDoctor>
            <VisitDate>${
              patientData.visitInformation.visitDate
                ? patientData.visitInformation.visitDate.toISOString()
                : ""
            }</VisitDate>
          </VisitInformation>
        </Patient>
      </EHR>`;

    // Now convert XML to HL7
    const hl7 = new simpleHl7.Message(
      "EHRMicroservice", // Sending Application
      "HealthCareSystem", // Sending Facility
      "ExternalApplication", // Receiving Application
      "ExternalFacility", // Receiving Facility
      new Date().toISOString(), // Date/Time
      "ADT", // Message Type
      "A01", // Event Type (Admit/Visit Notification)
      "MessageControlID", // Message Control ID
      "P", // Processing ID
      "2.0" // Version ID
    );

    // Parse XML to add segments to HL7 message
    // Extract necessary data for the PID and PV1 segments
    hl7.addSegment("PID", [
      patientData.patientID, // Patient ID
      patientData.personalInformation.name, // Name (from personalInformation.name)
      patientData.personalInformation.dateOfBirth
        ? patientData.personalInformation.dateOfBirth.toISOString()
        : "", // Date of Birth (DOB)
      patientData.personalInformation.gender, // Gender
      patientData.personalInformation.address, // Address
    ]);

    // PV1 Segment
    hl7.addSegment("PV1", [
      patientData.visitInformation.visitId, // Visit ID
      patientData.visitInformation.assignedLocation, // Assigned Location
      patientData.visitInformation.referringDoctor, // Referring Doctor
      patientData.visitInformation.visitDate
        ? patientData.visitInformation.visitDate.toISOString()
        : "", // Visit Date
    ]);

    // NK1 Segment (Next of Kin) if available
    if (patientData.nextOfKin) {
      hl7.addSegment("NK1", [
        patientData.nextOfKin.name, // Next of Kin Name
        patientData.nextOfKin.relation, // Relation
        patientData.nextOfKin.contactNumber, // Contact Number
      ]);
    }

    // Convert HL7 message to string format
    const hl7Message = hl7.toString();

    // Return both XML and HL7 message
    res.status(200).json({
      xml: ehrXML, // Return XML version of the data
      hl7Message, // Return HL7 message as string
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Generate ORU HL7 message
const generate_HL7_ORU_Message = async (req, res) => {
  try {
    const { patientID } = req.params;

    const patientData = await EHRService.findOne({ patientID });

    if (!patientData) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // First convert EHR data to XML format
    const ehrXML = `<?xml version="1.0" encoding="UTF-8"?>
      <EHR>
        <Patient>
          <PatientID>${patientData.patientID}</PatientID>
          <PersonalInformation>
            <Name>${patientData.personalInformation.name}</Name>
            <DateOfBirth>${
              patientData.personalInformation.dateOfBirth
                ? patientData.personalInformation.dateOfBirth.toISOString()
                : ""
            }</DateOfBirth>
            <Gender>${patientData.personalInformation.gender}</Gender>
            <Address>${patientData.personalInformation.address}</Address>
          </PersonalInformation>
          <VisitInformation>
            <VisitID>${patientData.visitInformation.visitId}</VisitID>
            <AssignedLocation>${
              patientData.visitInformation.assignedLocation
            }</AssignedLocation>
            <ReferringDoctor>${
              patientData.visitInformation.referringDoctor
            }</ReferringDoctor>
            <VisitDate>${
              patientData.visitInformation.visitDate
                ? patientData.visitInformation.visitDate.toISOString()
                : ""
            }</VisitDate>
          </VisitInformation>
          <LabResults>
            ${patientData.labResults
              .map(
                (result, index) => `
              <Result>
                <Index>${index + 1}</Index>
                <TestName>${result.testName}</TestName>
                <Value>${result.result}</Value>
                <Date>${result.date ? result.date.toISOString() : ""}</Date>
              </Result>
            `
              )
              .join("")}
          </LabResults>
        </Patient>
      </EHR>`;

    // Now convert XML to HL7
    const hl7 = new simpleHl7.Message(
      "EHRMicroservice",
      "HealthCareSystem",
      "LabSystem",
      "LabFacility",
      new Date().toISOString(),
      "ORU^R01",
      "MessageControlID",
      "P",
      "2.4"
    );

    // Parse XML and add segments to HL7
    // PID Segment
    hl7.addSegment("PID", [
      patientData.patientID,
      patientData.personalInformation.name,
      patientData.personalInformation.dateOfBirth
        ? patientData.personalInformation.dateOfBirth.toISOString()
        : "",
      patientData.personalInformation.gender,
      patientData.personalInformation.address,
    ]);

    // PV1 Segment
    hl7.addSegment("PV1", [
      patientData.visitInformation.visitId,
      patientData.visitInformation.assignedLocation,
      patientData.visitInformation.referringDoctor,
      patientData.visitInformation.visitDate
        ? patientData.visitInformation.visitDate.toISOString()
        : "",
    ]);

    // OBR Segment
    hl7.addSegment("OBR", [
      "1",
      "",
      new Date().toISOString(),
      "Observation Request",
      "",
      "",
      "F",
    ]);

    // OBX Segments for each lab result
    patientData.labResults.forEach((result, index) => {
      hl7.addSegment("OBX", [
        index + 1,
        "TX",
        result.testName,
        "",
        result.result,
        "",
        "",
        "F",
        "",
        result.date ? result.date.toISOString() : "",
      ]);
    });

    const hl7Message = hl7.toString();
    res.status(200).json({
      xml: ehrXML,
      hl7Message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createNewEHR,
  allEHR,
  allEHRPatient,
  specificEHR,
  updateEHR,
  deleteEHR,
  addNewMedicalHistory,
  addNewLabResult,
  addNewCurrentMedication,
  generate_HL7_ADT_Message,
  generate_HL7_ORU_Message,
};
