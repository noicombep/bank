document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const referrer = document.getElementById('referrer').value.trim();

  if (!name || !phone) return alert('Vui lòng nhập đầy đủ họ tên và SĐT.');

  const data = JSON.parse(localStorage.getItem('referrals') || '[]');
  data.push({ name, phone, referrer });
  localStorage.setItem('referrals', JSON.stringify(data));

  document.getElementById('registerForm').reset();
  document.getElementById('successMessage').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('successMessage').classList.add('hidden');
  }, 3000);
});

function loadReferrals() {
  const table = document.getElementById('referralTable');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  const data = JSON.parse(localStorage.getItem('referrals') || '[]');
  if (data.length === 0) {
    alert('Chưa có người đăng ký nào.');
    return;
  }

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.phone}</td>
      <td>${item.referrer || '-'}</td>
    `;
    tbody.appendChild(row);
  });

  table.classList.remove('hidden');
}
