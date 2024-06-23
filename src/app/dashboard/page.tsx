'use client';

import { useState } from 'react';
import MaterialTable from './components/MaterialTab/MaterialTable';
import FeedbackModal from './components/MaterialTab/FeedbackDialog';
import MaterialUploadDialog from './components/MaterialTab/MaterialUploadDialog';
import TabButtonsContainer from './components/Layout/TabButtonsContainer';
import ProfessorTable from './components/ProfessorTab/ProfessorTable';
import ProfessorDialog from './components/ProfessorTab/ProfessorDialog';
import AddNewButton from './components/Layout/AddNewButton';
import StudentTable from './components/StudentTab/StudentTable';
import StudentDialog from './components/StudentTab/StudentDialog';
import SubjectTable from './components/SubjectTab/SubjectTable';
import SubjectDialog from './components/SubjectTab/SubjectDialog';
import { Material } from '../entity/material.entity';
import { useAuthedEffectfullQuery } from '../hooks/useAuthedEffectfullQuery.hook';
import { MaterialService } from '../integration/cefet-material-archive/material/material.service';
import { SubjectService } from '../integration/cefet-material-archive/subject/user.service';
import { TeacherService } from '../integration/cefet-material-archive/teacher/teacher.service';
import { UserService } from '../integration/cefet-material-archive/user/user.service';
import { ModalLoaderProvider } from '../components/ModalLoaderProvider';
import { ErrorToastProvider } from '../components/ErrorToastProvider';

export enum Tab {
  FILE = 'FILE',
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
  SUBJECT = 'SUBJECT',
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.FILE);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>();

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isProfessorDialogOpen, setIsProfessorDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const materialService = new MaterialService();
  const subjectService = new SubjectService();
  const teacherService = new TeacherService();
  const userService = new UserService();

  const { data: materialsResponse, refetch: refreshMaterials } =
    useAuthedEffectfullQuery('materials', () => materialService.getAll(), {
      enabled: activeTab === Tab.FILE,
    });
  const { data: subjectsResponse, refetch: refreshSubjects } =
    useAuthedEffectfullQuery('subjects', () => subjectService.getAll(), {
      enabled: activeTab === Tab.SUBJECT,
    });
  const { data: teachersResponse, refetch: refreshTeachers } =
    useAuthedEffectfullQuery('teachers', () => teacherService.getAll(), {
      enabled: activeTab === Tab.PROFESSOR,
    });
  const { data: studentsResponse, refetch: refreshStudents } =
    useAuthedEffectfullQuery('users', () => userService.getAllStudents(), {
      enabled: activeTab === Tab.STUDENT,
    });

  const openFeedbackDialog = (material: Material) =>
    setSelectedMaterial(material);
  const closeFeedbackDialog = () => setSelectedMaterial(undefined);
  const openUploadDialog = () => setIsUploadDialogOpen(true);
  const closeUploadDialog = () => {
    setIsUploadDialogOpen(false);
  };
  const openProfessorDialog = () => setIsProfessorDialogOpen(true);
  const closeProfessorDialog = () => {
    setIsProfessorDialogOpen(false);
    refreshTeachers();
  };
  const openStudentDialog = () => setIsStudentDialogOpen(true);
  const closeStudentDialog = () => {
    setIsStudentDialogOpen(false);
    refreshStudents();
  };
  const openSubjectDialog = () => setIsSubjectDialogOpen(true);
  const closeSubjectDialog = () => {
    setIsSubjectDialogOpen(false);
    refreshSubjects();
  };

  return (
    <ModalLoaderProvider>
      <ErrorToastProvider>
        <main className="p-12">
          <TabButtonsContainer
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <section>
            {activeTab === Tab.FILE && (
              <div className="flex flex-col gap-8">
                <AddNewButton openDialog={openUploadDialog} />
                <MaterialTable
                  onSelectFeedbackDialog={openFeedbackDialog}
                  data={materialsResponse?.data}
                  onDelete={refreshMaterials}
                />
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
                <AddNewButton openDialog={openStudentDialog} />
                <StudentTable
                  onDelete={refreshStudents}
                  data={studentsResponse?.data}
                />
                <StudentDialog
                  isDialogOpen={isStudentDialogOpen}
                  closeDialog={closeStudentDialog}
                />
              </div>
            )}
            {activeTab === Tab.PROFESSOR && (
              <div className="flex flex-col gap-8">
                <AddNewButton openDialog={openProfessorDialog} />
                <ProfessorTable
                  onDelete={refreshTeachers}
                  data={teachersResponse?.data}
                />
                <ProfessorDialog
                  isDialogOpen={isProfessorDialogOpen}
                  closeDialog={closeProfessorDialog}
                />
              </div>
            )}
            {activeTab === Tab.SUBJECT && (
              <div className="flex flex-col gap-8">
                <AddNewButton openDialog={openSubjectDialog} />
                <SubjectTable
                  onDelete={refreshSubjects}
                  data={subjectsResponse?.data}
                />
                <SubjectDialog
                  isDialogOpen={isSubjectDialogOpen}
                  closeDialog={closeSubjectDialog}
                />
              </div>
            )}
          </section>
        </main>
      </ErrorToastProvider>
    </ModalLoaderProvider>
  );
}

export default Dashboard;
