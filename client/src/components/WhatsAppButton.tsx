import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "2349037162950";
const WHATSAPP_MESSAGE = "Hello Miemploya HR, I would like to make an enquiry about your services.";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-colors"
      data-testid="button-whatsapp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline font-medium">Chat with us</span>
    </a>
  );
}
