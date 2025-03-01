import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({
  isVisible,
  onClose,
  title,
  message,
  iconColor = 'bg-blue-500',
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-11/12 max-w-md rounded-lg bg-white p-6 text-center shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mb-4 flex justify-center">
              <motion.div
                className={`h-16 w-16 ${iconColor} flex items-center justify-center rounded-full`}
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.5, repeat: 2, repeatType: 'reverse' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {title.includes('Unsuccessful') ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  )}
                </svg>
              </motion.div>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              {title}
            </h2>
            <p className="mb-4 text-gray-600">{message}</p>
            <button
              onClick={onClose}
              className="bg-primaryblue hover:bg-primarydarkblue rounded-md px-4 py-2 text-white transition duration-300"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
