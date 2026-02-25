/**
 * @file components/AICopilot/AICopilot.tsx
 * @author leon.wang
 */
import React, { FC, useState, useRef, useEffect } from 'react';
import { Button, Input, message, Tooltip, Badge } from '@derbysoft/neat-design';
import {
  SendOutlined,
  CloseOutlined,
  DeleteOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { aiService, ChatMessage } from '~/services/aiService';
import './AICopilot.scss';

const { TextArea } = Input;

/**
 * AI Copilot floating assistant
 * Provides AI chat functionality accessible from anywhere in the app
 */
export const AICopilot: FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasUnread, setHasUnread] = useState(false);

  // Load chat history on mount
  useEffect(() => {
    const history = aiService.loadChatHistory();
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Add welcome message
      setMessages([
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: t('pages.ai:aiChatWelcome'),
          timestamp: Date.now(),
        },
      ]);
    }
  }, [t]);

  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      aiService.saveChatHistory(messages);
    }
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show unread indicator when receiving message while closed
  useEffect(() => {
    if (!isOpen && messages.length > 1 && messages[messages.length - 1].role === 'assistant') {
      setHasUnread(true);
    }
  }, [messages, isOpen]);

  // Clear unread when opening
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const config = aiService.getConfig();
    if (!config.apiKey) {
      message.warning(t('pages.ai:aiMsgApiKeyRequired'));
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    // Add placeholder for assistant response
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };
    setMessages([...newMessages, assistantMessage]);

    try {
      await aiService.sendMessage(newMessages, (text) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: text } : msg
          )
        );
      });
    } catch (error) {
      const err = error as Error;
      message.error(err.message || t('pages.ai:aiMsgNetworkError'));
      // Remove failed message
      setMessages(newMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: t('pages.ai:aiChatWelcome'),
        timestamp: Date.now(),
      },
    ]);
    aiService.clearChatHistory();
    message.success(t('pages.ai:aiMsgClearSuccess'));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <Tooltip title={t('pages.ai:aiChatBtnOpen')} placement="left">
        <Badge dot={hasUnread}>
          <Button
            type="primary"
            size="large"
            icon={<RobotOutlined />}
            className="ai-copilot-trigger"
            onClick={() => setIsOpen(!isOpen)}
            style={{ borderRadius: '50%', width: 56, height: 56 }}
          />
        </Badge>
      </Tooltip>

      {/* Chat panel */}
      {isOpen && (
        <div className="ai-copilot-panel">
          {/* Header */}
          <div className="ai-copilot-panel__header">
            <div className="ai-copilot-panel__title">
              <RobotOutlined />
              <span>{t('pages.ai:aiAssistantTitle')}</span>
            </div>
            <div className="ai-copilot-panel__actions">
              <Button
                type="link"
                size="small"
                icon={<DeleteOutlined />}
                onClick={handleClear}
                style={{ color: '#fff' }}
              />
              <Button
                type="link"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => setIsOpen(false)}
                style={{ color: '#fff' }}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="ai-copilot-panel__messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-copilot-message ai-copilot-message--${msg.role}`}
              >
                <div className="ai-copilot-message__avatar">
                  {msg.role === 'assistant' ? <RobotOutlined /> : null}
                </div>
                <div className="ai-copilot-message__content">
                  <div className="ai-copilot-message__text">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="ai-copilot-message ai-copilot-message--assistant">
                <div className="ai-copilot-message__avatar">
                  <RobotOutlined />
                </div>
                <div className="ai-copilot-message__content">
                  <div className="ai-copilot-message__text ai-copilot-message__text--loading">
                    {t('pages.ai:aiChatThinking')}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="ai-copilot-panel__input">
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('pages.ai:aiChatPlaceholder')}
              autoSize={{ minRows: 1, maxRows: 4 }}
              disabled={isLoading}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              loading={isLoading}
              disabled={!inputValue.trim()}
            >
              {t('pages.ai:aiChatBtnSend')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AICopilot;
