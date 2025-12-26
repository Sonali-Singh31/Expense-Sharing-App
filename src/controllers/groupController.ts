import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const createGroup = async (req: any, res: Response) => {
  const { name, memberIds } = req.body;
  try {
    const group = await prisma.group.create({
      data: { 
        name, 
        members: { connect: memberIds.map((id: string) => ({ id })) } 
      },
      include: { members: true }
    });
    res.json(group);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Add this to your existing groupController.ts
export const getUserGroups = async (req: any, res: Response) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: { id: req.user.id } // Only get groups where the user is a member
        }
      },
      include: {
        members: { select: { id: true, name: true, email: true } }
      }
    });
    res.json(groups);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};