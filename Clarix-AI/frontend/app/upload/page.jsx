import UploadZone from '../../components/UploadZone';
import SettingsPanel from '../../components/SettingsPanel';
import StepTracker from '../../components/StepTracker';

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-background min-h-screen">
      <div className="text-center mb-4 mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Prepare Your Document</h1>
        <p className="text-muted-foreground mt-2">Upload your file and configure your learning preferences.</p>
      </div>
      
      <StepTracker />
      
      <div className="mt-12 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
        <div className="flex-[2] min-w-0">
          <UploadZone />
        </div>
        <div className="flex-1 min-w-[300px]">
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}