import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your +2 Nepal study assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('physics') || lowerMsg.includes('newton')) {
      return "Newton's Laws of Motion are fundamental in Physics. First Law: Inertia, Second Law: F=ma, Third Law: Action-Reaction. Would you like more details on any specific law?";
    } else if (lowerMsg.includes('chemistry') || lowerMsg.includes('bond')) {
      return "Chemical bonding includes ionic (electron transfer), covalent (electron sharing), and metallic bonds. The VSEPR theory helps predict molecular shapes. Need examples?";
    } else if (lowerMsg.includes('biology') || lowerMsg.includes('cell')) {
      return "Cell division includes mitosis (growth/repair) and meiosis (gamete formation). Mitosis has 4 phases: prophase, metaphase, anaphase, telophase. Want me to explain any phase?";
    } else if (lowerMsg.includes('math') || lowerMsg.includes('trigonometry')) {
      return "Key trig identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ. The Law of Sines relates sides to angles: a/sinA = b/sinB = c/sinC. Need help with a specific problem?";
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hello! I'm here to help with your +2 Nepal studies. Ask me about Physics, Chemistry, Biology, Mathematics, or other subjects!";
    } else {
      return "I'm your +2 Nepal study assistant. I can help with Physics, Chemistry, Biology, Mathematics, and other subjects. Could you clarify your question?";
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(79, 70, 229, 0.4)" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
    >
      {/* Chat header */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex items-center justify-between">
          <motion.h2 
            className="text-xl font-bold flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span 
              className="mr-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
            >
              💬
            </motion.span>
            +2 Study Assistant
          </motion.h2>
          <motion.div 
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Messages container */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                className={`max-w-[80%] rounded-lg p-4 ${message.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow'
                  }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-sm">{message.text}</div>
                <motion.div 
                  className={`text-xs mt-2 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Input area */}
      <motion.form 
        onSubmit={handleSendMessage} 
        className="p-6 border-t border-gray-200 bg-white"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="flex">
          <motion.input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about +2 subjects..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            whileFocus={{ borderColor: "#6366F1" }}
          />
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-r-lg transition-colors flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Send
          </motion.button>
        </div>
        <motion.p 
          className="text-xs text-gray-500 mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Ask about Physics, Chemistry, Biology, Mathematics or other +2 subjects
        </motion.p>
      </motion.form>
    </motion.div>
  );
};
  
export default ChatPage;