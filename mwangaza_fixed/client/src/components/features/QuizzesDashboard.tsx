import { useState, useEffect } from 'react';
import { ArrowLeft, BrainCircuit, Layers, CheckCircle2 } from 'lucide-react';
import { categories, CategoryWithGrades, LearningContent, Topic, SubTopic } from '../../data';
import api from '../../services/api'; // Import the API service
import { QuizQuestion, Flashcard } from '../../types'; // Assuming these types are now in types.ts

export default function QuizzesDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithGrades | null>(null);
  const [selectedGradeContent, setSelectedGradeContent] = useState<LearningContent | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSubTopic, setSelectedSubTopic] = useState<SubTopic | null>(null);

  const [viewMode, setViewMode] = useState<'selection' | 'quiz' | 'flashcards'>('selection');
  
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  useEffect(() => {
    const saveQuizProgress = async () => {
      if (quizCompleted && (selectedTopic || selectedSubTopic)) {
        setIsSavingProgress(true);
        try {
          const lessonId = selectedSubTopic ? `quiz-${selectedSubTopic.name}` : `test-${selectedTopic!.name}`;
          const lessonName = selectedSubTopic ? `${selectedSubTopic.name} Quiz` : `${selectedTopic!.name} Topic Test`;
          const percentageScore = Math.round((score / quizQuestions.length) * 100);

          await api.post('/api/progress', {
            lesson_id: lessonId,
            lesson_name: lessonName,
            completed: true,
            score: percentageScore,
          });
        } catch (err) {
          console.error('Failed to save quiz progress:', err);
        } finally {
          setIsSavingProgress(false);
        }
      }
    };

    saveQuizProgress();
  }, [quizCompleted, score, quizQuestions.length, selectedTopic, selectedSubTopic]);

  const handleStartTopicTest = async (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedSubTopic(null);
    setViewMode('quiz');
    setIsLoading(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);

    try {
      const { data } = await api.post('/api/quiz/generate', { topicName: topic.name });
      setQuizQuestions(data.quizQuestions);
    } catch (err) {
      console.error('Failed to generate quiz:', err);
      // Optionally set an error state to display to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartSubTopicQuiz = async (subTopic: SubTopic) => {
    setSelectedSubTopic(subTopic);
    setViewMode('quiz');
    setIsLoading(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);

    try {
      const { data } = await api.post('/api/quiz/generate', { topicName: selectedTopic!.name, subTopicName: subTopic.name });
      setQuizQuestions(data.quizQuestions);
    } catch (err) {
      console.error('Failed to generate sub-topic quiz:', err);
      // Optionally set an error state to display to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartFlashcards = async (subTopic: SubTopic) => {
    setSelectedSubTopic(subTopic);
    setViewMode('flashcards');
    setIsLoading(true);
    setCurrentFlashcardIndex(0);
    setIsFlipped(false);

    try {
      const { data } = await api.post('/api/flashcards/generate', { topicName: selectedTopic!.name, subTopicName: subTopic.name });
      setFlashcards(data.flashcards);
    } catch (err) {
      console.error('Failed to generate flashcards:', err);
      // Optionally set an error state to display to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestionIndex].correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const renderQuiz = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 border-4 border-blue-600 dark:border-blue-400 border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-xl text-blue-800 dark:text-blue-400 font-medium">Generating your quiz...</p>
        </div>
      );
    }

    if (quizQuestions.length === 0) {
      return (
        <div className="text-center py-20 text-slate-900 dark:text-slate-100">
          <p className="text-xl text-red-600 dark:text-red-400">Failed to load quiz. Please try again.</p>
          <button onClick={() => setViewMode('selection')} className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">Go Back</button>
        </div>
      );
    }

    if (quizCompleted) {
      return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-2xl mx-auto text-slate-900 dark:text-slate-100">
          <CheckCircle2 className="w-20 h-20 text-green-500 dark:text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-blue-900 dark:text-gray-100 mb-4">Quiz Completed!</h2>
          <p className="text-2xl text-slate-700 dark:text-slate-300 mb-8">You scored <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> out of {quizQuestions.length}</p>
          <button 
            onClick={() => setViewMode('selection')}
            className="bg-blue-600 dark:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
          >
            Back to Topics
          </button>
        </div>
      );
    }

    const question = quizQuestions[currentQuestionIndex];

    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setViewMode('selection')} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
          <ArrowLeft className="mr-2" />
          Exit Quiz
        </button>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-slate-900 dark:text-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-500 dark:text-slate-400">Question {currentQuestionIndex + 1} of {quizQuestions.length}</h2>
            <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full font-bold">Score: {score}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-blue-900 dark:text-gray-100 mb-8">{question.question}</h3>
          
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all font-medium text-lg ";
              
              if (!showExplanation) {
                buttonClass += "border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300";
              } else {
                if (index === question.correctAnswerIndex) {
                  buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400";
                } else if (index === selectedAnswer) {
                  buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400";
                } else {
                  buttonClass += "border-slate-200 dark:border-slate-700 opacity-50 text-slate-500 dark:text-slate-400";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-lg mb-6 ${selectedAnswer === question.correctAnswerIndex ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'}`}>
              <p className="font-bold mb-1">{selectedAnswer === question.correctAnswerIndex ? 'Correct!' : 'Incorrect.'}</p>
              <p>{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-blue-600 dark:bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
            >
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderFlashcards = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-900 dark:text-slate-100">
          <div className="w-12 h-12 border-4 border-blue-600 dark:border-blue-400 border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-xl text-blue-800 dark:text-blue-400 font-medium">Generating flashcards...</p>
        </div>
      );
    }

    if (flashcards.length === 0) {
      return (
        <div className="text-center py-20 text-slate-900 dark:text-slate-100">
          <p className="text-xl text-red-600 dark:text-red-400">Failed to load flashcards. Please try again.</p>
          <button onClick={() => setViewMode('selection')} className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">Go Back</button>
        </div>
      );
    }

    const card = flashcards[currentFlashcardIndex];

    return (
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setViewMode('selection')} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
          <ArrowLeft className="mr-2" />
          Exit Flashcards
        </button>

        <div className="flex justify-between items-center mb-6 text-slate-900 dark:text-slate-100">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-gray-100">{selectedSubTopic?.name} Flashcards</h2>
          <span className="text-slate-500 dark:text-slate-400 font-bold">{currentFlashcardIndex + 1} / {flashcards.length}</span>
        </div>

        <div 
          className="relative w-full h-96 cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-4 border-blue-100 dark:border-blue-900 flex flex-col items-center justify-center p-8 text-center">
              <span className="absolute top-4 left-4 text-blue-400 dark:text-blue-300 font-bold uppercase tracking-wider text-sm">Front</span>
              <h3 className="text-3xl font-bold text-blue-900 dark:text-gray-100">{card.front}</h3>
              <p className="absolute bottom-4 text-slate-400 dark:text-slate-500 text-sm">Click to flip</p>
            </div>
            {/* Back */}
            <div className="absolute w-full h-full backface-hidden bg-blue-50 dark:bg-gray-700 rounded-2xl shadow-xl border-4 border-blue-200 dark:border-blue-800 flex flex-col items-center justify-center p-8 text-center rotate-y-180">
              <span className="absolute top-4 left-4 text-blue-500 dark:text-blue-300 font-bold uppercase tracking-wider text-sm">Back</span>
              <p className="text-2xl text-blue-900 dark:text-gray-100 leading-relaxed">{card.back}</p>
              <p className="absolute bottom-4 text-slate-400 dark:text-slate-500 text-sm">Click to flip back</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button 
            onClick={() => {
              setCurrentFlashcardIndex(Math.max(0, currentFlashcardIndex - 1));
              setIsFlipped(false);
            }}
            disabled={currentFlashcardIndex === 0}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold rounded-lg shadow disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={() => {
              setCurrentFlashcardIndex(Math.min(flashcards.length - 1, currentFlashcardIndex + 1));
              setIsFlipped(false);
            }}
            disabled={currentFlashcardIndex === flashcards.length - 1}
            className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-bold rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderSelection = () => {
    if (selectedTopic) {
      return (
        <div>
          <button onClick={() => setSelectedTopic(null)} className="flex items-center text-blue-800 dark:text-blue-400 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Topics
          </button>
          
          <div className="flex justify-between items-center mb-8 text-slate-900 dark:text-slate-100">
            <h1 className="text-3xl font-bold text-blue-900 dark:text-gray-100">{selectedTopic.name}</h1>
            <button 
              onClick={() => handleStartTopicTest(selectedTopic)}
              className="bg-yellow-400 dark:bg-yellow-600 text-blue-900 dark:text-white font-bold py-3 px-6 rounded-lg flex items-center hover:bg-yellow-500 dark:hover:bg-yellow-700 transition shadow-md"
            >
              <BrainCircuit className="mr-2" />
              Take Topic Test
            </button>
          </div>

          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">Sub-Topics</h2>
          <div className="space-y-4">
            {selectedTopic.subTopics.map((subTopic) => (
              <div key={subTopic.name} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-blue-900 dark:text-gray-100">{subTopic.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Test your knowledge or study with flashcards.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleStartFlashcards(subTopic)}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition flex items-center"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    Flashcards
                  </button>
                  <button 
                    onClick={() => handleStartSubTopicQuiz(subTopic)}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition flex items-center"
                  >
                    <BrainCircuit className="w-4 h-4 mr-2" />
                    Short Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedGradeContent) {
      return (
        <div>
          <button onClick={() => setSelectedGradeContent(null)} className="flex items-center text-blue-800 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Grades
          </button>
          <h1 className="text-3xl font-bold text-blue-900 mb-6">{selectedCategory!.name} - {selectedGradeContent.grade}</h1>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Select a Topic</h2>
          <div className="space-y-3">
            {selectedGradeContent.topics.map((topic) => (
              <div 
                key={topic.name} 
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-yellow-100 transition border-l-4 border-transparent hover:border-yellow-400"
                onClick={() => setSelectedTopic(topic)}>
                <h3 className="text-xl font-bold text-blue-800">{topic.name}</h3>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedCategory) {
      return (
        <div>
          <button onClick={() => setSelectedCategory(null)} className="flex items-center text-blue-800 hover:text-yellow-500 mb-6 font-bold">
            <ArrowLeft className="mr-2" />
            Back to Categories
          </button>
          <h1 className="text-3xl font-bold text-blue-900 mb-6">{selectedCategory.name} - Select a Grade</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {selectedCategory.contentByGrade.map((content) => (
              <div key={content.grade}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center border-4 border-transparent hover:border-yellow-400"
                onClick={() => setSelectedGradeContent(content)}>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">{content.grade}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Quizzes & Flashcards</h1>
        <p className="text-lg text-slate-600 mb-8">Select a category to test your knowledge.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.name}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center border-4 border-transparent hover:border-yellow-400"
              onClick={() => setSelectedCategory(category)}>
              <div className="bg-yellow-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                <category.icon className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />
              </div>
              <h2 className="text-xl sm:text-2xl text-center font-bold text-blue-900">{category.name}</h2>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="p-8">
      {viewMode === 'selection' && renderSelection()}
      {viewMode === 'quiz' && renderQuiz()}
      {viewMode === 'flashcards' && renderFlashcards()}
    </div>
  );
}
