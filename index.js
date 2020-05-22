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
    name: String
});

const User = mongoose.model('user', userSchema);

const newUser = new User({
    name: 'Surbhi Garg'
});

newUser.save()
    .then(() => { console.log(newUser)})
    .catch(() => console.log('User could not be saved'));