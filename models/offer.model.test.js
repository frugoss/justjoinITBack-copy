const mongoose = require ('mongoose');
const OfferModel = require('./offer.model.js')
const offer = {logo: "Base64 String",
    company: "Company",
    website: "www.google.com",
    companySize: "10",
    companyType: "Type",
    companyIndustry: "IT",
    title: "Developer",
    experience: "Junior",
    employment: "B2B",
    minSalary: "",
    maxSalary: "",
    currency: "",
    technology: [{img:"img", color:"red", background:"red", name:"Developer"}],
    techStack: [{lvl:"3", language: "python"}, {lvl:3, language: "js"}],
    description: "Abcd",
    city: "Warszawa",
    street: "Marszałkowska 10",
    coordinates: {lat:1020, lng:23242},
    email: "mail@ru.com",
    userID: "43294239084932084sdasdas",
    agreements: "Lorem ipsum",
}

describe('Offer Model Test', () => {


    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('Create & save the offer successfully', async () => {
        const validOffer = new OfferModel(offer);
        const savedOffer = await validOffer.save();
        expect(savedOffer._id).toBeDefined();
        expect(savedOffer.name).toBe(offer.name);
    });

    it('Create an offer without required fields', async () => {
        const offerWithoutFields = new OfferModel({logo: 'Company'});
        let err;
        try {
            const savedOfferWithoutFields = await offerWithoutFields.save();
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.company).toBeDefined()
        expect(err.errors.description).toBeDefined();
    });
    it("Create an offer with an additional field", async () => {
        const offerWithNewField = new OfferModel({...offer, new:"test"});
        const savedOffer = await offerWithNewField.save();
        expect(savedOffer._id).toBeDefined();
        expect(savedOffer.new).toBeUndefined();
    })
})