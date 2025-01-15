const InvoiceServices = require("../services/invoiceServices");
const InvoiceServiceInstance = new InvoiceServices();
const crypto = require("crypto");
class InvoiceController {
  // Create a new invoice
  static createInvoice = async (req, res) => {
    try {
      // Generate a unique invoice URL
      const invoiceUrl = this.generateInvoiceUrl(); // Call the function to generate the URL

      // Add the URL to the invoice body
      req.body.invoiceDetails.url = invoiceUrl;
      const invoice = await InvoiceServiceInstance.createInvoice(req.body);
      console.log(invoice);
      res.status(201).json({ invoice, message: "Save Invoice Successfull" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Function to generate a unique invoice URL
    static generateInvoiceUrl() {
  // Generate a random 8-character string as a URL-safe identifier
  const uniqueString = crypto.randomBytes(20).toString("hex");
  
  // Construct the URL (you can customize the domain name here)
  const url = `http://localhost:3000/d/${uniqueString}`;

  return url;
}  


  // Get all invoices
  static getAllInvoices = async (req, res) => {
    try {
      const invoice = await InvoiceServiceInstance.getAllInvoices();
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get a single invoice
  static getInvoiceById = async (req, res) => {
    try {
      const invoice = await InvoiceServiceInstance.getInvoiceById(
        req.params.id
      );
      if (!invoice)
        return res
          .status(404)
          .json({ message: "Invoice not found with this given Id" });
      res.status(200).json(invoice);
    } catch (error) {
      if (error.message.includes("Cast to ObjectId failed"))
        return res.status(404).json({ message: "invalid id" });
      res.status(500).json({ message: "oops something wents wrong" });
    }
  };

  // static get Invoice by userId
  static getInvoicebyUserId = async (req, res) => {
    try {
      console.log(req.params.id);
      const invoice = await InvoiceServiceInstance.getInvoiceByuserId(
        req.params.id
      );
      if (!invoice)
        return res
          .status(404)
          .json({ message: "Invoice not found with this given Id" });
      res.status(200).json(invoice);
    } catch (error) {
      if (error.message.includes("Cast to ObjectId failed"))
        return res.status(404).json({ message: "invalid id" });
      res.status(500).json({ message: "oops something wents wrong" });
    }
  };

  // Update an invoice
  static updateInvoice = async (req, res) => {
    try {
      const { _id, __v, ...filteredData } = req.body;
      const invoice = await InvoiceServiceInstance.getInvoiceById(
        req.params.id
      );
      if (!invoice)
        return res
          .status(404)
          .json({ message: "Invoice not found with this given Id" });
      const updatedInvoice = await InvoiceServiceInstance.updateInvoice(
        req.params.id,
        filteredData
      );
      if (!updatedInvoice)
        return res.status(404).json({ message: "Invoice not found" });
      res.status(200).json(updatedInvoice);
    } catch (error) {
      if (error.message.includes("Cast to ObjectId failed"))
        return res.status(404).json({ message: "invalid id" });
      res.status(500).json({ message: "oops something wents wrong" });
    }
  };



  // status Update
  static updateInvoicestatus =async (req, res)=>{
     try {
      // const {id}=req.params;
      const {status}= req.body
      const updatedInvoice=await InvoiceServiceInstance.updateInvoicestatus(req.params.id,status)
      console.log(updatedInvoice)
      if (!updatedInvoice)
        return res.status(404).json({ message: "Invoice not found" });
      res.status(200).json(updatedInvoice);
     } catch (error) {
      res.status(500).send({ message: 'Internal Server Error', error });
     }
  }



  // Delete an invoice
  static deleteInvoice = async (req, res) => {
    try {
      const invoice = await InvoiceServiceInstance.getInvoiceById(
        req.params.id
      );
      if (!invoice)
        return res
          .status(404)
          .json({ message: "Invoice not found with this given Id" });
      const deletedInvoice = await InvoiceServiceInstance.deleteInvoice(
        req.params.id
      );
      if (!deletedInvoice)
        return res.status(404).json({ message: "Invoice not found" });
      res.status(200).json({ message: "Invoice deleted successfully!" });
    } catch (error) {
      if (error.message.includes("Cast to ObjectId failed"))
        return res.status(404).send("invalid id");
      res.status(500).send("oops something went wrong");
    }
  };
}
module.exports = InvoiceController;
