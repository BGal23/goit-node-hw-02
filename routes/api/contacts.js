const express = require("express");
const router = express.Router();
const { Contacts } = require("../../models/schema");
const { validatePerson } = require("../../models/validation");

router.get("/", async (req, res) => {
  const { favorite, page, limit } = req.query;
  const filter = favorite ? { favorite: favorite } : {};

  try {
    const contacts = await Contacts.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.findById(contactId);
    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been found",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const validate = validatePerson(body);
  const contact = new Contacts(validate.value);

  try {
    await contact.save();
    res.json({
      status: "success",
      code: 201,
      data: contact,
      message: "Contact has been found created",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  try {
    const deleteContact = await Contacts.deleteOne({ _id: contactId });
    res.json({
      status: "success",
      code: 200,
      data: deleteContact,
      message: "Contact has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const validate = validatePerson(body);
  try {
    const contact = await Contacts.findOneAndUpdate(
      { _id: contactId },
      validate.value,
      {
        new: true,
        upsert: true,
      }
    );
    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been created/updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
});

module.exports = router;
