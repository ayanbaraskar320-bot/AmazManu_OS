export const exportToCsv = (data: any[], filename: string): void => {
  if (!data || data.length === 0) {
    console.warn("Export to CSV aborted: No data provided.");
    return;
  }

  const headers = Object.keys(data[0]);
  
  const replacer = (key: string, value: any): string => value === null ? '' : value;

  const csv = [
    headers.join(','), // header row
    ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement("a");
  if (link.download !== undefined) { 
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
