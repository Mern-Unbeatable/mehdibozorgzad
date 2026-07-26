import { useCallback, useRef, useState } from 'react';

const emptyProgress = (total = 0) => ({
  loaded: 0,
  total,
  percentage: 0,
  remaining: total,
});

/**
 * Tracks upload state for large multipart requests.
 * Progress is estimated until the server responds (fetch has no native upload events).
 */
export function useMultipartUpload() {
  const [uploadProgress, setUploadProgress] = useState(emptyProgress());
  const [isUploading, setIsUploading] = useState(false);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const upload = useCallback(async (estimatedBytes = 0, requestFn) => {
    setIsUploading(true);
    setUploadProgress(emptyProgress(estimatedBytes));

    const stepMs = 200;
    const totalSteps = Math.max(8, Math.min(20, Math.ceil(estimatedBytes / 250_000)));
    let step = 0;

    timerRef.current = setInterval(() => {
      step += 1;
      const percentage = Math.min(90, Math.round((step / totalSteps) * 90));
      const loaded = estimatedBytes ? Math.round((estimatedBytes * percentage) / 100) : 0;

      setUploadProgress({
        loaded,
        total: estimatedBytes,
        percentage,
        remaining: Math.max(0, estimatedBytes - loaded),
      });

      if (step >= totalSteps) {
        clearTimer();
      }
    }, stepMs);

    try {
      const result = await requestFn();
      setUploadProgress({
        loaded: estimatedBytes,
        total: estimatedBytes,
        percentage: 100,
        remaining: 0,
      });
      return result?.error !== undefined ? result : { data: result, error: null };
    } catch (error) {
      return { data: null, error: error?.message || 'Upload failed' };
    } finally {
      clearTimer();
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(emptyProgress());
      }, 400);
    }
  }, []);

  return { uploadProgress, isUploading, upload };
}

export default useMultipartUpload;
