import { Link } from "wouter";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

const WHATSAPP_NUMBER = "2349037162950";
const WHATSAPP_MESSAGE = "Hello Miemploya HR, I would like to make an enquiry about your services.";

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="border-t bg-white dark:bg-slate-950 mt-16">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Miemploya HR</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Professional HR services and workforce solutions for organizations across Nigeria.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>miemploya@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 903 716 2950</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 706 666 2597</span>
              </div>
              <a
                href="https://maps.app.goo.gl/yED68YGDYjPF4qZY7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <MapPin className="w-4 h-4" />
                <span>View Head Office Location</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates" className="text-muted-foreground hover:text-foreground">
                  Books & Templates
                </Link>
              </li>
              <li>
                <Link href="/verified" className="text-muted-foreground hover:text-foreground">
                  Top Verified
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium mb-4"
              data-testid="link-whatsapp-footer"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com/miemployaesl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500"
                data-testid="link-instagram"
                title="Instagram: Miemploya Esl"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/miemployaesl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-600"
                data-testid="link-facebook"
                title="Facebook: Miemploya Esl"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@miemployahr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                data-testid="link-tiktok"
                title="TikTok: Miemploya HR"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Miemploya HR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
