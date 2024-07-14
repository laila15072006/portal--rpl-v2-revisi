document.getElementById('certificateForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var employeeName = document.getElementById('employeeName').value;
    var companyName = document.getElementById('companyName').value;
    var duration = document.getElementById('duration').value;
    var designation = document.getElementById('designation').value;
  
    var certificateContent = `
      <p>&nbsp</p>
      <p>Diberikan kepada ananda <strong>${employeeName}</strong> Atas dedikasi,kerja keras,dan prestasinya yang luar biasa dalam:<p>
      <p> MENGERJAKAN POST TEST <strong>${designation}</strong></P>
      <p> di <strong>${companyName}</strong> pada saat kelas <strong>${duration}</strong>.</p>
      <p>Prestasi ini menjadi bukti komitmen dan keunggulan dalam mencapai tujuan.</p>
      <p>Semangat serta kerja keras Anda telah memberikan inspirasi kepada semua yang berada disekitar Anda.</p>
      <p></p>
      <p>Tertanda guru pengampu mata pelajaran RPL,</p>
      <p>&nbsp</p>
      <p>Moch. Eddy Yusup</p> 
    `;
  
    document.getElementById('certificateContent').innerHTML = certificateContent;
    document.getElementById('certificateOutput').classList.remove('hidden');
    document.getElementById('downloadBtn').classList.remove('hidden');
  });
  
  document.getElementById('downloadBtn').addEventListener('click', function() {
    var certificateText = document.getElementById('certificateContent').textContent;
    var blob = new Blob([certificateText], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
  
    link.href = url;
    link.download = 'experience_certificate.txt';
    link.click();
  });