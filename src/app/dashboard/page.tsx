'use client';

import { useState } from 'react';
import Filter from './components/Filter';
import MaterialTable from './components/MaterialTable';
import FeedbackModal from './components/FeedbackDialog';
import MaterialUploadDialog from './components/MaterialUploadDialog';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [isFeedBackDialogOpen, setIsFeedBackDialogOpen] = useState(false);

  const openFeedbackDialog = () => {
    setIsFeedBackDialogOpen(true);
  };

  const closeFeedbackDialog = () => {
    setIsFeedBackDialogOpen(false);
  };

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const openUploadDialog = () => {
    setIsUploadDialogOpen(true);
  };

  const closeUploadDialog = () => {
    setIsUploadDialogOpen(false);
  };

  return (
    <main className="p-12">
      <div className="flex space-x-4 mb-4">
        <button
          style={{ textDecorationThickness: '2px', textUnderlineOffset: '6px' }}
          className={`bg-transparent py-2 px-4 ${activeTab === 'tab1' ? 'text-indigo-400 underline' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('tab1')}
        >
          Provas e Materiais de Aula
        </button>
        <button
          style={{ textDecorationThickness: '2px', textUnderlineOffset: '6px' }}
          className={`bg-transparent py-2 px-4 ${activeTab === 'tab2' ? 'text-indigo-400 underline' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('tab2')}
        >
          Alunos
        </button>
        <button
          style={{ textDecorationThickness: '2px', textUnderlineOffset: '6px' }}
          className={`bg-transparent py-2 px-4 ${activeTab === 'tab3' ? 'text-indigo-400 underline' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('tab3')}
        >
          Professores
        </button>
      </div>
      <div>
        {activeTab === 'tab1' && (
          <div className="flex flex-col gap-8">
            <Filter />
            <button
              onClick={openUploadDialog}
              className="self-end w-fit py-2 px-4 rounded bg-indigo-500 hover:bg-indigo-700 text-white font-bold"
            >
              Adicionar novo
            </button>
            <MaterialTable openFeedbackDialog={openFeedbackDialog} />
            <MaterialUploadDialog
              isUploadDialogOpen={isUploadDialogOpen}
              closeUploadDialog={closeUploadDialog}
            />
            <FeedbackModal
              isFeedBackDialogOpen={isFeedBackDialogOpen}
              closeFeedbackDialog={closeFeedbackDialog}
            />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div className="flex flex-col gap-8">
            {/* <Filter />
            <MaterialTable /> */}
          </div>
        )}
        {activeTab === 'tab3' && (
          <div className="flex flex-col gap-8">
            {/* <Filter />
            <MaterialTable /> */}
          </div>
        )}
      </div>
    </main>
  );
}
