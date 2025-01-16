import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    personalInformation: {
        name: { type: String, required: true },
        gender: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        placeOfBirth: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
        },
        currentLocation: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
        },
        citizenship: { type: String, enum: ['Indian Resident', 'NRI'], required: true },
        mobileNumber: { type: String, required: true },
        parentMobileNumbers: [String],
        email: { type: String, required: true, unique: true },
        marriageStatus: { type: String, enum: ['Never Married', 'Divorced'], required: true },
    },
    physicalAttributes: {
        height: { type: Number }, // in cm
        weight: { type: Number }, // in kg
        bodyType: { type: String },
        bloodGroup: { type: String },
    },
    culturalDetails: {
        caste: { type: String },
        subCaste: { type: String },
        gotra: { type: String },
        nakshatra: { type: String },
        pada: { type: String },
        rashi: { type: String },
        religionPractices: { type: String, default: "observant" }, // e.g., observant, non-observant
    },
    lifestyleAndHabits: {
        foodHabits: { type: String, enum: ['Veg', 'Non-Veg', 'Eggetarian'] },
        otherHabits: {
            drink: { type: Boolean },
            smoke: { type: Boolean },
        },
        fitnessHabits: { type: String }, // e.g., gym-goer, yoga enthusiast
        petsPreference: { type: Boolean },
        familyPreference: { type: String, enum: ['Nuclear', 'Joint'] },
    },
    educationalAndProfessionalDetails: {
        education: { type: String },
        occupation: { type: String },
        income: { type: Number }, 
    },
    familyDetails: {
        fatherName: { type: String },
        motherName: { type: String },
        siblings: {
            total: { type: Number },
            married: { type: Number },
        },
        familyType: { type: String, enum: ['Joint', 'Nuclear'] },
        income: { type: Number },
        parentsAlive: {
            father: { type: Boolean },
            mother: { type: Boolean },
        },
    },
    partnerPreferences: {
        age: { min: { type: Number }, max: { type: Number } },
        height: { min: { type: Number }, max: { type: Number } },
        education: { type: [String] }, // Array of accepted degrees
        caste: { type: String },
        location: { 
            city: { type: String },
            state: { type: String },
            country: { type: String },
         },
        horoscopeMatching: { type: Boolean }, // Mandatory or Optional
        manglikStatus: { type: String, enum: ['Yes', 'No', 'Doesn’t Matter'] },
    },
    hobbiesAndInterests: {
        hobbies: { type: [String] },
        partnerTraits: { type: [String] }, // Preferred traits like introvert/extrovert
    },
    astrologicalDetails: {
        horoscopeMatching: { type: Boolean },
        manglikStatus: { type: Boolean },
        shareHoroscope: { type: Boolean },
    },
    marriagePreferences: {
        timeline: { type: String, enum: ['Immediate', 'Within 1 Year', 'Flexible'] },
        willingnessToRelocate: { type: String, enum: ['Yes', 'No', 'Depends on Location'] },
    },
    enhancements: {
        aboutMe: { type: String },
        partnerPreferences: { type: String },
        photos: { type: [String] }, // URLs of uploaded photos
        socialMediaLinks: {
            linkedIn: { type: String },
            instagram: { type: String },
            facebook: { type: String },
        },
        healthInformation: { type: String }, // Medical conditions/disabilities
        uploadedDocs: { type: [String] }, // Like jataka
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
