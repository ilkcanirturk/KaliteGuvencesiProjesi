<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<!-- ## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE). -->

# Yazılım Kalite Güvencesi ve Testi Projesi

Bu proje, 2025-2026 Güz Dönemi Dönem Sonu Projesi kapsamında bir REST API içermektedir.

## 🛠️ Kullanılan Teknolojiler

* **Backend:** Nest.JS (Node.js, TypeScript)
* **Veritabanı:** MS SQL Server Express
* **ORM:** TypeORM
* **API Dokümantasyonu:** Swagger (OpenAPI)
* **Test:** Jest (Varsayılan)

---

## 🚀 Kurulum Talimatları (Adım Adım)

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gereksinimler

* Node.js (v18+ tavsiye edilir)
* NPM
* Git
* MS SQL Server (Express sürümü kullanılabilir)
* SQL Server Management Studio (SSMS) (veya Azure Data Studio)

### 2. Proje Kurulumu

1.  Projeyi klonlayın:
    ```bash
    git clone [https://github.com/ilkcanirturk/KaliteGuvencesiProjesi.git](https://github.com/ilkcanirturk/KaliteGuvencesiProjesi.git)
    cd KaliteGuvencesiProjesi
    ```

2.  Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```

### 3. Veritabanı Ayarları

1.  SSMS kullanarak SQL Server'ınıza bağlanın.
2.  `YazilimKaliteProjesi` adında **boş bir veritabanı** oluşturun.
    ```sql
    CREATE DATABASE YazilimKaliteProjesi;
    ```
3.  Proje dizinindeki `.env.example` dosyasını kopyalayıp `.env` adında yeni bir dosya oluşturun.
4.  `.env` dosyasını kendi SQL Server kullanıcı bilgilerinizle (kullanıcı adı, şifre) doldurun. `DB_HOST` (örn: `localhost\SQLEXPRESS`) ve `DB_NAME` (`YazilimKaliteProjesi`) ayarlarının doğru olduğundan emin olun.

**ÖNEMLİ:** Proje, TypeORM'un `synchronize: true` özelliğini kullanmaktadır. Projeyi başlattığınızda gerekli tablolar (`users` vb.) veritabanınızda otomatik olarak oluşturulacaktır.

### 4. SQL Server Yapılandırması (Bağlantı Hatası Alırsanız)

Eğer `npm run start:dev` komutunu çalıştırdığınızda veritabanı bağlantı hatası (`Port for SQLEXPRESS not found`) alırsanız:

1.  Windows'ta **SQL Server Configuration Manager**'ı açın.
2.  `SQL Server Network Configuration` > `Protocols for SQLEXPRESS` altında `TCP/IP` protokolünü **"Enable"** (Etkinleştir) yapın.
3.  Windows Hizmetleri'nden (`services.msc`) **"SQL Server (SQLEXPRESS)"** hizmetini yeniden başlatın.
4.  **"SQL Server Browser"** hizmetinin çalıştığından emin olun.

### 5. Projeyi Başlatma

```bash
npm run start:dev
```
### 6. API Endpoint'leri

API'yi test etmek, tüm endpoint'leri görüntülemek ve request/response örneklerini incelemek için Swagger UI kullanabilirsiniz.

Proje çalışırken şu adrese gidin: 👉 http://localhost:3000/api-docs

GET	/users : Tüm kullanıcıları listeler
POST	/users : Yeni bir kullanıcı oluşturur
GET	/users/{id} :	Belirli bir kullanıcıyı getirir
PATCH	/users/{id} :	Kullanıcı bilgilerini günceller
DELETE	/users/{id} :	Kullanıcıyı siler

### 7. Testleri Çalıştırma

Projenin testlerini çalıştırmak için aşağıdaki komutları kullanabilirsiniz:

#### Tüm testleri çalıştır (Unit + E2E):

```bash
npm run test
```

#### Sadece birim (unit) testlerini çalıştır ve izle:

```bash
npm run test:watch
```


#### Test kapsamı (coverage) raporu al:

```bash
npm run test:cov
```


#### Uçtan uca (E2E) sistem testlerini çalıştır:

```bash
npm run test:e2e
```





