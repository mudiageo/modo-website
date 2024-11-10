import { PrismaClient } from '@prisma/client';
import Paystack from 'paystack';

const prisma = new PrismaClient();
const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export async function GET({ url }) {
  const reference = url.searchParams.get('reference');
  
  if (!reference) {
    return new Response('No reference provided', { status: 400 });
  }

  try {
    const response = await paystack.transaction.verify(reference);
    
    if (response.data.status === 'success') {
      const payment = await prisma.payment.findUnique({
        where: { reference }
      });

      if (!payment) {
        const user = await prisma.user.update({
          where: { email: response.data.customer.email },
          data: {
            premium: true,
            premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            payments: {
              create: {
                amount: response.data.amount / 100,
                currency: response.data.currency,
                status: response.data.status,
                reference
              }
            }
          }
        });
      }

      return new Response('Payment verified', { status: 200 });
    }
    
    return new Response('Payment failed', { status: 400 });
  } catch (error) {
    console.error('Payment verification failed:', error);
    return new Response('Payment verification failed', { status: 500 });
  }
}