const ExpandedRowContent = ({ row }) => {
  // You can access data of the expanded row using row.original
  const rowData = row.original;

  // Add your JSX content for the expanded row
  return (
    <div>
      <p>Additional details:</p>
      <pre>{JSON.stringify(rowData, null, 2)}</pre>
    </div>
  );
};
