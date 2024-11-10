import { redirect } from "@sveltejs/kit"
export const load = async (event) => {
  const session = await event.locals.auth()
 
  if (!session?.user?.userId) {
  //  return redirect(303, '/login')
  }
 
  return {
    session,
  }
}