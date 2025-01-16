import mongoose from 'mongoose';

// Profile schema definition
const profileSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Reference to User
    
    personalInformation: {
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        dateOfBirth: { type: Date, required: true },
        placeOfBirth: { 
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true }
        },
        currentLocation: { 
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true }
        },
        citizenship: { 
            type: String, 
            enum: ['Indian Resident', 'NRI'], 
            required: true 
        },
        marriageStatus: { 
            type: String, 
            enum: ['Never Married', 'Divorced'], 
            required: true 
        },
    },

    physicalAttributes: {
        height: { type: Number, required: true }, // in cm
        weight: { type: Number, required: true }, // in kg
        bodyType: { 
            type: String, 
            enum: ['Slim', 'Athletic', 'Average'], 
            required: true 
        },
        bloodGroup: { 
            type: String, 
            required: true 
        },
    },

    culturalDetails: {
        caste: { type: String, required: true },
        subCaste: { type: String },
        gotra: { type: String },
        nakshatra: { type: String },
        pada: { type: String },
        rashi: { type: String },
        religionPractices: { 
            type: String, 
            required: true, 
            enum: ['Observant', 'Non-Observant'] 
        },
    },

    lifestyleAndHabits: {
        foodHabits: { 
            type: String, 
            enum: ['Veg', 'Non-Veg', 'Eggetarian'], 
            required: true 
        },
        drink: { 
            type: Boolean, 
            required: true 
        },
        smoke: { 
            type: Boolean, 
            required: true 
        },
        fitnessHabits: { 
            type: String, 
            required: true 
        }, // e.g., Gym-Goer, Yoga Enthusiast
        petsPreference: { 
            type: Boolean, 
            required: true 
        }, // True for Yes, False for No
        familyPreference: { 
            type: String, 
            enum: ['Nuclear', 'Joint'], 
            required: true 
        },
    },

    educationalAndProfessionalDetails: {
        education: { 
            type: String, 
            required: true 
        },
        occupation: { 
            type: String, 
            required: true 
        },
        income: { 
            type: Number, 
            required: true 
        }, // Annual income
    },

    familyDetails: {
        fatherName: { 
            type: String, 
            required: true 
        },
        motherName: { 
            type: String, 
            required: true 
        },
        numberOfSiblings: { 
            type: Number, 
            required: true 
        },
        siblingsMarried: { 
            type: Number, 
            required: true 
        },
        familyType: { 
            type: String, 
            enum: ['Joint', 'Nuclear'], 
            required: true 
        },
        familyIncome: { 
            type: Number, 
            required: true 
        },
        fatherAlive: { 
            type: Boolean, 
            required: true 
        },
        motherAlive: { 
            type: Boolean, 
            required: true 
        },
    },

    partnerPreferences: {
        ageRange: { 
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        heightRange: { 
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        education: { 
            type: [String], 
            required: true 
        }, // Array of accepted degrees
        caste: { type: String, required: true },
        location: { 
            type: String, 
            required: true 
        }, // City or Country
        horoscopeMatching: { 
            type: Boolean, 
            required: true 
        }, // Mandatory or Optional
        manglikStatus: { 
            type: String, 
            enum: ['Yes', 'No', 'Doesn’t Matter'], 
            required: true 
        },
    },

    hobbiesAndInterests: {
        hobbies: { 
            type: [String], 
            required: true 
        },
        partnerTraits: { 
            type: [String], 
            required: true 
        }, // e.g., Introvert, Extrovert
    },

    astrologicalDetails: {
        ganaMatch: { 
            type: Boolean, 
            required: true 
        },
        nakshatra: { 
            type: String, 
            required: true 
        },
        pada: { 
            type: String, 
            required: true 
        },
        rashi: { 
            type: String, 
            required: true 
        },
        manglikStatus: { 
            type: Boolean, 
            required: true 
        },
        willingToShareHoroscope: { 
            type: Boolean, 
            required: true 
        },
    },

    marriagePreferences: {
        timeline: { 
            type: String, 
            enum: ['Immediate', 'Within 1 Year', 'Flexible'], 
            required: true 
        },
        willingnessToRelocate: { 
            type: String, 
            enum: ['Yes', 'No', 'Depends on Location'], 
            required: true 
        },
    },

    enhancements: {
        aboutMe: { 
            type: String, 
            required: true 
        },
        partnerExpectations: { 
            type: String, 
            required: true 
        },
        profilePhotos: { 
            type: [String], 
            required: true 
        }, // Array of URLs
        socialMediaLinks: {
            linkedIn: { 
                type: String, 
                required: true 
            },
            instagram: { 
                type: String, 
                required: true 
            },
            facebook: { 
                type: String, 
                required: true 
            },
        },
        healthInformation: { 
            type: String, 
            required: true 
        }, // e.g., Medical Conditions
        uploadedDocs: { 
            type: [String], 
            required: true 
        }, // URLs of uploaded documents
    },

    isApproved: { 
        type: Boolean, 
        default: false, 
        required: true 
    }, // Admin approval

    createdAt: { 
        type: Date, 
        default: Date.now 
    },

    updatedAt: { 
        type: Date, 
        default: Date.now 
    },

});

// Create the Profile model based on the schema
const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
