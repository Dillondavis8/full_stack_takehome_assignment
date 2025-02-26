// components/cell_renderers/ErrorSummaryCellRenderer.tsx

import React, { useState } from 'react';
import ErrorSummaryCellRendererParams from '../../interfaces/errorSummaryCellRenderer';
import ErrorSummaryModal from '../modals/ErrorSummaryModal';
import { Button } from '@headlessui/react'
import { NewspaperIcon } from '@heroicons/react/24/outline';


export default function ErrorSummaryCellRenderer(params: ErrorSummaryCellRendererParams) {
  const [openModal, setOpenModal] = useState(false);
  const errors = params.data.errors

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div>
      <Button className="flex rounded  py-2 px-4 text-sm text-white"
        onClick={handleOpenModal}>
        <NewspaperIcon className="size-8 mr-1 text-sky-700" />
      </Button>
      { openModal &&
        <ErrorSummaryModal isOpen={openModal} errors={errors} toggleModal={handleOpenModal}
      />
      }
      
    </div>
  );
};