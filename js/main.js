function openpdf(pdfname, openname, closename){
    pdf = document.getElementById(pdfname);
    open = document.getElementById(openname);
    close = document.getElementById(closename);
    pdf.style.display = "block";
    open.style.display = "none";
    close.style.display = "block";
}
function closepdf(pdfname, openname, closename){
    pdf = document.getElementById(pdfname);
    open = document.getElementById(openname);
    close = document.getElementById(closename);
    pdf.style.display = "none";
    open.style.display = "block";
    close.style.display = "none";
}