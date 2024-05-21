
import fs from 'fs';
import path from 'path';
import {  Task } from '@prisma/client';
import prisma from '../../utils/prisma';
export const scheduleTaskCompletion = (task: Task) => {
    const taskDate = new Date(task.date);
    const now = new Date();
    const nowUTC6 = new Date(now.getTime() + (6 * 60 * 60 * 1000)); 
  
    if (taskDate > now) {
      const delay = taskDate.getTime() - nowUTC6.getTime();
  
      setTimeout(async () => {
        await prisma.task.update({
          where: { id: task.id },
          data: { status: 'complete' },
        });
        const log = `${new Date().toISOString()}: [Task ID: ${task.id}] ${task.title}\n`;
        fs.appendFileSync(path.join(__dirname, '../../tasks.log'), log);
      }, delay);
    }
  };