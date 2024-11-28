import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "No refresh token provided" });
  }

  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshTokenSecret) {
    return res.status(500).json({ error: "Refresh token secret is not defined" });
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret) as CustomJwtPayload;

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
      return res.status(500).json({ error: "Access token secret is not defined" });
    }

    const newAccessToken = jwt.sign({ userId: decoded.userId }, accessTokenSecret, { expiresIn: "1h" });

    res.status(200).json({ access_token: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
}
