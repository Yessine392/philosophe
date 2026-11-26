"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";
import { recordLesson, useProgress } from "@/lib/progress";

export function Quiz({ questions, lessonKey }: { questions: QuizQuestion[]; lessonKey: string }) {
  const progress = useProgress();
  const best = progress.lessons[lessonKey];
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const done = answers.every((a) => a !== null);
  const score = answers.filter((a, i) => a === questions[i].answer).length;

  const choose = (qi: number, oi: number) => {
    if (answers[qi] !== null) return;
    const next = answers.map((a, i) => (i === qi ? oi : a));
    setAnswers(next);
    if (next.every((a) => a !== null)) {
      recordLesson(lessonKey, next.filter((a, i) => a === questions[i].answer).length);
    }
  };

  return (
    <div className="glass rounded-[2rem] p-7 sm:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-3xl text-white">Éprouve ta compréhension</h2>
        {best !== undefined && <span className="text-sm text-gold-200">Meilleur score : {best}/3</span>}
      </div>
      <div className="mt-8 space-y-10">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          return (
            <div key={qi}>
              <p className="text-lg text-white">
                <span className="mr-2 font-display text-gold-300 italic">{qi + 1}.</span>
                {q.q}
              </p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {q.options.map((o, oi) => {
                  const isAnswer = oi === q.answer;
                  const isChosen = chosen === oi;
                  const state =
                    chosen === null
                      ? "border-white/10 hover:border-gold-300/50 hover:bg-white/[0.03]"
                      : isAnswer
                        ? "border-emerald-400/60 bg-emerald-400/10 text-white"
                        : isChosen
                          ? "border-rose-400/60 bg-rose-400/10 text-white"
                          : "border-white/5 opacity-50";
                  return (
                    <button
                      key={oi}
                      onClick={() => choose(qi, oi)}
                      disabled={chosen !== null}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-white/80 transition ${state}`}
                    >
                      {o}
                      {chosen !== null && isAnswer && <Check size={16} className="shrink-0 text-emerald-300" />}
                      {isChosen && !isAnswer && <X size={16} className="shrink-0 text-rose-300" />}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence>
                {chosen !== null && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 overflow-hidden text-sm leading-relaxed text-white/55"
                  >
                    {q.explanation}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold-300/30 bg-gold-300/[0.06] p-5"
          >
            <p className="font-display text-xl text-gold-200">
              {score === 3 ? "Parfait. Socrate serait presque à court de questions." : score === 2 ? "Très bien : encore une nuance à saisir." : "L'ignorance reconnue est le début du savoir. Relis et recommence !"}{" "}
              <span className="text-gold-200">{score}/3 · +{40 + score * 20} points</span>
            </p>
            <button
              onClick={() => setAnswers(questions.map(() => null))}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:text-white"
            >
              <RotateCcw size={14} /> Recommencer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
