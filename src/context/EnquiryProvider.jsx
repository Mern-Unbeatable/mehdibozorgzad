import { useCallback, useMemo, useState } from 'react';
import {
  sendEnquiry,
  fetchEnquiries,
  fetchEnquiryById,
  removeEnquiry,
} from '../api/enquiries';
import { EnquiryContext } from './EnquiryContext';

export function EnquiryProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const submitEnquiryForm = useCallback(async (form) => {
    setLoading(true);
    try {
      return await sendEnquiry(form);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadEnquiries = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const { data, error } = await fetchEnquiries(page, limit);
      if (!error && data) {
        setEnquiries(data.items);
        setPagination(data.pagination);
      }
      return { data, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const loadEnquiryDetail = useCallback(async (id) => {
    setDetailLoading(true);
    try {
      const { data, error } = await fetchEnquiryById(id);
      if (!error) setDetail(data);
      return { data, error };
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const deleteEnquiry = useCallback(async (id) => {
    const result = await removeEnquiry(id);
    return result;
  }, []);

  const value = useMemo(
    () => ({
      loading,
      sendEnquiry: submitEnquiryForm,
      enquiries,
      pagination,
      detail,
      detailLoading,
      loadEnquiries,
      loadEnquiryDetail,
      removeEnquiry: deleteEnquiry,
    }),
    [
      loading,
      submitEnquiryForm,
      enquiries,
      pagination,
      detail,
      detailLoading,
      loadEnquiries,
      loadEnquiryDetail,
      deleteEnquiry,
    ],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export default EnquiryProvider;
