import Swal from 'sweetalert2';

/** Simple confirm dialog — returns true when user confirms. */
export const confirmDelete = async ({
  title = 'Are you sure?',
  text = 'This action cannot be undone.',
  confirmButtonText = 'Yes, delete',
  cancelButtonText = 'Cancel',
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#0d0b0a',
    cancelButtonColor: '#696664',
  });

  return result.isConfirmed;
};
