import { redirect } from '@sveltejs/kit';
 import { PUBLIC_MODO_APP_URL } from '$env/static/public';
 
export const GET = async () => {
   redirect(303, `${PUBLIC_MODO_APP_URL}/auth/signup`);
};