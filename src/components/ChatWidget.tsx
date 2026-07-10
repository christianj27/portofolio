import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Jeri, Christian's AI assistant. Ask me anything about his work, skills, or projects! 👋",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Chat failed');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again later!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button — always visible */}
      <button
        className={`chat-fab ${isOpen ? 'chat-fab--hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat with Jeri"
      >
        <MessageCircle className="chat-fab__icon" />
        <span className="chat-fab__label">Chat with Jeri</span>
        <span className="chat-fab__pulse" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="chat-panel">
          {/* Header */}
          <div className="chat-panel__header">
            <div className="chat-panel__header-left">
              <Sparkles className="chat-panel__sparkle-icon" />
              <div>
                <h4 className="chat-panel__title">Chat with Jeri</h4>
                <p className="chat-panel__subtitle">Christian's AI assistant</p>
              </div>
            </div>
            <button
              className="chat-panel__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-panel__messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${
                  msg.role === 'user' ? 'chat-message--user' : 'chat-message--assistant'
                }`}
              >
                <div className="chat-message__bubble">
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message chat-message--assistant">
                <div className="chat-message__bubble chat-message__bubble--typing">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-panel__input">
            <input
              ref={inputRef}
              type="text"
              className="chat-panel__input-field"
              placeholder="Ask about Christian..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              maxLength={500}
            />
            <button
              className="chat-panel__send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
