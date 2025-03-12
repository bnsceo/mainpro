import { useState, useRef } from "react";
import { useInView, useConnectionCanvas } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Send, MessageSquare } from "lucide-react";
import { sendTextMessage } from "@/services/TextMessageService";
const Contact = () => {
  const {
    ref,
    isInView
  } = useInView({}, true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();

  // AI assistant state
  const [assistantQuery, setAssistantQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<{
    text: string;
    isUser: boolean;
  }[]>([{
    text: "Hello! How can I assist you with your digital alchemy needs?",
    isUser: false
  }]);
  const [assistantLoading, setAssistantLoading] = useState(false);

  // Initialize connection canvas animation
  useConnectionCanvas(canvasRef);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };
  const handleAssistantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantQuery.trim()) return;

    // Add user message to chat
    setChatMessages(prev => [...prev, {
      text: assistantQuery,
      isUser: true
    }]);
    setAssistantLoading(true);
    try {
      // Send text message with the user's query
      const messageText = `Question from website: ${assistantQuery}`;
      await sendTextMessage(messageText);

      // Add response message
      setChatMessages(prev => [...prev, {
        text: "Thanks for your message! I've received it and will respond shortly.",
        isUser: false
      }]);

      // Clear input
      setAssistantQuery("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Unable to send your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setAssistantLoading(false);
    }
  };
  return <section id="contact" ref={ref as React.RefObject<HTMLDivElement>} className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={cn("section-title mx-auto text-center transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
          The Connection
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={cn("transition-all duration-700 delay-200", isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12")}>
            <div className="glass-card h-full">
              <div className="connection-visual h-full min-h-[400px] relative">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
                <div className="absolute inset-0 flex items-center justify-center flex-col p-8 text-center py-0">
                  <h3 className="text-2xl font-bold mb-4">Let's Create Together</h3>
                  <p className="text-foreground/80 mb-6">
                    Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
                  </p>
                  <div className="flex flex-col space-y-4 items-center">
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={cn("transition-all duration-700 delay-300", isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12")}>
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="form-control" placeholder="Your name" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="form-control" placeholder="Your email" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="form-control" placeholder="Subject" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required className="form-control min-h-[120px]" placeholder="Your message" />
                </div>
                
                <Button type="submit" className="btn-primary w-full" disabled={loading}>
                  {loading ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                </Button>
              </div>
            </form>
            
            <div className={cn("glass-card p-8 mt-8 transition-all duration-700 delay-400", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" /> Ask the Alchemist
              </h3>
              
              <div className="chat-messages bg-muted/30 rounded-lg p-4 h-60 overflow-y-auto mb-4">
                {chatMessages.map((msg, index) => <div key={index} className={cn("mb-3 p-3 max-w-[85%] rounded-lg", msg.isUser ? "bg-primary text-white ml-auto" : "bg-muted/50 text-foreground mr-auto")}>
                    {msg.text}
                  </div>)}
                {assistantLoading && <div className="bg-muted/50 text-foreground mr-auto mb-3 p-3 max-w-[85%] rounded-lg">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-foreground/70 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-foreground/70 rounded-full animate-bounce" style={{
                    animationDelay: "0.2s"
                  }}></div>
                      <div className="h-2 w-2 bg-foreground/70 rounded-full animate-bounce" style={{
                    animationDelay: "0.4s"
                  }}></div>
                    </div>
                  </div>}
              </div>
              
              <form onSubmit={handleAssistantSubmit} className="flex gap-2">
                <Input value={assistantQuery} onChange={e => setAssistantQuery(e.target.value)} className="form-control flex-1" placeholder="Ask a question..." />
                <Button type="submit" className="btn-primary" disabled={assistantLoading}>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>;
};
export default Contact;