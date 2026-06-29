import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// ---------------- PDF ----------------

const exportToPDF = ({
    title = "",
    columns,
    data,
    fileName = "Report",
}) => {

    const doc = new jsPDF("landscape");

    if (title) {
        doc.setFontSize(16);
        doc.text(title, 14, 15);
    }

    autoTable(doc, {
        startY: title ? 25 : 10,
        head: [columns.map(col => col.header)],
        body: data.map(row =>
            columns.map(col => {

                const value =
                    typeof col.render === "function"
                        ? col.render(row)
                        : row[col.key];

                return value ?? "";
            })
        ),
        styles: {
            fontSize: 8,
        },
        headStyles: {
            fillColor: [30, 41, 59],
        },
    });

    doc.save(`${fileName}.pdf`);
};

// ---------------- Excel ----------------

const exportToExcel = ({
    columns,
    data,
    fileName = "Report",
}) => {

    const rows = data.map(row => {

        const obj = {};

        columns.forEach(col => {
            obj[col.header] =
                typeof col.render === "function"
                    ? col.render(row)
                    : row[col.key];
        });

        return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Report"
    );

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// ---------------- Common Function ----------------

export const exportTable = ({
    type = "pdf",
    title,
    columns,
    data,
    fileName,
}) => {

    if (type === "pdf") {
        exportToPDF({
            title,
            columns,
            data,
            fileName,
        });
    }

    if (type === "excel") {
        exportToExcel({
            columns,
            data,
            fileName,
        });
    }
};