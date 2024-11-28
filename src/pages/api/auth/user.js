// /pages/api/auth/user.js
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  return res.status(200).json({ user: session.user });
}
