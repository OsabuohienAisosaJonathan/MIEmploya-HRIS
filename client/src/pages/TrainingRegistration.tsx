import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { GraduationCap, User, Briefcase, Calendar, CheckCircle } from "lucide-react";

const trainingFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  employmentStatus: z.string().optional(),
  organizationName: z.string().optional(),
  role: z.string().optional(),
  interestedTraining: z.string().min(2, "Please specify your training interest"),
  preferredStartDate: z.string().optional(),
  certificationRequired: z.boolean().default(false),
  verifiedShortlist: z.boolean().default(false),
});

type TrainingFormData = z.infer<typeof trainingFormSchema>;

export default function TrainingRegistration() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<TrainingFormData>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      employmentStatus: "",
      organizationName: "",
      role: "",
      interestedTraining: "",
      preferredStartDate: "",
      certificationRequired: false,
      verifiedShortlist: false,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: TrainingFormData) => {
      return apiRequest("POST", "/api/training-requests", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Registration Submitted",
        description: "Your training request has been received. We will contact you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TrainingFormData) => {
    submitMutation.mutate(data);
  };

  if (submitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen py-20 px-4">
          <div className="container max-w-lg mx-auto">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for registering for our training program. Our team will review your application and contact you shortly.
                </p>
                <Button onClick={() => window.location.href = "/"} data-testid="button-back-home">
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="gradient-hero py-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur rounded-full mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Free Training Registration
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Enhance your skills with our professional HR training programs. Register now to get started on your learning journey.
            </p>
          </div>
        </div>

        <div className="container max-w-2xl mx-auto px-4 py-12 -mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Training Interest Form</CardTitle>
              <CardDescription>
                Fill out the form below to register your interest in our training programs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <User className="w-5 h-5" />
                      <span>Personal Information</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-fullname" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+234 xxx xxx xxxx" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Briefcase className="w-5 h-5" />
                      <span>Employment Details (Optional)</span>
                    </div>

                    <FormField
                      control={form.control}
                      name="employmentStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Status</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Employed, Unemployed, Student" {...field} data-testid="input-employment-status" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="organizationName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization / Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} data-testid="input-organization" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role / Position</FormLabel>
                            <FormControl>
                              <Input placeholder="Your current role" {...field} data-testid="input-role" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Calendar className="w-5 h-5" />
                      <span>Training Interest</span>
                    </div>

                    <FormField
                      control={form.control}
                      name="interestedTraining"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interested Training *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. HR Management, Recruitment, Payroll" {...field} data-testid="input-interested-training" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredStartDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-preferred-date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                    <Label className="text-base font-semibold">Additional Options</Label>
                    
                    <FormField
                      control={form.control}
                      name="certificationRequired"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-certification"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer">
                              I would like to receive a certification upon completion
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="verifiedShortlist"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-shortlist"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="cursor-pointer">
                              Add me to the Verified Shortlist for job opportunities
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={submitMutation.isPending}
                    data-testid="button-submit-training"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Register for Training"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
