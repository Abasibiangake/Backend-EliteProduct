// Do not expose your credentials in your code.
require('dotenv').config()
//console.log(process.env) // remove this after you've confirmed it working


module.exports = {
    "ATLASDB": process.env.ATLASDB,
    "SECRETKEY": process.env.SECRETKEY
    // "ATLASDB": "mongodb+srv://myappuser:MaajX7F0woW8UhYN@cluster-comp229-elitepr.9lhzsup.mongodb.net/eliteProductDatabase?retryWrites=true&w=majority",
    // "SECRETKEY": "y$B&E)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s"
}