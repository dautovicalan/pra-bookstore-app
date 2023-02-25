const admin = require("firebase-admin");
var serviceAccount = require('../config/pra-project-admin-firebase-adminsdk-ra6pd-7cf92c6828.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "pra-project-admin"
});

module.exports = admin;

//email: test@test.com
//pass: 123456