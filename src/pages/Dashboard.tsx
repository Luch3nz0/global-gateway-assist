
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Download,
  File,
  MoreHorizontal,
  Upload,
  UserCircle
} from "lucide-react";
import { UserData } from "@/contexts/UserDataContext";

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load user data from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Navbar />
        <main className="container px-4 py-16 mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">No Profile Found</h1>
          <p className="mb-8 text-gray-600">Please complete the onboarding process to view your dashboard.</p>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            <Link to="/onboarding">Go to Onboarding</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate progress
  const completedSteps = userData.nextSteps.filter(step => step.completed).length;
  const totalSteps = userData.nextSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;
  
  // Determine status based on destination
  const statusMessage = userData.destinationCountry === "Brazil" 
    ? "Brazilian Immigration Process" 
    : "Portuguese Immigration Process";

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    const updatedUserData = {
      ...userData,
      nextSteps: userData.nextSteps.map(step => 
        step.id === taskId ? { ...step, completed: !step.completed } : step
      )
    };
    
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      <main className="container px-4 py-8 mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Track your immigration journey and next steps
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Schedule Consultation
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-2xl font-bold">
                  {statusMessage}
                </div>
                <Badge className="mt-2 w-fit" variant="outline">
                  {userData.destinationCountry} 
                  {userData.destinationCountry === "Brazil" ? " 🇧🇷" : " 🇵🇹"}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {completedSteps} of {totalSteps} tasks completed
                </div>
                <div className="text-2xl font-bold">
                  {progressPercentage.toFixed(0)}% Complete
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Next Step</CardTitle>
            </CardHeader>
            <CardContent>
              {userData.nextSteps.find(step => !step.completed) ? (
                <div className="space-y-2">
                  <div className="text-lg font-medium">
                    {userData.nextSteps.find(step => !step.completed)?.task}
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    Schedule Now
                  </Button>
                </div>
              ) : (
                <div className="text-lg">All steps completed! 🎉</div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks" className="p-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Immigration Roadmap</CardTitle>
                    <CardDescription>
                      Complete these tasks to progress in your immigration journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.nextSteps.map((step) => (
                        <div
                          key={step.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Button
                              variant={step.completed ? "default" : "outline"}
                              size="icon"
                              className={step.completed ? "bg-green-600 hover:bg-green-700 h-6 w-6" : "h-6 w-6"}
                              onClick={() => toggleTaskCompletion(step.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <span className={step.completed ? "line-through text-muted-foreground" : ""}>
                              {step.task}
                            </span>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="p-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                    <CardDescription>
                      Track and manage your immigration documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <File className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {doc.status === "pending" && "Needs to be uploaded"}
                                {doc.status === "approved" && "Verified and approved"}
                                {doc.status === "rejected" && "Needs revision"}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              className={
                                doc.status === "approved" ? "bg-green-100 text-green-800 hover:bg-green-200" : 
                                doc.status === "rejected" ? "bg-red-100 text-red-800 hover:bg-red-200" : 
                                "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              }
                            >
                              {doc.status}
                            </Badge>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="profile" className="p-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>
                      Your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                          <UserCircle className="w-16 h-16 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Personal Information</h3>
                          <p className="text-sm text-muted-foreground mb-4">Update your personal details</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium">Nationality</div>
                              <div className="text-sm text-muted-foreground">{userData.nationality}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Age</div>
                              <div className="text-sm text-muted-foreground">{userData.age}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Education Level</div>
                              <div className="text-sm text-muted-foreground">
                                {userData.educationLevel === "high_school" && "High School"}
                                {userData.educationLevel === "bachelors" && "Bachelor's Degree"}
                                {userData.educationLevel === "masters" && "Master's Degree"}
                                {userData.educationLevel === "phd" && "PhD or Doctorate"}
                                {userData.educationLevel === "other" && "Other"}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium">Destination</div>
                              <div className="text-sm text-muted-foreground">
                                {userData.destinationCountry} 
                                {userData.destinationCountry === "Brazil" ? " 🇧🇷" : " 🇵🇹"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Services Requested</h3>
                        <div className="flex flex-wrap gap-2">
                          {userData.serviceNeeds.map((service, index) => (
                            <Badge key={index} variant="secondary">{service}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      {userData.additionalInfo && (
                        <div className="space-y-2 border-t pt-4 mt-4">
                          <h3 className="text-lg font-medium">Additional Notes</h3>
                          <p className="text-sm text-muted-foreground">{userData.additionalInfo}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Resources and Help */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resources for {userData.destinationCountry}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="font-medium mb-1">Visa Requirements</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Complete guide to {userData.destinationCountry} visa types and requirements
                  </div>
                  <div className="flex items-center text-blue-600 text-xs font-medium">
                    View Resource <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="font-medium mb-1">Housing Guide</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Find accommodation in {userData.destinationCountry}
                  </div>
                  <div className="flex items-center text-blue-600 text-xs font-medium">
                    View Resource <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="font-medium mb-1">Banking & Finance</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Setting up bank accounts and managing finances
                  </div>
                  <div className="flex items-center text-blue-600 text-xs font-medium">
                    View Resource <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download All Resources
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    💬
                  </div>
                  <div>
                    <div className="font-medium">Live Chat</div>
                    <div className="text-xs text-muted-foreground">Available 24/7</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    📞
                  </div>
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    📧
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-xs text-muted-foreground">Response within 24h</div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 mt-2">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
