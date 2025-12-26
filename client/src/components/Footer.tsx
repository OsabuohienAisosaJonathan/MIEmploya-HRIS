import { Link } from "wouter";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import footerLogoImg from "@assets/Mi EMPLOYA LOGO4.jpg";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

const WHATSAPP_NUMBER = "2349063337173";
const WHATSAPP_MESSAGE = "Hello Miemploya HR, I would like to make an enquiry about your services.";

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="border-t bg-slate-900 dark:bg-slate-950 text-slate-300 mt-16">
      <div className="container py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" data-testid="link-footer-logo">
              <img src={footerLogoImg} alt="Miemploya" className="h-14 mb-4" />
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Professional HR services and workforce solutions for organizations across Nigeria. Building smarter workforces.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>info@miemploya.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>+234 903 716 2950</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>+234 706 666 2597</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  19 Adesuwa Road, After Zone 5 Police Station, G.R.A., Benin City, Edo State, Nigeria.
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/yED68YGDYjPF4qZY7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-teal-400 transition-colors ml-7"
              >
                <span className="underline">View on Google Maps</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-slate-400 hover:text-white transition-colors">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/templates" className="text-slate-400 hover:text-white transition-colors">
                  Books & Templates
                </Link>
              </li>
              <li>
                <Link href="/verified" className="text-slate-400 hover:text-white transition-colors">
                  Top Verified
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
              data-testid="link-whatsapp-footer"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/miemploya?igsh=b2NnbHZla2tzMnl5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
                data-testid="link-instagram"
                title="Instagram: Miemploya"
              >
                <SiInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/share/1Bt9zVema9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                data-testid="link-facebook"
                title="Facebook: Miemploya"
              >
                <SiFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@miemploya?_r=1&_t=ZS-92UtzlgKmd2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="link-tiktok"
                title="TikTok: Miemploya"
              >
                <SiTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Miemploya HR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
