import React, { useState } from 'react';
import { Bot, Send, Lightbulb, BookOpen, Target, Briefcase, MessageCircle } from 'lucide-react';
import { openaiService } from '../services/openaiService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI-powered SWE internship assistant. I can provide personalized guidance on your next steps, suggest projects tailored to your goals, help with interview preparation, and answer any questions about your internship journey. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    {
      icon: Target,
      text: "What should I do next?",
      category: "Planning"
    },
    {
      icon: Lightbulb,
      text: "Suggest a beginner project",
      category: "Projects"
    },
    {
      icon: Briefcase,
      text: "What internships should I target as a first-year student?",
      category: "Opportunities"
    },
    {
      icon: BookOpen,
      text: "How should I prepare for technical interviews?",
      category: "Interview Prep"
    },
    {
      icon: Briefcase,
      text: "How do I prepare for behavioral interviews?",
      category: "Interview Prep"
    },
  ];

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const systemMessage = `You are an expert AI assistant specializing in software engineering internship preparation. You help students navigate their journey to landing internships at top tech companies.

Your expertise includes:
- Personalized career guidance and next steps
- Project recommendations based on skill level and goals
- Technical interview preparation strategies
- Resume and portfolio optimization
- Company-specific application advice
- Learning resource recommendations
- Coding practice guidance
- Networking and professional development

Provide helpful, actionable, and encouraging responses. Use markdown formatting for better readability. Keep responses concise but comprehensive.`;

      const response = await openaiService.chatCompletion([
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ]);

      return response;
    } catch (error) {
      console.error('AI Assistant error:', error);
      
      // Fallback to basic responses if API fails
      const message = userMessage.toLowerCase();
      
      if (message.includes('what should i do next') || message.includes('next step')) {
        return "Based on typical internship preparation, here are some next steps:\n\n1. **Focus on fundamentals** - Master one programming language\n2. **Build projects** - Create 2-3 meaningful projects\n3. **Start networking** - Join tech communities and events\n4. **Practice coding** - Begin with LeetCode easy problems\n5. **Update profiles** - Polish LinkedIn and GitHub\n\nWhat area would you like to focus on first?";
      }
      
      if (message.includes('project')) {
        return "Here are some great project ideas:\n\n**Web Development:**\n• Personal portfolio website\n• Todo list with local storage\n• Weather app using APIs\n\n**Python Projects:**\n• Password generator\n• Data analysis dashboard\n• Simple web scraper\n\n**AI Projects:**\n• Chatbot using OpenAI API\n• Recommendation system\n• Text analyzer\n\nPick something that excites you and matches your current skill level!";
      }
      
      return "I'm here to help with your internship journey! I can provide guidance on projects, interview prep, applications, and more. What specific area would you like to focus on?";
    }
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: await generateResponse(text),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or feel free to ask me anything about your internship preparation!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Assistant</h2>
        <p className="text-gray-600">Get personalized guidance for your internship journey</p>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickPrompts.map((prompt, index) => {
          const Icon = prompt.icon;
          return (
            <button
              key={index}
              onClick={() => handleSend(prompt.text)}
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300 text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{prompt.text}</div>
                  <div className="text-sm text-gray-500">{prompt.category}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {!message.isUser && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">AI Assistant</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                <div className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">AI Assistant</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your internship journey..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <MessageCircle className="mr-2" size={20} />
          Tips for Better Conversations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Be Specific:</h4>
            <p>Instead of "Help me with coding," try "I'm struggling with Python loops in my first project."</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Share Context:</h4>
            <p>Let me know your current skill level, interests, and what you've already tried.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Ask Follow-ups:</h4>
            <p>Don't hesitate to ask for clarification or more details on any advice.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Set Goals:</h4>
            <p>Tell me what you want to achieve and by when for more targeted advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;