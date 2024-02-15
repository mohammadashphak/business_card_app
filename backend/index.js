import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import Card from "./models/card.model.js";
import zod from "zod";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const user = zod.object({
  _id: zod.string().optional(),
  name: zod.string(),
  description: zod.string().optional(),
  interests: zod.array(zod.string()).optional(),
  socialMedias: zod
    .array(
      zod.object({
        name: zod.string(),
        url: zod.string(),
      })
    )
    .optional(),
});

app.get("/getcards", async (req, res) => {
  try {
    const cards = await Card.find();

    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/addcard", async (req, res) => {
  try {
    const createPayload = req.body;
    const parsedPayload = user.safeParse(createPayload);

    if (!parsedPayload.success) {
      res.status(400).json({ error: "Invalid Payload" });
      return;
    }

    await Card.create(createPayload);

    res.status(201).json({ msg: "Card created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.put("/updatecard", async (req, res) => {
  try {
    const updatePayload = req.body;
    const parsedPayload = user.safeParse(updatePayload);

    if (!parsedPayload.success) {
      res.status(400).json({ error: "Invalid Payload" });
      return;
    }

    await Card.findByIdAndUpdate(updatePayload._id, updatePayload);

    res.status(200).json({ msg: "Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/deletecard", async (req, res) => {
  try {
    const { _id } = req.body;

    await Card.findByIdAndDelete(_id);

    res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running at http://localhost:${PORT}`);
});
