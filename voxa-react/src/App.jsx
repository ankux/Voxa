import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import axios from "axios";
import { Copy, Bot, Github, Sparkles, Mail, CheckCircle, AlertCircle } from "lucide-react";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("neutral");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
      });
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 mb-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
              <span className="text-sm font-medium text-white/80">AI-Powered Email Assistant</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              V<Bot className="inline-block mb-2 text-purple-400 animate-bounce" size={48} />xa
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Transform your email communication with intelligent, context-aware replies
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Input Section */}
              <div className="space-y-6 mb-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-white/90 font-medium text-sm">
                    <Mail className="h-4 w-4 text-purple-400" />
                    Original Email Content
                  </label>
                  <Textarea
                    placeholder="Paste the original email content here to generate a contextual reply..."
                    className="min-h-[180px] bg-white/5 border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white placeholder-white/50 rounded-2xl resize-none transition-all duration-300 text-base leading-relaxed"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    aria-label="Original email content"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-white/90 font-medium text-sm">Response Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="w-full bg-white/5 border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white rounded-2xl transition-all duration-300" aria-label="Select tone">
                      <SelectValue placeholder="Choose the tone for your reply" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl">
                      <SelectItem value="neutral" className="hover:bg-white/10 rounded-lg cursor-pointer">Neutral</SelectItem>
                      <SelectItem value="professional" className="hover:bg-white/10 rounded-lg cursor-pointer">Professional</SelectItem>
                      <SelectItem value="casual" className="hover:bg-white/10 rounded-lg cursor-pointer">Casual</SelectItem>
                      <SelectItem value="friendly" className="hover:bg-white/10 rounded-lg cursor-pointer">Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!emailContent.trim() || loading}
                  className="w-full text-lg py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <div className="relative">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      </div>
                      <span>Generating your reply...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5" />
                      Generate Reply
                    </span>
                  )}
                </Button>

                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
              </div>

              {/* Generated Reply Section */}
              {generatedReply && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-1 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-white">Generated Reply</h2>
                  </div>

                  <div className="space-y-4">
                    <Textarea
                      readOnly
                      value={generatedReply}
                      className="min-h-[200px] bg-white/5 border border-white/10 text-white rounded-2xl resize-none text-base leading-relaxed"
                      aria-label="Generated email reply"
                    />
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={handleCopy}
                        className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                        aria-label="Copy generated reply to clipboard"
                      >
                        {copied ? (
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            Copied!
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Copy className="h-4 w-4" />
                            Copy to Clipboard
                          </span>
                        )}
                      </Button>
                      
                      <Button
                        onClick={() => {
                          setEmailContent("");
                          setGeneratedReply("");
                          setTone("neutral");
                        }}
                        variant="outline"
                        className="px-6 bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
                      >
                        New Email
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center">
            <a 
              href="https://github.com/Bitwise-AR/Voxa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 hover:scale-105 group"
            >
              <Github className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium"> Ayush Raj</span>
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;