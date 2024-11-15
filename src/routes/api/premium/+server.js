import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import Paystack from 'paystack';

const prisma = new PrismaClient();
const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

export async function POST({ request, locals }) {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	try {
		const { email } = session.user;
		const amount = 5000; // ₦5,000 in kobo

		const transaction = await paystack.transaction.initialize({
			email,
			amount,
			callback_url: `${process.env.PUBLIC_URL}/api/premium/verify`
		});

		return json({ authorization_url: transaction.data.authorization_url });
	} catch (error) {
		console.error('Payment initialization failed:', error);
		return new Response('Payment initialization failed', { status: 500 });
	}
}
