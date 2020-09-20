const mongoose = require ('mongoose');
const User = require('../models/user.model');

describe('signUp', () =>{
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

    it('Adds a user', async () => {
        const user = new User({email:"email@gmail.com", password:"testtest123"})
        const savedUser = await user.save()
        expect(savedUser).toBeDefined()
    })

    it('Invalid email', async () => {
        const user = new User({email: "test", password: "1234"});
        let err;
        try {
            const userData = await user.save()
        }
        catch(error){
            err = error
        }
        expect(err.errors.email).toBeDefined()
    })

    it('Duplicate email', async () => {
        const user = new User({email: "test@gmail.com", password: "1234"});
        const user2 = new User({email: "test@gmail.com", password: "1234"})
        let err;
        try {
            const userData = await user.save()
            const userData2 = await user2.save()
        }
        catch(error){
            err = error
        }
        expect(err.errors.email).toBeDefined()
    })
})