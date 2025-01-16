import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    personalInformation: {
        gender: { type: String },
        dateOfBirth: { type: Date },
        placeOfBirth: { city: String, state: String, country: String },
        currentLocation: { city: String, state: String, country: String },
        citizenship: { type: String, enum: ['Indian Resident', 'NRI'] },
        marriageStatus: { type: String, enum: ['Never Married', 'Divorced'] },
    },
    physicalAttributes: {
        height: { type: Number }, // cm
        weight: { type: Number }, // kg
        bodyType: { type: String, enum: ['Slim', 'Athletic', 'Average'] },
        bloodGroup: { type: String },
    },
    culturalDetails: {
        caste: { type: String },
        subCaste: { type: String },
        gotra: { type: String },
        nakshatra: { type: String },
        pada: { type: String },
        rashi: { type: String },
        religionPractices: { type: String }, // e.g., Observant, Non-Observant
    },
    lifestyleAndHabits: {
        foodHabits: { type: String, enum: ['Veg', 'Non-Veg', 'Eggetarian'] },
        drink: { type: Boolean },
        smoke: { type: Boolean },
        fitnessHabits: { type: String }, // e.g., Gym-Goer, Yoga Enthusiast
        petsPreference: { type: Boolean }, // True for Yes, False for No
        familyPreference: { type: String, enum: ['Nuclear', 'Joint'] },
    },
    educationalAndProfessionalDetails: {
        education: { type: String },
        occupation: { type: String },
        income: { type: Number }, // Annual income
    },
    familyDetails: {
        fatherName: { type: String },
        motherName: { type: String },
        numberOfSiblings: { type: Number },
        siblingsMarried: { type: Number },
        familyType: { type: String, enum: ['Joint', 'Nuclear'] },
        familyIncome: { type: Number },
        fatherAlive: { type: Boolean },
        motherAlive: { type: Boolean },
    },
    partnerPreferences: {
        ageRange: { min: Number, max: Number },
        heightRange: { min: Number, max: Number },
        education: { type: [String] }, // Array of accepted degrees
        caste: { type: String },
        location: { type: String }, // City or Country
        horoscopeMatching: { type: Boolean }, // Mandatory or Optional
        manglikStatus: { type: String, enum: ['Yes', 'No', 'Doesn’t Matter'] },
    },
    hobbiesAndInterests: {
        hobbies: { type: [String] },
        partnerTraits: { type: [String] }, // e.g., Introvert, Extrovert
    },
    astrologicalDetails: {
        ganaMatch: { type: Boolean },
        nakshatra: { type: String },
        pada: { type: String },
        rashi: { type: String },
        manglikStatus: { type: Boolean },
        willingToShareHoroscope: { type: Boolean },
    },
    marriagePreferences: {
        timeline: { type: String, enum: ['Immediate', 'Within 1 Year', 'Flexible'] },
        willingnessToRelocate: { type: String, enum: ['Yes', 'No', 'Depends on Location'] },
    },
    enhancements: {
        aboutMe: { type: String },
        partnerExpectations: { type: String },
        profilePhotos: { type: [String] }, // Array of URLs
        socialMediaLinks: {
            linkedIn: { type: String },
            instagram: { type: String },
            facebook: { type: String },
        },
        healthInformation: { type: String }, // e.g., Medical Conditions
        uploadedDocs: { type: [String] }, // URLs of uploaded documents
    },
    isApproved: { type: Boolean, default: false }, // Admin approval
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
