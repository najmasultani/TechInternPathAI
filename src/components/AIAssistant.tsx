import React, { useState } from 'react';
import { Bot, Send, Lightbulb, BookOpen, Target, Briefcase, MessageCircle } from 'lucide-react';

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
      text: "Hi! I'm your SWE internship assistant. I can help you with guidance on what to do next, suggest beginner projects, and answer questions about internship preparation. What would you like to know?",
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
      text: "Are there any upcoming internships for first-years?",
      category: "Opportunities"
    },
    {
      icon: BookOpen,
      text: "How should I prepare for technical interviews?",
      category: "Interview Prep"
    },
  ];

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('what should i do next') || message.includes('next step')) {
      return "Based on your current progress, here are some next steps:\n\n1. **Focus on fundamentals** - Make sure you have a solid grasp of one programming language (Python is great for beginners)\n2. **Build your first project** - Create something simple but meaningful, like a personal portfolio or a basic web app\n3. **Start networking** - Join your university's computer science clubs and attend tech meetups\n4. **Practice coding** - Begin with 2-3 LeetCode problems per week\n5. **Update your LinkedIn** - Add your projects and connect with classmates and professionals\n\nWhat area would you like to focus on first?";
    }
    
    if (message.includes('project') || message.includes('beginner project')) {
      return "Here are some great beginner project ideas:\n\n**Web Development:**\n• Personal portfolio website\n• Todo list app with local storage\n• Weather app using a public API\n• Recipe finder with search functionality\n\n**Python Projects:**\n• Password generator\n• Simple calculator with GUI\n• Web scraper for job listings\n• Basic data analysis of a dataset\n\n**Mobile-friendly:**\n• Expense tracker\n• Habit tracker\n• Simple game (like Tic-Tac-Toe)\n\n**AI/Data Science:**\n• Chatbot using OpenAI API\n• Simple recommendation system\n• Data visualization dashboard\n\nPick one that excites you! The key is to start with something achievable and gradually add features.";
    }
    
    if (message.includes('internship') || message.includes('opportunities')) {
      return "Great question! Here are some first-year friendly internship opportunities:\n\n**Large Tech Companies:**\n• Google STEP (Software Training Engineering Program)\n• Microsoft Explore Program\n• Amazon Future Engineer Program\n• Meta University\n• Apple Scholars Program\n\n**Financial/Consulting:**\n• RBC Amplify Program\n• Goldman Sachs Engineering Essentials\n• BlackRock Future Tech Leaders\n\n**Canadian Opportunities:**\n• Shopify Dev Degree\n• TD Lab Innovation Program\n• Ubisoft Next Program\n\n**Application Timeline:**\n• Most applications open in fall (September-November)\n• Apply early - many close by December\n• Start preparing your resume and portfolio now\n\nWould you like specific tips for any of these programs?";
    }
    
    if (message.includes('interview') || message.includes('technical')) {
      return "Here's how to prepare for technical interviews:\n\n**Coding Practice:**\n• Start with LeetCode Easy problems\n• Focus on basic data structures (arrays, strings, hashmaps)\n• Practice explaining your thought process out loud\n• Use platforms like Pramp for mock interviews\n\n**Key Topics to Study:**\n• Arrays and String manipulation\n• Basic algorithms (sorting, searching)\n• Time and space complexity (Big O)\n• Simple data structures\n\n**Behavioral Questions:**\n• Use the STAR method (Situation, Task, Action, Result)\n• Prepare stories about projects and challenges\n• Practice common questions about teamwork and problem-solving\n\n**Resources:**\n• Cracking the Coding Interview book\n• LeetCode's Interview Crash Course\n• Pramp for peer mock interviews\n• Your university's career services\n\nStart with 30 minutes of practice daily. Consistency is key!";
    }
    
    if (message.includes('resume') || message.includes('portfolio')) {
      return "Let's build a strong resume and portfolio:\n\n**Resume Essentials:**\n• Keep it to 1 page\n• Include relevant coursework, projects, and any tech experience\n• Use action verbs (built, developed, implemented)\n• Quantify achievements where possible\n• Include GitHub link and LinkedIn\n\n**Portfolio Must-haves:**\n• 2-3 quality projects with live demos\n• Clean, professional design\n• Clear project descriptions and your role\n• Link to GitHub repositories\n• About section with your story\n\n**GitHub Profile:**\n• Pin your best repositories\n• Write clear README files\n• Commit regularly to show activity\n• Include a professional profile photo\n\nWant me to review any specific section or help you brainstorm project ideas?";
    }
    
    return "I'd be happy to help! I can provide guidance on:\n• Next steps in your internship preparation\n• Beginner-friendly project ideas\n• Upcoming internship opportunities\n• Technical interview preparation\n• Resume and portfolio building\n• Learning resources and study plans\n\nWhat specific area would you like to focus on? Feel free to ask me anything about your software engineering journey!";
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

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(text),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
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