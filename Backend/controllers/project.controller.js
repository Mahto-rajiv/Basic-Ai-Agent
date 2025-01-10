import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";

export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const loggedInUser = await User.findOne({ email: req.user.email });
    const userId = loggedInUser._id;
    const newProject = await projectService.createProject({ name, userId });
    res.status(201).json(newProject);
  } catch (error) {
    if (error.message === "Project name must be unique.") {
      return res.status(409).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};
