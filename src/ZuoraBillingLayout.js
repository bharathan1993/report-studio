import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Book,
  FileText,
  Home,
  BarChart2,
  GraduationCap,
  ChevronRight,
  X,
} from "lucide-react";
import DataQuery from './components/DataQuery';

const ZuoraBillingLayout = () => {
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [sharedQuery, setSharedQuery] = useState('');
  
  const handleCopyToDQ = (query) => {
    setSharedQuery(query);
    setSelectedItem("Data Query");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">ZUORA Billing</h1>
        </div>
        <nav className="mt-8">
          <SidebarItem icon={<Home size={20} />} text="Home" />
          <CollapsibleSidebarItem icon={<Users size={20} />} text="Customers">
            <SidebarSubItem text="Customer Accounts" />
            <SidebarSubItem text="Subscriptions" />
            <SidebarSubItem text="Orders" />
          </CollapsibleSidebarItem>
          <CollapsibleSidebarItem icon={<Book size={20} />} text="Products">
            <SidebarSubItem text="Product Catalog" />
            <SidebarSubItem text="Price Book Items" />
          </CollapsibleSidebarItem>
          <CollapsibleSidebarItem icon={<FileText size={20} />} text="Billing">
            <SidebarSubItem text="Overview" />
            <SidebarSubItem text="Invoices" />
            <SidebarSubItem text="Bill Runs" />
          </CollapsibleSidebarItem>
          <CollapsibleSidebarItem
            icon={<BarChart2 size={20} />}
            text="Reporting"
          >
            <SidebarSubItem
              text="Query Generator"
              onClick={() => setSelectedItem("Query Generator")}
            />
         
            <SidebarSubItem text="Reporting" />
            <SidebarSubItem text="Data Sources" />
            <SidebarSubItem text="Exports" />
            <SidebarSubItem 
              text="Data Query"
              onClick={() => setSelectedItem("Data Query")}
            />
          </CollapsibleSidebarItem>
          <SidebarItem
            icon={<GraduationCap size={20} />}
            text="Training Center"
          />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        {selectedItem === "Query Generator" ? (
          <QueryGenerator onCopyToDQ={handleCopyToDQ} />
        ) : selectedItem === "Data Query" ? (
          <DataQuery initialQuery={sharedQuery} />
        ) : (
          <div>
            <h2 className="text-2xl font-bold">Content Area</h2>
            <p className="mt-4">
              Select an item from the sidebar to view content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text }) => (
  <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-[#1B2B3E] border-b border-[#1B2B3E]">
    <span className="mr-2">{icon}</span>
    <span className="text-sm font-semibold">{text}</span>
  </div>
);

const CollapsibleSidebarItem = ({ icon, text, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-[#1B2B3E]">
      <div
        className="flex items-center px-4 py-3 cursor-pointer hover:bg-[#1B2B3E]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="mr-2">{icon}</span>
        <span className="text-sm font-semibold">{text}</span>
        <span className="ml-auto text-white">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </div>
      {isExpanded && <div className="bg-[#1B2B3E] py-2">{children}</div>}
    </div>
  );
};

const SidebarSubItem = ({ text, onClick }) => (
  <div
    className="py-2 px-10 text-sm cursor-pointer hover:bg-[#2A3B4E]"
    onClick={onClick}
  >
    {text}
  </div>
);

const StepIndicator = ({ currentStep, stepNumber, text }) => (
  <div
    className={`flex-1 text-center py-3 px-4 rounded-lg flex items-center justify-center ${
      currentStep === stepNumber
        ? "bg-[#1B2B3E] text-white font-bold"
        : "bg-gray-200 text-gray-600"
    }`}
  >
    <span>{text}</span>
    {stepNumber < 3 && <ChevronRight className="ml-2" size={20} />}
  </div>
);

const QueryGenerator = ({ onCopyToDQ }) => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedFields, setSelectedFields] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [fieldFunctions, setFieldFunctions] = useState({});
  const [showFunctionsPopup, setShowFunctionsPopup] = useState(false);
  const [filters, setFilters] = useState([]);
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [groupByFields, setGroupByFields] = useState([]);
  const [orderByFields, setOrderByFields] = useState([]);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [loadingMessageType, setLoadingMessageType] = useState('generating');
  const [queryResults, setQueryResults] = useState(null);

  const conditions = [
    'equals',
    'not equals',
    'contains',
    'does not contain',
    'greater than',
    'less than',
    'starts with',
    'ends with',
  ];

  const addFilter = () => {
    setFilters([
      ...filters,
      { object: '', field: '', condition: '', value: '' }
    ]);
  };

  const updateFilter = (index, field, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], [field]: value };
    setFilters(updatedFilters);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const objects = [
    {
      name: "Account",
      fields: [
        "Account Balance",
        "Account Number",
        "AccountStatus",
        "Additional Email Addresses",
        "Allow Invoice Editing",
        "Auto Pay",
        "BikeState",
        "BikeVariant",
        "Bill Cycle Day",
        "Bill Cycle Day Setting Option",
        "Billing Batch",
        "CMRR",
        "CRM Account ID",
        "CSR",
        "CommunicationProfile ID",
        "Created By ID",
        "Created Date",
        "Credit Balance",
        "Currency",
        "Default Payment Method ID",
        "ID",
        "Invoice Delivery Preferences Email",
        "Invoice Delivery Preferences Print",
        "Invoice Template ID",
        "Last Invoice Date",
        "Last Metrics Update",
        "Name",
        "Notes",
        "PO Number",
        "Parent ID",
        "Partner Account",
        "Payment Gateway Name",
        "Payment Method Cascading Consent",
        "Payment Term",
        "Reserved Payment Amount",
        "Retry Status",
        "Roll Up Usage to Parent Account",
        "Sales Rep",
        "Sequence Set ID",
        "Status",
        "Tax Company Code",
        "Tax Exempt Certificate ID",
        "Tax Exempt Certificate Type",
        "Tax Exempt Description",
        "Tax Exempt Effective Date",
        "Tax Exempt Entity/Use Code",
        "Tax Exempt Expiration Date",
        "Tax Exempt Issuing Jurisdiction",
        "Tax Exempt Status",
        "Total Debit Memo Balance",
        "Total Invoice Balance",
        "Unapplied Balance",
        "Unapplied Credit Memo Amount",
        "Updated By ID",
        "Updated Date",
        "VAT ID",
      ],
    },
    {
      name: "Subscription",
      fields: [
        "Account ID",
        "Auto Renew",
        "Contract Effective Date",
        "Contract Acceptance Date",
        "Current Term",
        "Current Term Period Type",
        "Initial Term",
        "Initial Term Period Type",
        "Invoice Owner ID",
        "Is Invoice Separate",
        "Name",
        "Notes",
        "Original Created Date",
        "Original ID",
        "Previous Subscription ID",
        "Renewal Setting",
        "Renewal Term",
        "Renewal Term Period Type",
        "Service Activation Date",
        "Status",
        "Subscription End Date",
        "Subscription Start Date",
        "Term End Date",
        "Term Start Date",
        "Term Type",
        "Version",
      ],
    },
    {
      name: "Payments",
      fields: [
        "Accounting Code",
        "Amount",
        "Applied Amount",
        "Applied Credit Balance Amount",
        "Authorized Transaction ID",
        "Bank Identification Number",
        "Cancelled On",
        "Comment",
        "Created By ID",
        "Created Date",
        "Currency",
        "Effective Date",
        "Gateway Order ID",
        "Gateway Reconciliation Status",
        "Gateway Reconciliation Reason",
        "Gateway Response",
        "Gateway Response Code",
        "Gateway State",
        "ID",
        "Marked For Submission On",
        "Payment Number",
        "Payout Id",
        "Prepayment",
        "Reference ID",
        "Referenced Payment ID",
        "Refund Amount",
        "Second Payment Reference ID",
        "Settled On",
        "Soft Descriptor",
        "Soft Descriptor Phone",
        "Source",
        "Source Name",
        "Standalone",
        "Status",
        "Submitted On",
        "Transferred to Accounting",
        "Type",
        "Unapplied Amount",
        "Updated By ID",
        "Updated Date"
      ],
    },
    {
      name: "Invoice",
      fields: [
        "Adjustment Amount",
        "Amount",
        "Amount Without Tax",
        "Auto Pay",
        "Balance",
        "Comments",
        "Created By ID",
        "Created Date",
        "Credit Balance Adjustment Amount",
        "Credit Memo Amount",
        "Currency",
        "Due Date",
        "E-Invoice Error Code",
        "E-Invoice Error Message",
        "E-Invoice File ID",
        "E-Invoice Status",
        "Entity",
        "ID",
        "Includes One Time",
        "Includes Recurring",
        "Includes Usage",
        "Invoice Date",
        "Invoice Group Number",
        "Invoice Number",
        "Last Email Sent Date",
        "Payment Amount",
        "Payment Link",
        "Payment Term",
        "Posted By",
        "Posted Date",
        "Refund Amount",
        "Retry Status",
        "Reversed",
        "Sequence Set ID",
        "Sequential Invoice Number",
        "Source",
        "Source ID",
        "Source Type",
        "Status",
        "Target Date",
        "Tax Amount",
        "Tax Exempt Amount",
        "Template ID",
        "Transferred To Accounting",
        "Updated By ID",
        "Updated Date"
      ],
    },
    {
      name: "Payment Part",
      fields: [
        "Amount",
        "Billing Document Owner ID",
        "Created By ID",
        "Created Date",
        "ID",
        "Updated By ID",
        "Updated Date"
      ],
    },
    {
      name: "Credit Memo",
      fields: [
        "Applied Amount",
        "Balance",
        "Cancelled By Id",
        "Cancelled On",
        "Comments",
        "Created By ID",
        "Created Date",
        "Credit Memo Date",
        "Credit Memo Number",
        "Discount Amount",
        "Exchange Rate Date",
        "ID",
        "Invoice Group Number",
        "Posted By ID",
        "Posted On",
        "Reason Code",
        "Refund Amount",
        "Sequence Set ID",
        "Source",
        "Source ID",
        "Source Type",
        "Status",
        "Target Date",
        "Tax Amount",
        "Tax Auto Calculation",
        "Total Amount",
        "Total Amount Without Tax",
        "Total Tax Exempt Amount",
        "Transferred To Accounting",
        "Updated By ID",
        "Updated Date"
      ],
    },
    {
      name: "Debit Memo",
      fields: [
        "Balance",
        "Cancelled By Id",
        "Cancelled On",
        "Comments",
        "Created By ID",
        "Created Date",
        "Debit Memo Date",
        "Debit Memo Number",
        "Discount Amount",
        "Due Date",
        "Exchange Rate Date",
        "ID",
        "Invoice Group Number",
        "Payment Term",
        "Posted By ID",
        "Posted On",
        "Reason Code",
        "Sequence Set ID",
        "Source",
        "Source Type",
        "Status",
        "Target Date",
        "Tax Amount",
        "Tax Auto Calculation",
        "Total Amount",
        "Total Amount Without Tax",
        "Total Tax Exempt Amount",
        "Transferred To Accounting",
        "Updated By ID",
        "Updated Date"
      ],
    },
    {
      name: "Invoice Item",
      fields: [
        "Accounting Code",
        "Applied To Invoice Item Id",
        "Balance",
        "Booking Reference",
        "Charge Amount",
        "Charge Date",
        "Charge Name",
        "Charge Number",
        "Created By ID",
        "Created Date",
        "Exclude Item Billing From Revenue Accounting",
        "ID",
        "Number Of Deliveries",
        "Processing Type",
        "Purchase Order Number",
        "Quantity",
        "charges",
        "Reflect Discount In Net Amount",
        "Revenue Recognition Start Date",
        "SKU",
        "Service End Date",
        "Service Start Date",
        "Source Item Type",
        "Subscription ID",
        "Subscription Number",
        "Tax Amount",
        "Tax Code",
        "Tax Exempt Amount",
        "Tax Mode",
        "UOM",
        "Unit Price",
        "Updated by ID",
        "Updated Date"
      ],
    },
  ];

  const functions = ["Date", "Concat", "Count", "Distinct", "Sum", "Average"];

  const handleObjectClick = (objectName) => {
    setSelectedObject(objectName);
  };

  const handleFieldToggle = (field) => {
    if (selectedObject) {
      setSelectedFields((prevFields) => {
        const newFields = { ...prevFields };
        if (!newFields[selectedObject]) {
          newFields[selectedObject] = [];
        }
        const index = newFields[selectedObject].indexOf(field);
        if (index > -1) {
          newFields[selectedObject] = newFields[selectedObject].filter(
            (f) => f !== field
          );
        } else {
          newFields[selectedObject] = [...newFields[selectedObject], field];
        }
        return newFields;
      });
    }
  };

  const handleSelectAll = () => {
    const currentObject = objects.find((obj) => obj.name === selectedObject);
    if (currentObject && selectedObject) {
      setSelectedFields((prevFields) => {
        const newFields = { ...prevFields };
        if (
          !newFields[selectedObject] ||
          newFields[selectedObject].length !== currentObject.fields.length
        ) {
          newFields[selectedObject] = [...currentObject.fields];
        } else {
          newFields[selectedObject] = [];
        }
        return newFields;
      });
    }
  };

  const handleFunctionChange = (objectName, field, functionName) => {
    setFieldFunctions((prevFunctions) => ({
      ...prevFunctions,
      [`${objectName}.${field}`]: functionName,
    }));
  };

  const toggleFunctionsPopup = () => {
    setShowFunctionsPopup(!showFunctionsPopup);
  };

  const currentObject = objects.find((obj) => obj.name === selectedObject);

  const generateJoins = (selectedTables) => {
    const joins = [];
    const joinMappings = {
      'Payment Part': [
        {
          sourceTable: 'Invoice',
          sourceField: 'Id',
          targetTable: 'Payment Part',
          targetField: 'Billing Document Owner ID',
          type: 'INNER'
        }
      ],
      'Invoice Item': [
        {
          sourceTable: 'Invoice',
          sourceField: 'Id',
          targetTable: 'Invoice Item',
          targetField: 'Invoice Id',
          type: 'INNER'
        }
      ],
      'Credit Memo': [
        {
          sourceTable: 'Invoice',
          sourceField: 'Id',
          targetTable: 'Credit Memo',
          targetField: 'Invoice Id',
          type: 'INNER'
        }
      ],
      'Debit Memo': [
        {
          sourceTable: 'Invoice',
          sourceField: 'Id',
          targetTable: 'Debit Memo',
          targetField: 'Invoice Id',
          type: 'INNER'
        }
      ],
      'Payments': [
        {
          sourceTable: 'Account',
          sourceField: 'Id',
          targetTable: 'Payments',
          targetField: 'Account Id',
          type: 'INNER'
        }
      ],
      'Subscription': [
        {
          sourceTable: 'Account',
          sourceField: 'Id',
          targetTable: 'Subscription',
          targetField: 'Account Id',
          type: 'INNER'
        }
      ],
      'Invoice': [
        {
          sourceTable: 'Account',
          sourceField: 'Id',
          targetTable: 'Invoice',
          targetField: 'Account Id',
          type: 'INNER'
        }
      ]
    };

    // Only process joins for selected tables
    selectedTables.forEach(table => {
      const possibleJoins = joinMappings[table];
      if (possibleJoins) {
        possibleJoins.forEach(join => {
          // Only add the join if both tables are in the selected tables
          if (selectedTables.includes(join.sourceTable) && 
              selectedTables.includes(join.targetTable)) {
            joins.push(join);
          }
        });
      }
    });

    return joins;
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      // Log the current state before moving to next step
      console.log('Selected Fields:', selectedFields);
      console.log('Field Functions:', fieldFunctions);
      console.log('Filters:', filters);
      console.log('Group By:', groupByFields);
      console.log('Order By:', orderByFields);
      
      // If moving to step 3, log the generated query
      if (currentStep === 2) {
        const query = generateQuery();
        console.log('Generated Query JSON:', query);
      }
      
      setCurrentStep(currentStep + 1);
    }
  };

  const generateQueryJson = () => {
    const tables = Object.entries(selectedFields).map(([objectName, fields]) => ({
      name: objectName,
      fields: fields.map(field => ({
        name: field,
        function: fieldFunctions[`${objectName}.${field}`] || null
      }))
    }));

    // Automatically generate joins for selected tables
    const joins = tables.slice(1).map(table => ({
      table: table.name,
      joinField: "Account Id",
      referencedTable: "Account",
      referencedField: "Id"
    }));

    // Format conditions from filters
    const conditions = filters
      .filter(f => f.object && f.field && f.condition && f.value)
      .map(f => ({
        table: f.object,
        field: f.field,
        operator: f.condition,
        value: f.value
      }));

    // Format group by fields
    const groupBy = groupByFields.map(field => {
      const [table, fieldName] = field.split('.');
      return {
        table,
        field: fieldName
      };
    });

    // Format order by fields
    const orderBy = orderByFields.map(field => {
      const [table, fieldName] = field.split('.');
      return {
        table,
        field: fieldName
      };
    });

    return {
      query: {
        tables,
        joins,
        conditions,
        groupBy,
        orderBy
      }
    };
  };

  const generateQuery = () => {
    const queryJson = generateQueryJson();
    console.log('Query JSON Updated:', JSON.stringify(queryJson, null, 2));

    let query = 'SELECT ';
    
    // Add selected fields with functions
    const fieldsList = queryJson.query.tables.map(table => 
      table.fields.map(field => {
        if (field.function) {
          return `${field.function}(${table.name}.${field.name}) as "${field.name}_${field.function}"`;
        }
        return `${table.name}.${field.name}`;
      })
    ).flat();
    
    query += fieldsList.join(', ');
    
    // Add FROM and JOIN clauses
    query += `\nFROM ${queryJson.query.tables[0].name}`;
    queryJson.query.joins.forEach(join => {
      query += `\nJOIN ${join.table} ON ${join.table}.${join.joinField} = ${join.referencedTable}.${join.referencedField}`;
    });
    
    // Add WHERE clause
    if (queryJson.query.conditions.length > 0) {
      const conditions = queryJson.query.conditions.map(condition => {
        const operator = condition.operator === 'greater than' ? '>' : 
                        condition.operator === 'less than' ? '<' : '=';
        return `${condition.table}.${condition.field} ${operator} '${condition.value}'`;
      });
      query += '\nWHERE ' + conditions.join(' AND ');
    }
    
    // Add GROUP BY clause
    if (queryJson.query.groupBy.length > 0) {
      const groupByFields = queryJson.query.groupBy.map(field => 
        `${field.table}.${field.field}`
      );
      query += '\nGROUP BY ' + groupByFields.join(', ');
    }
    
    // Add ORDER BY clause
    if (queryJson.query.orderBy.length > 0) {
      const orderByFields = queryJson.query.orderBy.map(field => 
        `${field.table}.${field.field}`
      );
      query += '\nORDER BY ' + orderByFields.join(', ');
    }
    
    return { sql: query };
  };

  const handleGroupByChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setGroupByFields(selectedOptions);
  };

  const handleOrderByChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setOrderByFields(selectedOptions);
  };

  useEffect(() => {
    if (currentStep === 3) {
      const query = generateQuery();
      setGeneratedQuery(query.sql);
    }
  }, [currentStep, selectedFields, fieldFunctions, filters, groupByFields, orderByFields]);

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalSelectedFields = Object.values(selectedFields).reduce(
    (total, fields) => total + fields.length,
    0
  );

  const mockData = {
    Account: [
      {
        'Account Number': 'A-001',
        'Auto Pay': true,
        'Account Balance': 1500.00,
        'Status': 'Active',
        'Currency': 'USD'
      },
      {
        'Account Number': 'A-002',
        'Auto Pay': false,
        'Account Balance': 2300.00,
        'Status': 'Active',
        'Currency': 'EUR'
      }
    ],
    Subscription: [
      {
        'Name': 'Enterprise Plan',
        'Initial Term': '12 months',
        'Status': 'Active',
        'Account ID': 'A-001'
      },
      {
        'Name': 'Professional Plan',
        'Initial Term': '24 months',
        'Status': 'Active',
        'Account ID': 'A-002'
      }
    ],
    Payments: [
      {
        'Amount': 1000.00,
        'Status': 'Processed',
        'Payment Number': 'P-001',
        'Account ID': 'A-001'
      },
      {
        'Amount': 1500.00,
        'Status': 'Processed',
        'Payment Number': 'P-002',
        'Account ID': 'A-002'
      }
    ]
  };

  const executeQuery = () => {
    setLoadingMessageType('executing');
    setShowLoadingPopup(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockResults = [
        {
          'Account Number': 'A-001',
          'Status': 'Active',
          'Name': 'Enterprise Plan'
        },
        {
          'Account Number': 'A-002',
          'Status': 'Active',
          'Name': 'Professional Plan'
        }
      ];
      
      setQueryResults(mockResults);
      setShowLoadingPopup(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Report Studio</h2>
      <div className="flex justify-between mb-6 space-x-4">
        <StepIndicator
          currentStep={currentStep}
          stepNumber={1}
          text="Select Fields"
        />
        <StepIndicator
          currentStep={currentStep}
          stepNumber={2}
          text="Review Fields"
        />
        <StepIndicator
          currentStep={currentStep}
          stepNumber={3}
          text="Generate Query"
        />
      </div>
      <div className="mb-4 text-sm text-gray-600">
        Total selected fields: {totalSelectedFields}
      </div>
      {currentStep === 1 && (
        <div className="flex">
          <div className="w-1/3 pr-4">
            <h3 className="font-semibold mb-2">Objects</h3>
            <ul className="border rounded">
              {objects.map((obj) => (
                <li
                  key={obj.name}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedObject === obj.name ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleObjectClick(obj.name)}
                >
                  {obj.name} ({selectedFields[obj.name]?.length || 0}/
                  {obj.fields.length})
                </li>
              ))}
            </ul>
          </div>
          <div className="w-2/3">
            {selectedObject && currentObject && (
              <div>
                <h3 className="font-semibold mb-2">
                  Fields for {selectedObject}
                </h3>
                <div className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={
                        selectedFields[selectedObject]?.length ===
                        currentObject.fields.length
                      }
                      onChange={handleSelectAll}
                    />
                    <span className="ml-2">
                      Select All "{selectedObject}" Fields
                    </span>
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-gray-100">
                  {currentObject.fields.map((field) => (
                    <label key={field} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={
                          selectedFields[selectedObject]?.includes(field) ||
                          false
                        }
                        onChange={() => handleFieldToggle(field)}
                      />
                      <span className="ml-2">{field}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Selected Fields</h3>
            <button
              onClick={toggleFunctionsPopup}
              className="px-4 py-2 bg-[#0A192F] text-white rounded hover:bg-[#1B2B3E]"
            >
              Show Functions
            </button>
          </div>

          <div className="mb-6 bg-white p-4 rounded-lg border">
            {Object.entries(selectedFields).map(([objectName, fields]) => (
              <div key={objectName} className="mb-4">
                <h4 className="font-medium mb-2">{objectName}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {fields.map((field) => (
                    <div key={field} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                      <span>{field}</span>
                      <select
                        value={fieldFunctions[`${objectName}.${field}`] || ''}
                        onChange={(e) => handleFunctionChange(objectName, field, e.target.value)}
                        className="ml-2 text-sm border rounded"
                      >
                        <option value="">No Function</option>
                        {functions.map((func) => (
                          <option key={func} value={func}>
                            {func}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Group By Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Group By</h3>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <select
                multiple
                value={groupByFields}
                onChange={handleGroupByChange}
                className="w-full p-2 border rounded"
              >
                {Object.entries(selectedFields).map(([objectName, fields]) =>
                  fields.map((field) => (
                    <option key={`${objectName}.${field}`} value={`${objectName}.${field}`}>
                      {`${objectName}.${field}`}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Order By Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Order By</h3>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <select
                multiple
                value={orderByFields}
                onChange={handleOrderByChange}
                className="w-full p-2 border rounded"
              >
                {Object.entries(selectedFields).map(([objectName, fields]) =>
                  fields.map((field) => (
                    <option key={`${objectName}.${field}`} value={`${objectName}.${field}`}>
                      {`${objectName}.${field}`}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button
                onClick={addFilter}
                className="px-4 py-2 bg-[#0A192F] text-white rounded hover:bg-[#1B2B3E]"
              >
                Add Filter
              </button>
            </div>
            
            {filters.map((filter, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <select
                  value={filter.object}
                  onChange={(e) => updateFilter(index, 'object', e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="">Select Object</option>
                  {objects.map((obj) => (
                    <option key={obj.name} value={obj.name}>
                      {obj.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filter.field}
                  onChange={(e) => updateFilter(index, 'field', e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="">Select Field</option>
                  {filter.object && objects.find(obj => obj.name === filter.object)?.fields.map(field => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filter.condition}
                  onChange={(e) => updateFilter(index, 'condition', e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="">Select Condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                
                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => updateFilter(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="border rounded p-2"
                />
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => removeFilter(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                  <button
                    onClick={addFilter}
                    className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">Generated Query</h3>
            <pre className="whitespace-pre-wrap bg-white p-4 rounded border">
              {generateQuery().sql}
            </pre>
          </div>
          
          <div className="flex space-x-4 justify-end">
            <button
              onClick={() => onCopyToDQ(generateQuery().sql)}
              className="px-4 py-2 bg-[#0A192F] text-white rounded hover:bg-[#1B2B3E]"
            >
              Copy Query to DQ
            </button>
            <button
              onClick={executeQuery}
              className="px-4 py-2 bg-[#0A192F] text-white rounded hover:bg-[#1B2B3E]"
            >
              Execute Query in DQ
            </button>
          </div>

          {queryResults && (
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Query Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(queryResults[0] || {}).map((header, idx) => (
                        <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {queryResults.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {Object.values(row).map((value, valueIdx) => (
                          <td key={valueIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {typeof value === 'boolean' ? value.toString() : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-6 flex justify-between items-center">
        <div>
          {currentStep > 1 && (
            <button
              onClick={handlePreviousStep}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}
        </div>
        <div className="flex space-x-4">
          {currentStep < 3 && (
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-[#0A192F] text-white rounded hover:bg-[#1B2B3E]"
            >
              Next
            </button>
          )}
        </div>
      </div>
      
      {/* Functions Sidebar */}
      {showFunctionsPopup && (
        <div 
          className="fixed right-10 top-[170px] w-64 bg-white shadow-lg rounded-lg transform transition-transform duration-300 ease-in-out z-50 overflow-hidden"
          style={{
            transform: showFunctionsPopup ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Available Functions</h3>
            <button 
              onClick={toggleFunctionsPopup} 
              className="text-white hover:text-gray-200 p-1"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {functions.map((func) => (
                <li 
                  key={func} 
                  className="bg-gray-50 p-2 rounded text-sm hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {func}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Loading Popup */}
      {showLoadingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4 transform transition-all duration-300 ease-in-out animate-fadeIn">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-gray-700">
              {loadingMessageType === 'generating' ? 'Generating Query...' : 'Executing Query...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZuoraBillingLayout;
