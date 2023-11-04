const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}


const password = process.argv[2]
const Phone_Number = process.argv[4]
const Name = process.argv[3]

const url =
    `mongodb+srv://chern05:${password}@cluster0.4miev8b.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
const phoneSchema = new mongoose.Schema({
    Name: String,
    Phone_Number: String,
})
phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Phone = mongoose.model('phones', phoneSchema)
if (process.argv.length == 3) {
    phone.find({}).then(result => {
        console.log("PhoneBook:")
        result.forEach(phone => {
            console.log(phone.Name, phone.Phone_Number)
        })
        mongoose.connection.close()
    })
} else {
    const phone = new Phone({
        Name,
        Phone_Number
    })
    phone.save().then(result => {
        console.log(`Added ${result.Name} number ${result.Phone_Number} to phonebook`)
        mongoose.connection.close()
    })
}

module.exports = mongoose.model('Phone', phoneSchema)
