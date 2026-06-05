import type { ReactNode } from "react";

export interface TableColumn<T> {
  header: string;
  accessor?: keyof T;
  align?: "left" | "center" | "right";
  render?: (value: any, record: T) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: keyof T;
  className?: string;
  emptyMessage?: string;
}

export default function Table<T>({
  columns,
  data,
  rowKey,
  className = "global-table",
  emptyMessage = "Nessun record corrispondente ai filtri selezionati."
}: TableProps<T>) {
  
  const getAlignClass = (align?: "left" | "center" | "right") => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "";
  };

  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className={getAlignClass(col.align)}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record) => (
          <tr key={String(record[rowKey])}>
            {columns.map((col, colIdx) => {
              const rawValue = col.accessor ? record[col.accessor] : undefined;
              
              return (
                <td key={colIdx} className={getAlignClass(col.align)}>
                  {col.render 
                    ? col.render(rawValue, record) 
                    : rawValue !== undefined 
                      ? String(rawValue) 
                      : null
                  }
                </td>
              );
            })}
          </tr>
        ))}

        {data.length === 0 && (
          <tr>
            <td 
              colSpan={columns.length} 
              className="text-center text-muted v-table-empty-cell"
            >
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}