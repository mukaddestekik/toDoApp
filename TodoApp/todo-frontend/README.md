# Todo List Application

##  Proje Açıklaması
Bu proje, CQRS mimarisi kullanılarak geliştirilmiş modern bir Todo List uygulamasıdır. Backend tarafında .NET 8 ve Entity Framework Core, frontend tarafında Angular teknolojileri kullanılmıştır.

##  Kullanılan Teknolojiler

### Backend
- *.NET 8* - Web API Framework
- *Entity Framework Core* - ORM
- *MSSQL Server* - Veritabanı
- *MediatR* - CQRS Pattern implementasyonu
- *Swagger* - API Dokümantasyonu

### Frontend
- *Angular 17* - Frontend Framework
- *Angular Material* - UI Component Library
- *TypeScript* - Programming Language
- *SCSS* - Styling
- *RxJS* - Reactive Programming

### Veritabanı
- *Microsoft SQL Server* (LocalDB)

##  Mimari Yapı

### Backend Mimari (CQRS)

TodoApp.Api/
│
├── Application/
│   ├── Commands/          # Command nesneleri
│   ├── Queries/           # Query nesneleri
│   ├── CommandHandlers/   # Command işleyiciler
│   ├── QueryHandlers/     # Query işleyiciler
│   └── DTOs/             # Data Transfer Objects
├── Domain/
│   └── Entities/         # Domain modelleri
├── Infrastructure/
│   ├── Data/             # DbContext
│   └── Repositories/     # Repository implementasyonları
├── Controllers/          # API Controllers
└── Program.cs           # Uygulama başlangıç noktası


### Frontend Mimari

todo-frontend/
│
├── src/app/
│   ├── components/       # Angular bileşenleri
│   ├── services/         # HTTP servisleri
│   ├── models/          # TypeScript interfaceleri
│   └── app.module.ts    # Ana modül


##  Kurulum ve Çalıştırma

### Önkoşullar
- *.NET 8 SDK*
- *Node.js* (v18+ önerilen)
- *Angular CLI* (npm install -g @angular/cli)
- *SQL Server* veya *SQL Server Express LocalDB*
- *Visual Studio 2022* veya *Visual Studio Code*

### Backend Kurulumu

1. *Repository'yi klonlayın:*
bash
git clone [repository-url]
cd TodoApp.Api


2. *NuGet paketlerini yükleyin:*
bash
dotnet restore


3. *Veritabanı connection string'ini güncelleyin:*
appsettings.json dosyasındaki connection string'i kendi SQL Server ayarlarınıza göre düzenleyin:
json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=TodoAppDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}

4. *Entity Framework Migration'ları çalıştırın:*
bash
dotnet ef migrations add InitialCreate
dotnet ef database update


5. *API'yi çalıştırın:*
bash
dotnet run


Backend API şu adreste çalışacaktır: https://localhost:5264
Swagger dokümantasyonu: https://localhost:5264/swagger

### Frontend Kurulumu

1. *Frontend klasörüne gidin:*
bash
cd todo-frontend


2. *npm paketlerini yükleyin:*
bash
npm install


3. *API URL'ini güncelleyin:*
src/app/services/todo.service.ts dosyasında API URL'ini kontrol edin:
typescript
private apiUrl = 'https://localhost:5264/api/todo';


4. *Angular uygulamasını çalıştırın:*
bash
ng serve


Frontend uygulama şu adreste çalışacaktır: http://localhost:4200

## API Endpoints

### Base URL: https://localhost:5264/api/todo

#### 1. Tüm Todo'ları Getir
http
GET /api/todo


*Response:*
json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "Example Todo",
    "description": "Example description",
    "isCompleted": false,
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
]

#### 2. ID'ye Göre Todo Getir
http
GET /api/todo/{id}


*Parameters:*
- id (GUID) - Todo ID

*Response:*
json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Example Todo",
  "description": "Example description",
  "isCompleted": false,
  "createdAt": "2024-01-01T12:00:00.000Z"
}

#### 3. Yeni Todo Oluştur
http
POST /api/todo
Content-Type: application/json


*Request Body:*
json
{
  "title": "New Todo",
  "description": "Todo description"
}

*Response:*
json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "New Todo",
  "description": "Todo description",
  "isCompleted": false,
  "createdAt": "2024-01-01T12:00:00.000Z"
}

#### 4. Todo Güncelle
http
PUT /api/todo/{id}
Content-Type: application/json

*Parameters:*
- id (GUID) - Todo ID

*Request Body:*
json
{
  "title": "Updated Todo",
  "description": "Updated description",
  "isCompleted": true
}


*Response:*
json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Updated Todo",
  "description": "Updated description",
  "isCompleted": true,
  "createdAt": "2024-01-01T12:00:00.000Z"
}

#### 5. Todo Sil
http
DELETE /api/todo/{id}


*Parameters:*
- id (GUID) - Todo ID

*Response:* 204 No Content

##  Veritabanı Şeması

### ToDo Tablosu
sql
CREATE TABLE ToDo (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    IsCompleted BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

## Test Etme

### Postman ile Test
1. Postman'i açın
2. Collection oluşturun
3. Yukarıdaki endpoint'leri ekleyin
4. API'yi test edin

### Browser'da Test
1. https://localhost:5264/swagger adresine gidin
2. Swagger UI üzerinden API'yi test edin





# TodoFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
