/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCard, Smartphone } from 'lucide-react'

export default function VotePage() {
  const [isOpen, setIsOpen] = useState(false)

  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    setLoading(true);

    const response = await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: '+237XXXXXXX',  // Numéro de téléphone de l'utilisateur
        amount: 100  // Montant à débiter en francs CFA
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert('Transaction réussie');
    } else {
      alert(`Erreur: ${data.message}`);
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-6">Votez pour l'avenir</h1>
        <p className="text-xl text-white mb-8">Votre voix compte. Participez au changement dès aujourd'hui !</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-white text-purple-600 hover:bg-purple-100 transition-all duration-300 text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl"
            >
              Voter maintenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Choisissez votre moyen de paiement</DialogTitle>
              <DialogDescription>
                Sélectionnez l'option qui vous convient le mieux pour procéder au vote.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleVote} disabled={loading} className="w-full h-32 flex flex-col items-center justify-center space-y-2" variant="outline">
                  <Smartphone className="h-8 w-8" />
                  <span>Orange Money</span>
                  {loading ? 'Traitement...' : 'Voter'}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full h-32 flex flex-col items-center justify-center space-y-2" variant="outline">
                  <CreditCard className="h-8 w-8" />
                  <span>Mobile Money</span>
                </Button>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}