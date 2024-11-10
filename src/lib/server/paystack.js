import Paystack from 'paystack';
import { PAYSTACK_SECRET_KEY } from '$env/static/private';

const paystack = Paystack(PAYSTACK_SECRET_KEY);

export async function initializePayment(email, amount) {
  try {
    const response = await paystack.transaction.initialize({
      email,
      amount: amount * 100, // Convert to kobo
      callback_url: `${process.env.PUBLIC_URL}/payment/verify`,
      metadata: {
        custom_fields: [
          {
            display_name: "Subscription Type",
            variable_name: "subscription_type",
            value: "premium"
          }
        ]
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Payment initialization failed:', error);
    throw error;
  }
}

export async function verifyPayment(reference) {
  try {
    const response = await paystack.transaction.verify(reference);
    return response.data;
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw error;
  }
}