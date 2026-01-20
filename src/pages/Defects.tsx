import { useState, useRef } from "react";
import { Camera, Upload, AlertTriangle, CheckCircle, Lightbulb, X, Loader2, Image as ImageIcon } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Defect {
  id: string;
  type: string;
  severity: "low" | "medium" | "high";
  confidence: number;
  boundingBox: { x: number; y: number; width: number; height: number };
}

interface Suggestion {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

// Mock detection function - replace with actual YOLO model integration
const mockDetectDefects = (): Promise<{ defects: Defect[]; suggestions: Suggestion[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        defects: [
          {
            id: "1",
            type: "Hotspot",
            severity: "high",
            confidence: 94.5,
            boundingBox: { x: 120, y: 80, width: 60, height: 60 },
          },
          {
            id: "2",
            type: "Micro-crack",
            severity: "medium",
            confidence: 87.2,
            boundingBox: { x: 250, y: 150, width: 80, height: 40 },
          },
          {
            id: "3",
            type: "Soiling",
            severity: "low",
            confidence: 91.8,
            boundingBox: { x: 50, y: 200, width: 100, height: 50 },
          },
        ],
        suggestions: [
          {
            title: "Immediate Hotspot Repair",
            description: "Hotspots can cause permanent cell damage. Schedule professional inspection within 48 hours to prevent efficiency loss of up to 25%.",
            priority: "high",
          },
          {
            title: "Monitor Micro-cracks",
            description: "Small cracks may expand over time. Recommend quarterly thermal imaging scans to track progression. Consider protective coating application.",
            priority: "medium",
          },
          {
            title: "Regular Cleaning Schedule",
            description: "Soiling reduces energy output by 5-10%. Implement bi-weekly cleaning routine or install automated cleaning system for optimal performance.",
            priority: "low",
          },
        ],
      });
    }, 2000);
  });
};

const Defects = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [defects, setDefects] = useState<Defect[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDefects([]);
        setSuggestions([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setShowCamera(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      setSelectedImage(imageData);
      setDefects([]);
      setSuggestions([]);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    try {
      // Replace this with actual YOLO model inference
      const results = await mockDetectDefects();
      setDefects(results.defects);
      setSuggestions(results.suggestions);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setDefects([]);
    setSuggestions([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getSeverityColor = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-accent text-accent-foreground";
      case "low":
        return "bg-primary text-primary-foreground";
    }
  };

  const getPriorityIcon = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "medium":
        return <Lightbulb className="h-5 w-5 text-accent" />;
      case "low":
        return <CheckCircle className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Panel Defect Detection</h1>
            <p className="text-muted-foreground">
              Upload or capture an image of your solar panel to detect defects using AI-powered analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload Section */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Image Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload/Camera Buttons */}
                <div className="flex gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Image
                  </Button>
                  <Dialog open={showCamera} onOpenChange={(open) => !open && stopCamera()}>
                    <DialogTrigger asChild>
                      <Button onClick={startCamera} variant="outline" className="flex-1 h-12">
                        <Camera className="mr-2 h-5 w-5" />
                        Use Camera
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Capture Panel Image</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full rounded-lg bg-muted"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        <div className="flex gap-4">
                          <Button onClick={captureImage} className="flex-1">
                            <Camera className="mr-2 h-5 w-5" />
                            Capture
                          </Button>
                          <Button onClick={stopCamera} variant="outline" className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Image Preview */}
                <div className="relative min-h-[300px] rounded-xl border-2 border-dashed border-border bg-muted/20 flex items-center justify-center overflow-hidden">
                  {selectedImage ? (
                    <>
                      <img
                        src={selectedImage}
                        alt="Panel to analyze"
                        className="max-w-full max-h-[400px] object-contain"
                      />
                      {/* Bounding Boxes Overlay */}
                      {defects.length > 0 && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          {defects.map((defect) => (
                            <g key={defect.id}>
                              <rect
                                x={defect.boundingBox.x}
                                y={defect.boundingBox.y}
                                width={defect.boundingBox.width}
                                height={defect.boundingBox.height}
                                fill="none"
                                stroke={
                                  defect.severity === "high"
                                    ? "#ef4444"
                                    : defect.severity === "medium"
                                    ? "#f59e0b"
                                    : "#10b981"
                                }
                                strokeWidth="2"
                                rx="4"
                              />
                              <text
                                x={defect.boundingBox.x}
                                y={defect.boundingBox.y - 5}
                                fill={
                                  defect.severity === "high"
                                    ? "#ef4444"
                                    : defect.severity === "medium"
                                    ? "#f59e0b"
                                    : "#10b981"
                                }
                                fontSize="12"
                                fontWeight="bold"
                              >
                                {defect.type}
                              </text>
                            </g>
                          ))}
                        </svg>
                      )}
                      <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No image selected</p>
                      <p className="text-sm">Upload or capture an image to begin analysis</p>
                    </div>
                  )}
                </div>

                {/* Analyze Button */}
                <Button
                  onClick={analyzeImage}
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full h-12 gradient-solar glow-primary"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing with YOLO Model...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Detect Defects
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Detected Defects */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      Detected Defects
                    </span>
                    {defects.length > 0 && (
                      <Badge variant="secondary">{defects.length} found</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {defects.length > 0 ? (
                    <div className="space-y-3">
                      {defects.map((defect) => (
                        <div
                          key={defect.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                defect.severity === "high"
                                  ? "bg-destructive"
                                  : defect.severity === "medium"
                                  ? "bg-accent"
                                  : "bg-primary"
                              }`}
                            />
                            <div>
                              <p className="font-medium">{defect.type}</p>
                              <p className="text-sm text-muted-foreground">
                                Confidence: {defect.confidence.toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <Badge className={getSeverityColor(defect.severity)}>
                            {defect.severity.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="h-10 w-10 mx-auto mb-3 opacity-50" />
                      <p>No defects detected yet</p>
                      <p className="text-sm">Analyze an image to see results</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Repair Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {suggestions.length > 0 ? (
                    <div className="space-y-4">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-secondary/50 border border-border/50"
                        >
                          <div className="flex items-start gap-3">
                            {getPriorityIcon(suggestion.priority)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium">{suggestion.title}</h4>
                                <Badge
                                  variant="outline"
                                  className={
                                    suggestion.priority === "high"
                                      ? "border-destructive text-destructive"
                                      : suggestion.priority === "medium"
                                      ? "border-accent text-accent"
                                      : "border-primary text-primary"
                                  }
                                >
                                  {suggestion.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {suggestion.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Lightbulb className="h-10 w-10 mx-auto mb-3 opacity-50" />
                      <p>No suggestions available</p>
                      <p className="text-sm">Detect defects to see repair recommendations</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Defects;
