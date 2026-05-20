import { ReactNode } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface AdminTableProps {
  columns: Column[];
  data: Record<string, any>[];
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
  actions?: boolean;
}

export default function AdminTable({
  columns,
  data,
  onEdit,
  onDelete,
  actions = true,
}: AdminTableProps) {
  return (
    <div className="overflow-x-auto rounded border" style={{ borderColor: '#444444' }}>
      <table className="w-full">
        <thead>
          <tr
            style={{
              backgroundColor: '#1d293d',
              borderBottomColor: '#444444',
            }}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium"
                style={{
                  color: '#314158',
                  fontFamily: 'Geist, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  width: col.width,
                }}
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th
                className="px-4 py-3 text-left text-xs font-medium"
                style={{
                  color: '#314158',
                  fontFamily: 'Geist, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              style={{
                borderBottomColor: '#444444',
              }}
              className="border-b hover:bg-opacity-50"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d293d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-sm"
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Geist, sans-serif',
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="p-1 rounded hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: '#ac4bff',
                          color: '#ffffff',
                        }}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="p-1 rounded hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: '#fb2c36',
                          color: '#ffffff',
                        }}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div
          className="px-4 py-8 text-center"
          style={{
            backgroundColor: '#0f172b',
            color: '#314158',
            fontFamily: 'Geist, sans-serif',
          }}
        >
          No data available
        </div>
      )}
    </div>
  );
}
