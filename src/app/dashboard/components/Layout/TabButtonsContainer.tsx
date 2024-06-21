import { Tab } from "../../page";

interface TabButtonsContainerProps {
  activeTab: string;
  setActiveTab: (value: Tab) => void;
}

export default function TabButtonsContainer({ activeTab, setActiveTab }: TabButtonsContainerProps) {
  return (
    <section className="flex space-x-4 mb-4">
      <button
        style={{ textDecorationThickness: '2px', textUnderlineOffset: '6px' }}
        className={`bg-transparent py-2 px-4 ${activeTab === Tab.FILE ? 'text-indigo-400 underline' : 'bg-gray-200'}`}
        onClick={() => setActiveTab(Tab.FILE)}
      >
        Provas e Materiais de Aula
      </button>
      <button
        style={{ textDecorationThickness: '2px', textUnderlineOffset: '6px' }}
        className={`bg-transparent py-2 px-4 ${activeTab === Tab.STUDENT ? 'text-indigo-400 underline' : 'bg-gray-200'}`}
        onClick={() => setActiveTab(Tab.STUDENT)}
      >
        Alunos
      </button>
      <button
        style={{ textDecorationThickness: '2px', textUnderlineOffset: '6px' }}
        className={`bg-transparent py-2 px-4 ${activeTab === Tab.PROFESSOR ? 'text-indigo-400 underline' : 'bg-gray-200'}`}
        onClick={() => setActiveTab(Tab.PROFESSOR)}
      >
        Professores
      </button>
      <button
        style={{ textDecorationThickness: '2px', textUnderlineOffset: '6px' }}
        className={`bg-transparent py-2 px-4 ${activeTab === Tab.SUBJECT ? 'text-indigo-400 underline' : 'bg-gray-200'}`}
        onClick={() => setActiveTab(Tab.SUBJECT)}
      >
        Disciplina
      </button>
    </section>
  );
}