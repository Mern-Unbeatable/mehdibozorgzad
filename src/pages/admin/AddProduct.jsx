import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, ArrowLeft } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { useSettings } from '../../context/SettingsContext';
import { ROUTES } from '../../config';
import { mergeSettingsSources, readStoredAdminSettings } from '../../utils/adminSettings';
import toast from 'react-hot-toast';
import UploadProgressOverlay from '../../components/layout/admin/UploadProgressOverlay';
import { useMultipartUpload } from '../../hooks/useMultipartUpload';
import {
  createImagePreviewUrl,
  revokeImagePreviewUrl,
  waitForPaint,
} from '../../utils/imagePreview';

// TODO: replace with API
const _mockData = {
  products: [
    { id: 'mock-product-1', name: 'Floors' },
    { id: 'mock-product-2', name: 'Rugs' },
    { id: 'mock-product-3', name: 'Countertops' },
    { id: 'mock-product-4', name: 'Walls' },
  ],
  categories: [],
  brands: [],
  formats: [],
  colors: [],
  shades: [],
  fibers: [],
  species: [],
  installationMethods: [],
};

const FIELD_SCHEMA = {
  Floors: {
    basic: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'category', label: 'Category', required: true, optionsKey: 'categories' },
      { name: 'brand', label: 'Brand Name', required: true, optionsKey: 'brands' },
      { name: 'format', label: 'Format', required: true, optionsKey: 'formats' },
      { name: 'color', label: 'Color', optionsKey: 'colors' },
      { name: 'shade', label: 'Shade', optionsKey: 'shades' },
      { name: 'fiber', label: 'Fiber', optionsKey: 'fibers' },
      { name: 'species', label: 'Species', optionsKey: 'species' },
      {
        name: 'installationMethod',
        label: 'Installation Method',
        optionsKey: 'installationMethods',
      },
      { name: 'description', label: 'Product Description', type: 'textarea' },
    ],
    spec: [
      { name: 'highlights', label: 'Product Highlights', type: 'textarea' },
      { name: 'size', label: 'Size' },
      { name: 'sku', label: 'SKU' },
      { name: 'construction', label: 'Construction' },
      { name: 'material', label: 'Material' },
      { name: 'residential', label: 'Residential' },
      { name: 'warranty', label: 'Warranty' },
    ],
  },
  Rugs: {
    basic: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'category', label: 'Category', required: true, optionsKey: 'categories' },
      { name: 'brand', label: 'Brand Name', required: true, optionsKey: 'brands' },
      { name: 'color', label: 'Color', optionsKey: 'colors' },
      { name: 'shade', label: 'Shade', optionsKey: 'shades' },
    ],
    spec: [
      { name: 'highlights', label: 'Product Highlights', type: 'textarea' },
      { name: 'sku', label: 'SKU' },
      { name: 'collection', label: 'Collection' },
      { name: 'shape', label: 'Shape' },
    ],
  },
  Countertops: {
    basic: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'category', label: 'Category', optionsKey: 'categories' },
      { name: 'color', label: 'Color', optionsKey: 'colors' },
      { name: 'shade', label: 'Shade', optionsKey: 'shades' },
    ],
    spec: [
      { name: 'highlights', label: 'Product Highlights', type: 'textarea' },
      { name: 'size', label: 'Size' },
      { name: 'sku', label: 'SKU' },
      { name: 'collection', label: 'Collection' },
      { name: 'shape', label: 'Shape' },
      { name: 'productLook', label: 'Product Look' },
      { name: 'species', label: 'Species' },
      { name: 'material', label: 'Material' },
      { name: 'thickness', label: 'Thickness' },
    ],
  },
  Walls: {
    basic: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'category', label: 'Category', required: true, optionsKey: 'categories' },
      { name: 'brand', label: 'Brand Name', required: true, optionsKey: 'brands' },
      { name: 'color', label: 'Color', optionsKey: 'colors' },
      { name: 'shade', label: 'Shade', optionsKey: 'shades' },
      { name: 'description', label: 'Product Description', type: 'textarea' },
    ],
    spec: [
      { name: 'sku', label: 'SKU' },
      { name: 'construction', label: 'Construction' },
      { name: 'material', label: 'Material' },
      { name: 'residential', label: 'Residential' },
      { name: 'warranty', label: 'Warranty' },
      { name: 'thickness', label: 'Thickness' },
    ],
  },
};

const FormField = ({ field, value, onChange, options = [] }) => {
  const base =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-base font-['Lato'] text-[#0d0b0a] placeholder:text-[#696664] focus:outline-none focus:border-[#0d0b0a] transition-colors";
  const selectOptions = Array.isArray(options) ? options : [];

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-medium font-['Lato'] text-[#0d0b0a] mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <textarea
          name={field.name}
          value={value}
          onChange={onChange}
          rows={3}
          className={base + ' resize-none'}
          placeholder={field.label}
          required={field.required}
        />
      </div>
    );
  }

  if (field.optionsKey) {
    return (
      <div>
        <label className="block text-sm font-medium font-['Lato'] text-[#0d0b0a] mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <select
          name={field.name}
          value={value}
          onChange={onChange}
          className={base}
          required={field.required}
        >
          <option value="">{'Select ' + field.label}</option>
          {selectOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium font-['Lato'] text-[#0d0b0a] mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type="text"
        name={field.name}
        value={value}
        onChange={onChange}
        className={base}
        placeholder={field.label}
        required={field.required}
      />
    </div>
  );
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { createProduct } = useProducts();
  const { settings, loadSettings } = useSettings();
  const [productType, setProductType] = useState('Floors');
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [processingImages, setProcessingImages] = useState(false);
  const fileInputRef = useRef(null);
  const { uploadProgress, isUploading, upload } = useMultipartUpload();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const resolvedSettings = mergeSettingsSources(_mockData, settings, readStoredAdminSettings());
  const productTypes =
    resolvedSettings.products.length > 0
      ? resolvedSettings.products.map((item) => item.name)
      : _mockData.products.map((item) => item.name);

  useEffect(() => {
    if (!productTypes.includes(productType) && productTypes.length > 0) {
      setProductType(productTypes[0]);
    }
  }, [productType, productTypes]);

  const schema = FIELD_SCHEMA[productType];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleTypeChange = (t) => {
    setProductType(t);
    setFormData({});
  };

  const handleFiles = async (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (valid.length !== files.length) toast.error('Only image files are allowed');
    if (valid.length === 0) return;

    setProcessingImages(true);
    await waitForPaint();

    setImages((prev) => [
      ...prev,
      ...valid.map((f) => ({ file: f, url: createImagePreviewUrl(f) })),
    ]);
    setProcessingImages(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      const copy = [...prev];
      revokeImagePreviewUrl(copy[idx].url);
      copy.splice(idx, 1);
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('productType', productType);
    Object.entries(formData).forEach(([k, v]) => {
      if (v) payload.append(k, v);
    });
    images.forEach(({ file }) => payload.append('images', file));

    const estimatedTotal = images.reduce((sum, { file }) => sum + (file?.size ?? 0), 0);

    const { error } = await upload(estimatedTotal, (options) => createProduct(payload, options));

    if (!error) {
      toast.success('Product published successfully');
      navigate(ROUTES.ADMIN_PRODUCTS);
    } else {
      toast.error(error || 'Failed to publish product');
    }
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
          className="inline-flex items-center gap-2 text-base font-['Lato'] text-[#696664] hover:text-[#0d0b0a] transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Products
        </button>
        <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl sm:text-3xl leading-tight">
          Add New Product
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: form fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product type selector */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg mb-4">
                Product Type
              </h2>
              <div className="flex flex-wrap gap-2">
                {productTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTypeChange(t)}
                    className={
                      "px-5 py-2 rounded-full text-base font-medium font-['Lato'] transition-colors cursor-pointer " +
                      (productType === t
                        ? 'bg-[#0d0b0a] text-white'
                        : 'border border-[#0d0b0a] text-[#0d0b0a] hover:bg-gray-50')
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg mb-5">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {schema.basic.map((field) => (
                  <div
                    key={field.name}
                    className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
                  >
                    <FormField
                      field={field}
                      value={formData[field.name] ?? ''}
                      onChange={handleChange}
                      options={resolvedSettings[field.optionsKey] ?? []}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg mb-5">
                Product Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {schema.spec.map((field) => (
                  <div
                    key={field.name}
                    className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
                  >
                    <FormField
                      field={field}
                      value={formData[field.name] ?? ''}
                      onChange={handleChange}
                      options={resolvedSettings[field.optionsKey] ?? []}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg mb-4">
                Product Images
              </h2>

              {/* Drop zone */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Upload product images"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={
                  'relative flex flex-col items-center justify-center gap-3 h-40 rounded-xl border-2 border-dashed transition-colors cursor-pointer ' +
                  (dragging
                    ? 'border-[#0d0b0a] bg-gray-100'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100')
                }
              >
                {processingImages ? (
                  <>
                    <span className="w-8 h-8 rounded-full border-2 border-[#0d0b0a] border-t-transparent animate-spin" />
                    <p className="text-base font-['Lato'] text-[#0d0b0a] text-center">
                      Preparing image preview...
                    </p>
                  </>
                ) : (
                  <>
                    <Upload size={28} className="text-[#696664]" aria-hidden="true" />
                    <p className="text-base font-['Lato'] text-[#696664] text-center">
                      Upload your product images
                      <br />
                      <span className="text-sm">or drag and drop here</span>
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={(e) => handleFiles(e.target.files)}
              />

              {/* Thumbnails */}
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {images.map(({ url }, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={'Preview ' + (idx + 1)}
                        className="w-full aspect-square object-cover rounded-xl border border-gray-100"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        aria-label="Remove image"
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/90 hover:bg-white text-[#0d0b0a] shadow transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <X size={12} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <UploadProgressOverlay
          visible={isUploading}
          progress={uploadProgress}
          label="Uploading product images..."
        />

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
            className="px-6 py-2.5 rounded-lg border border-[#0d0b0a] text-[#0d0b0a] text-base font-medium font-['Lato'] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading || processingImages}
            className="px-6 py-2.5 rounded-lg bg-[#0d0b0a] hover:bg-[#1f1b18] text-white text-base font-medium font-['Lato'] transition-colors cursor-pointer disabled:opacity-70"
          >
            {isUploading ? 'Publishing…' : 'Publish Product'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
