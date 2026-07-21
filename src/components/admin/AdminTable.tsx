import { Edit2, Trash2 } from "lucide-react";

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface AdminTableProps {
  columns: Column[];
  data: Record<string, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  onEdit?: (row: Record<string, any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onDelete?: (row: Record<string, any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function AdminTable({
  columns,
  data,
  onEdit,
  onDelete,
}: AdminTableProps) {
  return (
    <div className="overflow-x-auto rounded border border-[#444444]">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-500 dark:bg-[#1d293d] border-b border-[#444444]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${col.width} px-4 py-3 text-left text-xs font-medium dark:text-[#314158] uppercase tracking-wider`}
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-left text-xs font-medium dark:text-[#314158] uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, _idx) => (
            <tr
              key={row.id}
              className="border-b border-[#444444] hover:bg-opacity-50 hover:bg-gray-400 hover:dark:bg-[#1d293d] transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`${col.width} px-4 py-3 text-sm whitespace-nowrap text-ellipsis overflow-hidden`}
                >
                  {row[col.key]}
                </td>
              ))}

              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="p-1 rounded hover:opacity-80 transition-opacity bg-[#ac4bff] text-white"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="p-1 rounded hover:opacity-80 transition-opacity bg-[#fb2c36] text-white"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="px-4 py-8 text-center text-[#314158] dark:bg-[#0f172b] dark:text-white">
          No data available
        </div>
      )}
    </div>
  );
}
