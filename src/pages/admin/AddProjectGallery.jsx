import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useProjects } from "../../context/ProjectsContext";
import { useSettings } from "../../context/SettingsContext";
import { ROUTES } from "../../config";
import { confirmDelete } from "../../utils/swal";
import toast from "react-hot-toast";
import { displayLabel } from "../../utils/display";
import {
  getProjectCoverImage,
  populateProjectForm,
} from "../../utils/projects";
import UploadProgressOverlay from "../../components/layout/admin/UploadProgressOverlay";
import { useMultipartUpload } from "../../hooks/useMultipartUpload";
import {
  createImagePreviewUrl,
  revokeImagePreviewUrl,
  waitForPaint,
} from "../../utils/imagePreview";

const estimatePayloadBytes = (payload) => {
  let total = 0;

  (payload.featuredImages ?? []).forEach((file) => {
    if (file?.size) total += file.size;
  });

  [payload.thumbnailImage, payload.beforeImage, payload.afterImage].forEach(
    (file) => {
      if (file?.size) total += file.size;
    },
  );

  return total;
};

const ImageUploadField = ({
  id,
  label,
  recommendation,
  value,
  onChange,
  multiple = false,
  required = false,
  isProcessing = false,
}) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="block text-xs sm:text-sm font-medium font-['Lato'] text-[#0d0b0a]"
    >
      {label}
      {required ? <span className="text-red-500 ml-0.5">*</span> : null}
      {recommendation ? (
        <span className="text-[#696664] font-normal ml-1">
          {recommendation}
        </span>
      ) : null}
    </label>
    <label
      htmlFor={id}
      className="w-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center h-44 sm:h-48 px-4 cursor-pointer hover:border-[#0d0b0a]/40 transition-colors relative overflow-hidden bg-gray-50/50 hover:bg-gray-50 group"
    >
      <input
        id={id}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        disabled={isProcessing}
        onChange={(e) => {
          if (multiple) {
            const files = Array.from(e.target.files ?? []).filter((f) =>
              f.type.startsWith("image/"),
            );
            if (files.length > 0) onChange(files);
          } else {
            const file = e.target.files?.[0];
            if (file?.type.startsWith("image/")) onChange(file);
          }
          e.target.value = "";
        }}
      />
      {isProcessing ? (
        <div className="flex flex-col items-center gap-2 text-center text-[#696664]">
          <span className="w-8 h-8 rounded-full border-2 border-[#0d0b0a] border-t-transparent animate-spin" />
          <p className="text-sm font-['Lato'] font-medium text-[#0d0b0a]">
            Preparing preview...
          </p>
        </div>
      ) : value ? (
        <>
          <img
            src={value}
            alt={label}
            className="w-full h-full object-cover rounded-lg"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0d0b0a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
            <Upload size={18} aria-hidden="true" />
            <span className="text-xs font-['Lato'] font-medium">
              Click to replace
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center text-[#696664]">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-[#696664]">
            <Upload size={20} aria-hidden="true" />
          </div>
          <p className="text-sm font-['Lato'] font-medium text-[#0d0b0a]">
            Click or drag to upload
          </p>
        </div>
      )}
    </label>
  </div>
);

const EMPTY_FORM = {
  title: "",
  categoryId: "",
  shortDescription: "",
  city: "",
  state: "",
  serviceType: "",
  materialsUsed: [],
  existingFeaturedImages: [],
  newFeaturedImages: [],
  thumbnailImage: null,
  thumbnailImagePreview: "",
  beforeImage: null,
  beforeImagePreview: "",
  afterImage: null,
  afterImagePreview: "",
};

const populateFormFromProject = (project) => ({
  ...populateProjectForm(project),
  materialsUsed: Array.isArray(project.materialsUsed)
    ? project.materialsUsed.map((item) => displayLabel(item)).filter(Boolean)
    : [],
});

const AddProjectGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editProjectId = useMemo(
    () => location.state?.editProject?.id ?? null,
    [location.state],
  );
  const isEditMode = Boolean(editProjectId);

  const [form, setForm] = useState(EMPTY_FORM);
  const [materialInput, setMaterialInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(isEditMode);
  const [processingField, setProcessingField] = useState(null);
  const [deletingImageId, setDeletingImageId] = useState(null);

  const { createProject, updateProject, loadProject, deleteFeaturedImage } =
    useProjects();
  const { loadCategory } = useSettings();
  const { uploadProgress, isUploading, upload } = useMultipartUpload();

  useEffect(() => {
    let active = true;

    const loadCategories = async () => {
      setCategoriesLoading(true);
      const { data, error } = await loadCategory("categories");

      if (!active) return;

      if (error) {
        toast.error(error);
        setCategories([]);
      } else {
        setCategories(Array.isArray(data) ? data : []);
      }

      setCategoriesLoading(false);
    };

    loadCategories();

    return () => {
      active = false;
    };
  }, [loadCategory]);

  useEffect(() => {
    if (!editProjectId) {
      setForm(EMPTY_FORM);
      setMaterialInput("");
      setProjectLoading(false);
      return;
    }

    let active = true;

    const fetchProject = async () => {
      setProjectLoading(true);
      const { data, error } = await loadProject(editProjectId);

      if (!active) return;

      if (error) {
        toast.error(error);
        navigate(ROUTES.ADMIN_GALLERY_ADMIN);
        return;
      }

      setForm(populateFormFromProject(data));
      setMaterialInput("");
      setProjectLoading(false);
    };

    fetchProject();

    return () => {
      active = false;
    };
  }, [editProjectId, loadProject, navigate]);

  const addMaterial = () => {
    const value = materialInput.trim();
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      materialsUsed: [...prev.materialsUsed, value],
    }));
    setMaterialInput("");
  };

  const updateImageField = useCallback(
    async (fieldId, fileKey, previewKey, file) => {
      if (!file || !file.type.startsWith("image/")) return;

      setProcessingField(fieldId);
      await waitForPaint();

      setForm((prev) => {
        revokeImagePreviewUrl(prev[previewKey]);
        return {
          ...prev,
          [fileKey]: file,
          [previewKey]: createImagePreviewUrl(file),
        };
      });

      setProcessingField(null);
    },
    [],
  );

  const handleAddFeaturedImages = useCallback(async (files) => {
    const validFiles = Array.from(files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (validFiles.length === 0) return;

    setProcessingField("featuredImagesUpload");
    await waitForPaint();

    const entries = validFiles.map((file) => ({
      file,
      preview: createImagePreviewUrl(file),
    }));

    setForm((prev) => ({
      ...prev,
      newFeaturedImages: [...prev.newFeaturedImages, ...entries],
    }));
    setProcessingField(null);
  }, []);

  const handleRemoveNewFeaturedImage = (index) => {
    setForm((prev) => {
      const item = prev.newFeaturedImages[index];
      revokeImagePreviewUrl(item?.preview);
      return {
        ...prev,
        newFeaturedImages: prev.newFeaturedImages.filter((_, i) => i !== index),
      };
    });
  };

  const handleDeleteExistingFeaturedImage = useCallback(
    async (imageId) => {
      const confirmed = await confirmDelete({
        title: "Delete featured image?",
        text: "This image will be permanently removed from the project.",
        confirmButtonText: "Yes, delete it",
      });

      if (!confirmed) return;

      setDeletingImageId(imageId);

      const { error } = await deleteFeaturedImage(editProjectId, imageId);

      setDeletingImageId(null);

      if (error) {
        toast.error(error);
        return;
      }

      setForm((prev) => ({
        ...prev,
        existingFeaturedImages: prev.existingFeaturedImages.filter(
          (img) => img.id !== imageId,
        ),
      }));

      toast.success("Featured image deleted");
    },
    [editProjectId],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!form.categoryId) {
        toast.error("Please select a category");
        return;
      }

      const totalFeaturedCount =
        form.existingFeaturedImages.length + form.newFeaturedImages.length;

      if (!isEditMode && totalFeaturedCount === 0) {
        toast.error("At least one featured image is required");
        return;
      }

      const payload = {
        title: form.title,
        categoryId: form.categoryId,
        shortDescription: form.shortDescription,
        city: form.city,
        state: form.state,
        serviceType: form.serviceType,
        materialsUsed: form.materialsUsed,
        featuredImages: form.newFeaturedImages.map((item) => item.file),
        thumbnailImage: form.thumbnailImage,
        beforeImage: form.beforeImage,
        afterImage: form.afterImage,
      };

      const estimatedTotal = estimatePayloadBytes(payload);

      const { error } = await upload(estimatedTotal, (options) =>
        isEditMode
          ? updateProject(editProjectId, payload, options)
          : createProject(payload, options),
      );

      if (error) {
        toast.error(error);
        return;
      }

      toast.success(isEditMode ? "Project updated" : "Project created");
      navigate(ROUTES.ADMIN_GALLERY_ADMIN);
    },
    [
      createProject,
      editProjectId,
      form,
      isEditMode,
      navigate,
      updateProject,
      upload,
    ],
  );

  if (projectLoading) {
    return (
      <section className="space-y-8">
        <p className="text-base font-['Lato'] text-[#696664]">
          Loading project...
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN_GALLERY_ADMIN)}
          className="inline-flex items-center gap-2 text-base font-['Lato'] text-[#696664] hover:text-[#0d0b0a] transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Project Gallery
        </button>
        <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl sm:text-3xl leading-tight">
          {isEditMode ? "Edit Project" : "Add New Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="projectTitle"
              className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
            >
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              id="projectTitle"
              type="text"
              required
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Commercial Carpet Flooring"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="projectCategory"
              className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="projectCategory"
              required
              value={form.categoryId}
              onChange={(e) =>
                setForm((f) => ({ ...f, categoryId: e.target.value }))
              }
              disabled={categoriesLoading}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a] bg-white disabled:opacity-60"
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "Select a category"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="projectDescription"
              className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
            >
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="projectDescription"
              required
              value={form.shortDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDescription: e.target.value }))
              }
              rows={3}
              placeholder="Short description here"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="projectCity"
                className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
              >
                City
              </label>
              <input
                id="projectCity"
                type="text"
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
                placeholder="New York"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="projectState"
                className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
              >
                State
              </label>
              <input
                id="projectState"
                type="text"
                value={form.state}
                onChange={(e) =>
                  setForm((f) => ({ ...f, state: e.target.value }))
                }
                placeholder="California"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="projectServiceType"
              className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
            >
              Service Type
            </label>
            <input
              id="projectServiceType"
              type="text"
              value={form.serviceType}
              onChange={(e) =>
                setForm((f) => ({ ...f, serviceType: e.target.value }))
              }
              placeholder="Carpet Installation"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="projectMaterialInput"
              className="text-sm font-medium font-['Lato'] text-[#0d0b0a]"
            >
              Materials Used
            </label>
            <div className="flex gap-2">
              <input
                id="projectMaterialInput"
                type="text"
                value={materialInput}
                onChange={(e) => setMaterialInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addMaterial())
                }
                placeholder="Wool Carpet"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-base font-['Lato'] text-[#0d0b0a] focus:outline-none focus:ring-2 focus:ring-[#0d0b0a]/20 focus:border-[#0d0b0a]"
              />
              <button
                type="button"
                onClick={addMaterial}
                className="px-4 py-2 bg-[#0d0b0a] text-white rounded-xl text-sm font-['Lato'] hover:bg-[#1f1b18] transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.materialsUsed.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E9E8E8] text-[#0d0b0a] rounded-full text-sm font-['Lato']"
                >
                  {displayLabel(item)}
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        materialsUsed: f.materialsUsed.filter(
                          (_, i) => i !== index,
                        ),
                      }))
                    }
                    className="text-[#696664] hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left side: Featured Images */}
            <div className="space-y-2">
              <ImageUploadField
                id="featuredImagesUpload"
                label="Featured Images"
                required={!isEditMode}
                recommendation="Recommended: 1200x800px (3:2 ratio)"
                multiple={true}
                isProcessing={processingField === "featuredImagesUpload"}
                onChange={(files) => handleAddFeaturedImages(files)}
              />

              {(form.existingFeaturedImages.length > 0 ||
                form.newFeaturedImages.length > 0) && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {form.existingFeaturedImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative group rounded-xl overflow-hidden border border-gray-200"
                    >
                      <img
                        src={image.url}
                        alt="Featured project"
                        className="w-full h-28 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteExistingFeaturedImage(image.id)
                        }
                        disabled={deletingImageId === image.id}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
                        aria-label="Delete featured image"
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                  ))}

                  {form.newFeaturedImages.map((image, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative group rounded-xl overflow-hidden border border-gray-200"
                    >
                      <img
                        src={image.preview}
                        alt="New featured project"
                        className="w-full h-28 object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0d0b0a]/80 text-white text-xs font-['Lato']">
                        New
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveNewFeaturedImage(index)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 text-red-600 hover:bg-red-50 transition-colors cursor-pointer shadow-sm"
                        aria-label="Remove new image"
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Preview/Thumbnail Image */}
            <ImageUploadField
              id="thumbnailImageUpload"
              label="Preview/Thumbnail Image"
              recommendation="Recommended: 600x400px (3:2 ratio)"
              value={form.thumbnailImagePreview}
              isProcessing={processingField === "thumbnailImageUpload"}
              onChange={(f) =>
                updateImageField(
                  "thumbnailImageUpload",
                  "thumbnailImage",
                  "thumbnailImagePreview",
                  f,
                )
              }
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold font-['Lato'] text-[#0d0b0a]">
            Before &amp; After Images
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUploadField
              id="beforeImageUpload"
              label="Before Image"
              recommendation="Recommended: 1000x750px (4:3 ratio)"
              value={form.beforeImagePreview}
              isProcessing={processingField === "beforeImageUpload"}
              onChange={(f) =>
                updateImageField(
                  "beforeImageUpload",
                  "beforeImage",
                  "beforeImagePreview",
                  f,
                )
              }
            />
            <ImageUploadField
              id="afterImageUpload"
              label="After Image"
              recommendation="Recommended: 1000x750px (4:3 ratio)"
              value={form.afterImagePreview}
              isProcessing={processingField === "afterImageUpload"}
              onChange={(f) =>
                updateImageField(
                  "afterImageUpload",
                  "afterImage",
                  "afterImagePreview",
                  f,
                )
              }
            />
          </div>
        </div>

        <UploadProgressOverlay
          visible={isUploading}
          progress={uploadProgress}
          label="Uploading project files..."
        />

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(ROUTES.ADMIN_GALLERY_ADMIN)}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-base font-['Lato'] text-[#4C4946] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              isUploading || categoriesLoading || Boolean(processingField)
            }
            className="px-5 py-2.5 rounded-xl bg-[#0d0b0a] hover:bg-[#1f1b18] text-white text-base font-medium font-['Lato'] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isUploading
              ? "Saving..."
              : isEditMode
                ? "Update Project"
                : "Create Project"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProjectGallery;
