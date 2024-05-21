import prisma from "../../utils/prisma";
import fs from 'fs';
import path from 'path';
export const checkAndCompleteOverdueTasks = async () => {
    const now = new Date();
    const nowUTC6 = new Date(now.getTime() + (6 * 60 * 60 * 1000)); 
  
    const overdueTasks = await prisma.task.findMany({
      where: {
        status: 'pending', 
        date: {
          lt: nowUTC6,
        },
      },
    });
  
    for (const task of overdueTasks) {
      await prisma.task.update({
        where: { id: task.id },
        data: { status: 'complete' },
      });
      const log = `${new Date().toISOString()}: [Task ID: ${task.id}] ${task.title}\n`;
      fs.appendFileSync(path.join(__dirname, '../../tasks.log'), log);
    }
  };
  
  // Run the checkAndCompleteOverdueTasks function when the server starts
  checkAndCompleteOverdueTasks().catch(err => console.error(err));
  