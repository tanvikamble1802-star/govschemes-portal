"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function AssistantChat() {
  const { t, language } = useLanguage();

  const getGreeting = (lang: string) => {
    if (lang === "hi") {
      return "नमस्ते! मैं आपका एआई योजना सहायक हूँ। मैं इस आवेदन प्रक्रिया के प्रत्येक चरण में आपकी सहायता करने के लिए यहाँ हूँ। आप क्या जानना या जांचना चाहते हैं?";
    }
    if (lang === "mr") {
      return "नमस्कार! मी तुमचा एआय योजना साहाय्यक आहे. या अर्ज प्रक्रियेच्या प्रत्येक टप्प्यावर मी तुम्हाला मदत करण्यासाठी येथे आहे. आपल्याला काय जाणून घ्यायचे आहे?";
    }
    return "Hello! I am your AI Scheme Assistant. I am here to help you through every step of this application process. What would you like to know or check?";
  };

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { 
      role: 'assistant', 
      content: getGreeting(language) 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Update initial greeting when language changes if no user messages sent yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [{ role: 'assistant', content: getGreeting(language) }];
      }
      return prev;
    });
  }, [language]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      setTimeout(() => {
        let aiReply = "";
        const lowerMsg = userMessage.toLowerCase();

        if (language === "hi") {
          if (lowerMsg.includes("eligib") || lowerMsg.includes("qualif") || lowerMsg.includes("पात्र")) {
            aiReply = "अपनी पात्रता जांचने के लिए, कृपया ऊपर दिया गया मुख्य पात्रता अनुभाग देखें। सामान्यतः आपको लक्षित सामाजिक श्रेणी, निवास और आय सीमा को पूरा करना होता है।";
          } else if (lowerMsg.includes("document") || lowerMsg.includes("paper") || lowerMsg.includes("proof") || lowerMsg.includes("दस्तावेज") || lowerMsg.includes("प्रमाणपत्र")) {
            aiReply = "दस्तावेजों के लिए, कृपया फॉर्म भरने से पहले अपना पहचान पत्र (आधार/पैन), निवास प्रमाण, जाति प्रमाण पत्र और आय प्रमाण पत्र तैयार रखें।";
          } else if (lowerMsg.includes("apply") || lowerMsg.includes("portal") || lowerMsg.includes("register") || lowerMsg.includes("आवेदन") || lowerMsg.includes("पंजीकरण")) {
            aiReply = "आप सीधे आधिकारिक सरकारी पोर्टल पर ऑनलाइन आवेदन करने के लिए योजना विवरण में दिए गए 'अभी आवेदन करें' बटन पर क्लिक कर सकते हैं।";
          } else if (lowerMsg.includes("checklist") || lowerMsg.includes("progress") || lowerMsg.includes("step") || lowerMsg.includes("चेकलिस्ट") || lowerMsg.includes("चरण")) {
            aiReply = "आप ऊपर दी गई इंटरैक्टिव चेकलिस्ट का उपयोग करके अपनी तैयारी की प्रगति ट्रैक कर सकते हैं! प्रत्येक कार्य पूर्ण होने पर उसे टिक करें।";
          } else {
            aiReply = `मैंने आपके प्रश्न "${userMessage}" को नोट किया है। विशिष्ट दस्तावेजों, पात्रता नियमों या आवेदन प्रक्रिया के बारे में आप बेझिझक कभी भी पूछ सकते हैं!`;
          }
        } else if (language === "mr") {
          if (lowerMsg.includes("eligib") || lowerMsg.includes("qualif") || lowerMsg.includes("पात्र")) {
            aiReply = "आपली पात्रता तपासण्यासाठी, वरील मुख्य पात्रता निकष विभाग पहा. सामान्यतः आपल्याला सामाजिक प्रवर्ग, अधिवास आणि उत्पन्न मर्यादा पूर्ण करणे आवश्यक असते.";
          } else if (lowerMsg.includes("document") || lowerMsg.includes("paper") || lowerMsg.includes("proof") || lowerMsg.includes("कागदपत्र") || lowerMsg.includes("दाखला")) {
            aiReply = "कागदपत्रांसाठी, कृपया अर्ज भरण्यापूर्वी आपले ओळखपत्र (आधार/पॅन), रहिवासी दाखला आणि उत्पन्न प्रमाणपत्र स्कॅन करून सज्ज ठेवा.";
          } else if (lowerMsg.includes("apply") || lowerMsg.includes("portal") || lowerMsg.includes("register") || lowerMsg.includes("अर्ज") || lowerMsg.includes("नोंदणी")) {
            aiReply = "शासकीय पोर्टलवर थेट नोंदणी करण्यासाठी आपण योजना तपशीलात दिलेल्या 'आता अर्ज करा' लिंकवर क्लिक करू शकता.";
          } else if (lowerMsg.includes("checklist") || lowerMsg.includes("progress") || lowerMsg.includes("step") || lowerMsg.includes("चेकलिस्ट") || lowerMsg.includes("टप्पा")) {
            aiReply = "आपण वरील परस्परसंवादी चेकलिस्ट वापरून आपली प्रगती ट्रॅक करू शकता! प्रत्येक काम पूर्ण झाल्यावर त्यावर क्लिक करा.";
          } else {
            aiReply = `मी आपला प्रश्न "${userMessage}" नोंदवला आहे. विशिष्ट कागदपत्रे, पात्रता अटी किंवा अर्ज प्रक्रियेबाबत आपण कधीही विचारू शकता!`;
          }
        } else {
          if (lowerMsg.includes("eligib") || lowerMsg.includes("qualif")) {
            aiReply = "To check your eligibility, review the main criteria section above. Generally, you need to meet the targeted demographic, residency, and income thresholds.";
          } else if (lowerMsg.includes("document") || lowerMsg.includes("paper") || lowerMsg.includes("proof")) {
            aiReply = "For your documentation, make sure you keep your government ID, address proof, and income certificates scanned and ready before filling out the form.";
          } else if (lowerMsg.includes("apply") || lowerMsg.includes("portal") || lowerMsg.includes("register")) {
            aiReply = "You can click on the official application link provided in the scheme details to register directly on the government portal.";
          } else if (lowerMsg.includes("checklist") || lowerMsg.includes("progress") || lowerMsg.includes("step")) {
            aiReply = "You can track your progress using the interactive checklist above! Just click each task as you complete it.";
          } else {
            aiReply = `I note your question regarding "${userMessage}". Feel free to ask about specific documents, eligibility rules, or application steps at any time!`;
          }
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }]);
        setLoading(false);
      }, 700);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">{t.navAssistant || "Chat with AI Assistant"}</h3>
          <p className="text-xs text-gray-500">{t.askAssistantSub || "Real-time guidance for your application process"}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-800">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{t.assistantOnline || "Online"}</span>
        </div>
      </div>

      <div className="h-72 overflow-y-auto border border-gray-100 rounded-xl p-4 bg-gray-50/50 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-900 text-white font-medium' : 'bg-white border border-gray-200 text-gray-800 shadow-2xs'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-500 rounded-xl px-4 py-2 text-xs italic shadow-2xs flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
              <span>{t.assistantTyping || "Assistant is typing..."}</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chatInputPlaceholder || "Ask anything about eligibility, forms, or documents..."}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-900 transition bg-white text-gray-900"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition shadow-xs disabled:opacity-50 cursor-pointer"
        >
          {t.sendBtn || "Send"}
        </button>
      </form>
    </div>
  );
}