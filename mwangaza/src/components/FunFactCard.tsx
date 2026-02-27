/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lightbulb } from 'lucide-react';
import { funFacts } from '../data';
import { useState, useEffect } from 'react';

export default function FunFactCard() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    setFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, []);

  return (
    <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-yellow-200 dark:border-yellow-900/30">
       <div className="flex items-start">
        <div className="bg-yellow-200 dark:bg-yellow-900/40 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
          <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-yellow-800 dark:text-yellow-500 mb-1">Fun Fact!</h3>
          <p className="text-yellow-700 dark:text-yellow-600/80 text-sm sm:text-base">{fact}</p>
        </div>
      </div>
    </div>
  );
}
