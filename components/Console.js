import React from 'react';

const Console = ({ logs }) => {
  return (
    <div className="mt-2 p-2 bg-gray-100 rounded-md">
      <h4 className="text-sm font-semibold mb-1">Console:</h4>
      <pre className="text-xs overflow-x-auto max-h-40 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </pre>
    </div>
  );
};

export default Console;
