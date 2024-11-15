import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST({ request }) {
	const data = await request.json();

	try {
		const hashedPassword = await bcrypt.hash(data.password, 10);

		const user = await prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				password: hashedPassword,
				courses: data.courses,
				studyPreferences: data.studyPreferences
			}
		});

		return json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
	} catch (error) {
		console.error('Signup failed:', error);
		return new Response('Signup failed', { status: 400 });
	}
}
