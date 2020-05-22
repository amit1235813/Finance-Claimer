const mongoose =  require('mongoose');

//Example to connect to MongoDB, create a Schema and Model, create an row
//available onMongoDB website homepage
//https://mongoosejs.com/
mongoose.connect('mongodb://localhost:27017/finance-claimer')
//Returns a Promise which is handled using then and catch
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => {
        console.log('Could not connect to MongoDB...', error);
    });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        //Removes whitespace from beginning and end of a string
        //https://docs.mongodb.com/manual/reference/operator/aggregation/trim/
        trim: true,
        required: [true, 'Name is required'],
        minlength: 1,
        maxlength: 255
        
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        //https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
        match: [/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]+)(\.[a-z]+)*$/, 'Please enter a valid email address'],
        minlength: 1,
        maxlength: 255
    },
    userRole: {
        type: String,
        required: [true, 'Uuser role is required'],
        enum: ['Project Manager',
                'Associate Project Manager',
                'Bangalore Team',
                'Mumbai Team',
                'Delhi Team'
            ],
        minlength: 1,
        maxlength: 255
    },
    accountName: {
        type: String,
        trim: true,
        required: [true, 'Account Name is required'],
        minlength: 1,
        maxlength: 255
    },
    bankName: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        minlength: 1,
        maxlength: 255
    },
    bankAccountNumber: {
        type: Number,
        required: true
    },
    ifscCode: {
        type: String,
        trim: true,
        uppercase: true,
        required: [true, 'IFSC Code is required'],
        minlength: 11,
        maxlength: 11,
        //Any 4 alphabtets followed by a 0 followed by 6 aplhabets
        //https://en.wikipedia.org/wiki/Indian_Financial_System_Code
        match: [/^[a-zA-Z]{4}0[a-zA-Z]{6}$/, 'Please enter a valid IFSC code'],
    }
});

const User = mongoose.model('user', userSchema);

const newUser = new User({
    name: 'Surbhi Garg',
    email: 'a@a.co',
    userRole: 'Associate Project Manager',
    accountName: 'Surbhi Garg',
    bankName: 'State Bank of India',
    bankAccountNumber: 12345,
    ifscCode: 'HHGF0IJHGKN'
});

newUser.save()
    .then(() => { console.log(newUser)})
    .catch((error) =>  { 
        console.log('User could not be saved to MongoDB...', error);
    });