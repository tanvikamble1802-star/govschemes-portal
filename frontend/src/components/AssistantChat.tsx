"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { schemes, Scheme } from "@/src/data/schemes";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "Why am I eligible for this scheme?",
  "What documents do I need?",
  "How do I apply?",
  "What benefits does this scheme provide?",
  "Where can I apply?",
  "What should I do if my application is rejected?",
];

interface AssistantChatProps {
  schemeId?: string;
}

export default function AssistantChat({ schemeId }: AssistantChatProps) {
  // Find active scheme if passed as prop
  const activeScheme: Scheme | undefined = schemeId
    ? schemes.find((s) => s.id === schemeId)
    : undefined;

  const getInitialGreeting = (scheme?: Scheme) => {
    if (scheme) {
      return `Hello! I'm your Scheme Assistant. I see you're inquiring about ${scheme.name} (${scheme.type}). I can help you understand its eligibility requirements, required documents checklist, financial benefits, and step-by-step application process.\n\nWhat would you like to know about this scheme?`;
    }
    return "Hello! I'm your Scheme Assistant. I can help you understand government schemes, eligibility requirements, documents, benefits and application steps.\n\nWhat would you like help with?";
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-initial",
      sender: "assistant",
      text: getInitialGreeting(activeScheme),
      timestamp: "Today",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message and timestamps when scheme context updates
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages([
      {
        id: "msg-initial",
        sender: "assistant",
        text: getInitialGreeting(activeScheme),
        timestamp: timeStr,
      },
    ]);
  }, [activeScheme]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Generate mock assistant response
  const generateMockResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase().trim();

    // 1. Why am I eligible?
    if (q.includes("why") && (q.includes("eligible") || q.includes("qualify"))) {
      if (activeScheme) {
        const reasons = activeScheme.whyEligible.map((r) => `• ${r}`).join("\n");
        return `Based on your profile assessment for ${activeScheme.name}, your eligibility match score is ${activeScheme.matchScore}%.\n\nKey qualifying factors:\n${reasons}\n\nYou can review full details on the Scheme Details page.`;
      }
      return "Eligibility depends on factors such as your enterprise activity, applicant category, age, and state domicile. Please visit the Scheme Results page or specify a scheme to view tailored eligibility factors.";
    }

    // 2. What documents do I need?
    if (q.includes("document") || q.includes("checklist") || q.includes("papers")) {
      if (activeScheme && activeScheme.documentsRequired) {
        const docs = activeScheme.documentsRequired.map((d) => `✓ ${d}`).join("\n");
        return `Here is the document checklist required for ${activeScheme.name}:\n\n${docs}\n\nPlease keep self-attested digital and physical copies ready before starting your application.`;
      }
      return "The documents required depend on the scheme. Please open the scheme's Details page to view its document checklist and verify the latest requirements on the official portal.";
    }

    // 3. What benefits does this scheme provide?
    if (q.includes("benefit") || q.includes("subsidy") || q.includes("amount") || q.includes("loan limit")) {
      if (activeScheme && activeScheme.benefits) {
        const benefitsList = activeScheme.benefits.map((b) => `★ ${b}`).join("\n");
        return `Key benefits provided under ${activeScheme.name}:\n\n${benefitsList}\n\nPrimary Benefit Summary: ${activeScheme.benefit || "Financial assistance provided under scheme norms."}`;
      }
      return "Benefits vary by scheme. Open the relevant Scheme Details page to view the benefits and eligibility information for that scheme.";
    }

    // 4. How do I apply?
    if (q.includes("how") && (q.includes("apply") || q.includes("process") || q.includes("steps"))) {
      if (activeScheme && activeScheme.howToApply) {
        const steps = activeScheme.howToApply
          .map((s) => `Step ${s.stepNumber} [${s.stage || "Stage"}]: ${s.title}\n${s.description}`)
          .join("\n\n");
        return `Application roadmap for ${activeScheme.name}:\n\n${steps}\n\nYou can apply through the official application portal listed on the scheme details page. Before applying, keep your required documents ready and verify the latest eligibility requirements on the official government portal.`;
      }
      return "You can apply through the official application portal listed on the scheme details page. Before applying, keep your required documents ready and verify the latest eligibility requirements on the official government portal.";
    }

    // 5. Where can I apply?
    if (q.includes("where") && (q.includes("apply") || q.includes("portal") || q.includes("link") || q.includes("website"))) {
      if (activeScheme) {
        if (activeScheme.officialPortalUrl) {
          return `Applications for ${activeScheme.name} must be submitted through the official government portal:\n\n🔗 ${activeScheme.officialPortalUrl}\n\nAlways verify that you are using the official government website before submitting personal information.`;
        }
        return `Official portal information will be added for ${activeScheme.name} once database integration is live (this entry is currently demo/mock data). Always verify that you are using the official portal before submitting personal information.`;
      }
      return "Applications should be submitted through the official government portal specified on the Scheme Details page. Always verify that you are using the official portal before submitting personal information.";
    }

    // 6. What should I do if my application is rejected?
    if (q.includes("reject") || q.includes("denied") || q.includes("appeal") || q.includes("disapproved")) {
      return `If an application is rejected or held back:\n\n1. Review the Discrepancy Reason: Government nodal agencies specify the exact grounds (such as incomplete documents, CIBIL score, or DPR non-compliance).\n2. Rectify and Re-apply: Many schemes allow applicants to re-upload missing documents or clarify project estimates.\n3. Seek Institutional Assistance: You can visit your local District Industries Centre (DIC) or Lead Bank Office for free guidance on rectifying and resubmitting your application.`;
    }

    // Default fallback
    return "I can currently help with scheme eligibility, benefits, documents, application steps and official application guidance. Please try one of the suggested questions.";
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? inputText).trim();
    if (!query || isThinking) return;

    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsThinking(true);

    // Simulate thinking delay (600ms)
    setTimeout(() => {
      const responseText = generateMockResponse(query);
      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 600);
  };

  const handleClearChat = () => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: "assistant",
        text: activeScheme
          ? `Conversation cleared. I am ready to help you with ${activeScheme.name}.`
          : "Conversation cleared. How can I help you understand government schemes today?",
        timestamp: timeStr,
      },
    ]);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Top Context Notification Bar if Scheme Context exists */}
      {activeScheme && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 text-xs text-[#0F2557]">
          <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#173B8F]" />
              <span className="font-semibold">Scheme Context:</span>
              <span className="font-bold text-[#173B8F]">{activeScheme.name}</span>
              {activeScheme.isDemo && (
                <span className="rounded bg-amber-100 border border-amber-300 px-1.5 py-0.2 text-[10px] font-bold text-amber-800">
                  DEMO DATA
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/schemes/${activeScheme.id}`}
                className="font-bold text-[#173B8F] hover:underline"
              >
                ← Back to Scheme Details
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/assistant" className="text-slate-500 hover:text-slate-800">
                Clear Context
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Container */}
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 flex flex-col">
        {/* Navigation Breadcrumb */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#173B8F] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/schemes" className="hover:text-[#173B8F] transition-colors">
              Eligible Schemes
            </Link>
            <span>/</span>
            <span className="text-[#173B8F] font-semibold">AI Assistant</span>
          </div>

          <div className="flex items-center gap-2">
            {activeScheme && (
              <Link
                href={`/schemes/${activeScheme.id}`}
                className="inline-flex items-center gap-1 font-semibold text-[#173B8F] hover:underline mr-2"
              >
                ← Back to {activeScheme.name.split("(")[0].trim()}
              </Link>
            )}
            <Link
              href="/schemes"
              className="inline-flex items-center gap-1 font-semibold text-[#173B8F] hover:underline"
            >
              ← Back to Eligible Schemes
            </Link>
          </div>
        </div>

        {/* Page Header Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-[#173B8F]">
                <span>🤖 Prototype Guidance Tool</span>
              </div>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F2557]">
                AI Scheme Assistant
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Get help understanding government schemes, eligibility, documents and applications.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClearChat}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>

        {/* Chat Window Box */}
        <div className="flex-1 flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[480px]">
          {/* Chat Window Top Status Bar */}
          <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173B8F] text-white">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-[#0F2557]">
                  GovSchemes Assistant
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ready for questions</span>
                </div>
              </div>
            </div>

            {activeScheme ? (
              <span className="rounded-full bg-blue-100 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-[#173B8F] truncate max-w-[200px]">
                {activeScheme.name.split("(")[0]}
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                General Mode
              </span>
            )}
          </div>

          {/* Scrollable Message List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[500px]">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#173B8F] text-white text-xs font-bold shadow-2xs">
                      AI
                    </div>
                  )}

                  <div
                    className={`relative rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs max-w-[85%] sm:max-w-[75%] whitespace-pre-line ${
                      isUser
                        ? "bg-[#173B8F] text-white rounded-br-xs"
                        : "bg-slate-50 border border-slate-200/80 text-slate-800 rounded-bl-xs"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`mt-1.5 text-[10px] text-right font-medium ${
                        isUser ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold shadow-2xs">
                      You
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex items-end gap-2.5 justify-start">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#173B8F] text-white text-xs font-bold">
                  AI
                </div>
                <div className="rounded-2xl rounded-bl-xs border border-slate-200 bg-slate-50 px-4 py-3 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#173B8F] animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#173B8F] animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#173B8F] animate-bounce" />
                    </span>
                    <span className="ml-1">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Section */}
          <div className="border-t border-slate-100 bg-slate-50/50 p-3 sm:px-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Suggested Questions:
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((question, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(question)}
                  disabled={isThinking}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-[#173B8F] hover:bg-blue-50 hover:text-[#173B8F] disabled:opacity-50 disabled:pointer-events-none shadow-2xs text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-slate-200 bg-white p-3 sm:p-4"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activeScheme
                    ? `Ask about ${activeScheme.name.split("(")[0]} eligibility, documents, benefits...`
                    : "Ask about government schemes, eligibility, documents..."
                }
                disabled={isThinking}
                className="flex-1 rounded-full border border-slate-300 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 shadow-xs focus:border-[#173B8F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173B8F]"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isThinking}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FF6B00] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-[#E05D00] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <span>Send</span>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Mandatory Notice */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-center text-xs text-slate-500">
          <p className="leading-relaxed">
            AI Assistant responses are for general guidance. Always verify eligibility, documents and application instructions on the official government portal.
          </p>
        </div>
      </div>
    </div>
  );
}
