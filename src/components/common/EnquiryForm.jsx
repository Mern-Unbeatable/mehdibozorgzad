import { memo, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useEnquiries } from '../../context/EnquiryContext';

export const EMPTY_ENQUIRY_FORM = {
  name: '',
  phoneNumber: '',
  email: '',
  comment: '',
};

const EnquiryForm = memo(function EnquiryForm({
  variant = 'stacked',
  formClassName = '',
  inputClassName = '',
  textareaClassName = '',
  buttonClassName = '',
  labelClassName = "text-base text-[#1f1b18] font-['Lato']",
  submitLabel = 'Send Message',
  namePlaceholder = 'John Doe',
  phonePlaceholder = '+1 (310) 000-0000',
  emailPlaceholder = 'johndoe@gmail.com',
  commentPlaceholder = 'Hello, I need a renovation.',
  commentRows = 5,
  requirePhone = false,
  idPrefix = 'enquiry',
  onSuccess,
}) {
  const { sendEnquiry } = useEnquiries();
  const [form, setForm] = useState(EMPTY_ENQUIRY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!form.name.trim() || !form.email.trim() || !form.comment.trim()) {
        toast.error('Please fill in your name, email, and message.');
        return;
      }

      if (requirePhone && !form.phoneNumber.trim()) {
        toast.error('Please enter your phone number.');
        return;
      }

      setLoading(true);
      try {
        const { error } = await sendEnquiry(form);

        if (error) {
          toast.error(error);
          return;
        }

        toast.success('Message sent successfully!');
        setForm(EMPTY_ENQUIRY_FORM);
        onSuccess?.();
      } finally {
        setLoading(false);
      }
    },
    [form, onSuccess, requirePhone, sendEnquiry],
  );

  const renderNameField = () =>
    variant === 'labeled-grid' ? (
      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-name`} className={labelClassName}>
          Name
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={namePlaceholder}
          required
          disabled={loading}
          className={inputClassName}
        />
      </div>
    ) : (
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder={namePlaceholder}
        autoComplete="name"
        required
        disabled={loading}
        className={inputClassName}
      />
    );

  const renderPhoneField = () =>
    variant === 'labeled-grid' ? (
      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-phone`} className={labelClassName}>
          Phone
        </label>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder={phonePlaceholder}
          required={requirePhone}
          disabled={loading}
          className={inputClassName}
        />
      </div>
    ) : (
      <input
        type="tel"
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        placeholder={phonePlaceholder}
        autoComplete="tel"
        required={requirePhone}
        disabled={loading}
        className={inputClassName}
      />
    );

  const renderEmailField = () =>
    variant === 'labeled-grid' ? (
      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-email`} className={labelClassName}>
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={emailPlaceholder}
          required
          disabled={loading}
          className={inputClassName}
        />
      </div>
    ) : (
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder={emailPlaceholder}
        autoComplete="email"
        required
        disabled={loading}
        className={inputClassName}
      />
    );

  const renderCommentField = () =>
    variant === 'labeled-grid' ? (
      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-comment`} className={labelClassName}>
          Comment
        </label>
        <textarea
          id={`${idPrefix}-comment`}
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder={commentPlaceholder}
          rows={commentRows}
          required
          disabled={loading}
          className={textareaClassName}
        />
      </div>
    ) : (
      <textarea
        name="comment"
        value={form.comment}
        onChange={handleChange}
        placeholder={commentPlaceholder}
        rows={commentRows}
        required
        disabled={loading}
        className={textareaClassName}
      />
    );

  const submitButton = (
    <button type="submit" disabled={loading} className={buttonClassName}>
      {loading ? 'Sending...' : submitLabel}
    </button>
  );

  if (variant === 'labeled-grid') {
    return (
      <form onSubmit={handleSubmit} className={formClassName} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            {renderNameField()}
            {renderPhoneField()}
            {renderEmailField()}
          </div>
          {renderCommentField()}
        </div>
        <div className="flex justify-end mt-6">{submitButton}</div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={formClassName} noValidate>
      {renderNameField()}
      {renderPhoneField()}
      {renderEmailField()}
      {renderCommentField()}
      {submitButton}
    </form>
  );
});

export default EnquiryForm;
