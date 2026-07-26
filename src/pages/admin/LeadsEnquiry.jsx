import { useState, useCallback, useEffect } from 'react';
import { useEnquiries } from '../../context/EnquiryContext';
import AdminModal from '../../components/layout/admin/AdminModal';
import ActionDropdown from '../../components/layout/admin/ActionDropdown';
import { confirmDelete } from '../../utils/swal';
import toast from 'react-hot-toast';

const PAGE_SIZE = 10;

const formatDate = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const EnquiryDetailsContent = ({ enquiry, loading }) => {
  if (loading) {
    return <p className="text-base font-['Lato'] text-[#696664]">Loading details...</p>;
  }

  if (!enquiry) {
    return <p className="text-base font-['Lato'] text-[#696664]">Enquiry not found.</p>;
  }

  return (
    <div className="space-y-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#696664] font-['Lato']">
        Customer Information
      </p>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-[#696664] font-['Lato'] mb-0.5">Full Name</p>
          <p className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg">
            {enquiry.name || '-'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-[#696664] font-['Lato'] mb-0.5">Phone</p>
            <p className="text-base font-['Lato'] text-[#0d0b0a]">
              {enquiry.phoneNumber || '-'}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#696664] font-['Lato'] mb-0.5">Email</p>
            <p className="text-base font-['Lato'] text-[#0d0b0a] break-all">
              {enquiry.email || '-'}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-[#696664] font-['Lato'] mb-0.5">Submitted</p>
          <p className="text-base font-['Lato'] text-[#0d0b0a]">
            {formatDate(enquiry.createdAt)}
          </p>
        </div>
      </div>
      {enquiry.comment && (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#696664] font-['Lato'] mb-2">
            Project Description
          </p>
          <p className="text-base font-['Lato'] text-[#4C4946] leading-relaxed whitespace-pre-wrap">
            {enquiry.comment}
          </p>
        </div>
      )}
    </div>
  );
};

const LeadsEnquiry = () => {
  const {
    loading,
    enquiries,
    pagination,
    detail,
    detailLoading,
    loadEnquiries,
    loadEnquiryDetail,
    removeEnquiry,
  } = useEnquiries();

  const [page, setPage] = useState(1);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    loadEnquiries(page, PAGE_SIZE);
  }, [page, loadEnquiries]);

  useEffect(() => {
    if (detailId) {
      loadEnquiryDetail(detailId);
    }
  }, [detailId, loadEnquiryDetail]);

  const resolvedPagination = pagination ?? {
    total: 0,
    page: 1,
    limit: PAGE_SIZE,
    pages: 1,
  };

  const total = resolvedPagination.total ?? 0;
  const pageCount = Math.max(1, resolvedPagination.pages ?? 1);
  const currentPage = resolvedPagination.page ?? page;
  const from = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, total);

  const handleSeeDetails = useCallback((row) => {
    setDetailId(row.id);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setDetailId(null);
  }, []);

  const handleDelete = useCallback(
    async (row) => {
      const confirmed = await confirmDelete({
        title: 'Delete enquiry?',
        text: `Remove the enquiry from "${row.name}"? This action cannot be undone.`,
        confirmButtonText: 'Yes, delete it',
      });

      if (!confirmed) return;

      const { error } = await removeEnquiry(row.id);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Enquiry deleted successfully');

      const isLastItemOnPage = enquiries.length === 1;
      if (isLastItemOnPage && page > 1) {
        setPage((p) => p - 1);
      } else {
        loadEnquiries(page, PAGE_SIZE);
      }
    },
    [enquiries.length, page, loadEnquiries, removeEnquiry],
  );

  return (
    <section className="space-y-8">
      <div>
        <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl sm:text-3xl leading-tight">
          Leads &amp; Enquiry
        </h1>
        <p className="mt-1 text-base font-['Lato'] text-[#696664]">
          Customer enquiries submitted through the website.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {/* Mobile Card View (< md) */}
        <div className="block md:hidden divide-y divide-gray-100">
          {loading && (
            <div className="p-8 text-center text-base font-['Lato'] text-[#696664]">
              Loading...
            </div>
          )}
          {!loading && enquiries.length === 0 && (
            <div className="p-8 text-center text-base font-['Lato'] text-[#696664]">
              No enquiries found.
            </div>
          )}
          {!loading &&
            enquiries.map((row) => (
              <div
                key={row.id}
                className="p-5 flex flex-col gap-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg leading-snug">
                      {row.name || '-'}
                    </h3>
                    <p className="text-xs text-[#696664] font-['Lato'] mt-0.5">
                      {formatDate(row.createdAt)}
                    </p>
                  </div>
                  <ActionDropdown
                    onSeeDetails={() => handleSeeDetails(row)}
                    onDelete={() => handleDelete(row)}
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-sm font-['Lato']">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#696664] text-xs font-semibold uppercase tracking-wider">
                      Email
                    </span>
                    <span className="text-[#0d0b0a] break-all text-right font-medium">
                      {row.email || '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#696664] text-xs font-semibold uppercase tracking-wider">
                      Phone Number
                    </span>
                    <span className="text-[#0d0b0a] text-right font-medium">
                      {row.phoneNumber || '-'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-160">
            <thead>
              <tr className="bg-[#E9E8E8]">
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Email
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Phone Number
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Date
                </th>
                <th className="text-center px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-16 text-base font-['Lato'] text-[#696664]"
                  >
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && enquiries.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-16 text-base font-['Lato'] text-[#696664]"
                  >
                    No enquiries found.
                  </td>
                </tr>
              )}
              {!loading &&
                enquiries.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#0d0b0a] font-medium whitespace-nowrap">
                      {row.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#4C4946] whitespace-nowrap">
                      {row.email || '-'}
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#4C4946] whitespace-nowrap">
                      {row.phoneNumber || '-'}
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#4C4946] whitespace-nowrap">
                      {formatDate(row.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ActionDropdown
                        onSeeDetails={() => handleSeeDetails(row)}
                        onDelete={() => handleDelete(row)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
          <p className="text-base font-['Lato'] text-[#696664]">
            {total === 0
              ? 'No results'
              : `Showing ${from} to ${to} of ${total} results`}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border border-[#0d0b0a] text-[#0d0b0a] text-sm font-['Lato'] font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <span className="text-sm font-['Lato'] text-[#696664] px-2">
              Page {currentPage} of {pageCount}
            </span>
            <button
              type="button"
              disabled={page >= pageCount || loading}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-[#0d0b0a] text-[#0d0b0a] text-sm font-['Lato'] font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <AdminModal open={!!detailId} onClose={handleCloseDetails} title="Enquiry Details">
        <EnquiryDetailsContent enquiry={detail} loading={detailLoading} />
      </AdminModal>
    </section>
  );
};

export default LeadsEnquiry;
