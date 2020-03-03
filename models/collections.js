var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ad", {useNewUrlParser: true, useUnifiedTopology: true});


var milSchema = new mongoose.Schema({
    enlistedMen: Object,
    factoryPoints: Number,
    vessels: Object,
    research: Number,
    morale: Number,
    generals: Object
});
var mil = mongoose.model('mil', milSchema);

var ecoSchema = new mongoose.Schema({
    income: Number,
    expenditure: Number,
    balance: Number
});
var eco = mongoose.model('eco', ecoSchema);

var dipSchema = new mongoose.Schema({
    influence: Number,
    diplomats: Number,
    diplomaticStrength: Number,
    goodwill: Object
});
var dip = mongoose.model('dip', dipSchema);

var govSchema = new mongoose.Schema({
    type: String,
    patriotism: Number,
    support: Number
});
var gov = mongoose.model('gov', govSchema);

var espSchema = new mongoose.Schema({
    intrigue: Number,
    agents: Object,
    counterint: Object
});
var esp = mongoose.model('esp', espSchema);

var shopSchema = new mongoose.Schema({
    premiumLevel: Number,
    atoms: Number
});
var shop = mongoose.model('shop', shopSchema);



var userSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    password: String,
    secretQuestion: String,
    answer: Number,
    country: String,
    postalCode: Number,
    firstName: String,
    lastName: String,
    title: String,
    military: [milSchema],
    economy: [ecoSchema],
    diplomacy: [dipSchema],
    espionage: [espSchema],
    government: [govSchema],
    shop: [shopSchema]
});


var user = mongoose.model("user", userSchema);

module.exports = {
    userSchema,
    user
}