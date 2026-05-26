import React from 'react';
import { X, Plus, RefreshCw } from 'lucide-react';

const FormModal = ({ isOpen, onClose, title, icon: Icon, color, onSubmit, children, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md border border-white/30 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className={`bg-gradient-to-r ${color} p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-white text-opacity-90 text-sm mt-1">
                  Fill in the details below
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form - IMPORTANT: Add id to form */}
        <form id="modal-form" onSubmit={onSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {children}
        </form>

        {/* Footer - Submit button now submits the form */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"  // Changed from type="button" to type="submit"
              form="modal-form"  // This connects the button to the form
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;












// import React from 'react';
// import { X, Plus, RefreshCw } from 'lucide-react';

// const FormModal = ({ isOpen, onClose, title, icon: Icon, color, onSubmit, children, loading }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md border border-white/30 animate-fadeIn">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
//         {/* Header */}
//         <div className={`bg-gradient-to-r ${color} p-6`}>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-xl">
//                 <Icon className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-white">{title}</h3>
//                 <p className="text-white text-opacity-90 text-sm mt-1">
//                   Fill in the details below
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-all"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={onSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
//           {children}
//         </form>

//         {/* Footer */}
//         <div className="border-t border-gray-100 p-6 bg-gray-50">
//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <RefreshCw className="w-4 h-4 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-4 h-4" />
//                   Create
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormModal;