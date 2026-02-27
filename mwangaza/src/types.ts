/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LessonActivity {
  id: number;
  name: string;
  completed: boolean;
}

export interface TestResult {
  id: number;
  name: string;
  score: number;
}
