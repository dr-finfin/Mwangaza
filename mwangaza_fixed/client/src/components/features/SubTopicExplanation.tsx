import { Lightbulb } from 'lucide-react';

interface SubTopicExplanationProps {
  explanation: string;
}

export default function SubTopicExplanation({ explanation }: SubTopicExplanationProps) {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-xl shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="text-yellow-600 dark:text-yellow-400 w-5 h-5" />
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300">Mwangaza's Quick Note</h3>
      </div>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
        {explanation}
      </p>
    </div>
  );
}
