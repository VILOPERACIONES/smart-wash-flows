import { useState, useRef, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  RefreshCw, 
  Trash2, 
  Eye, 
  Save, 
  X, 
  Info,
  ImagePlus,
  Monitor,
  Smartphone
} from "lucide-react";

interface ImageData {
  url: string;
  nombre: string;
  tamaño: string;
  fechaSubida: string;
  dimensiones: string;
}

interface DetallePreciosData {
  imagenDesktop: ImageData | null;
  imagenMobile: ImageData | null;
}

const defaultData: DetallePreciosData = {
  imagenDesktop: null,
  imagenMobile: null
};

const AdminDetallePrecios = () => {
  const { toast } = useToast();
  const [data, setData] = useState<DetallePreciosData>(defaultData);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [dragOverDesktop, setDragOverDesktop] = useState(false);
  const [dragOverMobile, setDragOverMobile] = useState(false);
  
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("detallePreciosData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const validateFile = (file: File, type: "desktop" | "mobile"): string | null => {
    const validFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const minWidth = type === "desktop" ? 1000 : 500;

    if (!validFormats.includes(file.type)) {
      return "Formato no soportado. Usa PNG, JPG o WEBP.";
    }
    if (file.size > maxSize) {
      return "El archivo es demasiado grande. Máximo 5MB.";
    }
    return null;
  };

  const processImage = (file: File, type: "desktop" | "mobile") => {
    const error = validateFile(file, type);
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const minWidth = type === "desktop" ? 1000 : 500;
        if (img.width < minWidth) {
          toast({
            title: "Error",
            description: `La imagen es muy pequeña. Usa al menos ${minWidth}px de ancho.`,
            variant: "destructive"
          });
          return;
        }

        const imageData: ImageData = {
          url: e.target?.result as string,
          nombre: file.name,
          tamaño: formatFileSize(file.size),
          fechaSubida: new Date().toISOString(),
          dimensiones: `${img.width}x${img.height}`
        };

        setData(prev => ({
          ...prev,
          [type === "desktop" ? "imagenDesktop" : "imagenMobile"]: imageData
        }));

        toast({
          title: "Imagen cargada",
          description: `Imagen ${type} lista para guardar.`
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent, type: "desktop" | "mobile") => {
    e.preventDefault();
    type === "desktop" ? setDragOverDesktop(false) : setDragOverMobile(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processImage(file, type);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "desktop" | "mobile") => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file, type);
    }
  };

  const handleDelete = (type: "desktop" | "mobile") => {
    setData(prev => ({
      ...prev,
      [type === "desktop" ? "imagenDesktop" : "imagenMobile"]: null
    }));
    toast({
      title: "Imagen eliminada",
      description: `La imagen de ${type} ha sido eliminada.`
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("detallePreciosData", JSON.stringify(data));
      setIsSaving(false);
      toast({
        title: "¡Guardado!",
        description: "Imágenes actualizadas correctamente."
      });
    }, 800);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const hasImages = data.imagenDesktop || data.imagenMobile;

  const renderUploadZone = (type: "desktop" | "mobile") => {
    const isDragOver = type === "desktop" ? dragOverDesktop : dragOverMobile;
    const inputRef = type === "desktop" ? desktopInputRef : mobileInputRef;
    const imageData = type === "desktop" ? data.imagenDesktop : data.imagenMobile;
    const aspectRatio = type === "desktop" ? "aspect-[3/2]" : "aspect-[2/3] max-w-[300px] mx-auto";

    if (imageData) {
      return (
        <div>
          <div className={`${aspectRatio} rounded-xl overflow-hidden shadow-lg mb-5`}>
            <img 
              src={imageData.url} 
              alt={`Preview ${type}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1 mb-4 text-sm text-[#0033a0]">
            <p className="truncate"><span className="font-medium">Archivo:</span> {imageData.nombre}</p>
            <p><span className="font-medium">Tamaño:</span> {imageData.tamaño}</p>
            <p><span className="font-medium">Dimensiones:</span> {imageData.dimensiones}</p>
            <p><span className="font-medium">Subida:</span> {formatDate(imageData.fechaSubida)}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => inputRef.current?.click()}
              className="flex-1 bg-[#0000FF] hover:bg-[#0033a0] text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Cambiar imagen
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDelete(type)}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => handleFileChange(e, type)}
          />
        </div>
      );
    }

    return (
      <div
        onDragOver={(e) => {
          e.preventDefault();
          type === "desktop" ? setDragOverDesktop(true) : setDragOverMobile(true);
        }}
        onDragLeave={() => type === "desktop" ? setDragOverDesktop(false) : setDragOverMobile(false)}
        onDrop={(e) => handleDrop(e, type)}
        onClick={() => inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
          ${isDragOver 
            ? "border-[#0000FF] bg-[rgba(0,0,255,0.05)] scale-[1.01]" 
            : "border-[#4B82DF] bg-[rgba(75,130,223,0.03)] hover:border-[#0000FF] hover:bg-[rgba(0,0,255,0.05)]"
          }
        `}
      >
        <Upload className="w-16 h-16 mx-auto mb-4 text-[#4B82DF]" />
        <p className="font-semibold text-lg text-black mb-2">Arrastra tu imagen aquí</p>
        <p className="text-[#0033a0] mb-3">o haz clic para seleccionar</p>
        <p className="text-sm text-[#4B82DF]">PNG, JPG, WEBP • Máx 5MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => handleFileChange(e, type)}
        />
      </div>
    );
  };

  return (
    <AdminLayout 
      title="Gestión de Detalle de Precios" 
      description="Administra las imágenes que se mostrarán en el pop-up de detalles de precios. Sube una versión para desktop y otra para mobile."
    >
      {/* Info Banner */}
      <div className="flex items-start gap-3 bg-[rgba(75,130,223,0.08)] border-l-4 border-[#4B82DF] rounded-lg p-4 mb-8">
        <Info className="w-5 h-5 text-[#4B82DF] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#0033a0] leading-relaxed">
          Las imágenes se mostrarán cuando el usuario haga clic en "Ver detalle de precios" en la página de inicio. 
          Asegúrate de usar imágenes claras y legibles.
        </p>
      </div>

      {!hasImages && (
        <div className="text-center py-16 mb-8">
          <ImagePlus className="w-20 h-20 mx-auto mb-4 text-[#4B82DF] opacity-50" />
          <h3 className="text-xl font-bold text-black mb-2">Aún no has subido imágenes</h3>
          <p className="text-[#0033a0] mb-6">Sube las imágenes de detalle de precios para desktop y mobile</p>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Desktop Card */}
        <Card className="border border-gray-200 shadow-md">
          <CardContent className="p-8">
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-[rgba(0,0,255,0.1)] text-[#0000FF]">
                <Monitor className="w-3 h-3" />
                DESKTOP
              </span>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Imagen para Desktop</h3>
            <p className="text-sm text-[#0033a0] mb-6">Recomendado: 1200 x 800 px (horizontal)</p>
            {renderUploadZone("desktop")}
          </CardContent>
        </Card>

        {/* Mobile Card */}
        <Card className="border border-gray-200 shadow-md">
          <CardContent className="p-8">
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-[rgba(75,130,223,0.1)] text-[#4B82DF]">
                <Smartphone className="w-3 h-3" />
                MOBILE
              </span>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Imagen para Mobile</h3>
            <p className="text-sm text-[#0033a0] mb-6">Recomendado: 600 x 900 px (vertical)</p>
            {renderUploadZone("mobile")}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={() => setPreviewOpen(true)}
          disabled={!hasImages}
          className="px-6"
        >
          <Eye className="w-4 h-4 mr-2" />
          Vista previa
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 bg-[#0000FF] hover:bg-[#0033a0] text-white shadow-lg"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar cambios
            </>
          )}
        </Button>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Vista previa del pop-up</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {data.imagenDesktop && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                      <Monitor className="w-4 h-4" /> Desktop
                    </p>
                    <img 
                      src={data.imagenDesktop.url} 
                      alt="Desktop preview" 
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                )}
                {data.imagenMobile && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                      <Smartphone className="w-4 h-4" /> Mobile
                    </p>
                    <img 
                      src={data.imagenMobile.url} 
                      alt="Mobile preview" 
                      className="w-full max-w-[300px] mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDetallePrecios;
