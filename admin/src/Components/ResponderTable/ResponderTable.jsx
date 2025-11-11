import React, { useState } from "react";
import { RiUserLine } from "react-icons/ri";
import { formatDate } from "../../utils/formatters";
import { MdOutlineRefresh } from "react-icons/md";
import "./ResponderTable.css";

function ResponderTable({
  customers,
  loading,
  currentPage,
  setCurrentPage,
  tablePage,
  filteredCustomers,
  getCustomerDetails,
}) {
  const totalList = currentPage * tablePage;
  const firstPage = totalList - tablePage;
  const currentCustomers = filteredCustomers.slice(firstPage, totalList);
  const totalPages = Math.ceil(filteredCustomers.length / tablePage);
  const [expandedComments, setExpandedComments] = useState({});

  const toggleComment = (customerId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [customerId]: !prev[customerId],
    }));
  };

  const exportToCSV = () => {
    try {
      const headers =
        "Name,Email,Phone,Comment,Inquiry Form,utm_source,utm_campaign,utm_medium,utm_term,utm_content,IP,Date\n";
      const rows = customers
        .map(
          (customer) =>
            `"${customer.name || ""}","${customer.email || ""}","${
              customer.phone || ""
            }","${customer.comment || ""}","${customer.inquiryForm || ""}","${
              customer.utm_source || ""
            }","${customer.utm_campaign || ""}","${
              customer.utm_medium || ""
            }","${customer.utm_term || ""}","${customer.utm_content || ""}","${
              customer.ip || ""
            }","${formatDate(customer.date)}"`
        )
        .join("\n");

      const csvContent = headers + rows;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `responder_details_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting to CSV:", error);
    }
  };

  const exportToXML = () => {
    try {
      let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<customers>\n';
      customers.forEach((customer) => {
        xmlContent += `  <customer>\n`;
        xmlContent += `    <name>${escapeXML(customer.name || "")}</name>\n`;
        xmlContent += `    <email>${escapeXML(customer.email || "")}</email>\n`;
        xmlContent += `    <phone>${escapeXML(customer.phone || "")}</phone>\n`;
        xmlContent += `    <comment>${escapeXML(
          customer.comment || ""
        )}</comment>\n`;
        xmlContent += `    <inquiryForm>${escapeXML(
          customer.inquiryForm || ""
        )}</inquiryForm>\n`;
        xmlContent += `    <utm_source>${escapeXML(
          customer.utm_source || ""
        )}</utm_source>\n`;
        xmlContent += `    <utm_campaign>${escapeXML(
          customer.utm_campaign || ""
        )}</utm_campaign>\n`;
        xmlContent += `    <utm_medium>${escapeXML(
          customer.utm_medium || ""
        )}</utm_medium>\n`;
        xmlContent += `    <utm_term>${escapeXML(
          customer.utm_term || ""
        )}</utm_term>\n`;
        xmlContent += `    <utm_content>${escapeXML(
          customer.utm_content || ""
        )}</utm_content>\n`;
        xmlContent += `    <ip>${escapeXML(customer.ip || "")}</ip>\n`;
        xmlContent += `    <date>${formatDate(customer.date)}</date>\n`;
        xmlContent += `  </customer>\n`;
      });
      xmlContent += "</customers>";

      const blob = new Blob([xmlContent], { type: "text/xml;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `responder_details_${
        new Date().toISOString().split("T")[0]
      }.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting to XML:", error);
    }
  };

  const escapeXML = (str) => {
    if (str === null || str === undefined) return "";
    if (typeof str === "object") str = JSON.stringify(str);
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const handleExportChange = (e) => {
    const value = e.target.value;
    if (value === "csv") {
      exportToCSV();
    } else if (value === "xml") {
      exportToXML();
    }
    e.target.value = "";
  };

  const handleViewDetails = (customer) => {
    console.log("View details for:", customer);
  };

  return (
    <div className="content-card">
      <div className="card-header">
        <div className="card-header-content">
          <div>
            <h2 className="card-title">Responder List</h2>
          </div>
          <div className="card-actions">
            <button
              className="refresh-btn"
              onClick={getCustomerDetails}
              disabled={loading}
            >
              {loading ? <MdOutlineRefresh /> : <MdOutlineRefresh />}
            </button>
            <select
              className="export-select"
              onChange={handleExportChange}
              disabled={loading || customers.length === 0}
            >
              <option value="">Export Data</option>
              <option value="csv">Export as CSV</option>
              <option value="xml">Export as XML</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading customer data...</p>
          </div>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Comment</th>
                  <th>Enquiry Form</th>
                  <th>UTM Source</th>
                  <th>UTM Campaign</th>
                  <th>UTM Medium</th>
                  <th>UTM Term</th>
                  <th>UTM Content</th>
                  <th>IP</th>
                  <th>Date</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer, index) => {
                    const customerId =
                      customer.id || `customer-${firstPage + index + 1}`;
                    const isExpanded = expandedComments[customerId];
                    const comment = customer.comment || "N/A";
                    const shouldTruncate = comment.length > 100 && !isExpanded;

                    return (
                      <tr key={customerId}>
                        <td className="id-cell">{firstPage + index + 1}</td>
                        <td className="name-cell">
                          <div className="customer-name-with-avatar">
                            <div className="customer-details">
                              <div className="customer-name">
                                {customer.name || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="email-cell">
                          {customer.email || "N/A"}
                        </td>
                        <td className="phone-cell">
                          <div className="text-truncate" title={customer.phone}>
                            {customer.phone || "N/A"}
                          </div>
                        </td>
                        <td className="comment-cell">
                          <div className="comment-content">
                            <div
                              className={`comment-text ${
                                shouldTruncate
                                  ? "comment-truncated"
                                  : "comment-expanded"
                              }`}
                              title={comment}
                            >
                              {shouldTruncate
                                ? `${comment.substring(0, 15)}...`
                                : comment}
                            </div>
                          </div>
                        </td>
                        <td className="inquiry-form-cell">
                          <div
                            className="text-truncate"
                            title={customer.enquiry_form}
                          >
                            {customer.enquiry_form || "N/A"}
                          </div>
                        </td>
                        <td className="utm-cell">
                          <div
                            className="text-truncate"
                            title={customer.utm_source}
                          >
                            {customer.utm_source || "N/A"}
                          </div>
                        </td>
                        <td className="utm-cell">
                          <div
                            className="text-truncate"
                            title={customer.utm_campaign}
                          >
                            {customer.utm_campaign || "N/A"}
                          </div>
                        </td>
                        <td className="utm-cell">
                          <div
                            className="text-truncate"
                            title={customer.utm_medium}
                          >
                            {customer.utm_medium || "N/A"}
                          </div>
                        </td>
                        <td className="utm-cell">
                          <div
                            className="text-truncate"
                            title={customer.utm_term}
                          >
                            {customer.utm_term || "N/A"}
                          </div>
                        </td>
                        <td className="utm-cell">
                          <div
                            className="text-truncate"
                            title={customer.utm_content}
                          >
                            {customer.utm_content || "N/A"}
                          </div>
                        </td>
                        <td className="ip-cell">
                          <div className="text-truncate" title={customer.ip}>
                            {customer.ip || "N/A"}
                          </div>
                        </td>
                        <td className="date-cell">
                          {formatDate(customer.date)}
                        </td>
                        {/* <td className="actions-cell">
                          <div className="action-buttons">
                            <button
                              className="action-btn view-btn"
                              title="View Details"
                              onClick={() => handleViewDetails(customer)}
                            >
                              View
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="14" className="no-data">
                      <div className="no-data-content">
                        <RiUserLine className="no-data-icon" />
                        <h3>No customers found</h3>
                        <p>Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                      key={idx + 1}
                      className={`pagination-number ${
                        currentPage === idx + 1 ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResponderTable;
