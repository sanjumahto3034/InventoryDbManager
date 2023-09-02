const User = require("./User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");
const emailExistence = require("email-existence");
const { Telnet } = require("telnet-client");
const net = require("net");


const VerifyEmail = () => {
  // const connection = new net();
  const params = {
    host: "gmail-smtp-in.l.google.com",
    port: 25,
    timeout: 5000,
  };


  const connection = net.createConnection(params);
  connection.on("connect", function () {
    console.log("Connecting to the Telnet server");
    connection.write("HELO gmail.com\n",()=>{
      console.log("Write HELO Success");
    });
    // Now you can send and receive data
  });
  connection.on("ready", function () {
    console.log("Connected to the Telnet server");
    // Now you can send and receive data
  });

  connection.on("data", function (data) {
    console.log("Data data: " + data);

    const response = data.toString();
    // response = "250 2.1.0 OK g16-20020a056870a71000b001aa120af917si2999337oam.166 - gsmtp"
    // if(response.includes("220")){
    //   connection.write("HELO gmail.com\n",(res)=>{
    //     console.log("Write HELO Success",res);
    //   });
    // }

    if(response.includes("250")){
      connection.write("mail from:<sanjumahto3034@gmail.com>\r\n",()=>{
        console.log("Calling Mail From Success");
      });
    }

    if(response.includes("250 2.1.0")){
      connection.write("rcpt to:<sanjumahto328@gmail.com>\r\n",()=>{
        console.log("Write RCPT TO Success");
      });
    }

    if(response.includes("250 2.1.5")){
        console.log("Mail is valid");
    }

    if(response.includes("550-5.1.1")){
      console.log("Mail is invalid");
  }


    // Handle incoming data here
  });

  connection.on("end", function () {
    console.log("Disconnected from the Telnet server");
  });

  connection.on("error", function (err) {
    console.error("Telnet error Found: " + err);
  });
};

VerifyEmail();
// function verifyEmail(email) {
//   console.log("Starting To connect Mail Server")
//   return new Promise((resolve, reject) => {
//     const client = net.createConnection({
//       host: "ff-ip4-mx-vip2.prodigy.net",
//       port: 25,
//     });
//     client.on("connect", () => {
//       console.log("SMTP Connected ");

//     });

//     client.on("data", async (data) => {
//       const response = data.toString("hex");
//       console.log("Data Log : ", data);
//       console.log("Data TYPE : ", typeof data);

//       client.write("EHLO google.com" + "\r\n\r\n");

//       client.write("MAIL FROM:<sanjumahto3034@gmail.com>\r\n", (err) => {
//         if (err) {
//           console.log("Failed TO Fetch : " + err);
//           return;
//         }
//         console.log("Mail From Write Success");
//       });

//       client.write("RCPT TO:<sanjumahto328@gmail.com>}>\r\n", (err, cb) => {
//         if (err) {
//           console.log("Failed TO Fetch : ", email + err);
//           return;
//         }
//         console.log("RCPT Write Success");
//       });
//     });

//     client.on("end", () => {
//       // Connection closed
//       client.destroy();
//       console.log("SMTP Connection Close");
//     });

//     client.on("error", (err) => {
//       // Handle connection errors
//       reject(err.message);
//       console.log("SMTP Error : ", err.message);
//     });
//   });
// }

// // Usage example
// const emailToVerify = "sanjumahto3034@gmail.com";
// verifyEmail(emailToVerify)
//   .then((isValid) => {
//     if (isValid) {
//       console.log(`${emailToVerify} is a valid email address.`);
//     } else {
//       console.log(`${emailToVerify} is not a valid email address.`);
//     }
//   })
//   .catch((error) => {
//     console.error(`Error: ${error}`);
//   });

// const net = require("net");

// const host = "smtp.mail.att.net";
// const port = 465;
// const senderEmail = "sanjumahto3034@gmail.com";
// const recipientEmail = "chandrapal3000@gmail.com";

// const client = net.connect(port,host,()=>{
//     console.log("Try To Connect");
// })
// client.on('connect', () => {
//   console.log('Connected to SMTP server');

// });
// client.on('data', (data) => {
//   console.log("Data Found",data);

//   // Simulate an SMTP conversation
//   // if (data.toString().startsWith('220')) {
//   //   client.write(`EHLO yourdomain.com\r\n`); // Replace 'yourdomain.com'
//   // } else if (data.toString().startsWith('250')) {
//   //   client.write(`MAIL FROM:<${senderEmail}>\r\n`);
//   // } else if (data.toString().startsWith('250')) {
//   //   client.write(`RCPT TO:<${recipientEmail}>\r\n`);
//   // }
// });

// client.on('end', () => {
//   console.log('Disconnected from SMTP server');
// });
// client.on('error', (err) => {
//   console.error('Error:', err.message);
// });

// client.on('close', () => {
//   // Check the SMTP server responses to determine email validity
//   if (client.destroyed) {
//     console.log('Email address may not exist (550 User not found)');
//   } else {
//     console.log('Email address is valid (250 OK)');
//   }
// });

// // Handle the connection being closed by the SMTP server
// client.on('close', () => {
//   console.log('Connection closed by SMTP server');
// });

// // Handle any errors that occur during the connection
// client.on('error', (err) => {
//   console.error('Error:', err.message);
// });

//===================================
const SECRET_KEY =
  "mcodvhrnfolfgohlrhfugoypfnr7593hf9tgg5eego069gkrnkgordlfvbhgptktgei";
const HASH_PASSWORD_KEY =
  "kj98ufo2ihfofjseof03i4598glfkkahofiweprkkldfnvowert9w0epgojldkfnvlksdmfgpowjret";

const splitBearerToken = (token) => {
  token = token + "";
  token = token.replace("Bearer ", "");

  return token;
};

const STATUS_CODE = {
  SUCCESS: 200,
  FAILED: 401,
  NO_AUTH_TOKEN: 402,
  INVALID_CREDENTIALS: 403,
  USERNAME_ALREADY_EXISTED: 404,
  EMAIL_ALREADY_EXISTED: 405,
  PASSWORD_NOT_MATCHING: 406,
  TOKEN_EXPIRED: 407,
  NOT_FOUND: 408,
  SERVER_ERROR: 500,
  BAD_REQUEST: 501,
  UNAUTHORIZED: 501,
};

const generateHashPassword = (password) => {
  const hash = crypto
    .pbkdf2Sync(password, HASH_PASSWORD_KEY, 10000, 64, "sha512")
    .toString("hex");
  return hash;
};
const testAPI = (req, res, next) => {
  // res.send(generateToken());
  res.send(checkIfUserAlreadyExist("sflksdjf"));
};
var checkIfUserAlreadyExist = async (email) => {};

const verifyResponse = (res, response) => {
  if (!response) {
    res.status = STATUS_CODE.FAILED;
    res.json({
      status: STATUS_CODE.FAILED,
      ErrorMessage: "No Data Found",
    });
    return false;
  }
  return true;
};
const verifyToken = (res, token) => {
  if (!token) {
    res.status(401).json({
      status: 401,
      message: "No Token Found In Header",
    });
    return false;
  }
  return true;
};

var generateToken = (email, password) => {
  const payload = {
    email: email,
    password: password,
  };
  return (token = jwt.sign(payload, SECRET_KEY));
};

const check = (req, res, next) => {
  console.log("API is Running");
  res.status(200);
  res.json({
    status: 200,
    message: "API Is Running",
  });
};

const index = (req, res, next) => {
  User.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ message: "Error :" + error });
    });
};

const show = (req, res, next) => {
  let userId = req.body.userId;
  console.log("Request By user To Show Data :", req.body.userId);
  User.findById(userId)
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ message: "Error :" + error });
    });
};

const register = (req, res, next) => {
  var _name = req.body.name;
  var _email = req.body.email;
  var _phoneNo = req.body.phoneNo;
  var _accType = req.body.accountType;
  var _password = generateHashPassword(req.body.password);
  var _token = generateToken(req.body.email, _password);

  validateAndRegistration((status) => {
    if (!status) {
      let data = new User({
        name: _name,
        email: _email,
        phoneNo: _phoneNo,
        password: _password,
        accountType: _accType,
        token: _token,
      });
      data
        .save()
        .then(() => {
          res.status(STATUS_CODE.SUCCESS);
          res.json({
            status: STATUS_CODE.SUCCESS,
            message: "Registration Successful",
            token: _token,
          });
        })
        .catch((error) => {
          res.status(401);
          res.json({ message: "Error :" + error });
        });
    } else {
      res.status(STATUS_CODE.EMAIL_ALREADY_EXISTED);
      res.json({
        status: STATUS_CODE.EMAIL_ALREADY_EXISTED,
        message: "User already exist. Please sign in to continue",
      });
    }
  }, _email);
};
const validateAndRegistration = async (callback, _email) => {
  try {
    const query = { email: _email };
    const result = await User.findOne(query);
    console.log;
    callback(result);
  } catch (e) {
    callback(null);
    console.log(e);
  }
};

const loginWithToken = (req, res, next) => {
  let _token = splitBearerToken(req.headers.authorization);

  User.findOne({ token: _token })
    .then((response) => {
      if (!response) {
        res.json({
          status: STATUS_CODE.TOKEN_EXPIRED,
          message: "Invalid/Expired Token",
        });
        return;
      }

      res.json({
        status: STATUS_CODE.SUCCESS,
        message: "Authentication Using Token Successful",
        data: {
          name: response.name,
          phoneNo: response.phoneNo,
          email: response.email,
          inventory: response.inventory,
        },
      });
    })
    .catch((error) => {
      res.json(() => {
        res.json({
          status: STATUS_CODE.TOKEN_EXPIRED,
          message: "Invalid/Expire Token",
          error: {
            message: error,
          },
        });
      });
    });
};

const update = (req, res, next) => {
  let emailId = req.body.email;
  let data = {
    name: req.body.name,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    password: req.body.password,
  };
  User.findOneAndUpdate(
    { email: emailId },
    { $set: data },
    { returnOriginal: false }
  )
    .then(() => {
      res.json({ message: "User Update Successful" });
    })
    .catch((error) => {
      res.json({ Error: error });
    });
};

const find = (req, res, next) => {
  let emailId = req.body.email;
  User.findOne({ email: emailId })
    .then((response) => {
      res.json({ message: response || "No User Found" });
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
const remove = (req, res, next) => {
  let userId = req.body.userId;
  User.findByIdAndRemove(userId)
    .then(() => {
      res.json({ message: "User Delete Successfully" });
    })
    .catch((error) => {
      res.json({ message: "Error :" + error });
    });
};

const login = (req, res, next) => {
  let emailId = req.body.email;
  let password = generateHashPassword(req.body.password);
  const token = generateToken();

  User.findOne({ email: emailId })
    .then((response) => {
      if (response.password === password) {
        return User.updateOne({ email: emailId }, { $set: { token: token } })
          .then(() => {
            res.status = STATUS_CODE.SUCCESS;
            res.json({
              status: STATUS_CODE.SUCCESS,
              message: "Login Successful",
              token: token,
            });
          })
          .catch((error) => {
            console.error("Error updating token:", error);
            res.status = STATUS_CODE.FAILED;
            res.json({
              status: STATUS_CODE.FAILED,
              message: "An error occurred during token update.",
              error: {
                message: error,
              },
            });
          });
      } else {
        res.status = STATUS_CODE.FAILED;
        res.json({
          status: STATUS_CODE.PASSWORD_NOT_MATCHING,
          message: "Password Incorrect",
        });
      }
    })
    .catch((error) => {
      res.json({
        status: STATUS_CODE.BAD_REQUEST,
        message: "Login Failed",
        error: {
          message: error,
        },
      });
    });
};

const addInventory = (req, res, next) => {
  var _token = splitBearerToken(req.headers.authorization);
  var _productId = req.body.product_id.replace("#", "");
  var _productName = req.body.product_name;
  var _productDate = req.body.product_date;
  var _productStockRemain = req.body.stock_remain;
  var _productStatus = req.body.stock_status;
  let data = {
    inventory: {
      product_id: "#" + _productId,
      product_name: _productName,
      product_date: _productDate,
      product_stock_remain: _productStockRemain,
      product_status: _productStatus,
    },
  };

  if (!verifyToken(res, _token)) {
    return;
  }

  User.findOneAndUpdate(
    { token: _token },
    { $push: data },
    { returnOriginal: true }
  )
    .then(() => {
      res.json({
        status: 200,
        message: "Inventory Added Successfully",
        data: {
          product_id: _productId,
          product_name: _productName,
          product_date: _productDate,
          product_stock_remain: _productStockRemain,
          product_status: _productStatus,
        },
      });
    })
    .catch((error) => {
      res.json({ Error: error });
    });
};
const getInventory = (req, res, next) => {
  var _token = splitBearerToken(req.headers.authorization);
  console.log("API Get Inventory Hit", _token);
  if (!verifyToken(res, _token)) {
    return;
  }
  User.findOne({ token: _token })
    .then((response) => {
      res.status = STATUS_CODE.SUCCESS;
      res.json({ status: STATUS_CODE.SUCCESS, message: response["inventory"] });
    })
    .catch((err) => {
      res.json({ ErrorMessage: "No Inventory Found" });
    });
};
const removeInventory = (req, res, next) => {
  const productToRemove = req.body.product_id;
  console.log("Request To Remove Product ID : " + productToRemove);
  const token = splitBearerToken(req.headers.authorization);
  if (!productToRemove || productToRemove == "") {
    res.status(STATUS_CODE.FAILED).json({
      status: STATUS_CODE.FAILED,
      "Error Message": "Product ID is Missing",
    });
    return;
  }

  User.findOneAndUpdate(
    { token: token },
    { $pull: { inventory: { product_id: productToRemove } } },
    { new: true }
  )
    .then((response) => {
      if (!response) {
        // If the user with the given token is not found
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ message: "User not found." });
      }

      res
        .status(STATUS_CODE.SUCCESS)
        .json({ status: STATUS_CODE.SUCCESS, message: response["inventory"] });
    })
    .catch((err) => {
      res.status(STATUS_CODE.ERROR).json({ message: err });
    });
};

const userDetails = (req, res, next) => {
  var _token = splitBearerToken(req.headers.authorization);
  if (!verifyToken(res, _token)) {
    return;
  }
  console.log("Token : ", _token);

  User.findOne({ token: _token })
    .then((response) => {
      console.log("Response : ", data);
      if (verifyResponse(res, response)) {
        res.status = STATUS_CODE.SUCCESS;
        res.json({
          status: STATUS_CODE.SUCCESS,
          data: {
            name: response?.name,
            email: response?.email,
            phoneNo: response?.phoneNo,
          },
        });
      }
    })
    .catch((err) => {
      res.status = STATUS_CODE.NOT_FOUND;
      res.json({ message: err });
    });
};

const requestValidEmail = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Email is : " + email);

  emailExistence.check(email, function (error, response) {
    if (error) {
      console.log("Email Validation error :   " + error);
    }
    console.log("res: " + data);
  });

  try {
    // Create a test transporter
    const transporter = nodemailer.createTransport({
      streamTransport: true, // Use a stream transport for validation only
    });

    // Use the validateSender method to check if the email is valid
    const info = await transporter.validateSender({
      from: email,
    });

    // If there are no errors, the email is valid
    res.status(200).send("ok");
  } catch (error) {
    res
      .status(401)
      .send(`Email ${email} is not valid. Error: ${error.message}`);
  }
};
async function isEmailValid(email) {
  return await emailValidator.validate(email);
}
const downloadVideo = async (req, res, next) => {
  try {
    const response = await fetch(
      "https://cdn18.savetube.me/info?url=https://www.youtube.com/shorts/ng38j_GGWBE"
    );
    const videoBlob = await response.blob();
    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    res.setHeader("Content-Type", "video/mp4");
    res.send("Fetch Success");
  } catch (error) {
    res.status(500).send("Error fetching video.");
  }
};
module.exports = {
  index,
  show,
  register,
  check,
  update,
  remove,
  find,
  login,
  addInventory,
  testAPI,
  loginWithToken,
  getInventory,
  removeInventory,
  userDetails,
  downloadVideo,
  requestValidEmail,
};
