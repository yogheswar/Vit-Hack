import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Settings saved",
                description: "Your profile information has been updated successfully.",
            });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background flex">
            <DashboardSidebar />
            <main className="flex-1 flex flex-col">
                <DashboardHeader />

                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div>
                            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Settings</h2>
                            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                        </div>

                        <div className="glass rounded-2xl p-8 space-y-8">
                            <div className="flex items-center gap-4 pb-6 border-b border-border/50">
                                <div className="h-12 w-12 rounded-full gradient-solar flex items-center justify-center">
                                    <User className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Profile Information</h3>
                                    <p className="text-sm text-muted-foreground">Update your photo and personal details.</p>
                                </div>
                            </div>

                            {/* Profile Photo Section */}
                            <div className="flex items-center gap-8">
                                <div className="relative group">
                                    <div className="h-32 w-32 rounded-full bg-secondary overflow-hidden border-4 border-background shadow-xl">
                                        <img
                                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 rounded-full gradient-solar text-primary-foreground shadow-lg hover:scale-110 transition-transform">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-medium">Profile Photo</h4>
                                    <p className="text-sm text-muted-foreground">Recommended: Square JPG, PNG. Max 2MB.</p>
                                    <div className="flex gap-2 mt-2">
                                        <Button variant="outline" size="sm">Change</Button>
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="firstName" defaultValue="Alex" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="lastName" defaultValue="Morgan" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" type="email" defaultValue="alex.morgan@example.com" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="phone" type="tel" defaultValue="+1 (555) 000-0000" className="pl-9" />
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="address" defaultValue="123 Solar Street, Sunnyvale, CA 94086" className="pl-9" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border/50 flex justify-end gap-4">
                                <Button variant="ghost">Cancel</Button>
                                <Button onClick={handleSave} variant="solar" disabled={loading}>
                                    {loading ? "Saving..." : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
