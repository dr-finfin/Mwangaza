import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { generateSubTopicExplanation } from '../services/geminiService';

interface SubTopicExplanationProps {
  subTopicName: string;
  topicName: string;
  staticDescription?: string;
}

export default function SubTopicExplanation({ subTopicName, topicName, staticDescription }: SubTopicExplanationProps) {
  const [explanation, setExplanation] = useState<string | null>(staticDescription || null);
  const [isLoading, setIsLoading] = useState(!staticDescription);

  useEffect(() => {
    if (!staticDescription) {
      const fetchExplanation = async () => {
        setIsLoading(true);
        const result = await generateSubTopicExplanation(subTopicName, topicName);
        setExplanation(result);
        setIsLoading(false);
      };
      fetchExplanation();
    }
  }, [subTopicName, topicName, staticDescription]);

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-xl shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="text-yellow-600 dark:text-yellow-400 w-5 h-5" />
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300">Mwangaza's Quick Note</h3>
      </div>
      {isLoading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-yellow-200 dark:bg-yellow-900/40 rounded w-full"></div>
          <div className="h-4 bg-yellow-200 dark:bg-yellow-900/40 rounded w-2/3"></div>
        </div>
      ) : (
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
          {explanation}
        </p>
      )}
    </div>
  );
}
