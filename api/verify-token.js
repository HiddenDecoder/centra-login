import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { token } = req.query;
  const SECRET = process.env.CENTRA_SECRET || "TEMP_SECRET_KEY";

  try {
    const decoded = jwt.verify(token, SECRET);
    res.status(200).json({
      valid: true,
      centraId: decoded.centraId,
      clientId: decoded.clientId
    });
  } catch (err) {
    res.status(401).json({ valid: false });
  }
}
