import { NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Import Prisma client

export async function GET(req: Request) {
    try {
      // Fetch all users from the database
      const users = await prisma.user.findMany();

      // Return the list of users as JSON response
      return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
      console.error('Error fetching users:', error);
      return new Response('Unable to fetch users', { status: 500 });
    }
}
