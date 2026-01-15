# Yazılım Kalite Güvencesi ve Testi Projesi | Software Quality Assurance and Testing Project

Bu proje, 2025-2026 Güz Dönemi Dönem Sonu Projesi kapsamında bir REST API içermektedir.

This project contains a REST API developed as part of the 2025-2026 Fall Semester Final Project.

[![codecov](https://codecov.io/github/ilkcanirturk/KaliteGuvencesiProjesi/graph/badge.svg?token=NZJ8YCTAAD)](https://codecov.io/github/ilkcanirturk/KaliteGuvencesiProjesi)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## 📋 İçindekiler | Table of Contents
- [Türkçe](#türkçe)
- [English](#english)

---

## Türkçe

### 🛠️ Kullanılan Teknolojiler

* **Backend:** Nest.JS (Node.js, TypeScript)
* **Veritabanı:** MS SQL Server Express
* **ORM:** TypeORM
* **API Dokümantasyonu:** Swagger (OpenAPI)
* **Test:** Jest (Varsayılan)
* **CI/CD:** GitHub Actions, Codecov

---

### 🚀 Kurulum Talimatları (Adım Adım)

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

#### 1. Gereksinimler

* Node.js (v18+ tavsiye edilir)
* NPM
* Git
* MS SQL Server (Express sürümü kullanılabilir)
* SQL Server Management Studio (SSMS) (veya Azure Data Studio)

#### 2. Proje Kurulumu

1.  Projeyi klonlayın:
```bash
    git clone https://github.com/ilkcanirturk/KaliteGuvencesiProjesi.git
    cd KaliteGuvencesiProjesi
```

2.  Gerekli paketleri yükleyin:
```bash
    npm install
```

#### 3. Veritabanı Ayarları

1.  SSMS kullanarak SQL Server'ınıza bağlanın.
2.  `YazilimKaliteProjesi` adında **boş bir veritabanı** oluşturun.
```sql
    CREATE DATABASE YazilimKaliteProjesi;
```
3.  Proje dizinindeki `.env.example` dosyasını kopyalayıp `.env` adında yeni bir dosya oluşturun.
4.  `.env` dosyasını kendi SQL Server kullanıcı bilgilerinizle (kullanıcı adı, şifre) doldurun. `DB_HOST` (örn: `localhost\SQLEXPRESS`) ve `DB_NAME` (`YazilimKaliteProjesi`) ayarlarının doğru olduğundan emin olun.

**ÖNEMLİ:** Proje, TypeORM'un `synchronize: true` özelliğini kullanmaktadır. Projeyi başlattığınızda gerekli tablolar (`users` vb.) veritabanınızda otomatik olarak oluşturulacaktır.

#### 4. SQL Server Yapılandırması (Bağlantı Hatası Alırsanız)

Eğer `npm run start:dev` komutunu çalıştırdığınızda veritabanı bağlantı hatası (`Port for SQLEXPRESS not found`) alırsanız:

1.  Windows'ta **SQL Server Configuration Manager**'ı açın.
2.  `SQL Server Network Configuration` > `Protocols for SQLEXPRESS` altında `TCP/IP` protokolünü **"Enable"** (Etkinleştir) yapın.
3.  Windows Hizmetleri'nden (`services.msc`) **"SQL Server (SQLEXPRESS)"** hizmetini yeniden başlatın.
4.  **"SQL Server Browser"** hizmetinin çalıştığından emin olun.

#### 5. Projeyi Başlatma
```bash
npm run start:dev
```

#### 6. API Endpoint'leri ve Dokümantasyon

API'yi test etmek, tüm endpoint'leri görüntülemek ve request/response şemalarını incelemek için **Swagger UI** kullanabilirsiniz.

Proje çalışırken şu adrese gidin: 👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Aşağıda ana kaynakların bir özeti bulunmaktadır. Tüm detaylar Swagger arayüzünde mevcuttur.

##### Users (Kullanıcılar)
* `GET /users`: Tüm kullanıcıları listeler.
* `POST /users`: Yeni bir kullanıcı oluşturur.
* `GET /users/{id}`: Belirli bir kullanıcıyı getirir.
* `PATCH /users/{id}`: Kullanıcı bilgilerini günceller.
* `DELETE /users/{id}`: Kullanıcıyı siler.

##### Products (Ürünler)
* `GET /products`: Tüm ürünleri listeler.
* `POST /products`: Yeni bir ürün oluşturur (kategorilerle ilişkili).
* `GET /products/{id}`: Belirli bir ürünü getirir.
* `PATCH /products/{id}`: Ürün bilgilerini günceller.
* `DELETE /products/{id}`: Ürünü siler.

##### Categories (Kategoriler)
* `GET /categories`: Tüm kategorileri listeler.
* `POST /categories`: Yeni bir kategori oluşturur.
* `GET /categories/{id}`: Belirli bir kategoriyi getirir.
* `PATCH /categories/{id}`: Kategori bilgilerini günceller.
* `DELETE /categories/{id}`: Kategoriyi siler.

##### Orders (Siparişler)
* `GET /orders`: Tüm siparişleri listeler (kullanıcı bilgisiyle).
* `POST /orders`: Yeni bir sipariş oluşturur (kullanıcıya bağlı).
* `GET /orders/{id}`: Belirli bir siparişi getirir.
* `PATCH /orders/{id}`: Sipariş bilgilerini günceller.
* `DELETE /orders/{id}`: Siparişi siler.

##### Reviews (Değerlendirmeler)
* `GET /reviews`: Tüm değerlendirmeleri listeler (kullanıcı ve ürün bilgisiyle).
* `POST /reviews`: Yeni bir değerlendirme oluşturur (kullanıcı ve ürüne bağlı).
* `GET /reviews/{id}`: Belirli bir değerlendirmeyi getirir.
* `PATCH /reviews/{id}`: Değerlendirme bilgilerini günceller.
* `DELETE /reviews/{id}`: Değerlendirmeyi siler.

#### 7. Testleri Çalıştırma

Projenin testlerini çalıştırmak için aşağıdaki komutları kullanabilirsiniz:

##### Test kapsamı (coverage) raporu al (Birim + Entegrasyon):
```bash
npm run test:cov
```

##### Uçtan uca (E2E) sistem testlerini çalıştır:
```bash
npm run test:e2e
```

##### Tüm testleri çalıştır (Birim + Entegrasyon + E2E):
```bash
npm run test
```

##### Sadece birim (unit) testlerini çalıştır ve izle:
```bash
npm run test:watch
```

---

## English

### 🛠️ Technologies Used

* **Backend:** Nest.JS (Node.js, TypeScript)
* **Database:** MS SQL Server Express
* **ORM:** TypeORM
* **API Documentation:** Swagger (OpenAPI)
* **Testing:** Jest (Default)
* **CI/CD:** GitHub Actions, Codecov

---

### 🚀 Installation Instructions (Step by Step)

Follow these steps to run this project on your local machine:

#### 1. Requirements

* Node.js (v18+ recommended)
* NPM
* Git
* MS SQL Server (Express edition can be used)
* SQL Server Management Studio (SSMS) (or Azure Data Studio)

#### 2. Project Setup

1.  Clone the project:
```bash
    git clone https://github.com/ilkcanirturk/KaliteGuvencesiProjesi.git
    cd KaliteGuvencesiProjesi
```

2.  Install dependencies:
```bash
    npm install
```

#### 3. Database Configuration

1.  Connect to your SQL Server using SSMS.
2.  Create an **empty database** named `YazilimKaliteProjesi`.
```sql
    CREATE DATABASE YazilimKaliteProjesi;
```
3.  Copy the `.env.example` file in the project directory and create a new file named `.env`.
4.  Fill in the `.env` file with your SQL Server credentials (username, password). Make sure `DB_HOST` (e.g., `localhost\SQLEXPRESS`) and `DB_NAME` (`YazilimKaliteProjesi`) settings are correct.

**IMPORTANT:** This project uses TypeORM's `synchronize: true` feature. When you start the project, the required tables (`users`, etc.) will be automatically created in your database.

#### 4. SQL Server Configuration (If You Get Connection Error)

If you encounter a database connection error (`Port for SQLEXPRESS not found`) when running `npm run start:dev`:

1.  Open **SQL Server Configuration Manager** on Windows.
2.  Under `SQL Server Network Configuration` > `Protocols for SQLEXPRESS`, **Enable** the `TCP/IP` protocol.
3.  Restart the **"SQL Server (SQLEXPRESS)"** service from Windows Services (`services.msc`).
4.  Make sure the **"SQL Server Browser"** service is running.

#### 5. Starting the Project
```bash
npm run start:dev
```

#### 6. API Endpoints and Documentation

You can use **Swagger UI** to test the API, view all endpoints, and examine request/response schemas.

While the project is running, go to: 👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Below is a summary of the main resources. All details are available in the Swagger interface.

##### Users
* `GET /users`: Lists all users.
* `POST /users`: Creates a new user.
* `GET /users/{id}`: Gets a specific user.
* `PATCH /users/{id}`: Updates user information.
* `DELETE /users/{id}`: Deletes a user.

##### Products
* `GET /products`: Lists all products.
* `POST /products`: Creates a new product (associated with categories).
* `GET /products/{id}`: Gets a specific product.
* `PATCH /products/{id}`: Updates product information.
* `DELETE /products/{id}`: Deletes a product.

##### Categories
* `GET /categories`: Lists all categories.
* `POST /categories`: Creates a new category.
* `GET /categories/{id}`: Gets a specific category.
* `PATCH /categories/{id}`: Updates category information.
* `DELETE /categories/{id}`: Deletes a category.

##### Orders
* `GET /orders`: Lists all orders (with user information).
* `POST /orders`: Creates a new order (linked to a user).
* `GET /orders/{id}`: Gets a specific order.
* `PATCH /orders/{id}`: Updates order information.
* `DELETE /orders/{id}`: Deletes an order.

##### Reviews
* `GET /reviews`: Lists all reviews (with user and product information).
* `POST /reviews`: Creates a new review (linked to user and product).
* `GET /reviews/{id}`: Gets a specific review.
* `PATCH /reviews/{id}`: Updates review information.
* `DELETE /reviews/{id}`: Deletes a review.

#### 7. Running Tests

You can use the following commands to run the project tests:

##### Get test coverage report (Unit + Integration):
```bash
npm run test:cov
```

##### Run end-to-end (E2E) system tests:
```bash
npm run test:e2e
```

##### Run all tests (Unit + Integration + E2E):
```bash
npm run test
```

##### Run and watch unit tests only:
```bash
npm run test:watch
```