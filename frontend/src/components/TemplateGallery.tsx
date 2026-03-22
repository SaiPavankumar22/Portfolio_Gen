import React, { useState } from 'react';
import { PortfolioTemplate, ColorPalette } from '../types';
import { Eye, Palette, Star, Code, Briefcase, GraduationCap, Rocket, Users } from 'lucide-react';

interface TemplateGalleryProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onPreview: (templateId: string) => void;
}

const colorPalettes: ColorPalette[] = [
  {
    id: 'navy-blue',
    name: 'Navy Professional',
    primary: '#1a237e',
    secondary: '#2196f3',
    accent: '#e0e0e0',
    background: '#f8f9fa',
    text: '#1a237e',
    textLight: '#6c757d'
  },
  {
    id: 'forest-green',
    name: 'Forest Nature',
    primary: '#2e7d32',
    secondary: '#8bc34a',
    accent: '#f5f5dc',
    background: '#f1f8e9',
    text: '#1b5e20',
    textLight: '#558b2f'
  },
  {
    id: 'burgundy-rose',
    name: 'Burgundy Elegance',
    primary: '#880e4f',
    secondary: '#e91e63',
    accent: '#fce4ec',
    background: '#fafafa',
    text: '#880e4f',
    textLight: '#ad1457'
  },
  {
    id: 'midnight-neon',
    name: 'Midnight Tech',
    primary: '#000000',
    secondary: '#00ff00',
    accent: '#f0f0f0',
    background: '#1a1a1a',
    text: '#ffffff',
    textLight: '#cccccc'
  },
  {
    id: 'sunset-coral',
    name: 'Sunset Warmth',
    primary: '#ff6f00',
    secondary: '#ff7043',
    accent: '#ffccbc',
    background: '#fff8e1',
    text: '#e65100',
    textLight: '#f57c00'
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    primary: '#4a148c',
    secondary: '#9c27b0',
    accent: '#f3e5f5',
    background: '#fafafa',
    text: '#4a148c',
    textLight: '#7b1fa2'
  },
  {
    id: 'teal-mint',
    name: 'Teal Fresh',
    primary: '#004d40',
    secondary: '#26a69a',
    accent: '#b2dfdb',
    background: '#e0f2f1',
    text: '#004d40',
    textLight: '#00695c'
  },
  {
    id: 'chocolate-gold',
    name: 'Chocolate Luxury',
    primary: '#3e2723',
    secondary: '#ffc107',
    accent: '#fff8e1',
    background: '#fafafa',
    text: '#3e2723',
    textLight: '#5d4037'
  }
];

const portfolioTemplates: PortfolioTemplate[] = [
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Clean lines, elegant spacing, and subtle animations for a professional look',
    category: 'Professional',
    colorPalette: colorPalettes[0],
    preview: '/templates/modern-minimalist.jpg',
    features: ['Clean Typography', 'Smooth Animations', 'Mobile First', 'PDF Export']
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Vibrant colors and unique layouts perfect for creative professionals',
    category: 'Creative',
    colorPalette: colorPalettes[4],
    preview: '/templates/creative-bold.jpg',
    features: ['Bold Colors', 'Unique Layouts', 'Gallery Focus', 'Interactive Elements']
  },
  {
    id: 'corporate-professional',
    name: 'Corporate Professional',
    description: 'Traditional business-focused design with emphasis on achievements',
    category: 'Corporate',
    colorPalette: colorPalettes[0],
    preview: '/templates/corporate-professional.jpg',
    features: ['Business Focus', 'Achievement Highlights', 'Clean Structure', 'Professional Colors']
  },
  {
    id: 'tech-focused',
    name: 'Tech Developer',
    description: 'Dark theme with code snippets and technical project showcase',
    category: 'Technology',
    colorPalette: colorPalettes[3],
    preview: '/templates/tech-focused.jpg',
    features: ['Dark Theme', 'Code Snippets', 'GitHub Integration', 'Tech Stack Display']
  },
  {
    id: 'designer-showcase',
    name: 'Designer Showcase',
    description: 'Visual-heavy design with stunning image galleries and portfolios',
    category: 'Design',
    colorPalette: colorPalettes[5],
    preview: '/templates/designer-showcase.jpg',
    features: ['Visual Heavy', 'Image Galleries', 'Portfolio Grid', 'Creative Layouts']
  },
  {
    id: 'academic-research',
    name: 'Academic Research',
    description: 'Publication-focused with clean typography and research highlights',
    category: 'Academic',
    colorPalette: colorPalettes[1],
    preview: '/templates/academic-research.jpg',
    features: ['Publication Focus', 'Research Highlights', 'Clean Typography', 'Citation Ready']
  },
  {
    id: 'startup-entrepreneur',
    name: 'Startup Entrepreneur',
    description: 'Dynamic design showcasing growth metrics and entrepreneurial journey',
    category: 'Business',
    colorPalette: colorPalettes[6],
    preview: '/templates/startup-entrepreneur.jpg',
    features: ['Growth Metrics', 'Dynamic Design', 'Achievement Focus', 'Investor Ready']
  },
  {
    id: 'freelancer-services',
    name: 'Freelancer Multi-Service',
    description: 'Service-oriented design with client testimonials and skill showcase',
    category: 'Freelance',
    colorPalette: colorPalettes[7],
    preview: '/templates/freelancer-services.jpg',
    features: ['Service Focus', 'Client Testimonials', 'Skill Showcase', 'Contact Forms']
  }
];

const categoryIcons = {
  'Professional': Briefcase,
  'Creative': Palette,
  'Corporate': Star,
  'Technology': Code,
  'Design': Palette,
  'Academic': GraduationCap,
  'Business': Rocket,
  'Freelance': Users
};

const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  selectedTemplate,
  onTemplateSelect,
  onPreview
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(portfolioTemplates.map(t => t.category)))];
  
  const filteredTemplates = selectedCategory === 'All' 
    ? portfolioTemplates 
    : portfolioTemplates.filter(t => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a professionally designed template that matches your style and industry</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map(template => {
          const CategoryIcon = categoryIcons[template.category as keyof typeof categoryIcons];
          const isSelected = selectedTemplate === template.id;
          
          return (
            <div
              key={template.id}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
              }`}
            >
              {/* Template Preview */}
              <div className="relative h-48 bg-gradient-to-br overflow-hidden" style={{
                background: `linear-gradient(135deg, ${template.colorPalette.primary} 0%, ${template.colorPalette.secondary} 100%)`
              }}>
                {/* Mock Template Content */}
                <div className="absolute inset-0 p-4 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <CategoryIcon className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/30 rounded w-3/4"></div>
                    <div className="h-2 bg-white/20 rounded w-1/2"></div>
                    <div className="h-2 bg-white/20 rounded w-2/3"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                      <div className="w-4 h-4 bg-white/20 rounded"></div>
                      <div className="w-4 h-4 bg-white/20 rounded"></div>
                      <div className="w-4 h-4 bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => onPreview(template.id)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {template.category}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.features.slice(0, 3).map(feature => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded">
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onTemplateSelect(template.id)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select Template'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Template Info */}
      {selectedTemplate && (
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Selected: {portfolioTemplates.find(t => t.id === selectedTemplate)?.name}
          </h3>
          <p className="text-gray-600 mb-4">
            {portfolioTemplates.find(t => t.id === selectedTemplate)?.description}
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Color Palette:</span>
              <div className="flex space-x-1">
                {portfolioTemplates.find(t => t.id === selectedTemplate)?.colorPalette && (
                  <>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: portfolioTemplates.find(t => t.id === selectedTemplate)?.colorPalette.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: portfolioTemplates.find(t => t.id === selectedTemplate)?.colorPalette.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: portfolioTemplates.find(t => t.id === selectedTemplate)?.colorPalette.accent }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;