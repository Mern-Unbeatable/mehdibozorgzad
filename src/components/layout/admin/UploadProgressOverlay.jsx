import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import UploadProgressBar from './UploadProgressBar';

const UploadProgressOverlay = ({ visible, progress, label }) => {
  useEffect(() => {
    if (!visible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex min-h-dvh w-screen items-center justify-center bg-[#0d0b0a]/40 backdrop-blur-[2px] p-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-lg">
        <UploadProgressBar
          progress={progress ?? { loaded: 0, total: 0, percentage: 0, remaining: 0 }}
          label={label}
        />
      </div>
    </div>,
    document.body,
  );
};

export default UploadProgressOverlay;
