import React, { useState } from "react";
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
    { name: "Payments", fields: [] },
    { name: "Invoice", fields: [] },
    { name: "Organization", fields: [] },
    { name: "Credit Memo", fields: [] },
    { name: "Debit Memo", fields: [] },
    { name: "Invoice Item", fields: [] },
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

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalSelectedFields = Object.values(selectedFields).reduce(
    (total, fields) => total + fields.length,
    0
  );

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
        <div>
          <h3 className="font-semibold mb-2">Generated Query</h3>
          <pre className="bg-gray-100 p-4 rounded">
            {`SELECT ${Object.entries(selectedFields)
              .flatMap(([objectName, fields]) =>
                fields.map((field) => {
                  const func = fieldFunctions[`${objectName}.${field}`];
                  return func
                    ? `${func}(${objectName}.${field}) AS ${func}_${field}`
                    : `${objectName}.${field}`;
                })
              )
              .join(", ")}
FROM ${Object.keys(selectedFields).join(", ")}
${groupByFields.length > 0 ? `GROUP BY ${groupByFields.join(", ")}` : ""}
${orderByFields.length > 0 ? `ORDER BY ${orderByFields.join(", ")}` : ""}
WHERE ...`}
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
      
      {/* Functions Popup */}
      {showFunctionsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Available Functions</h3>
              <button onClick={toggleFunctionsPopup} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-2">
              {functions.map((func) => (
                <li key={func} className="bg-gray-100 p-2 rounded">
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
