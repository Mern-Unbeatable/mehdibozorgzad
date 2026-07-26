import { createContext, useContext } from 'react';

export const EnquiryContext = createContext({
  loading: false,
  sendEnquiry: async () => {},
  enquiries: [],
  pagination: null,
  detail: null,
  detailLoading: false,
  loadEnquiries: async () => {},
  loadEnquiryDetail: async () => {},
  removeEnquiry: async () => {},
});

export function useEnquiries() {
  const context = useContext(EnquiryContext);
  if (!context) throw new Error('useEnquiries must be used inside EnquiryProvider');
  return context;
}
