import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { initializePayment, verifyPayment } from '$lib/server/paystack';

const prisma = new PrismaClient();

export async function POST({ request, locals }) {
  const session = await locals.getSession();
  
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { email } = session.user;
    const amount = 5000; // ₦5,000

    const transaction = await initializePayment(email, amount);

    await prisma.user.update({
      where: { email },
      data: {
        pendingSubscription: true
      }
    });

    return json({ authorization_url: transaction.authorization_url });
  } catch (error) {
    console.error('Subscription initialization failed:', error);
    return new Response('Failed to initialize subscription', { status: 500 });
  }
}

export async function GET({ url, locals }) {
  const session = await locals.getSession();
  
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const subscriptions = await prisma.payment.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return json(subscriptions);
  } catch (error) {
    console.error('Failed to fetch subscription history:', error);
    return new Response('Failed to fetch subscription history', { status: 500 });
  }
}