import React from 'react';
import { Send, CircleDashed } from 'lucide-react';

// --- Chatbot UI Component ---
// This component handles the display of chat messages and the input form.
export const ChatbotUI = ({ chats, inputMessage, isLoading, setInputMessage, handleSendMessage, chatMessagesEndRef }) => {
  return (
    <aside className="bg-white rounded-xl shadow-lg flex flex-col overflow-y-scroll">
      <header className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <h2 className="text-xl font-bold text-gray-800">AI Assistant</h2>
      </header>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.sender === 'User' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-xl max-w-xs ${
                chat.sender === 'User'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="font-medium text-sm whitespace-pre-line">{chat.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-xl max-w-xs bg-gray-200 text-gray-800 rounded-bl-none animate-pulse">
              <div className="flex items-center space-x-2">
                <CircleDashed className="animate-spin text-gray-500" size={20} />
                <span className="text-sm font-medium">AI Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatMessagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask the AI a question..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            className={`bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <Send className="w-6 h-6"/>
          </button>
        </div>
      </div>
    </aside>
  );
};
