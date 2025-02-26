// components/modals/ErrorSummaryModal.tsx

import React from 'react';
import Modal from 'react-modal';
import { XMarkIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

if (typeof (window) !== 'undefined') {
  Modal.setAppElement('body')
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    overflow: 'scroll',
    width: '25%',
    height: '40%',
    maxHeight: '500px',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
  },
};

export default function ErrorSummaryModal({ isOpen, errors, toggleModal }: ErrorSummaryModalProps) {
  // Sort errors by severity
  const sortedErrors: [string, { message: string; severity: string }][] = Object.entries(errors as Record<string, { message: string; severity: string }>).sort((a, b) => {
    const severityOrder: Record<string, number> = { critical: 1, warning: 2 };
    return severityOrder[a[1].severity] - severityOrder[b[1].severity];
  });
  // Groups sorted errors messages into critical and warning categories
  const groupedErrors: Record<string, string[]> = sortedErrors.reduce(
    (acc: Record<string, string[]>, [key, { message, severity }]) => {
      acc[severity] = acc[severity] || [];
      acc[severity].push(message);
      return acc;
    },
    {}
  );

  // Toggle modal visibility
  const hideModal = () => {
    toggleModal();
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={hideModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <button className="float-right" onClick={hideModal}>
          <XMarkIcon className="size-6 mr-1 text-black float-right w-full" />
        </button>
        <h1 className="text-2xl font-bold mb-3">Error Summary</h1>
        {/* Mapping Logic for warnings by severity */}
        <div className='text-xl'>
          {Object.entries(groupedErrors).map(([severity, messages]) => (
            <div key={severity} className='mb-5'>
              <div className='flex'>
                {severity === "critical" ? (
                  <ExclamationCircleIcon className="size-6 mr-1 text-red-500" />
                ) : (
                  <ExclamationTriangleIcon className="size-6 mr-1 text-yellow-500" />
                )}
                <h3 className={severity === "critical" ? "text-red-500" : "text-yellow-500"}>
                  {severity.charAt(0).toUpperCase() + severity.slice(1)} Issues
                </h3>
              </div>
              <ul className="list-disc pl-10">
                {messages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}