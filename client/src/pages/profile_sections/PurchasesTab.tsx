// client/src/pages/profile_sections/PurchasesTab.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';

interface IPurchase {
  _id: string;
  voucherCode?: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface PurchasesTabProps {
  purchases: IPurchase[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const PurchasesTab: React.FC<PurchasesTabProps> = ({ purchases }) => {
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const openVoucherModal = (voucher: string) => {
    setSelectedVoucher(voucher);
  };

  const closeVoucherModal = () => {
    setSelectedVoucher(null);
  };

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const url = qrRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'voucher.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (purchases.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700 text-center">
          You have not made any purchases yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {purchases.map((purchase, index) => (
          <motion.div
            key={purchase._id}
            className="bg-white rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-1 p-6 flex flex-col justify-between"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Voucher Code</p>
                  <p className="text-sm text-gray-800 font-semibold break-all">
                    {purchase.voucherCode || '---'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Status</p>
                  <p className="text-sm font-semibold">
                    {purchase.status === 'paid' ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <span className="text-red-600 capitalize">
                        {purchase.status}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                <span>Amount: S/ {purchase.amount.toFixed(2)}</span>
                <span className="ml-2">
                  Date: {new Date(purchase.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {purchase.voucherCode && purchase.status === 'paid' && (
              <button
                onClick={() => openVoucherModal(purchase.voucherCode!)}
                className="mt-4 inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View/Download Voucher
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedVoucher && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Voucher QR
              </h2>
              <div className="flex justify-center mb-4">
                <QRCodeCanvas
                  ref={qrRef}
                  value={selectedVoucher}
                  size={150}
                  includeMargin={true}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeVoucherModal}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadQR}
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PurchasesTab;
