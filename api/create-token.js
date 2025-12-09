import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { centraId, clientId } = req.query;

  const SECRET = process.env.CENTRA_SECRET || "TEMP_SECRET_KEY";

  const VALID_CLIENTS = {
    "client-demo-001": "https://yourapp.com",
    "client-demo-002": "https://partnerapp.net"
  };

  if (!VALID_CLIENTS[clientId]) {
    return res.status(401).json({ error: "Invalid client ID" });
  }

  const token = jwt.sign(
    {
      centraId: centraId,
      clientId: clientId,
      issuedAt: Date.now()
    },
    SECRET,
    { expiresIn: "30m" }
  );

  res.status(200).json({ token });
}
