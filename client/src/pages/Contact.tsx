import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

const SERVICES = [
  "HR Consultancy",
  "Recruitment",
  "Training & Development",
  "Onboarding & Offboarding Services",
  "Attendance Management",
  "Payroll Outsourcing Services",
  "Performance Evaluation",
  "Audit Support",
  "Compliance Support",
  "Background & Reference Checks",
  "MiPayMaster Application",
  "OpenClax Application",
  "MiStock HQ Application",
  "Customized Software Development",
  "Candidate Verification",
];

const TITLES = ["Mr", "Mrs", "Miss", "Dr", "Engr", "Other"];

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState("candidate");
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    organizationName: "",
    service: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userStatus,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your request has been submitted successfully.",
        });
        setFormData({
          title: "",
          fullName: "",
          email: "",
          phone: "",
          state: "",
          city: "",
          organizationName: "",
          service: "",
          description: "",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit request.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const WHATSAPP_NUMBER = "2349037162950";
  const WHATSAPP_MESSAGE = "Hello Miemploya HR, I would like to make an enquiry about your services.";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Contact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">+234 903 716 2950</p>
                    <p className="text-sm text-muted-foreground">WhatsApp & Calls</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">+234 706 666 2597</p>
                    <p className="text-sm text-muted-foreground">Alternative Line</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">miemploya@gmail.com</p>
                    <p className="text-sm text-muted-foreground">Email Us</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/yED68YGDYjPF4qZY7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-blue-600"
                  data-testid="link-google-maps"
                >
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Head Office Location</p>
                    <p className="text-sm text-muted-foreground">View on Google Maps</p>
                  </div>
                </a>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Quick Connect</h2>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium mb-6"
                data-testid="button-whatsapp-contact"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Miemploya HR on WhatsApp
              </a>
              
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com/miemployaesl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-pink-500"
                  data-testid="link-instagram-contact"
                >
                  <SiInstagram className="w-6 h-6" />
                  <span className="text-sm">Miemploya Esl</span>
                </a>
                <a
                  href="https://facebook.com/miemployaesl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-blue-600"
                  data-testid="link-facebook-contact"
                >
                  <SiFacebook className="w-6 h-6" />
                  <span className="text-sm">Miemploya Esl</span>
                </a>
                <a
                  href="https://tiktok.com/@miemployahr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  data-testid="link-tiktok-contact"
                >
                  <SiTiktok className="w-6 h-6" />
                  <span className="text-sm">Miemploya HR</span>
                </a>
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-2">Request Our Services</h1>
            <p className="text-muted-foreground mb-8">
              Fill out the form below to request any of our HR services.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title</Label>
                <Select value={formData.title} onValueChange={(val) => setFormData({ ...formData, title: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    {TITLES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* State & City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* User Status */}
              <div>
                <Label>User Status</Label>
                <RadioGroup value={userStatus} onValueChange={setUserStatus}>
                  <div className="flex items-center gap-2 mt-2">
                    <RadioGroupItem value="employer" id="employer" />
                    <Label htmlFor="employer" className="font-normal cursor-pointer">
                      Employer
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="candidate" id="candidate" />
                    <Label htmlFor="candidate" className="font-normal cursor-pointer">
                      Candidate
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Organization */}
              {userStatus === "employer" && (
                <div>
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    required
                  />
                </div>
              )}

              {/* Service */}
              <div>
                <Label htmlFor="service">Requested Service</Label>
                <Select value={formData.service} onValueChange={(val) => setFormData({ ...formData, service: val })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description / Details</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your request or verification purpose..."
                  className="resize-none"
                  required
                />
              </div>

              {/* Submit */}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
