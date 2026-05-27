import React, { useEffect, useRef } from 'react';
import { Eye, Edit, Trash2, Package, MapPin } from 'lucide-react';

const iconMap = {
  Package: Package,
  MapPin: MapPin,
  Eye: Eye,
  Edit: Edit,
  Trash2: Trash2
};

const ContextMenu = ({ x, y, item, onClose, onEdit, onView, onDelete, customActions = [] }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[160px] animate-fadeIn"
      style={{ top: y, left: x }}
    >
      <button
        onClick={() => { onEdit(); onClose(); }}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <Edit className="w-4 h-4" /> Edit
      </button>
      {customActions.map((action, idx) => {
        const IconComponent = iconMap[action.icon] || Package;
        return (
          <button
            key={idx}
            onClick={() => { action.onClick(); onClose(); }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <IconComponent className="w-4 h-4" /> {action.label}
          </button>
        );
      })}
      <div className="border-t border-gray-100 my-1"></div>
      <button
        onClick={() => { onDelete(); onClose(); }}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" /> Delete
      </button>
    </div>
  );
};

export default ContextMenu;