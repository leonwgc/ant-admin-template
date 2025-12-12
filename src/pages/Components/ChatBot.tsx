/**
 * @file src/pages/Components/ChatBot.tsx
 * @author leon.wang
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Input,
  Button,
  Space,
  Avatar,
  Tag,
  Empty,
  Divider,
} from '@derbysoft/neat-design';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import './ChatBot.scss';

/**
 * Message interface
 */
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

/**
 * Predefined question and answer pair
 */
interface QAPair {
  keywords: string[];
  question: string;
  answer: string;
  category?: string;
}

/**
 * Predefined questions and answers database
 */
const qaDatabase: QAPair[] = [
  {
    keywords: ['hello', 'hi', 'hey', '你好', '嗨'],
    question: 'Hello',
    answer: 'Hello! I am your AI assistant. How can I help you today?',
    category: 'greeting',
  },
  {
    keywords: ['how are you', '怎么样', '如何'],
    question: 'How are you?',
    answer: 'I am doing great! Thank you for asking. How can I assist you?',
    category: 'greeting',
  },
  {
    keywords: ['name', 'who are you', '名字', '你是谁'],
    question: 'What is your name?',
    answer: 'I am ChatBot, your intelligent assistant powered by AI.',
    category: 'about',
  },
  {
    keywords: ['help', 'support', '帮助', '支持'],
    question: 'How can you help me?',
    answer:
      'I can answer questions about our services, provide technical support, and help with general inquiries. Just ask me anything!',
    category: 'support',
  },
  {
    keywords: ['price', 'cost', 'pricing', '价格', '费用'],
    question: 'What are your pricing plans?',
    answer:
      'We offer flexible pricing plans: Basic ($9/month), Professional ($29/month), and Enterprise (custom pricing). Contact sales for details.',
    category: 'pricing',
  },
  {
    keywords: ['feature', 'function', 'capability', '功能', '特性'],
    question: 'What features do you offer?',
    answer:
      'Our platform offers: Real-time analytics, Team collaboration, API integration, Custom workflows, and 24/7 support.',
    category: 'features',
  },
  {
    keywords: ['contact', 'email', 'phone', '联系', '邮箱', '电话'],
    question: 'How can I contact support?',
    answer:
      'You can reach us via email at support@example.com or call us at +1-800-123-4567. Our team is available 24/7.',
    category: 'contact',
  },
  {
    keywords: ['api', 'integration', '接口', '集成'],
    question: 'Do you have API documentation?',
    answer:
      'Yes! Our comprehensive API documentation is available at https://api.example.com/docs. We support REST and GraphQL APIs.',
    category: 'technical',
  },
  {
    keywords: ['security', 'privacy', 'safe', '安全', '隐私'],
    question: 'Is my data secure?',
    answer:
      'Absolutely! We use bank-level encryption (AES-256), comply with GDPR and SOC 2, and perform regular security audits.',
    category: 'security',
  },
  {
    keywords: ['refund', 'cancel', 'subscription', '退款', '取消', '订阅'],
    question: 'What is your refund policy?',
    answer:
      'We offer a 30-day money-back guarantee. You can cancel your subscription anytime with no questions asked.',
    category: 'billing',
  },
  {
    keywords: ['start', 'begin', 'getting started', '开始', '入门'],
    question: 'How do I get started?',
    answer:
      'Getting started is easy! 1) Sign up for free, 2) Complete the onboarding tutorial, 3) Invite your team, 4) Start building!',
    category: 'onboarding',
  },
  {
    keywords: ['demo', 'trial', 'test', '演示', '试用', '测试'],
    question: 'Can I try before buying?',
    answer:
      'Yes! We offer a 14-day free trial with full access to all features. No credit card required.',
    category: 'trial',
  },
];

/**
 * Quick question categories
 */
const categories = [
  { label: 'All', value: 'all' },
  { label: 'Greeting', value: 'greeting' },
  { label: 'About', value: 'about' },
  { label: 'Support', value: 'support' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Features', value: 'features' },
  { label: 'Contact', value: 'contact' },
  { label: 'Technical', value: 'technical' },
  { label: 'Security', value: 'security' },
  { label: 'Billing', value: 'billing' },
];

/**
 * ChatBot component
 */
const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I am your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, { setTrue: startTyping, setFalse: stopTyping }] = useBoolean(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll to bottom of messages
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Find matching answer from database
   */
  const findAnswer = (question: string): string => {
    const normalizedQuestion = question.toLowerCase().trim();

    // Find exact match
    for (const qa of qaDatabase) {
      if (qa.keywords.some((keyword) => normalizedQuestion.includes(keyword.toLowerCase()))) {
        return qa.answer;
      }
    }

    // Default response
    return "I'm sorry, I don't have an answer to that question. Please try asking something else or contact our support team.";
  };

  /**
   * Handle sending a message
   */
  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot typing
    startTyping();

    // Find and send bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: findAnswer(inputValue),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      stopTyping();
    }, 800 + Math.random() * 1200);
  };

  /**
   * Handle quick question click
   */
  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  /**
   * Get filtered questions by category
   */
  const getFilteredQuestions = () => {
    if (selectedCategory === 'all') {
      return qaDatabase;
    }
    return qaDatabase.filter((qa) => qa.category === selectedCategory);
  };

  /**
   * Format timestamp
   */
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="chatbot">
      <div className="chatbot__container">
        <div className="chatbot__sidebar">
          <Card className="chatbot__menu" title="Quick Questions">
            <div className="chatbot__categories">
              {categories.map((category) => (
                <Tag
                  key={category.value}
                  color={selectedCategory === category.value ? 'blue' : 'default'}
                  className="chatbot__category-tag"
                  onClick={() => setSelectedCategory(category.value)}
                  style={{ cursor: 'pointer' }}
                >
                  {category.label}
                </Tag>
              ))}
            </div>

            <Divider />

            <div className="chatbot__questions">
              {getFilteredQuestions().length > 0 ? (
                getFilteredQuestions().map((qa, index) => (
                  <div
                    key={index}
                    className="chatbot__question-item"
                    onClick={() => handleQuickQuestion(qa.question)}
                  >
                    <QuestionCircleOutlined className="chatbot__question-icon" />
                    <span>{qa.question}</span>
                  </div>
                ))
              ) : (
                <Empty description="No questions available" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </Card>
        </div>

        <div className="chatbot__main">
          <Card
            className="chatbot__chat-card"
            title={
              <Space>
                <RobotOutlined />
                <span>AI Assistant</span>
                <Tag color="green">Online</Tag>
              </Space>
            }
          >
            <div className="chatbot__messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatbot__message chatbot__message--${message.type}`}
                >
                  <div className="chatbot__message-avatar">
                    <Avatar
                      icon={message.type === 'bot' ? <RobotOutlined /> : <UserOutlined />}
                      style={{
                        backgroundColor: message.type === 'bot' ? '#1890ff' : '#52c41a',
                      }}
                    />
                  </div>
                  <div className="chatbot__message-content">
                    <div className="chatbot__message-bubble">
                      <div className="chatbot__message-text">{message.content}</div>
                      <div className="chatbot__message-time">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chatbot__message chatbot__message--bot">
                  <div className="chatbot__message-avatar">
                    <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#1890ff' }} />
                  </div>
                  <div className="chatbot__message-content">
                    <div className="chatbot__message-bubble">
                      <div className="chatbot__typing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot__input-area">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleSend}
                size="large"
                suffix={
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                  >
                    Send
                  </Button>
                }
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
