// client/src/pages/Faq.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: 'What is LastMinuteFoods?',
    answer:
      'LastMinuteFoods is a platform that connects a variety of food establishments—such as restaurants, bakeries, ' +
      'coffee shops, and more—with users seeking last-minute deals. These businesses can list items that are close ' +
      'to their sell-by date or need to be sold quickly at special prices, helping reduce waste while saving you money.',
  },
  {
    question: 'How do I purchase a last-minute offer?',
    answer:
      'Simply explore our listings to find offers from different establishments. Choose the deal you want and ' +
      'proceed with the secure payment. After completing the purchase, you’ll receive a unique QR code you can use ' +
      'to redeem your voucher at the chosen location.',
  },
  {
    question: 'Is there a membership fee?',
    answer:
      'No. Creating an account on LastMinuteFoods is absolutely free. You only pay for the offers you decide to buy.',
  },
  {
    question: 'Can I request a refund if I cannot use my voucher?',
    answer:
      'Refund policies depend on each establishment’s own rules. Some may offer refunds, ' +
      'while others do not. Please review the specific terms of each offer or contact the establishment directly if needed.',
  },
  {
    question: 'How do food establishments benefit from using LastMinuteFoods?',
    answer:
      'Whether it’s a restaurant, bakery, pastry shop, or coffee house, businesses can reduce ' +
      'food waste by selling items they might otherwise discard. They also reach new customers ' +
      'through our platform, and recover costs while promoting more sustainable consumption habits.',
  },
  {
    question: 'What if I have dietary restrictions or allergies?',
    answer:
      'We encourage all establishments to provide detailed ingredient and dietary information in their offers. ' +
      'However, if you have specific concerns, it’s best to contact the seller directly to confirm the product’s suitability.',
  },
  {
    question: 'How do I redeem my voucher?',
    answer:
      'Once you arrive at the establishment, simply show your QR code to a staff member. ' +
      'They will scan or verify it, and you can enjoy your discounted item!',
  },
  {
    question: 'Will you expand beyond food-related products in the future?',
    answer:
      'Yes, we are exploring opportunities to include other types of products that could benefit from last-minute offers. ' +
      'Our goal is to help reduce waste in various industries while providing great deals for our users.',
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-200 to-blue-100 py-16 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-blue-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-700 text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Learn more about how LastMinuteFoods works
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" />
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-lg font-semibold text-gray-800">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <AiOutlineMinus className="text-blue-600" size={22} />
                  ) : (
                    <AiOutlinePlus className="text-blue-600" size={22} />
                  )}
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-gray-700 text-sm md:text-base"
                  >
                    <div className="pt-2 border-t border-gray-200">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
