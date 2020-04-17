import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

async function ExportPDF(length) {
    Swal.fire({
        title: "<strong>Generando PDF</strong>",
        html: "Su descarga comenzará en breve...",
        icon: "info",
        showConfirmButton: false,
    });

    const pdf = new jsPDF("p", "mm", "A4");
    for (let i = 0; i < length; i++) {
        let canvas = await html2canvas(document.getElementById("Pagina " + i), {
            useCORS: true,
            allowTaint: true,
            scale: 2,
            scrollX: -window.scrollX,
            scrollY: -window.scrollY
        });

        let pdfWidth = pdf.internal.pageSize.getWidth();
        let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(canvas, "PNG", 0, 0, pdfWidth, pdfHeight);

        (i == length - 1) ?
            pdf.save("menu.pdf")
            : pdf.addPage();
    }

    Swal.fire({
        title: "<strong>Descarga completa</strong>",
        icon: "success",
        confirmButtonColor: "#7d2998",
    });
}
export default ExportPDF;