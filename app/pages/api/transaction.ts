// pages/api/transaction.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, amount } = req.body;

    try {
      const response = await fetch('https://api.orange.com/oauth/v2/token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.ORANGE_MONEY_API_KEY}`, // Utilise ta clé API
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          // Ajoute les détails nécessaires pour créer la transaction
          'phoneNumber': phoneNumber,
          'amount': amount,
        })
      });

      const data = await response.json();

      // Traite la réponse de l'API Orange Money
      if (data.success) {
        res.status(200).json({ message: 'Transaction réussie', data });
      } else {
        res.status(400).json({ message: 'Transaction échouée', error: data });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la transaction', error });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
