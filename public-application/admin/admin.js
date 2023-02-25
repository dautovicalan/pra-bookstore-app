const admin = require("firebase-admin");
var serviceAccout = require("../config/pra-project-d34fc-firebase-adminsdk-aqpna-b9529dfab9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccout),
  projectId: "pra-project-d34fc",
});

module.exports = admin;

//paypal
//https://developer.paypal.com/developer/applications
//adautov@racunarstvo.hr
//ilovepra2022
//image kit dautovic2000
//firebase dautovic2000
