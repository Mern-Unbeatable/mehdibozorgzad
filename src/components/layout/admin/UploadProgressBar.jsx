import React from 'react';

export const formatBytes = (bytes, decimals = 1) => {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const UploadProgressBar = ({ progress, label = 'Uploading files...' }) => {
  if (!progress) return null;

  const { loaded = 0, total = 0, percentage = 0, remaining = 0 } = progress;
  const hasTotal = total > 0;
  const isComplete = percentage >= 100;
  const displayPercentage = hasTotal || percentage > 0 ? percentage : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-lg space-y-3 transition-all duration-300">
      <div className="flex items-center justify-between text-sm font-['Lato']">
        <span className="font-semibold text-[#0d0b0a] flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isComplete ? 'bg-green-600' : 'bg-[#0d0b0a] animate-pulse'
            }`}
          />
          {isComplete ? 'Processing upload...' : label}
        </span>
        <span className="font-bold text-[#0d0b0a]">
          {displayPercentage !== null ? `${displayPercentage}%` : 'Starting...'}
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden p-0.5 border border-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${
            isComplete ? 'bg-green-600' : 'bg-[#0d0b0a]'
          } ${!hasTotal ? 'w-1/3 animate-pulse' : ''}`}
          style={hasTotal ? { width: `${Math.max(displayPercentage, 3)}%` } : undefined}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-['Lato'] text-[#696664]">
        <span>
          {hasTotal ? (
            <>
              Uploaded: <strong className="text-[#0d0b0a]">{formatBytes(loaded)}</strong> of{' '}
              <strong className="text-[#0d0b0a]">{formatBytes(total)}</strong>
            </>
          ) : (
            <>Preparing upload...</>
          )}
        </span>
        <span>
          {isComplete ? (
            <span className="text-green-600 font-medium">Finishing up...</span>
          ) : hasTotal ? (
            <>
              Remaining: <strong className="text-[#0d0b0a]">{formatBytes(remaining)}</strong>
            </>
          ) : (
            <span className="animate-pulse">Please wait...</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default UploadProgressBar;
