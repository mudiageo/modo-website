import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { verifyPayment } from '$lib/server/paystack';

const prisma = new PrismaClient();

export async function load({ url, locals }) {
  const reference = url.searchParams.get('reference');
  const session = await locals.getSession();

  if (!reference || !session?.user) {
    throw redirect(303, '/pricing');
  }

  try {
    const paymentData = await verifyPayment(reference);
    
    if (paymentData.status === 'success') {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          premium: true,
          premiumUntil: thirtyDaysFromNow,
          pendingSubscription: false,
          payments: {
            create: {
              amount: paymentData.amount / 100,
              currency: paymentData.currency,
              status: paymentData.status,
              reference: paymentData.reference
            }
          }
        }
      });

      throw redirect(303, '/app?subscription=success');
    }
    
    throw redirect(303, '/pricing?payment=failed');
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw redirect(303, '/pricing?payment=failed');
  }
}