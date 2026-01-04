import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface Purchase {
  name: string;
  city: string;
  state: string;
  quantity: number;
  timeAgo: string;
}

const purchases: Purchase[] = [
  { name: "Maria Silva", city: "São Paulo", state: "SP", quantity: 2, timeAgo: "3 minutos" },
  { name: "João Santos", city: "Rio de Janeiro", state: "RJ", quantity: 1, timeAgo: "5 minutos" },
  { name: "Ana Costa", city: "Belo Horizonte", state: "MG", quantity: 3, timeAgo: "8 minutos" },
  { name: "Pedro Oliveira", city: "Curitiba", state: "PR", quantity: 1, timeAgo: "12 minutos" },
  { name: "Carla Souza", city: "Porto Alegre", state: "RS", quantity: 2, timeAgo: "15 minutos" },
  { name: "Lucas Ferreira", city: "Brasília", state: "DF", quantity: 4, timeAgo: "18 minutos" },
  { name: "Juliana Lima", city: "Salvador", state: "BA", quantity: 1, timeAgo: "22 minutos" },
  { name: "Rafael Alves", city: "Fortaleza", state: "CE", quantity: 2, timeAgo: "25 minutos" },
  { name: "Fernanda Rocha", city: "Recife", state: "PE", quantity: 3, timeAgo: "28 minutos" },
  { name: "Bruno Martins", city: "Manaus", state: "AM", quantity: 1, timeAgo: "32 minutos" },
  { name: "Camila Dias", city: "Goiânia", state: "GO", quantity: 2, timeAgo: "35 minutos" },
  { name: "Thiago Ribeiro", city: "Belém", state: "PA", quantity: 1, timeAgo: "38 minutos" },
  { name: "Patricia Gomes", city: "Vitória", state: "ES", quantity: 3, timeAgo: "42 minutos" },
  { name: "Marcos Pereira", city: "Florianópolis", state: "SC", quantity: 2, timeAgo: "45 minutos" },
  { name: "Aline Cardoso", city: "Natal", state: "RN", quantity: 1, timeAgo: "48 minutos" },
  { name: "Gabriel Nunes", city: "Campo Grande", state: "MS", quantity: 4, timeAgo: "52 minutos" },
  { name: "Renata Castro", city: "Maceió", state: "AL", quantity: 2, timeAgo: "55 minutos" },
  { name: "Diego Barbosa", city: "São Luís", state: "MA", quantity: 1, timeAgo: "58 minutos" },
  { name: "Larissa Moura", city: "Teresina", state: "PI", quantity: 3, timeAgo: "1 hora" },
  { name: "Felipe Araújo", city: "João Pessoa", state: "PB", quantity: 2, timeAgo: "1 hora" },
  { name: "Bianca Teixeira", city: "Aracaju", state: "SE", quantity: 1, timeAgo: "1 hora" },
  { name: "Rodrigo Lopes", city: "Cuiabá", state: "MT", quantity: 2, timeAgo: "1 hora" },
  { name: "Vanessa Freitas", city: "Palmas", state: "TO", quantity: 3, timeAgo: "1 hora" },
  { name: "André Correia", city: "Porto Velho", state: "RO", quantity: 1, timeAgo: "1 hora" },
  { name: "Tatiana Mendes", city: "Boa Vista", state: "RR", quantity: 2, timeAgo: "2 horas" },
  { name: "Gustavo Pinto", city: "Macapá", state: "AP", quantity: 1, timeAgo: "2 horas" },
  { name: "Isabela Cunha", city: "Rio Branco", state: "AC", quantity: 4, timeAgo: "2 horas" },
  { name: "Vinicius Ramos", city: "Campinas", state: "SP", quantity: 2, timeAgo: "2 horas" },
  { name: "Daniela Monteiro", city: "Santos", state: "SP", quantity: 1, timeAgo: "2 horas" },
  { name: "Leandro Farias", city: "Sorocaba", state: "SP", quantity: 3, timeAgo: "3 horas" },
  { name: "Amanda Vieira", city: "Ribeirão Preto", state: "SP", quantity: 2, timeAgo: "3 horas" },
  { name: "Ricardo Azevedo", city: "Uberlândia", state: "MG", quantity: 1, timeAgo: "3 horas" },
  { name: "Priscila Borges", city: "Contagem", state: "MG", quantity: 2, timeAgo: "3 horas" },
  { name: "Fábio Moreira", city: "Juiz de Fora", state: "MG", quantity: 3, timeAgo: "4 horas" },
  { name: "Cristina Batista", city: "Londrina", state: "PR", quantity: 1, timeAgo: "4 horas" },
];

export default function SocialProof() {
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const showRandomPurchase = () => {
      // Reset if all purchases have been shown
      if (usedIndices.size >= purchases.length) {
        setUsedIndices(new Set());
      }

      // Get available indices
      const availableIndices = purchases
        .map((_, index) => index)
        .filter((index) => !usedIndices.has(index));

      if (availableIndices.length === 0) return;

      // Pick random available index
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      
      setCurrentPurchase(purchases[randomIndex]);
      setUsedIndices((prev) => new Set(Array.from(prev).concat(randomIndex)));
      setShowNotification(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(showRandomPurchase, 5000);

    // Show new notification every 40 seconds
    const interval = setInterval(showRandomPurchase, 40000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [usedIndices]);

  return (
    <AnimatePresence>
      {showNotification && currentPurchase && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex items-start gap-3">
            <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">
                {currentPurchase.name}
              </p>
              <p className="text-xs text-gray-600">
                {currentPurchase.city}, {currentPurchase.state}
              </p>
              <p className="text-xs text-gray-700 mt-1">
                Comprou <span className="font-bold text-orange-600">{currentPurchase.quantity}x MãoLuz</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">há {currentPurchase.timeAgo}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
