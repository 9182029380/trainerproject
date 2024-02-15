const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey";
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;
const uri = "mongodb+srv://avinash:avinash@cluster0.rlhitli.mongodb.net/";
app.use(bodyParser.json());
 

//----------------- Connect to MongoDB Atlas--------------------
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "registration_db", // Specify the database name
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));
 
  

//------------------- All schemas ------------------------------

// Define Trainer schema
const trainerSchema = new mongoose.Schema({
  username: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true },
  contactNumber: { type: String, required: true },
  skills: { type: String, required: true },
  city: { type: String, required: true },
  chargePerDay: { type: String, required: true },
  trainerType: { type: String, default: "" },
  openToTravel: { type: Boolean,default: false },
  deliveryMode: { type: Boolean,default: false},
  clients: { type: String,default: "" },
  Resume: { type: String,default: "" },
  linkedInUrl: { type: String,default: "" },
  role: { type: String, default: "trainer" },
});
 

// trainer invoice schema
const trainerInvoiceSchema = new mongoose.Schema({
  trainerId: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
  poId: { type: Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
  businessId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  amount: { type: String, required: true },
  contactNumber : {type: String, required:true},
  raiseStatus: { type: Boolean, required: true,default:true},
  paymentStatus: { type: Boolean, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
 
});


// Define Company schema
const companySchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  domain: { type: String, required: true },
  role: { type: String, default: "company" },
});


//business request schemas
const businessRequestSchema = new mongoose.Schema({
  uniqueId: { type: mongoose.Schema.Types.ObjectId, ref: 'companies', required: true },
  batchName: { type: String, required: true },
  technology: { type: String, required: true },
  numberOfTrainees: { type: Number, required: true },
  durationOfTraining: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  trainingBudget: { type: Number, required: true }
});
 

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  company_id: String,
  trainer_name: String,
  trainer_id: String,
  stars: Number,
  feedback_description: String,
});


// purchase order schema
const purchaseOrdersSchema = new mongoose.Schema({
  businessId: { type: String, required: true },
  trainerEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: Boolean, required: true },
  endDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
});
 
 
 
const Trainer = mongoose.model("Trainer", trainerSchema);
const Company = mongoose.model("Company", companySchema);
const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrdersSchema);
const TrainerInvoice = mongoose.model('TrainerInvoice',trainerInvoiceSchema);
const BusinessRequest = mongoose.model('BusinessRequest', businessRequestSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);
 
 
app.use(cors());
app.use(express.json());

// JWT Authentication 
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
 
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err); // Log verification errors
        return res.sendStatus(403); // Forbidden
      }
 
      console.log("Decoded Token:", user); // Log decoded user information
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
 
const authorizeRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};
 

// --------------------- Trainers ------------------------------------------

// Trainer registration endpoint
app.post("/trainers", async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      contactNumber,
      skills,
      city,
      chargePerDay,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTrainer = new Trainer({
      username,
      password: hashedPassword,
      name,
      email,
      contactNumber,
      skills,
      city,
      chargePerDay,
    });

    await newTrainer.save();
    res.status(201).json({ message: "Trainer registered successfully" });
  } catch (error) {
    console.error("Error registering trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Find trainer by username endpoint
app.get("/trainers/:email", async (req, res) => {
  const { email } = req.params;
  // console.log(username)
  try {
    // Find the trainer by username
    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json(trainer);
  } catch (error) {
    console.error("Error finding trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update trainer by username endpoint
app.put("/trainers/:email", async (req, res) => {
  const { email: updatedEmail } = req.params; // Rename 'email' to 'updatedEmail'

  try {
    // Find the trainer by email
    let trainer = await Trainer.findOne({ email: updatedEmail });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Update trainer fields
    const {
      password,
      name,
      email,
      contactNumber,
      skills,
      city,
      chargePerDay,
      trainerType,
      openToTravel,
      deliveryMode,
      clients,
      Resume,
      linkedInUrl
    } = req.body;

    if (password) {
      trainer.password = password;
    }
    if (name) {
      trainer.name = name;
    }
    if (email) {
      trainer.email = email;
    }
    if (contactNumber) {
      trainer.contactNumber = contactNumber;
    }
    if (skills) {
      trainer.skills = skills;
    }
    if (city) {
      trainer.city = city;
    }
    if (chargePerDay) {
      trainer.chargePerDay = chargePerDay;
    }
    if (trainerType !== undefined) {
      trainer.trainerType = trainerType;
    }
    if (openToTravel !== undefined) {
      trainer.openToTravel = openToTravel;
    }
    if (deliveryMode !== undefined) {
      trainer.deliveryMode = deliveryMode;
    }
    if (clients) {
      trainer.clients = clients;
    }
    if (Resume) {
      trainer.Resume = Resume;
    }
    if (linkedInUrl) {
      trainer.linkedInUrl = linkedInUrl;
    }

    // Save the updated trainer
    trainer = await trainer.save();

    res.status(200).json({ message: "Trainer updated successfully", trainer });
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

 
//get all the details of PO for a particular trainer id
app.get('/purchase-orders/:email', async (req, res) => {
  const { email } = req.params;
 
  try {
    const purchaseOrders = await PurchaseOrder.find({ trainerEmail: email });
    res.json(purchaseOrders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
// fetched trainer accepted tarinings i.e feching my training for particular trainer
app.get('/training-orders/:email', async (req, res) => {
  const { email } = req.params;
 
  try {
    const purchaseOrders = await PurchaseOrder.find({ trainerEmail: email, status: true });
    res.json(purchaseOrders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
// PUT route to accept a purchase order
app.put('/purchase-orders/:id/accept', async (req, res) => {
  const { id } = req.params;
 
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(id, { status: true }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating purchase order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
// PUT route to reject a purchase order
app.put('/purchase-orders/:id/reject', async (req, res) => {
  const { id } = req.params;
 
  try {
    const deletedOrder = await PurchaseOrder.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.json({ message: 'Purchase order rejected and deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
 
// PUT route to raise an invoice for a purchase order 
app.put('/raise-invoice/:id', async (req, res) => {
  const purchaseOrderId = req.params.id;
 
  try {
    // Fetch the purchase order from the database
    const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase order not found.' });
    }
 
    // Fetch the trainer details from the database using the trainer's email from the purchase order
    const trainer = await Trainer.findOne({ email: purchaseOrder.trainerEmail });
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found.' });
    }
 
    // Create a new TrainerInvoice document
    const newInvoice = new TrainerInvoice({
      trainerId: trainer._id,
      poId: purchaseOrder._id,
      businessId: purchaseOrder.businessId,
      name: trainer.name,
      email: trainer.email,
      amount: purchaseOrder.amount,
      contactNumber: trainer.contactNumber,
      raiseStatus:true,
      paymentStatus: false, // Set paymentStatus to false initially
      startDate: purchaseOrder.startDate,
      endDate: purchaseOrder.endDate,
    });
 
    // Save the new invoice to the database
    await newInvoice.save();
 
    res.status(200).json({ message: 'Invoice raised successfully.' });
  } catch (error) {
    console.error('Error raising invoice:', error);
    res.status(500).json({ error: 'An error occurred while raising the invoice.' });
  }
});
 

// GET Trainer Invoice by ID
app.get('/invoices/:email', async (req, res) => {
  try {
    const trainerInvoices = await TrainerInvoice.find({ email: req.params.email });
    if (!trainerInvoices || trainerInvoices.length === 0) {
      return res.status(404).json({ message: 'Trainer invoices not found' });
    }
    res.json(trainerInvoices);
  } catch (error) {
    console.error('Error fetching trainer invoices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 

//------------------------------- Company ---------------------------------- 
 
// Company registration endpoint
app.post("/companies", async (req, res) => {
  try {
    const { email } = req.body;
 
    // Check if email already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Email already exists" });
    }
 
    // If email doesn't exist, proceed with registration
    const { uniqueId, companyName, location, phone, password, domain } =
      req.body;
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newCompany = new Company({
      uniqueId,
      companyName,
      location,
      phone,
      email,
      password: hashedPassword,
      domain,
    });
 
    await newCompany.save();
    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Business request for trainer
app.post('/businessrequest', authenticateJWT, async (req, res) => {
  try {
    console.log(req);
    // Extract the company's uniqueId from the authenticated user
    const companyDocument = await Company.findById(req.user.id);
    const companyUniqueId = companyDocument._id ;
   
 
    // Ensure that the authenticated user is a company and has a uniqueId
    if (!companyUniqueId) {
      return res.status(400).json({ error: 'Company uniqueId is required.' });
    }
 
    // Create a new business request with the company's uniqueId
    const newBusinessRequest = await BusinessRequest.create({
      ...req.body,
      uniqueId: companyUniqueId,
    });
 
    console.log('Business Request Data inserted successfully:', newBusinessRequest);
 
    return res.status(200).json({ message: 'Business Request Data submitted successfully' });
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    console.log(req.uniqueId);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Find company by username endpoint
app.get("/companies/:email", async (req, res) => {
  const { email } = req.params;
  // console.log(username)
  try {
    // Find the trainer by username
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "company not found" });
    }
 
    res.status(200).json(company);
  } catch (error) {
    console.error("Error finding trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update trainer by username endpoint
app.put("/companies/:email", async (req, res) => {
  const { email: updatedEmail } = req.params; // Rename 'email' to 'updatedEmail'
 
  try {
    // Find the trainer by email
    let company = await Company.findOne({ email: updatedEmail });
    if (!company) {
      return res.status(404).json({ message: "company not found" });
    }
 
    // Update trainer fields
    const {
      password,
      companyName,
      email,
      location,
      phone,
      domain
    } = req.body;
 
    if (password) {
      company.password = password;
    }
    if (companyName) {
      company.companyName = companyName;
    }
    if (email) {
      company.email = email;
    }
    if (location) {
      company.location = location;
    }
    if (phone) {
      company.phone = phone;
    }
    if (domain) {
      company.domain = domain;
    }
  
    // Save the updated trainer
    company = await company.save();
 
    res.status(200).json({ message: "Trainer updated successfully", company });
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to submit feedback form
app.post("/feedback", async (req, res) => {
  const feedbackData = req.body;
 
  try {
    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
 
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});



// ---------------------------- Admin ----------------------------------

//login logic
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
 
  try {
    // Check if the provided credentials are for the admin
    if (email == "admin@gmail.com" && password == "admin") {
      // Generate token for admin as well
      const token = jwt.sign({ email, role: "admin" }, secretKey, {
        expiresIn: "1h",
      });
      return res.status(200).json({ role: "admin", token }); // Return admin role and token
    }
 
    // Proceed with regular user login for trainer or company
    let user = await Trainer.findOne({ email });
    let role = "trainer";
 
    if (!user) {
      user = await Company.findOne({ email });
      role = "company";
    }
 
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Generate token with addiional uniqueId for company users
      const tokenPayload = {email: user.email, role, id:user._id};


      const token = jwt.sign(tokenPayload, secretKey, {
        expiresIn: "1h",
      });

      res.status(200).json({ role, token }); // Send the token to the client
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
 

// Modify the admin-dashboard route to apply authentication middleware
app.get(
  "/admin-dashboard",
  authenticateJWT, // Apply authentication middleware
  authorizeRole(["admin"]), // Apply authorization middleware
  (req, res) => {
    // Admin dashboard code
    res.send("Welcome to the Admin Dashboard");
  }
);
 

app.get(
  "/trainer-dashboard",
  authenticateJWT,
  authorizeRole(["trainer"]),
  (req, res) => {
    // Trainer dashboard code
    res.send("Welcome to the Trainer Dashboard");
  }
);
 

app.get(
  "/business-dashboard",
  authenticateJWT,
  authorizeRole(["company"]),
  (req, res) => {
    // Business dashboard code
    res.send("Welcome to the Business Dashboard");
  }
);
 

app.get("/trainers", async (req, res) => {
  try {
    const trainers = await Trainer.find({}, { password: 0 });
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
 

app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// ----------------------------- Listening ----------------------------------------------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 