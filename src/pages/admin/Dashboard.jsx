import { useState, useCallback, useEffect } from 'react';
import { Package, Tag, TrendingUp, LayoutGrid } from 'lucide-react';
import {
  fetchDashboardStats,
  fetchDashboardLeads,
  removeDashboardEnquiry,
  toList,
} from '../../api/admin';
import AdminModal from '../../components/layout/admin/AdminModal';
import ConfirmDeleteModal from '../../components/layout/admin/ConfirmDeleteModal';
import ActionDropdown from '../../components/layout/admin/ActionDropdown';
import toast from 'react-hot-toast';

// TODO: replace with API
const _mockData = {
  stats: { totalProducts: 124, totalBrands: 18, newLeads: 37, categories: 9 },
  leads: [
    {
      id: 1,
      name: 'Eleanor Pena',
      email: 'eleanor@gmail.com',
      phone: '+1 880 1712-345678',
      message: 'Interested in hardwood flooring for my living room.',
    },
    {
      id: 2,
      name: 'Esther Howard',
      email: 'esther@gmail.com',
      phone: '+1 880 1934-567890',
      message: 'Looking for carpet installation quote.',
    },
    {
      id: 3,
      name: 'Annette Black',
      email: 'annette@gmail.com',
      phone: '+1 880 1934-567890',
      message: '',
    },
    {
      id: 4,
      name: 'Jenny Wilson',
      email: 'jenny@gmail.com',
      phone: '+1 880 1934-567890',
      message: 'Need luxury vinyl for kitchen area.',
    },
    {
      id: 5,
      name: 'Darlene Robertson',
      email: 'darlene@gmail.com',
      phone: '+1 880 1934-567890',
      message: '',
    },
    {
      id: 6,
      name: 'Guy Hawkins',
      email: 'guy@gmail.com',
      phone: '+1 880 1934-567890',
      message: 'Commercial flooring project inquiry.',
    },
    {
      id: 7,
      name: 'Jerome Bell',
      email: 'jerome@gmail.com',
      phone: '+1 880 1934-567890',
      message: '',
    },
    {
      id: 8,
      name: 'Kristin Watson',
      email: 'kristin@gmail.com',
      phone: '+1 880 1934-567890',
      message: 'Waterproof flooring for basement.',
    },
    {
      id: 9,
      name: 'Robert Fox',
      email: 'robert@gmail.com',
      phone: '+1 880 1712-998877',
      message: '',
    },
  ],
};

const STAT_CONFIG = [
  { key: 'totalProducts', label: 'Total Products', icon: Package },
  { key: 'totalBrands', label: 'Total Brands', icon: Tag },
  { key: 'newLeads', label: 'New Leads This Month', icon: TrendingUp },
  { key: 'categories', label: 'Categories', icon: LayoutGrid },
];

const StatCard = ({ label, value, icon: Icon, loading }) => (
  <div className="bg-[#E9E8E8] rounded-2xl p-6 flex items-start gap-4">
    <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center shrink-0 shadow-sm">
      <Icon size={20} className="text-[#0d0b0a]" aria-hidden="true" />
    </div>
    <div>
      <p className="text-base font-['Lato'] text-[#4C4946]">{label}</p>
      <p className="text-2xl font-['Playfair_Display'] font-semibold text-[#0d0b0a] mt-0.5">
        {loading ? (
          <span className="animate-pulse bg-gray-300 rounded w-12 h-6 inline-block" />
        ) : (
          (value ?? 0)
        )}
      </p>
    </div>
  </div>
);

const EnquiryDetailsContent = ({ row }) => (
  <div className="space-y-5">
    <p className="text-xs font-semibold uppercase tracking-widest text-[#696664] font-['Lato']">
      Customer Information
    </p>
    <div className="space-y-3">
      <div>
        <p className="text-xs text-[#696664] font-['Lato'] mb-0.5">Full Name</p>
        <p className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg">
          {row?.name || '-'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-[#696664] font-['Lato'] mb-0.5">Phone</p>
          <p className="text-base font-['Lato'] text-[#0d0b0a]">{row?.phone || '-'}</p>
        </div>
        <div>
          <p className="text-xs text-[#696664] font-['Lato'] mb-0.5">Email</p>
          <p className="text-base font-['Lato'] text-[#0d0b0a] break-all">{row?.email || '-'}</p>
        </div>
      </div>
    </div>
    {row?.message && (
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#696664] font-['Lato'] mb-2">
          Project Description
        </p>
        <p className="text-base font-['Lato'] text-[#4C4946] leading-relaxed">{row.message}</p>
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(_mockData.stats);
  const [statsLoading, setStatsLoading] = useState(true);
  const [leads, setLeads] = useState(_mockData.leads);
  const [leadsLoading, setLeadsLoading] = useState(true);

  const loadLeads = useCallback(async () => {
    setLeadsLoading(true);
    const { data, error } = await fetchDashboardLeads();
    if (!error) {
      const items = toList(data);
      if (items.length > 0) setLeads(items);
    }
    setLeadsLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      setStatsLoading(true);
      const { data, error } = await fetchDashboardStats();
      if (!active) return;
      if (!error) {
        const raw = data?.data ?? data;
        if (raw && Object.keys(raw).length > 0) setStats(raw);
      }
      setStatsLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const [page, setPage] = useState(1);
  const [detailRow, setDetailRow] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const PAGE_SIZE = 7;
  const total = leads.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paginatedLeads = Array.isArray(leads)
    ? leads.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : [];

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const { error } = await removeDashboardEnquiry(deleteTarget.id);
      if (error) {
        toast.error('Failed to delete enquiry');
        return;
      }
      toast.success('Enquiry deleted successfully');
      setDeleteTarget(null);
      loadLeads();
    } catch {
      toast.error('Failed to delete enquiry');
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteTarget, loadLeads]);

  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl sm:text-3xl leading-tight">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-base font-['Lato'] text-[#696664]">
          Welcome back, Admin here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CONFIG.map(({ key, label, icon }) => (
          <StatCard
            key={key}
            label={label}
            icon={icon}
            value={stats[key] != null ? Number(stats[key]).toLocaleString() : undefined}
            loading={statsLoading}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-lg">
            Recent Enquiries
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
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
                <th className="text-center px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leadsLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-16 text-base font-['Lato'] text-[#696664]"
                  >
                    Loading...
                  </td>
                </tr>
              )}
              {!leadsLoading && paginatedLeads.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-16 text-base font-['Lato'] text-[#696664]"
                  >
                    No enquiries found.
                  </td>
                </tr>
              )}
              {!leadsLoading &&
                paginatedLeads.map((row, idx) => (
                  <tr
                    key={row.id ?? idx}
                    className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#0d0b0a] font-medium whitespace-nowrap">
                      {row.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#4C4946] whitespace-nowrap">
                      {row.email || '-'}
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#4C4946] whitespace-nowrap">
                      {row.phone || '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ActionDropdown
                        onSeeDetails={() => setDetailRow(row)}
                        onDelete={() => setDeleteTarget(row)}
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
              : 'Showing ' + from + ' to ' + to + ' of ' + total + ' results'}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border border-[#0d0b0a] text-[#0d0b0a] text-sm font-['Lato'] font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pageCount}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-[#0d0b0a] text-[#0d0b0a] text-sm font-['Lato'] font-medium hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <AdminModal open={!!detailRow} onClose={() => setDetailRow(null)} title="Enquiry Details">
        <EnquiryDetailsContent row={detailRow} />
      </AdminModal>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemLabel={'the enquiry from "' + (deleteTarget?.name ?? 'this customer') + '"'}
      />
    </section>
  );
};

export default Dashboard;
