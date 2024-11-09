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

const ZuoraBillingLayout = () => {
  const [selectedItem, setSelectedItem] = useState(null);

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
          <QueryGenerator />
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
  <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700 border-b border-gray-700">
    <span className="mr-2">{icon}</span>
    <span className="text-sm font-semibold">{text}</span>
  </div>
);

const CollapsibleSidebarItem = ({ icon, text, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <div
        className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="mr-2">{icon}</span>
        <span className="text-sm font-semibold">{text}</span>
        <span className="ml-auto text-white">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </div>
      {isExpanded && <div className="bg-gray-700 py-2">{children}</div>}
    </div>
  );
};

const SidebarSubItem = ({ text, onClick }) => (
  <div
    className="py-2 px-10 text-sm cursor-pointer hover:bg-gray-600"
    onClick={onClick}
  >
    {text}
  </div>
);

const StepIndicator = ({ currentStep, stepNumber, text }) => (
  <div
    className={`flex-1 text-center py-3 px-4 rounded-lg flex items-center justify-center ${
      currentStep === stepNumber
        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold"
        : "bg-gray-200 text-gray-600"
    }`}
  >
    <span>{text}</span>
    {stepNumber < 3 && <ChevronRight className="ml-2" size={20} />}
  </div>
);

const QueryGenerator = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedFields, setSelectedFields] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [fieldFunctions, setFieldFunctions] = useState({});
  const [groupByFields, setGroupByFields] = useState([]);
  const [orderByFields, setOrderByFields] = useState([]);
  const [showFunctionsPopup, setShowFunctionsPopup] = useState(false);
  const [filters, setFilters] = useState([]);
  const [queryJson, setQueryJson] = useState(null);

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

  const handleGroupByToggle = (field) => {
    setGroupByFields((prevFields) => {
      if (prevFields.includes(field)) {
        return prevFields.filter((f) => f !== field);
      } else {
        return [...prevFields, field];
      }
    });
  };

  const handleOrderByToggle = (field) => {
    setOrderByFields((prevFields) => {
      if (prevFields.includes(field)) {
        return prevFields.filter((f) => f !== field);
      } else {
        return [...prevFields, field];
      }
    });
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
      if (currentStep === 2) {
        const selectedTables = Object.keys(selectedFields);
        const generatedJoins = generateJoins(selectedTables);

        const generatedJson = {
          query: {
            tables: Object.entries(selectedFields).map(([objectName, fields]) => ({
              name: objectName,
              fields: fields.map(field => ({
                name: field,
                ...(fieldFunctions[`${objectName}.${field}`] && {
                  function: fieldFunctions[`${objectName}.${field}`]
                })
              }))
            })),
            joins: generatedJoins,
            conditions: filters.map(filter => ({
              table: filter.object,
              field: filter.field,
              operator: filter.condition,
              value: filter.value
            })),
            groupBy: groupByFields.map(field => ({
              table: field.split('.')[0],
              field: field.split('.')[1]
            })),
            orderBy: orderByFields.map(field => ({
              table: field.split('.')[0],
              field: field.split('.')[1]
            }))
          }
        };

        setQueryJson(generatedJson);
        console.log('Generated Query JSON:', JSON.stringify(generatedJson, null, 2));
        console.log('Generated SQL Query:', generateQuery());
      }
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (queryJson) {
      console.log('Query JSON Updated:', JSON.stringify(queryJson, null, 2));
    }
  }, [queryJson]);

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalSelectedFields = Object.values(selectedFields).reduce(
    (total, fields) => total + fields.length,
    0
  );

  const generateWhereClause = () => {
    if (!filters.length) return '';

    const conditions = filters.map(filter => {
      if (!filter.object || !filter.field || !filter.condition || !filter.value) return null;

      let operator;
      switch (filter.condition) {
        case 'equals':
          operator = '=';
          break;
        case 'not equals':
          operator = '!=';
          break;
        case 'contains':
          return `${filter.object}.${filter.field} LIKE '%${filter.value}%'`;
        case 'does not contain':
          return `${filter.object}.${filter.field} NOT LIKE '%${filter.value}%'`;
        case 'greater than':
          operator = '>';
          break;
        case 'less than':
          operator = '<';
          break;
        case 'starts with':
          return `${filter.object}.${filter.field} LIKE '${filter.value}%'`;
        case 'ends with':
          return `${filter.object}.${filter.field} LIKE '%${filter.value}'`;
        default:
          return null;
      }

      return `${filter.object}.${filter.field} ${operator} '${filter.value}'`;
    })
    .filter(condition => condition !== null);

    return conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  };

  const generateQuery = () => {
    const selectedTables = Object.keys(selectedFields);
    
    // Format selected fields
    const selectedFieldsFormatted = Object.entries(selectedFields)
      .flatMap(([objectName, fields]) =>
        fields.map(field => {
          const functionName = fieldFunctions[`${objectName}.${field}`];
          if (functionName) {
            return `${functionName}(${objectName}.${field}) as "${functionName}_${field}"`;
          }
          return `${objectName}.${field}`;
        })
      )
      .join(', ');

    // Get joins only for selected tables
    const joins = generateJoins(selectedTables);
    
    // Start with the first table
    let fromClause = selectedTables[0];
    
    // Add JOIN clauses only for selected tables
    const joinClauses = joins.map(join => 
      `JOIN ${join.targetTable} ON ${join.targetTable}.${join.targetField} = ${join.sourceTable}.${join.sourceField}`
    ).join('\n      ');

    // Generate WHERE clause - Fixed version
    const whereConditions = filters
      .filter(filter => filter.object && filter.field && filter.condition && filter.value) // Ensure all filter properties exist
      .map(filter => {
        let operator;
        switch (filter.condition) {
          case 'equals':
            operator = '=';
            break;
          case 'not equals':
            operator = '!=';
            break;
          case 'contains':
            return `${filter.object}.${filter.field} LIKE '%${filter.value}%'`;
          case 'does not contain':
            return `${filter.object}.${filter.field} NOT LIKE '%${filter.value}%'`;
          case 'greater than':
            operator = '>';
            break;
          case 'less than':
            operator = '<';
            break;
          case 'starts with':
            return `${filter.object}.${filter.field} LIKE '${filter.value}%'`;
          case 'ends with':
            return `${filter.object}.${filter.field} LIKE '%${filter.value}'`;
          default:
            return null;
        }
        return `${filter.object}.${filter.field} ${operator} '${filter.value}'`;
      })
      .filter(condition => condition !== null)
      .join(' AND ');

    const whereClause = whereConditions ? `WHERE ${whereConditions}` : '';

    // Generate GROUP BY clause (only for selected tables)
    const groupByClause = groupByFields
      .filter(field => selectedTables.includes(field.split('.')[0]))
      .length > 0
      ? `GROUP BY ${groupByFields
          .filter(field => selectedTables.includes(field.split('.')[0]))
          .join(', ')}`
      : '';

    // Generate ORDER BY clause (only for selected tables)
    const orderByClause = orderByFields
      .filter(field => selectedTables.includes(field.split('.')[0]))
      .length > 0
      ? `ORDER BY ${orderByFields
          .filter(field => selectedTables.includes(field.split('.')[0]))
          .join(', ')}`
      : '';

    // Construct the final query
    const query = `SELECT ${selectedFieldsFormatted}
      FROM ${fromClause}
      ${joinClauses}
      ${whereClause}
      ${groupByClause}
      ${orderByClause}`.trim();

    return query;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Report Studio</h2>
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
        <div className="flex flex-col">
          <div className="flex mb-6">
            <div className="w-2/3 pr-4">
              <h3 className="font-semibold mb-2">Selected Fields</h3>
              {Object.entries(selectedFields).map(([objectName, fields]) => (
                <div key={objectName} className="mb-4">
                  <h4 className="font-semibold">{objectName}</h4>
                  <div className="space-y-2">
                    {fields.map((field) => (
                      <div key={field} className="flex items-center bg-gray-100 p-2 rounded">
                        <span className="flex-grow">{field}</span>
                        <select
                          className="ml-2 p-1 border rounded"
                          value={fieldFunctions[`${objectName}.${field}`] || ""}
                          onChange={(e) => handleFunctionChange(objectName, field, e.target.value)}
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

              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Filters</h3>
                  <button
                    onClick={addFilter}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                  >
                    Add Filter
                  </button>
                </div>
                
                {filters.map((filter, index) => (
                  <div key={index} className="flex items-center space-x-3 mb-2 bg-gray-50 p-3 rounded-lg">
                    <select
                      value={filter.object}
                      onChange={(e) => updateFilter(index, 'object', e.target.value)}
                      className="p-2 border rounded-md text-sm w-1/4"
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
                      className="p-2 border rounded-md text-sm w-1/4"
                      disabled={!filter.object}
                    >
                      <option value="">Select Field</option>
                      {filter.object &&
                        objects
                          .find((obj) => obj.name === filter.object)
                          ?.fields.map((field) => (
                            <option key={field} value={field}>
                              {field}
                            </option>
                          ))}
                    </select>

                    <select
                      value={filter.condition}
                      onChange={(e) => updateFilter(index, 'condition', e.target.value)}
                      className="p-2 border rounded-md text-sm w-1/4"
                      disabled={!filter.field}
                    >
                      <option value="">Select Condition</option>
                      {conditions.map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={filter.value}
                      onChange={(e) => updateFilter(index, 'value', e.target.value)}
                      placeholder="Enter value"
                      className="p-2 border rounded-md text-sm w-1/4"
                      disabled={!filter.condition}
                    />

                    <button
                      onClick={() => removeFilter(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/3">
              <button
                onClick={toggleFunctionsPopup}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Show Functions
              </button>
            </div>
          </div>
          <div className="flex mb-6">
            <div className="w-1/2 pr-4">
              <h3 className="font-semibold mb-2">Group By</h3>
              <div className="space-y-2">
                {Object.entries(selectedFields).flatMap(([objectName, fields]) =>
                  fields.map((field) => (
                    <label key={`${objectName}.${field}`} className="flex items-center bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={groupByFields.includes(`${objectName}.${field}`)}
                        onChange={() => handleGroupByToggle(`${objectName}.${field}`)}
                      />
                      <span className="ml-2">{`${objectName}.${field}`}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="font-semibold mb-2">Order By</h3>
              <div className="space-y-2">
                {Object.entries(selectedFields).flatMap(([objectName, fields]) =>
                  fields.map((field) => (
                    <label key={`${objectName}.${field}`} className="flex items-center bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={orderByFields.includes(`${objectName}.${field}`)}
                        onChange={() => handleOrderByToggle(`${objectName}.${field}`)}
                      />
                      <span className="ml-2">{`${objectName}.${field}`}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Generated Query</h3>
          <pre className="whitespace-pre-wrap bg-white p-4 rounded border">
            {generateQuery()}
          </pre>
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
          {currentStep === 3 && (
            <button
              onClick={() => {/* Add your execute query logic here */}}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:from-blue-600 hover:to-purple-700"
            >
              Execute Query in DQ
            </button>
          )}
          {currentStep < 3 && (
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:from-blue-600 hover:to-purple-700"
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
    </div>
  );
};

export default ZuoraBillingLayout;
