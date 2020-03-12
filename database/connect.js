var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dribbbleImages', { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    handleSuccess()
});

function handleSuccess() {
    var kittySchema = new mongoose.Schema({
        name: String,
        url: String
    })
    kittySchema.methods.speak = function () {
        var greeting = this.name ? '喵 my name is ' + this.name : 'I do not have a name'
        console.log(greeting)
    }
    // 构造文档document的class
    var Kitten = mongoose.model('Kitten', kittySchema)
    // var silence = new Kitten({ name: 'Silence' })
    // var fluffy = new Kitten({ name: 'fluffy' })

    // silence.save(function (err, kittens) {
    //     if (err) return console.error(err);
    //     console.log(11,kittens)
    // })
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err)
        console.log(22, kittens)
    })
}