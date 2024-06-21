'use client';

import { useState } from 'react';
import MaterialTable from './components/MaterialTab/MaterialTable';
import FeedbackModal from './components/MaterialTab/FeedbackDialog';
import MaterialUploadDialog from './components/MaterialTab/MaterialUploadDialog';
import TabButtonsContainer from './components/Layout/TabButtonsContainer';
import ProfessorTable from './components/ProfessorTab/ProfessorTable';
import ProfessorDialog from './components/ProfessorTab/ProfessorDialog';
import AddNewButton from './components/Layout/AddNewButton';
import Filter from './components/Layout/Filter';
import StudentTable from './components/StudentTab/StudentTable';
import StudentDialog from './components/StudentTab/StudentDialog';
import SubjectTable from './components/SubjectTab/SubjectTable';
import SubjectDialog from './components/SubjectTab/SubjectDialog';
import { Material } from '../entity/material.entity';

export enum Tab {
  FILE = 'FILE',
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
  SUBJECT = 'SUBJECT',
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.FILE);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>();

  const openFeedbackDialog = (material: Material) =>
    setSelectedMaterial(material);
  const closeFeedbackDialog = () => setSelectedMaterial(undefined);

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const openUploadDialog = () => setIsUploadDialogOpen(true);
  const closeUploadDialog = () => setIsUploadDialogOpen(false);

  const [isProfessorDialogOpen, setIsProfessorDialogOpen] = useState(false);
  const openProfessorDialog = () => setIsProfessorDialogOpen(true);
  const closeProfessorDialog = () => setIsProfessorDialogOpen(false);

  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const openStudentDialog = () => setIsStudentDialogOpen(true);
  const closeStudentDialog = () => setIsStudentDialogOpen(false);

  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const openSubjectDialog = () => setIsSubjectDialogOpen(true);
  const closeSubjectDialog = () => setIsSubjectDialogOpen(false);

  return (
    <main className="p-12">
      <TabButtonsContainer activeTab={activeTab} setActiveTab={setActiveTab} />
      <section>
        {activeTab === Tab.FILE && (
          <div className="flex flex-col gap-8">
            <Filter />
            <AddNewButton openDialog={openUploadDialog} />
            <MaterialTable openFeedbackDialog={openFeedbackDialog} />
            <MaterialUploadDialog
              isUploadDialogOpen={isUploadDialogOpen}
              closeUploadDialog={closeUploadDialog}
            />
            {selectedMaterial && (
              <FeedbackModal
                material={selectedMaterial}
                isFeedBackDialogOpen={!!selectedMaterial}
                closeFeedbackDialog={closeFeedbackDialog}
              />
            )}
          </div>
        )}
        {activeTab === Tab.STUDENT && (
          <div className="flex flex-col gap-8">
            <Filter />
            <AddNewButton openDialog={openStudentDialog} />
            <StudentTable openDialog={openStudentDialog} />
            <StudentDialog
              isDialogOpen={isStudentDialogOpen}
              closeDialog={closeStudentDialog}
            />
          </div>
        )}
        {activeTab === Tab.PROFESSOR && (
          <div className="flex flex-col gap-8">
            <Filter />
            <AddNewButton openDialog={openProfessorDialog} />
            <ProfessorTable openDialog={openProfessorDialog} />
            <ProfessorDialog
              isDialogOpen={isProfessorDialogOpen}
              closeDialog={closeProfessorDialog}
            />
          </div>
        )}
        {activeTab === Tab.SUBJECT && (
          <div className="flex flex-col gap-8">
            <Filter />
            <AddNewButton openDialog={openProfessorDialog} />
            <SubjectTable openDialog={openSubjectDialog} />
            <SubjectDialog
              isDialogOpen={isSubjectDialogOpen}
              closeDialog={closeSubjectDialog}
            />
          </div>
        )}
      </section>
    </main>
  );
}
