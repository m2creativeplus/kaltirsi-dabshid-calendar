"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Send, Sparkles, Database } from 'lucide-react';

export function NotebookLMBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center border border-white/20"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] h-[550px] bg-[#111113] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1c1c1f] p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border border-white/20">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">Kaltirsi NotebookLM</h3>
                  <p className="text-[10px] text-emerald-400 font-mono">Knowledge Base Connected</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0b]/50">
              
              <div className="flex justify-start">
                <div className="bg-[#1c1c1f] border border-white/5 text-slate-300 text-sm p-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                  Asc! I am the Kaltirsi NotebookLM Engine. I have ingested the entire 3,000-year deep seasonal lore database. Feel free to ask me anything about the Kaltirsi Godka, grazing indexes, or historical rain patterns.
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-[#222225] border border-primary/20 text-orange-200 text-xs p-3 rounded-2xl rounded-tl-sm max-w-[85%] font-mono">
                  Suggested: "What does Bad-xiran mean in the month of Samuulad?"
                </div>
              </div>

            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#1c1c1f] border-t border-white/5">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Ask the Kaltirsi Knowledge Base..."
                  className="w-full bg-[#0a0a0b] text-sm text-white px-4 py-3 rounded-xl pr-12 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                />
                <button className="absolute right-2 p-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors">
                  <Send className="w-4 h-4 -ml-0.5 mt-0.5" />
                </button>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
