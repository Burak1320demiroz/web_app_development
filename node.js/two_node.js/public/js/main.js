// Token yönetimi
let token = localStorage.getItem('token');
let currentUser = null;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    setupEventListeners();
    
    // URL kontrolü
    const path = window.location.pathname;
    if (path === '/admin' || path === '/admin/users') {
        if (!token) {
            showAlert('danger', 'Lütfen önce giriş yapın.');
            window.history.pushState({}, '', '/');
        } else if (currentUser && currentUser.role !== 'admin') {
            showAlert('danger', 'Bu sayfaya erişim yetkiniz yok.');
            window.history.pushState({}, '', '/');
        } else {
            loadAdminPanel();
        }
    } else if (token) {
        loadUserProfile();
    }
});

// Event listener'ları ayarla
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Logout
    document.getElementById('logoutLink').addEventListener('click', handleLogout);
    
    // Profile link
    document.getElementById('profileLink').addEventListener('click', loadUserProfile);
    
    // Admin link
    document.getElementById('adminLink').addEventListener('click', loadAdminPanel);
}

// Login işlemi
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.status) {
            token = data.token;
            currentUser = data.user;
            localStorage.setItem('token', token);
            updateNavigation();
            loadUserProfile();
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            showAlert('success', 'Giriş başarılı!');
        } else {
            showAlert('danger', data.errorMessage);
        }
    } catch (error) {
        showAlert('danger', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
}

// Register işlemi
async function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const name = document.getElementById('registerName').value;
    const lastName = document.getElementById('registerLastName').value;
    const dob = document.getElementById('registerDob').value;
    
    try {
        const response = await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name, lastName, dob })
        });
        
        const data = await response.json();
        
        if (data.status) {
            bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
            showAlert('success', 'Kayıt başarılı! Giriş yapabilirsiniz.');
        } else {
            showAlert('danger', data.errorMessage);
        }
    } catch (error) {
        showAlert('danger', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
}

// Logout işlemi
function handleLogout() {
    token = null;
    currentUser = null;
    localStorage.removeItem('token');
    updateNavigation();
    document.getElementById('mainContent').innerHTML = `
        <div class="jumbotron">
            <h1 class="display-4">Hoş Geldiniz!</h1>
            <p class="lead">Kullanıcı yönetim sistemine hoş geldiniz. Giriş yaparak veya kayıt olarak sistemi kullanmaya başlayabilirsiniz.</p>
        </div>
    `;
}

// Kullanıcı profilini yükle
async function loadUserProfile() {
    try {
        const response = await fetch('/user/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const user = await response.json();
        
        document.getElementById('mainContent').innerHTML = `
            <div class="profile-card">
                <h2>Profil Bilgileri</h2>
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Ad:</strong> ${user.name}</p>
                        <p><strong>Soyad:</strong> ${user.lastName}</p>
                        <p><strong>E-posta:</strong> ${user.email}</p>
                        <p><strong>Doğum Tarihi:</strong> ${user.dob}</p>
                        <p><strong>Rol:</strong> ${user.role}</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        showAlert('danger', 'Profil bilgileri yüklenirken bir hata oluştu.');
    }
}

// Admin panelini yükle
async function loadAdminPanel() {
    try {
        const response = await fetch('/admin/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                showAlert('danger', 'Lütfen önce giriş yapın.');
                handleLogout();
                return;
            } else if (response.status === 403) {
                showAlert('danger', 'Bu sayfaya erişim yetkiniz yok.');
                return;
            }
            throw new Error('Bir hata oluştu');
        }
        
        const users = await response.json();
        
        const usersTable = users.map(user => `
            <tr>
                <td>${user.email}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.dob}</td>
                <td>${user.role}</td>
                <td>${user.permissions.join(', ')}</td>
            </tr>
        `).join('');
        
        document.getElementById('mainContent').innerHTML = `
            <div class="admin-panel">
                <h2>Kullanıcı Listesi</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>E-posta</th>
                            <th>Ad</th>
                            <th>Soyad</th>
                            <th>Doğum Tarihi</th>
                            <th>Rol</th>
                            <th>İzinler</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usersTable}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        showAlert('danger', 'Kullanıcı listesi yüklenirken bir hata oluştu.');
    }
}

// Navigasyon menüsünü güncelle
function updateNavigation() {
    const loginNav = document.getElementById('loginNav');
    const registerNav = document.getElementById('registerNav');
    const profileNav = document.getElementById('profileNav');
    const adminNav = document.getElementById('adminNav');
    const logoutNav = document.getElementById('logoutNav');
    
    if (token) {
        loginNav.classList.add('d-none');
        registerNav.classList.add('d-none');
        profileNav.classList.remove('d-none');
        logoutNav.classList.remove('d-none');
        
        if (currentUser && currentUser.role === 'admin') {
            adminNav.classList.remove('d-none');
        } else {
            adminNav.classList.add('d-none');
        }
    } else {
        loginNav.classList.remove('d-none');
        registerNav.classList.remove('d-none');
        profileNav.classList.add('d-none');
        adminNav.classList.add('d-none');
        logoutNav.classList.add('d-none');
    }
}

// Alert göster
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.getElementById('mainContent').insertAdjacentElement('afterbegin', alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
} 