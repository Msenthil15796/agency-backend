const router = require("express").Router();
const Agency = require("../Schema/agencySchema");
const Client = require("../Schema/clientSchema");

router.post("/create", async (req, res) => {
  if (req.body.clientId) {
    try {
      const client = new Client({
        clientId: req.body.clientId,
        agencyId: req.body.agencyId,
        name: req.body.name,
        email: req.body.email,
        totalBill: req.body.totalBill,
        phone: req.body.phone,
      });

      const data = await client.save();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    try {
      const agency = new Agency({
        agencyId: req.body.agencyId,
        name: req.body.name,
        address_line1: req.body.address_line1,
        address_line2: req.body.address_line2,
        state: req.body.state,
        city: req.body.city,
        phone: req.body.phone,
      });

      const data = await agency.save();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//update
router.put("/client/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      const updatedClient = await Client.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedClient);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("User not found");
  }
});

router.get("/getAgency/:id", async (req, res) => {
  if (req.params.id) {
    try {
      const agency = await Agency.findOne({ agencyId: Number(req.params.id) });
      const details = await Client.find({ agencyId: Number(agency.agencyId) });

      const sortedList = await details.sort((a, b) => {
        return b.totalBill - a.totalBill;
      });

      const finalData = await sortedList.map((client) => {
        return { ClientName: client.name, totalBill: client.totalBill };
      });
      res.status(200).json({
        AgencyName: agency.name,
        ClientDetails: finalData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("User not found");
  }
});
module.exports = router;
