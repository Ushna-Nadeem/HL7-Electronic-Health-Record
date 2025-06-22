const mongoose = require("mongoose");

// Subschema for contact details
const contactDetailsSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String },
    email: { type: String },
  },
  { _id: false }
);

// Subschema for personal information
const personalInformationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    contactDetails: contactDetailsSchema,
  },
  { _id: false }
);

// Subschema for next of kin information
const nextOfKinSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    relation: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  { _id: false }
);

// Subschema for visit information
const visitInformationSchema = new mongoose.Schema(
  {
    visitId: { type: String, required: true },
    assignedLocation: { type: String, required: true },
    referringDoctor: { type: String, required: true },
    visitDate: { type: Date, required: true },
  },
  { _id: false }
);

// Subschema for medical history
const medicalHistorySchema = new mongoose.Schema(
  {
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { _id: false }
);

// Subschema for current medications
const currentMedicationSchema = new mongoose.Schema(
  {
    medicationName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
);

// Subschema for lab results
const labResultSchema = new mongoose.Schema(
  {
    testName: { type: String, required: true },
    result: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { _id: false }
);

// Main schema for EHR
const ehrServiceSchema = new mongoose.Schema(
  {
    patientID: { type: String, required: true, unique: true },
    personalInformation: { type: personalInformationSchema, required: true },
    nextOfKin: { type: nextOfKinSchema, required: true },
    visitInformation: { type: visitInformationSchema, required: true },
    medicalHistory: { type: [medicalHistorySchema], default: [] },
    currentMedications: { type: [currentMedicationSchema], default: [] },
    labResults: { type: [labResultSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Export the model
const EHRService = mongoose.model("EHRService", ehrServiceSchema);
module.exports = EHRService;
