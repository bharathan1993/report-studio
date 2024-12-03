import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'react-feather';

const DataQuery = ({ initialQuery = '' }) => {
  const [showSchema, setShowSchema] = useState(true);
  const [showIndexedOnly, setShowIndexedOnly] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [queryResults, setQueryResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const objects = {
    Account: ['Account Number', 'Account Balance', 'Auto Pay', 'Status', 'Currency', 'ID'],
    Subscription: ['Name', 'Initial Term', 'Status', 'Account Id'],
    Payments: ['Amount', 'Status', 'Payment Number', 'Account Id']
  };

  const handleRunQuery = () => {
    setIsLoading(true);
    // Simulate API call with mock data
    setTimeout(() => {
      const mockResults = [
        {
          'Account Number': 'A-001',
          'Account Balance': '$1,500.00',
          'Subscription Name': 'Enterprise Plan',
          'Subscription Status': 'Active',
          'Invoice Number': 'INV-001'
        },
        {
          'Account Number': 'A-002',
          'Account Balance': '$2,300.00',
          'Subscription Name': 'Professional Plan',
          'Subscription Status': 'Active',
          'Invoice Number': 'INV-002'
        }
      ];
      setQueryResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-4">
        <button onClick={() => window.history.back()} className="flex items-center text-gray-600 hover:text-gray-800">
          <ChevronDown className="rotate-90" size={20} />
          <span className="ml-2 text-xl">Create Data Query</span>
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Query your data using SQL. View the Billing schema here and Revenue schema here.
      </div>

      <div className="flex h-[calc(50vh-100px)] mb-4">
        {/* Query Editor */}
        <div className="flex-1 mr-4">
          <div className="h-full border rounded-lg bg-white">
            <textarea 
              className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your SQL query here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Schema Sidebar */}
        {showSchema && (
          <div className="w-80 border rounded-lg bg-white">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search schema"
                    className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                  />
                </div>
                <button onClick={() => setShowSchema(false)} className="ml-2">
                  <X size={20} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="indexedFields"
                  checked={showIndexedOnly}
                  onChange={(e) => setShowIndexedOnly(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="indexedFields" className="text-sm text-gray-600">
                  Show indexed fields only
                </label>
              </div>
            </div>

            <div className="overflow-auto">
              {Object.entries(objects).map(([objectName, fields]) => (
                <SchemaObject key={objectName} name={objectName} fields={fields} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 mb-4">
        <button className="px-4 py-2 border rounded-md text-sm">Download</button>
        <button className="px-4 py-2 border rounded-md text-sm">Save Query</button>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          onClick={handleRunQuery}
        >
          {isLoading ? 'Running...' : 'Run Query'}
        </button>
      </div>

      {/* Query Results Section */}
      {queryResults && (
        <div className="flex-1 border rounded-lg bg-white overflow-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Query Results</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(queryResults[0]).map((header, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queryResults.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {Object.values(row).map((value, valueIdx) => (
                        <td
                          key={valueIdx}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SchemaObject = ({ name, fields }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b">
      <div
        className="flex items-center p-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        <span className="ml-2 text-sm">{name}</span>
      </div>
      {isExpanded && (
        <div className="pl-8 pb-2">
          {fields.map((field) => (
            <div key={field} className="py-1 text-sm text-gray-600">
              {field}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataQuery; 