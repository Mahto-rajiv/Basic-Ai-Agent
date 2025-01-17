import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }

  if (!userId) {
    throw new Error("UserId is required");
  }

  let project;
  try {
    project = await projectModel.create({
      name,
      users: [userId],
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw error;
  }

  return project;
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  const allUserProjects = await projectModel.find({
    users: userId,
  });

  return allUserProjects;
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("Project Id is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId.");
  }

  if (!users) {
    throw new Error("users are required.");
  }

  if (!Array.isArray(users) || users.length === 0) {
    throw new Error("Users must be a non-empty array.");
  }

  if (users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))) {
    throw new Error("Invalid user ID(s) in the users array.");
  }

  if (!userId) {
    throw new Error("user ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId.");
  }

  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });

  if (!project) {
    throw new Error("User not belong to the this project.");
  }

  const updatedProject = await projectModel.findOneAndUpdate(
    { _id: project },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    {
      new: true,
    }
  );
  return updatedProject;
};

export const getProjectById = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("Project Id is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId.");
  }
  const project = await projectModel
    .findOne({
      _id: projectId,
    })
    .populate("users");

  return project;
};
