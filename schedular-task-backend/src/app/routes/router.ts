import express from 'express';
import { taskRoutes } from '../modules/task/task.route';


const router = express.Router();

const moduleRoutes = [


  {
    path: "/task",
    route: taskRoutes,
  },


];

moduleRoutes.forEach((route) => router.use(route.path, route?.route));
export default router;
