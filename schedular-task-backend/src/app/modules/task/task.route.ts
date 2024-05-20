import express from "express";

import { taskController } from "./task.controller";

const router = express.Router();

router.post("/create-task", taskController.createTask);
router.get("/", taskController.getAllTask);
router.get("/:id", taskController.getTaskById);


router.delete("/:id", taskController.deleteFromDB);

router.patch("/:id", taskController.updateIntoDB);

export const taskRoutes = router;
