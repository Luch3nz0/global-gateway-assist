
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserDataProvider } from "@/contexts/UserDataContext";
import { Progress } from "@/components/ui/progress";

// Form schema
const formSchema = z.object({
  nationality: z.string().min(1, "Nationality is required"),
  age: z.string().min(1, "Age is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  destinationCountry: z.enum(["Brazil", "Portugal"]),
  reasonForImmigration: z.string().min(1, "Please provide a reason"),
  visaAssistance: z.boolean().optional(),
  housingAssistance: z.boolean().optional(),
  bankingSupport: z.boolean().optional(),
  educationGuidance: z.boolean().optional(),
  legalAdvice: z.boolean().optional(),
  jobSearch: z.boolean().optional(),
  additionalInfo: z.string().optional(),
});

const steps = [
  { title: "Personal Information", description: "Let's get to know you" },
  { title: "Destination & Purpose", description: "Where and why" },
  { title: "Service Needs", description: "How can we help" },
  { title: "Additional Information", description: "Anything else?" },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationality: "",
      age: "",
      educationLevel: "",
      destinationCountry: "Brazil",
      reasonForImmigration: "",
      visaAssistance: false,
      housingAssistance: false,
      bankingSupport: false,
      educationGuidance: false, 
      legalAdvice: false,
      jobSearch: false,
      additionalInfo: "",
    },
  });

  // Calculate progress
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Handle next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Convert checkbox data to array of services
    const serviceNeeds = [];
    if (data.visaAssistance) serviceNeeds.push("Visa Assistance");
    if (data.housingAssistance) serviceNeeds.push("Housing Assistance");
    if (data.bankingSupport) serviceNeeds.push("Banking Support");
    if (data.educationGuidance) serviceNeeds.push("Education Guidance");
    if (data.legalAdvice) serviceNeeds.push("Legal Advice");
    if (data.jobSearch) serviceNeeds.push("Job Search");

    // Store in local storage
    localStorage.setItem("userData", JSON.stringify({
      ...data,
      serviceNeeds,
      documents: [
        { id: "1", name: "Passport", status: "pending" },
        { id: "2", name: "Birth Certificate", status: "pending" },
        { id: "3", name: "Educational Records", status: "pending" }
      ],
      nextSteps: [
        { id: "1", task: "Complete personal information", completed: true },
        { id: "2", task: "Upload required documents", completed: false },
        { id: "3", task: "Schedule initial consultation", completed: false },
        { id: "4", task: "Review immigration options", completed: false }
      ]
    }));

    toast({
      title: "Form submitted successfully!",
      description: "Redirecting you to your dashboard.",
    });

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <UserDataProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Navbar />
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-center mb-2">Start Your Immigration Journey</h1>
              <p className="text-muted-foreground text-center">Complete this form to get your personalized immigration plan</p>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{steps[currentStep].title}</CardTitle>
                <CardDescription>{steps[currentStep].description}</CardDescription>
                <Progress value={progress} className="h-2 mt-2" />
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Step 1: Personal Information */}
                    {currentStep === 0 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="nationality"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nationality</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your nationality" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter your age" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="educationLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Education Level</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your education level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="high_school">High School</SelectItem>
                                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                  <SelectItem value="masters">Master's Degree</SelectItem>
                                  <SelectItem value="phd">PhD or Doctorate</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Step 2: Destination & Purpose */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="destinationCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination Country</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select destination country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Brazil">Brazil 🇧🇷</SelectItem>
                                  <SelectItem value="Portugal">Portugal 🇵🇹</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="reasonForImmigration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reason for Immigration</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your primary reason" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="study">Study</SelectItem>
                                  <SelectItem value="work">Work</SelectItem>
                                  <SelectItem value="family">Family Reunification</SelectItem>
                                  <SelectItem value="refugee">Seeking Refuge</SelectItem>
                                  <SelectItem value="retirement">Retirement</SelectItem>
                                  <SelectItem value="investment">Investment</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Step 3: Service Needs */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground mb-4">Select all services you're interested in:</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="visaAssistance"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Visa Assistance</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Help with visa applications and requirements
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="housingAssistance"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Housing Assistance</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Help finding accommodation
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="bankingSupport"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Banking Support</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Opening accounts and financial guidance
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="educationGuidance"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Education Guidance</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    School/university enrollment assistance
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="legalAdvice"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Legal Advice</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Immigration law consultation
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="jobSearch"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Job Search</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Help finding employment opportunities
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Step 4: Additional Information */}
                    {currentStep === 3 && (
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide any additional information that might help us assist you better"
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </form>
                </Form>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Complete <Check className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Onboarding;
