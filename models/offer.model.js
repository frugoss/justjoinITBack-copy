const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const coordinatesSchema = new Schema ({
    lat: {
        required: true,
        type: Number
    },

    lng: {
        required: true,
        type: Number
    }
})
const technologySchema = new Schema({
    img: {
        required: true,
        type: String
    },
    color: {
        required: true,
        type: String
    },
    background: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    }
})
const skillSchema = new Schema({
    lvl: {
        required: true,
        type: Number,
    },
    language: {
        required: true,
        type: String,
    }
});

const offerSchema = new Schema({
        logo: {
            required: true,
            type: String
        },
        company: {
            required: true,
            type: String
        },
        website: {
            required: true,
            type: String
        },
        companySize: {
            required: true,
            type: String
        },

        companyType: {
            required: true,
            type: String
        },
        companyIndustry: {
            required: true,
            type: String
        },
        title: {
            required: true,
            type: String
        },
        experience: {
            required: true,
            type: String
        },
        employment: {
            required: false,
            type: String
        },
        minSalary: {
            required: false,
            type: Number
        },
        maxSalary: {
            required: false,
            type: Number
        },
        currency: {
            required: false,
            type: String
        },

        technology: {
            required: true,
            type: [technologySchema]
        },
        techStack: {
            required: true,
            type: [skillSchema]
        },
        description: {
            required: true,
            type: String
        },
        city: {
            required: true,
            type: String,
        },

        street: {
            required: true,
            type: String,
        },
        coordinates: {
            required: true,
            type: [coordinatesSchema],
        },
        remote: {
            required: false,
            type: Boolean
        },
        agreements: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
        userID: {
            required: true,
            type: String
        },
    }, {
        timestamps: true,
    }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
