import { useState, useCallback, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { ROUTES } from '../../config';
import ConfirmDeleteModal from '../../components/layout/admin/ConfirmDeleteModal';
import ActionDropdown from '../../components/layout/admin/ActionDropdown';
import toast from 'react-hot-toast';
import { displayLabel } from '../../utils/display';

// TODO: replace with API
const _mockData = {
  products: [
    {
      id: 1,
      name: 'Shaw Floors Aria',
      category: 'Carpet',
      brand: 'Shaw',
      dateAdded: 'Jan 12, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 2,
      name: 'Anderson Tuftex Hardwood',
      category: 'Hardwood',
      brand: 'Anderson Tuftex',
      dateAdded: 'Jan 18, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 3,
      name: 'COREtec Pro Plus XL',
      category: 'Luxury Vinyl',
      brand: 'COREtec',
      dateAdded: 'Feb 3, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 4,
      name: 'Mohawk SmartStrand',
      category: 'Carpet',
      brand: 'Mohawk',
      dateAdded: 'Feb 14, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 5,
      name: 'Pergo TimberCraft',
      category: 'Laminate',
      brand: 'Pergo',
      dateAdded: 'Feb 20, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 6,
      name: 'Stainmaster PetProtect',
      category: 'Carpet',
      brand: 'Stainmaster',
      dateAdded: 'Mar 1, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 7,
      name: 'LifeProof Vinyl Plank',
      category: 'Luxury Vinyl',
      brand: 'LifeProof',
      dateAdded: 'Mar 9, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 8,
      name: 'Bruce Hardwood Strip',
      category: 'Hardwood',
      brand: 'Bruce',
      dateAdded: 'Mar 22, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 9,
      name: 'Karndean Korlok',
      category: 'Luxury Vinyl',
      brand: 'Karndean',
      dateAdded: 'Apr 5, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
    {
      id: 10,
      name: 'Daltile Ceramic Tile',
      category: 'Tile',
      brand: 'Daltile',
      dateAdded: 'Apr 18, 2026',
      image: 'https://placehold.co/48x48/E9E8E8/4C4946?text=P',
    },
  ],
};

const Products = () => {
  const navigate = useNavigate();
  const { loading, products: contextProducts, loadProducts, deleteProduct } = useProducts();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const PAGE_SIZE = 8;
  const products =
    contextProducts.length > 0 ? contextProducts : _mockData.products;
  const total = products.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paginated = Array.isArray(products)
    ? products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : [];

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const { error } = await deleteProduct(deleteTarget.id);
      if (error) {
        toast.error('Failed to delete product');
        return;
      }
      toast.success('Product deleted successfully');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete product');
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteTarget, deleteProduct]);

  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-2xl sm:text-3xl leading-tight">
            Products
          </h1>
          <p className="mt-1 text-base font-['Lato'] text-[#696664]">
            Manage your product catalogue.
          </p>
        </div>
        <Link
          to={ROUTES.ADMIN_PRODUCTS_ADD}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d0b0a] hover:bg-[#1f1b18] text-white rounded-full text-base font-medium font-['Lato'] transition-colors shrink-0"
        >
          <Plus size={18} aria-hidden="true" />
          Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#E9E8E8]">
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Image
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Product Name
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Brand
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Date Added
                </th>
                <th className="text-center px-6 py-3 text-sm font-semibold font-['Lato'] text-[#0C0C0C]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-16 text-base font-['Lato'] text-[#696664]"
                  >
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-16 text-base font-['Lato'] text-[#696664]"
                  >
                    No products found.
                  </td>
                </tr>
              )}
              {!loading &&
                paginated.map((row, idx) => (
                  <tr
                    key={row.id ?? idx}
                    className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={
                          row.image ||
                          row.imageUrl ||
                          row.thumbnail ||
                          'https://placehold.co/48x48/E9E8E8/4C4946?text=P'
                        }
                        alt={row.name || 'Product'}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover bg-[#E9E8E8]"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/48x48/E9E8E8/4C4946?text=P';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#0d0b0a] font-medium whitespace-nowrap">
                      {row.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#4C4946] whitespace-nowrap">
                      {displayLabel(row.category) || '-'}
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#4C4946] whitespace-nowrap">
                      {displayLabel(row.brand) || '-'}
                    </td>
                    <td className="px-6 py-4 text-base font-['Lato'] text-[#4C4946] whitespace-nowrap">
                      {row.dateAdded || row.createdAt || '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ActionDropdown
                        onSeeDetails={() => navigate('/admin/products/' + row.id)}
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

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemLabel={'the product "' + (deleteTarget?.name ?? 'this product') + '"'}
      />
    </section>
  );
};

export default Products;
