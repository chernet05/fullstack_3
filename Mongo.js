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

const noteSchema = new mongoose.Schema({
    Name: String,
    Phone_Number: String,
})

const Note = mongoose.model('notes', noteSchema)
if (process.argv.length == 3) {
    Note.find({}).then(result => {
        console.log("PhoneBook:")
        result.forEach(note => {
            console.log(note.Name, note.Phone_Number)
        })
        mongoose.connection.close()
    })
} else {
    const note = new Note({
        Name,
        Phone_Number
    })
    note.save().then(result => {
        console.log(`Added ${result.Name} number ${result.Phone_Number} to phonebook`)
        mongoose.connection.close()
    })
}

