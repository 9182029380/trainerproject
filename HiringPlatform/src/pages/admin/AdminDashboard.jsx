import React, { useState, useEffect } from "react";
import { BarChart, Wallet } from "lucide-react";
import TrainerDetails from "./TrainersDetails";
import CompanyDetails from "./CompaniesDetails";
import AdminNavbar from "../../components/AdminNavbar";
import PurchaseOrderComponent from "./PurchaseOrderComponent";
import BusinessRequestsDetails from "./BusinessRequestDetails";
import RevenueAnalysisPage from "./RevenueAnalysisPage";
import TrainerInvoicesTable from "./TrainerInvoicesTable";

function AdminDashboard() {
  const [email, setEmail] = useState(null);
  const [selectedLink, setSelectedLink] = useState("dashboard");

  useEffect(() => {
    // Parse the email from the URL
    const url = window.location.href;
    const emailStartIndex = url.lastIndexOf("/") + 1;
    const emailEndIndex = url.indexOf("@") + 1;
    const extractedEmail = url.slice(emailStartIndex, emailEndIndex);
    setEmail(extractedEmail + "gmail.com"); // Append @gmail.com
  }, []);

  // Function to render the component based on the selected tab
  const renderComponent = () => {
    switch (selectedLink) {
      case "dashboard":
        return <RevenueAnalysisPage />;
      case "trainer-details":
        return <TrainerDetails />;
      case "company-details":
        return <CompanyDetails />;
      case "purchase-order-component":
        return <PurchaseOrderComponent />;
      case "business-request":
        return <BusinessRequestsDetails />;
      case "invoice":
        return <TrainerInvoicesTable />;
      default:
        return null;
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex h-screen">
        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
          <div className="mt-6 flex flex-1 flex-col justify-between">
            <nav className="-mx-3 space-y-6">
              <div
                onClick={() => setSelectedLink("dashboard")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "dashboard"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <span className="mx-2 text-sm font-medium">Dashboard</span>
              </div>

              <div
                onClick={() => setSelectedLink("trainer-details")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "trainer-details"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <BarChart className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">
                  Trainer Details
                </span>
              </div>

              <div
                onClick={() => setSelectedLink("company-details")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "company-details"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">
                  Company Details
                </span>
              </div>
              <div
                onClick={() => setSelectedLink("business-request")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "business-request"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">
                  Business Request
                </span>
              </div>
              <div
                onClick={() => setSelectedLink("purchase-order-component")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "purchase-order-component"
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
              >
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Purchase Order</span>
              </div>
              <div
                onClick={() => setSelectedLink("invoice")}
                className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                  selectedLink === "invoice" ? "bg-gray-100 text-gray-700" : ""
                }`}
              >
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Invoice</span>
              </div>

              {/* <div
              onClick={() => setSelectedLink('current-trainings')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'current-trainings' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Current Trainings</span>
            </div>
 
            <div
              onClick={() => setSelectedLink('past-trainings')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'past-trainings' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Past Trainings</span>
            </div>
 
            <div
              onClick={() => setSelectedLink('invoices')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'invoices' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Invoices</span>
            </div>
 
            <div
              onClick={() => setSelectedLink('feedback')}
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                selectedLink === 'feedback' ? 'bg-gray-100 text-gray-700' : ''
              }`}
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Feedback</span>
            </div> */}
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {renderComponent()}
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
