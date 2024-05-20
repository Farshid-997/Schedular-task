import { Task } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { taskService } from './task.service';


const createTask: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      
      const result = await taskService.createTask(req.body);
      sendResponse<Task>(res, {
        success: true,
        statusCode: 200,
        message: 'Task created successfully',
        data: result,
      });
    },
  );

  const getAllTask = catchAsync(
    async (req: Request, res: Response) => {
      
      const result = await taskService.getAllTask();
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Task fetched successfully',
        
        data: result,
      });
    },
  );



const getTaskById = catchAsync(async (req: Request, res: Response) => {
  const result = await taskService.getTaskById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single task fetched successfully',
    data: result,
  });
});


const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await taskService.updateIntoDB(req.params.id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'task updated successfully',
      data: result,
    });
  });
  
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await taskService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'task deleted successfully',
    data: result,
  });
});


export const taskController = {
 createTask,
 getAllTask,
 getTaskById,
 deleteFromDB,
 updateIntoDB
};
