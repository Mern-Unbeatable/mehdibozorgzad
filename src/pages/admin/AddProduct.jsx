import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, ArrowLeft } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { useSettings } from '../../context/SettingsContext';
import { ROUTES } from '../../config';
import { mergeSettingsSources } from '../../utils/adminSettings';
import { buildProductFormData, populateProductFormFromApi } from '../../utils/productForm';
import { fetchProductRawById } from '../../api/products';
import { imageSrc } from '../../utils/imageSrc';
import toast from 'react-hot-toast';
import UploadProgressOverlay from '../../components/layout/admin/UploadProgressOverlay';
import { useMultipartUpload } from '../../hooks/useMultipartUpload';
import {
  createImagePreviewUrl,
  revokeImagePreviewUrl,
  waitForPaint,
} from '../../utils/imagePreview';

const EMPTY_SETTINGS = {
  categories: [],
  brands: [],
  formats: [],
  colors: [],
  shades: [],
  fibers: [],
  species: [],
  installationMethods: [],
};

const PRODUCT_TYPES = [
  { label: 'Floors', value: 'FLOORS' },
  { label: 'Rugs', value: 'RUGS' },
  { label: 'Countertops', value: 'COUNTERTOPS' },
  { label: 'Walls', value: 'WALLS' },
];

const FIELD_SCHEMA = {
  FLOORS: {
    basic: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'categoryId', label: 'Category', required: true, optionsKey: 'categories' },
      { name: 'brandId', label: 'Brand', required: true, optionsKey: 'brands' },
      { name: 'formatId', label: 'Format', optionsKey: 'formats' },
      { name: 'colorIds', label: 'Colors', optionsKey: 'colors', multiple: true },
      { name: 'shadeIds', label: 'Shades', optionsKey: 'shades', multiple: true },
      { name: 'fiberIds', label: 'Fibers', optionsKey: 'fibers', multiple: true },
      { name: 'speciesId', label: 'Species', optionsKey: 'species' },
      {
        name: 'installationMethodId',
        label: 'Installation Method',
        optionsKey: 'installationMethods',
      },
      { name: 'description', label: 'Product Description', type: 'textarea' },
    ],
    spec: [
      { name: 'productHighlights', label: 'Product Highlights', type: 'textarea' },
      { name: 'size', label: 'Size' },
      { name: 'sku', label: 'SKU' },
      { name: 'construction', label: 'Construction' },
      { name: 'material', label: 'Material' },
      { name: 'residential', label: 'Residential' },
      { name: 'warranty', label: 'Warranty' },
    ],
  },
  RUGS: {
    basic: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'categoryId', label: 'Category', required: true, optionsKey: 'categories' },
      { name: 'brandId', label: 'Brand', required: true, optionsKey: 'brands' },
      { name: 'colorIds', label: 'Colors', optionsKey: 'colors', multiple: true },
      { name: 'shadeIds', label: 'Shades', optionsKey: 'shades', multiple: true },
      { name: 'description', label: 'Product Description', type: 'textarea' },
    ],
    spec: [
      { name: 'productHighlights', label: 'Product Highlights', type: 'textarea' },
      { name: 'sku', label: 'SKU' },
      { name: 'collection', label: 'Collection' },
      { name: 'shape', label: 'Shape' },
    ],
  },
  COUNTERTOPS: {
    basic: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'categoryId', label: 'Category', optionsKey: 'categories' },
      { name: 'colorIds', label: 'Colors', optionsKey: 'colors', multiple: true },
      { name: 'shadeIds', label: 'Shades', optionsKey: 'shades', multiple: true },
      { name: 'description', label: 'Product Description', type: 'textarea' },
    ],
    spec: [
      { name: 'productHighlights', label: 'Product Highlights', type: 'textarea' },
      { name: 'size', label: 'Size' },
      { name: 'sku', label: 'SKU' },
      { name: 'collection', label: 'Collection' },
      { name: 'shape', label: 'Shape' },
      { name: 'productLook', label: 'Product Look' },
      { name: 'speciesId', label: 'Species', optionsKey: 'species' },
      { name: 'material', label: 'Material' },
      { name: 'thickness', label: 'Thickness' },
    ],
  },
  WALLS: {
    basic: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'categoryId', label: 'Category', required: true, optionsKey: 'categories' },
      { name: 'brandId', label: 'Brand', required: true, optionsKey: 'brands' },
      { name: 'colorIds', label: 'Colors', optionsKey: 'colors', multiple: true },
      { name: 'shadeIds', label: 'Shades', optionsKey: 'shades', multiple: true },
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

const FormField = ({ field, value, onChange, onMultiChange, options = [] }) => {
  const base =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-base font-['Lato'] text-[#0d0b0a] placeholder:text-[#696664] focus:outline-none focus:border-[#0d0b0a] transition-colors";
  const selectOptions = Array.isArray(options) ? options : [];
  const selectedIds = Array.isArray(value) ? value : [];

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-medium font-['Lato'] text-[#0d0b0a] mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <textarea
          name={field.name}
          value={value ?? ''}
          onChange={onChange}
          rows={3}
          className={base + ' resize-none'}
          placeholder={field.label}
          required={field.required}
        />
      </div>
    );
  }

  if (field.optionsKey && field.multiple) {
    return (
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium font-['Lato'] text-[#0d0b0a] mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {selectOptions.length === 0 ? (
          <p className="text-sm font-['Lato'] text-[#696664]">No options available.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectOptions.map((option) => {
              const checked = selectedIds.includes(option.id);
              return (
                <label
                  key={option.id}
                  className={
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-["Lato"] cursor-pointer transition-colors ' +
                    (checked
                      ? 'border-[#0d0b0a] bg-[#0d0b0a] text-white'
                      : 'border-gray-200 bg-gray-50 text-[#0d0b0a] hover:border-[#0d0b0a]/40')
                  }
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => onMultiChange(field.name, option.id, e.target.checked)}
                  />
                  {option.name}
                </label>
              );
            })}
          </div>
        )}
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
          value={value ?? ''}
          onChange={onChange}
          className={base}
          required={field.required}
        >
          <option value="">{'Select ' + field.label}</option>
          {selectOptions.map((option) => (
            <option key={option.id} value={option.id}>
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
        value={value ?? ''}
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
  const { id: editProductId } = useParams();
  const isEditMode = Boolean(editProductId);
  const { createProduct, updateProduct } = useProducts();
  const { settings, loadSettings, loading: settingsLoading } = useSettings();
  const [productType, setProductType] = useState('FLOORS');
  const [formData, setFormData] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [processingImages, setProcessingImages] = useState(false);
  const [productLoading, setProductLoading] = useState(isEditMode);
  const fileInputRef = useRef(null);
  const { uploadProgress, isUploading, upload } = useMultipartUpload();

  useEffect(() => {
    loadSettings().then(({ error }) => {
      if (error) toast.error('Failed to load catalog options');
    });
  }, [loadSettings]);

  useEffect(() => {
    if (!editProductId) {
      setProductLoading(false);
      return;
    }

    let active = true;

    const loadProduct = async () => {
      setProductLoading(true);
      const { data, error } = await fetchProductRawById(editProductId);

      if (!active) return;

      if (error || !data) {
        toast.error(error || 'Product not found');
        navigate(ROUTES.ADMIN_PRODUCTS);
        return;
      }

      const populated = populateProductFormFromApi(data);
      setProductType(populated.productType);
      setFormData(populated.fields);
      setExistingImages(
        populated.existingImages.map((image) => ({
          ...image,
          url: imageSrc(image.url),
        })),
      );
      setImages([]);
      setProductLoading(false);
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [editProductId, navigate]);

  const catalog = mergeSettingsSources(EMPTY_SETTINGS, settings);
  const schema = FIELD_SCHEMA[productType];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleMultiChange = useCallback((name, id, checked) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[name]) ? prev[name] : [];
      if (checked) {
        return { ...prev, [name]: current.includes(id) ? current : [...current, id] };
      }
      return { ...prev, [name]: current.filter((item) => item !== id) };
    });
  }, []);

  const handleTypeChange = (value) => {
    if (isEditMode) return;
    setProductType(value);
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

    if (!formData.name?.trim()) {
      toast.error('Product name is required');
      return;
    }

    const newFiles = images.map(({ file }) => file);

    if (!isEditMode && newFiles.length === 0) {
      toast.error('At least one product image is required');
      return;
    }

    if (isEditMode && newFiles.length === 0 && existingImages.length === 0) {
      toast.error('At least one product image is required');
      return;
    }

    const payload = buildProductFormData({
      productType,
      fields: formData,
      images: newFiles,
    });

    const estimatedTotal = newFiles.reduce((sum, file) => sum + (file?.size ?? 0), 0);

    const { error } = await upload(estimatedTotal, (options) =>
      isEditMode
        ? updateProduct(editProductId, payload, options)
        : createProduct(payload, options),
    );

    if (!error) {
      toast.success(isEditMode ? 'Product updated successfully' : 'Product published successfully');
      navigate(isEditMode ? `/admin/products/${editProductId}` : ROUTES.ADMIN_PRODUCTS);
    } else {
      toast.error(error || (isEditMode ? 'Failed to update product' : 'Failed to publish product'));
    }
  };

  if (productLoading) {
    return (
      <section className="space-y-8">
        <p className="text-base font-['Lato'] text-[#696664]">Loading product…</p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
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
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg mb-4">
                Product Type
              </h2>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_TYPES.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleTypeChange(value)}
                    disabled={isEditMode}
                    className={
                      "px-5 py-2 rounded-full text-base font-medium font-['Lato'] transition-colors " +
                      (isEditMode ? 'cursor-not-allowed opacity-60 ' : 'cursor-pointer ') +
                      (productType === value
                        ? 'bg-[#0d0b0a] text-white'
                        : 'border border-[#0d0b0a] text-[#0d0b0a] hover:bg-gray-50')
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg mb-5">
                Basic Information
              </h2>
              {settingsLoading ? (
                <p className="text-sm font-['Lato'] text-[#696664]">Loading options…</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {schema.basic.map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.type === 'textarea' || field.multiple ? 'sm:col-span-2' : ''
                      }
                    >
                      <FormField
                        field={field}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onMultiChange={handleMultiChange}
                        options={catalog[field.optionsKey] ?? []}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg mb-5">
                Product Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {schema.spec.map((field) => (
                  <div
                    key={field.name}
                    className={field.type === 'textarea' || field.multiple ? 'sm:col-span-2' : ''}
                  >
                    <FormField
                      field={field}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onMultiChange={handleMultiChange}
                      options={catalog[field.optionsKey] ?? []}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg mb-4">
                Product Images
              </h2>

              <div
                role="button"
                tabIndex={0}
                aria-label="Upload product images"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') fileInputRef.current?.click();
                }}
                onDragOver={(event) => {
                  event.preventDefault();
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
                onChange={(event) => handleFiles(event.target.files)}
              />

              {existingImages.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-['Lato'] text-[#696664]">Current images</p>
                  <div className="grid grid-cols-2 gap-2">
                    {existingImages.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.url}
                          alt="Existing product"
                          className="w-full aspect-square object-cover rounded-xl border border-gray-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {images.length > 0 && (
                <div className="mt-4 space-y-2">
                  {existingImages.length > 0 && (
                    <p className="text-sm font-['Lato'] text-[#696664]">New uploads</p>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                  {images.map(({ url }, idx) => (
                    <div key={url} className="relative group">
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
                </div>
              )}
            </div>
          </div>
        </div>

        <UploadProgressOverlay
          visible={isUploading}
          progress={uploadProgress}
          label={isEditMode ? 'Updating product…' : 'Uploading product images...'}
        />

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
            disabled={isUploading || processingImages || settingsLoading}
            className="px-6 py-2.5 rounded-lg bg-[#0d0b0a] hover:bg-[#1f1b18] text-white text-base font-medium font-['Lato'] transition-colors cursor-pointer disabled:opacity-70"
          >
            {isUploading
              ? isEditMode
                ? 'Saving…'
                : 'Publishing…'
              : isEditMode
                ? 'Save Changes'
                : 'Publish Product'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
