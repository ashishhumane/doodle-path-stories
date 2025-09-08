import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, FileText, CheckCircle } from "lucide-react";

const UploadPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      
      // Simulate API call for handwriting analysis
      // Replace with actual API call to your backend
      const formData = new FormData();
      formData.append('handwriting', selectedFile);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Upload Successful! 🎉",
        description: "Your handwriting is being analyzed by forest AI!",
      });
      
      // Navigate to feedback page
      navigate('/feedback');
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your handwriting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-gradient-forest py-6 shadow-forest">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center">
            📸 Share Your Writing
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Instructions */}
          <Card className="p-6 mb-8 bg-gradient-leaf/20 border-forest-leaf/40 shadow-gentle">
            <div className="text-center">
              <Camera className="mx-auto mb-4 text-forest-medium" size={48} />
              <h3 className="text-xl font-semibold text-forest-deep mb-3">
                Time to Share Your Story!
              </h3>
              <p className="text-forest-medium">
                Take a clear photo of your handwritten story. Make sure the lighting is good 
                and all your writing is visible. Our forest AI will analyze your handwriting 
                and provide helpful feedback!
              </p>
            </div>
          </Card>

          {/* Upload area */}
          <Card className="p-8 shadow-gentle border-forest-moss/30 bg-card/95 backdrop-blur-sm">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!previewUrl ? (
              <div 
                onClick={triggerFileInput}
                className="border-2 border-dashed border-forest-moss rounded-lg p-12 text-center cursor-pointer hover:border-forest-leaf hover:bg-forest-moss/5 transition-all duration-300"
              >
                <Upload className="mx-auto mb-4 text-forest-medium" size={64} />
                <h3 className="text-xl font-semibold text-forest-deep mb-2">
                  Upload Your Handwriting
                </h3>
                <p className="text-forest-medium mb-4">
                  Click here to select a photo of your writing
                </p>
                <Button variant="leaf" size="lg">
                  Choose Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview of handwriting"
                    className="w-full max-h-96 object-contain rounded-lg shadow-gentle"
                  />
                  <div className="absolute top-2 right-2 bg-forest-deep/80 text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <CheckCircle size={16} />
                    Ready to analyze
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={triggerFileInput}
                    className="flex items-center gap-2"
                  >
                    <FileText size={16} />
                    Choose Different Photo
                  </Button>
                  <Button 
                    variant="magic" 
                    onClick={handleUpload}
                    disabled={uploading}
                    className="flex items-center gap-2 px-8"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin">🔍</div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        Analyze My Writing
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex justify-center">
            <Button 
              variant="earth" 
              onClick={() => navigate('/story')}
              className="px-8"
            >
              📖 Back to Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;