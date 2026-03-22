import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserPersonality, UserProfile } from '../types';
import { Send, Bot, User, MessageCircle } from 'lucide-react';

interface ChatBotProps {
  userProfile: UserProfile;
  userPersonality: UserPersonality;
}

const ChatBot: React.FC<ChatBotProps> = ({ userProfile, userPersonality }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'candidate',
      message: `Hello! I'm ${userProfile.personalInfo.fullName}'s AI representative. I can answer questions about their professional background, work style, and career goals. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Technical skills and experience
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technical') || lowerQuestion.includes('technology')) {
      return `Based on ${userProfile.personalInfo.fullName}'s profile, they have expertise in ${userProfile.skills.slice(0, 5).join(', ')}. They have ${userProfile.experience.length} years of professional experience and have worked on ${userProfile.projects.length} notable projects. Their technical approach is ${userPersonality.answers.find(a => a.questionId === 'problem-solving')?.answer || 'systematic and analytical'}.`;
    }
    
    // Work style and approach
    if (lowerQuestion.includes('work style') || lowerQuestion.includes('approach') || lowerQuestion.includes('methodology')) {
      const workStyle = userPersonality.answers.find(a => a.questionId === 'work-environment')?.answer || 'collaborative and structured';
      const problemSolving = userPersonality.answers.find(a => a.questionId === 'problem-solving')?.answer || 'analytical and systematic';
      return `${userProfile.personalInfo.fullName} thrives in ${workStyle.toLowerCase()} environments. Their problem-solving approach is ${problemSolving.toLowerCase()}. They prefer ${userPersonality.answers.find(a => a.questionId === 'communication-style')?.answer?.toLowerCase() || 'clear and direct communication'}.`;
    }
    
    // Leadership and collaboration
    if (lowerQuestion.includes('leadership') || lowerQuestion.includes('lead') || lowerQuestion.includes('manage')) {
      const leadership = userPersonality.answers.find(a => a.questionId === 'leadership-style')?.answer || 'collaborative leadership';
      const teamRole = userPersonality.answers.find(a => a.questionId === 'team-role')?.answer || 'strong team contributor';
      return `${userProfile.personalInfo.fullName} demonstrates ${leadership.toLowerCase()} style. In team settings, they typically ${teamRole.toLowerCase()}. They handle conflicts through ${userPersonality.answers.find(a => a.questionId === 'conflict-resolution')?.answer?.toLowerCase() || 'open communication and collaboration'}.`;
    }
    
    // Career goals and motivation
    if (lowerQuestion.includes('goal') || lowerQuestion.includes('future') || lowerQuestion.includes('career') || lowerQuestion.includes('ambition')) {
      const careerVision = userPersonality.answers.find(a => a.questionId === 'career-vision')?.answer || 'continued professional growth';
      const motivation = userPersonality.answers.find(a => a.questionId === 'professional-drive')?.answer || 'meaningful impact and continuous learning';
      return `Looking ahead, ${userProfile.personalInfo.fullName} sees themselves ${careerVision.toLowerCase()}. They are driven by ${motivation.toLowerCase()} and measure success by ${userPersonality.answers.find(a => a.questionId === 'success-metrics')?.answer?.toLowerCase() || 'positive impact and professional growth'}.`;
    }
    
    // Experience and projects
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('project') || lowerQuestion.includes('work') || lowerQuestion.includes('background')) {
      const currentRole = userProfile.experience[0] || { company: 'their current organization', position: userProfile.personalInfo.professionalTitle };
      return `${userProfile.personalInfo.fullName} currently works as ${currentRole.position} at ${currentRole.company}. They have ${userProfile.experience.length} years of professional experience and have successfully completed ${userProfile.projects.length} major projects. Their background includes ${userProfile.education.length} educational achievements and expertise in ${userProfile.skills.slice(0, 3).join(', ')}.`;
    }
    
    // Communication and collaboration
    if (lowerQuestion.includes('communication') || lowerQuestion.includes('collaborate') || lowerQuestion.includes('team')) {
      const commStyle = userPersonality.answers.find(a => a.questionId === 'communication-style')?.answer || 'clear and professional communication';
      const collabPref = userPersonality.answers.find(a => a.questionId === 'collaboration-preference')?.answer || 'structured team collaboration';
      return `${userProfile.personalInfo.fullName} excels at ${commStyle.toLowerCase()} and prefers ${collabPref.toLowerCase()}. They stay updated with industry trends through ${userPersonality.answers.find(a => a.questionId === 'industry-trends')?.answer?.toLowerCase() || 'continuous learning and professional development'}.`;
    }
    
    // Pressure and deadlines
    if (lowerQuestion.includes('pressure') || lowerQuestion.includes('deadline') || lowerQuestion.includes('stress') || lowerQuestion.includes('challenge')) {
      const pressureResponse = userPersonality.answers.find(a => a.questionId === 'deadline-pressure')?.answer || 'systematic planning and execution';
      return `When facing tight deadlines and pressure, ${userProfile.personalInfo.fullName} ${pressureResponse.toLowerCase()}. They are motivated to go above and beyond by ${userPersonality.answers.find(a => a.questionId === 'extra-motivation')?.answer?.toLowerCase() || 'challenging work and team success'}.`;
    }
    
    // Learning and development
    if (lowerQuestion.includes('learn') || lowerQuestion.includes('develop') || lowerQuestion.includes('skill') || lowerQuestion.includes('grow')) {
      const learningStyle = userPersonality.answers.find(a => a.questionId === 'learning-approach')?.answer || 'hands-on practice and continuous learning';
      const strength = userPersonality.answers.find(a => a.questionId === 'greatest-strength')?.answer || 'technical expertise and problem-solving';
      return `${userProfile.personalInfo.fullName} approaches learning through ${learningStyle.toLowerCase()}. Their greatest professional strength is ${strength.toLowerCase()}. They are currently focused on improving ${userPersonality.answers.find(a => a.questionId === 'improvement-focus')?.answer?.toLowerCase() || 'advanced technical skills and leadership capabilities'}.`;
    }
    
    // Culture and values
    if (lowerQuestion.includes('culture') || lowerQuestion.includes('value') || lowerQuestion.includes('environment') || lowerQuestion.includes('company')) {
      const idealCulture = userPersonality.answers.find(a => a.questionId === 'company-culture')?.answer || 'collaborative and growth-oriented culture';
      const workBalance = userPersonality.answers.find(a => a.questionId === 'work-life-balance')?.answer || 'healthy work-life balance';
      return `${userProfile.personalInfo.fullName} thrives in ${idealCulture.toLowerCase()} and values ${workBalance.toLowerCase()}. Their professional drive comes from ${userPersonality.answers.find(a => a.questionId === 'professional-drive')?.answer?.toLowerCase() || 'meaningful work and continuous growth'}.`;
    }
    
    // Default response
    return `That's a great question! ${userProfile.personalInfo.fullName} is a ${userProfile.personalInfo.professionalTitle} with ${userProfile.experience.length} years of experience. They are passionate about ${userProfile.skills.slice(0, 3).join(', ')} and are known for ${userPersonality.answers.find(a => a.questionId === 'greatest-strength')?.answer?.toLowerCase() || 'their technical expertise and collaborative approach'}. Would you like to know more about any specific aspect of their background or work style?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'recruiter',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'candidate',
        message: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Representative Chat</h2>
        <p className="text-gray-600">
          Chat with {userProfile.personalInfo.fullName}'s AI representative to learn about their 
          professional background, work style, and career goals.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">{userProfile.personalInfo.fullName} AI</h3>
              <p className="text-sm text-indigo-100">
                {userProfile.personalInfo.professionalTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.sender === 'recruiter'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'recruiter' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.sender === 'recruiter' ? 'Recruiter' : 'AI Representative'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.message}</p>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-gray-100">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="w-4 h-4" />
                  <span className="text-xs font-medium">AI Representative</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about their experience, skills, work style..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sample Questions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-3">Sample Questions:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "What are their key technical skills?",
            "How do they handle tight deadlines?",
            "What's their leadership style?",
            "What motivates them professionally?",
            "How do they approach problem-solving?",
            "What are their career goals?"
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(question)}
              className="text-left p-2 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;