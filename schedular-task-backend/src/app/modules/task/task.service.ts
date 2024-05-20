import {  Task } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import prisma from '../../../utils/prisma';

import ApiError from '../../../errors/ApiError';

const createTask = async (task: Task): Promise<Task | null> => {
    const result = await prisma.task.create({
      data: task,
    });

    console.log("result",result)

    const taskDate = new Date(result.date);
   
    const now = new Date();
    const nowUTC6 = new Date(now.getTime() + (6 * 60 * 60 * 1000)); 
  
    
    if (taskDate > now) {
      const delay = taskDate.getTime() - nowUTC6.getTime();
     
     
    
      setTimeout(async () => {
        await prisma.task.update({
          where: { id: result?.id },
          data: { status: 'complete' },
        });
        const log = `${new Date().toISOString()}: [Task ID: ${result.id}] ${result.description}\n`;
        fs.appendFileSync(path.join(__dirname, '../../tasks.log'), log);
      }, delay);
    }
  
    if (!result) {
      throw new ApiError(400, 'failed to created new Task');
    }
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
