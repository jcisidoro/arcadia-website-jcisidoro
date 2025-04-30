const Event = require("../models/Event");
const { streamUpload, cloudinary } = require("../utils/cloudinary");

exports.createEvent = async (req, res) => {
  const {
    fromDate,
    toDate,
    title,
    speakers,
    attendees,
    description,
    description1,
    eventLink,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const parsedFromDate = new Date(fromDate);
  const parsedToDate = new Date(toDate);

  if (isNaN(parsedFromDate) || isNaN(parsedToDate)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  if (parsedFromDate >= parsedToDate) {
    return res
      .status(400)
      .json({ message: "Start date must be before end date" });
  }

  try {
    // Upload image to Cloudinary
    const publicId = req.file.originalname.split(".")[0] + "-" + Date.now();
    const uploadResult = await streamUpload(req.file.buffer, publicId);

    const newEvent = new Event({
      imageUrl: uploadResult.secure_url,
      fromDate: parsedFromDate,
      toDate: parsedToDate,
      title,
      speakers,
      attendees,
      description,
      description1,
      eventLink,
    });

    await newEvent.save();

    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while adding the event. Please try again later.",
      error,
    });
  }
};

exports.getAllUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today (midnight)

    const events = await Event.find({
      fromDate: { $gte: today }, // Only fetch events where fromDate is today or in the future
    }).sort({ fromDate: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching upcoming events", error });
  }
};

exports.getAllPastEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today (midnight)

    const events = await Event.find({
      fromDate: { $lt: today }, // Only fetch events where fromDate is strictly before today
    }).sort({ fromDate: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching past events", error });
  }
};

exports.updateEventById = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    speakers,
    attendees,
    description,
    description1,
    eventLink,
    fromDate,
    toDate,
  } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    let newImageUrl = event.imageUrl;

    if (req.file) {
      // Upload new image
      const publicId = req.file.originalname.split(".")[0] + "-" + Date.now();
      const uploadResult = await streamUpload(req.file.buffer, publicId);

      // Delete old image from Cloudinary
      if (event.imageUrl) {
        const oldUrlParts = event.imageUrl.split("/");
        const oldPublicId = oldUrlParts
          .slice(oldUrlParts.indexOf("upload") + 1)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(oldPublicId);
      }

      newImageUrl = uploadResult.secure_url;
    }

    // Update event fields
    event.title = title || event.title;
    event.speakers = speakers || event.speakers;
    event.attendees = attendees || event.attendees;
    event.description = description || event.description;
    event.description1 = description1 || event.description1;
    event.eventLink = eventLink || event.eventLink;
    event.fromDate = fromDate ? new Date(fromDate) : event.fromDate;
    event.toDate = toDate ? new Date(toDate) : event.toDate;
    event.imageUrl = newImageUrl;

    await event.save();

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the event",
      error,
    });
  }
};
