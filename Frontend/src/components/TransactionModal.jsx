/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Transition, TransitionChild } from '@headlessui/react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

const TransactionModal = ({ transactionDetails, onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [isVerified, setIsVerified] = useState(false);
  const formRef = useRef(null);

  const { type, senderType, sender, receiverType, receiver, amount } =
    transactionDetails;
  let senderName, receiverName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Submitted', JSON.stringify(data));
    try {
      const res = await fetch(
        'http://localhost:8000/api/v1/user/check-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: 'include',
        },
      );
      const resData = await res.json();
      console.log(resData);
      if (res.ok) {
        setMessage(resData.message);
        setIsVerified(true);
      } else {
        setMessageType('error');
        setMessage(resData.statusCode);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setMessageType('error');
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 50);
  }, []);

  useEffect(() => {
    if (isVerified) {
      const transaction = async () => {
        const response = await fetch(
          'http://localhost:8000/api/v1/transaction/create-transaction',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type,
              amount,
              senderType,
              sender,
              receiverType,
              receiver,
            }),
            credentials: 'include',
          },
        );
        const newData = await response.json();
        if (response.ok) {
          setMessage('Transaction successful');
        } else {
          setMessage(newData.statusCode || 'Transaction failed');
        }
        setLoading(false);
      };
      transaction();
    }
  }, [isVerified]);

  return (
    <Transition show={modalVisible} as="div">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <TransitionChild
          as="div"
          enter="ease-out duration-500"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              {amount}
              {receiver}
            </h3>
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Enter Password
            </h3>
            {message && (
              <div
                className={`mb-4 rounded p-4 ${
                  messageType === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {messageType === 'success' ? (
                      <CheckCircleIcon className="h-5 w-5" />
                    ) : (
                      <XMarkIcon className="h-5 w-5" />
                    )}
                  </div>
                  <p className="ml-3 text-sm">{message}</p>
                </div>
              </div>
            )}

            {
              <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded border border-gray-300 px-4 py-2"
                />
                <button
                  className="w-full rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Checking...' : 'Confirm'}
                </button>
              </form>
            }
            <button
              onClick={onClose}
              className="mt-6 text-sm text-purple-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

export default TransactionModal;
