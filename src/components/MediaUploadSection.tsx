import React, { useState } from 'react';
import { Upload, Image, Video, X, GripVertical } from 'lucide-react';

interface MediaUploadSectionProps {
  data: any;
  updateData: (data: any) => void;
}

const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({ data, updateData }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    updateData({ ...data, images: [...data.images, ...newImages] });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (id: number) => {
    updateData({ ...data, images: data.images.filter((img: any) => img.id !== id) });
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const newImages = [...data.images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    updateData({ ...data, images: newImages });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Image className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Media Upload</h2>
      </div>

      {/* Image Upload */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Images
          </label>
          
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop images here, or{' '}
              <label className="text-blue-600 cursor-pointer hover:text-blue-700">
                browse files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF up to 10MB each
            </p>
          </div>

          {/* Image Preview Grid */}
          {data.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {data.images.map((image: any, index: number) => (
                <div
                  key={image.id}
                  className="relative group bg-gray-50 rounded-lg overflow-hidden aspect-square"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                      <button
                        type="button"
                        className="p-2 bg-white rounded-full text-gray-600 hover:text-gray-900 transition-colors"
                        title="Drag to reorder"
                      >
                        <GripVertical className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="p-2 bg-white rounded-full text-red-600 hover:text-red-700 transition-colors"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Primary Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Primary
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Video (Optional)
          </label>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Video className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={data.video}
                    onChange={(e) => updateData({ ...data, video: e.target.value })}
                    placeholder="Enter YouTube or Vimeo URL"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <span className="text-gray-500">or</span>
              <label className="px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                Upload File
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateData({ ...data, video: URL.createObjectURL(file) });
                    }
                  }}
                />
              </label>
            </div>
            
            <p className="text-sm text-gray-500">
              Supports video files up to 50MB or paste a YouTube/Vimeo link
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadSection;