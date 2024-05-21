import {  Task } from '@prisma/client';

import prisma from '../../../utils/prisma';
import ApiError from '../../../errors/ApiError';
import { scheduleTaskCompletion } from '../../helpers/scheduleTaskCompletion';

const createTask = async (task: Task): Promise<Task | null> => {
    const result = await prisma.task.create({
      data: task,
    });

    if (!result) {
      throw new ApiError(400, 'failed to created new Task');
    }

    scheduleTaskCompletion(result);
    return result;
  };



 
  const getAllTask = async (): Promise<Task[]> => {
    const result = await prisma.task.findMany();
    return result;
  };




const getTaskById = async (id: string): Promise<Task | null> => {
  const result = await prisma.task.findUnique({
    where: {
      id,
    },
 
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Task>,
): Promise<Task> => {
  const result = await prisma.task.update({
    where: {
      id,
    },
    data: payload,
   
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Task> => {
  const result = await prisma.task.delete({
    where: {
      id,
    },
  
  });
  return result;
};

export const taskService = {
 createTask,
 getAllTask,
 getTaskById,
 updateIntoDB,
 deleteFromDB
};
