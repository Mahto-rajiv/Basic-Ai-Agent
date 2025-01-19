import * as ai from "../services/ai.service.js";

export const getResult = async (req, res) => {
  try {
    const { prompt } = req.query;
    const result = await ai.generateResult(prompt);
    res.json({ result: result });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message });
  }
};
