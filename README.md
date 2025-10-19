# WorkBoard

Modern employee and task management application built with Laravel and React.

## 🚀 Features

-   Employee management with role-based access
-   Task tracking and assignments
-   Real-time updates with Laravel Reverb
-   Interactive dashboards and charts
-   Mobile-responsive interface

## 🛠 Tech Stack

-   **Backend:** Laravel 10
-   **Frontend:** React + TypeScript
-   **State:** Inertia.js
-   **Styling:** Tailwind CSS + SCSS
-   **Testing:** PHPUnit + Vitest
-   **Real-time:** Laravel Reverb
-   **Database:** MySQL
-   **Cache:** Redis

## 📋 Requirements

-   PHP 8.2+
-   Node.js 16+
-   Docker
-   Composer

## 🏗 Installation

1. Clone and setup environment:

```bash
git clone <repository-url>
cd work-board
cp .env.example .env
```

2. Start Docker containers:

```bash
./vendor/bin/sail up -d
```

3. Install dependencies:

```bash
./vendor/bin/sail composer install
./vendor/bin/sail npm install
```

4. Setup application:

```bash
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan storage:link
```

## 💻 Development

```bash
# Start development servers
./vendor/bin/sail up -d
./vendor/bin/sail npm run dev
```

Visit `http://localhost` to view the application.

## 🧪 Testing

```bash
# PHP tests
./vendor/bin/sail test

# JavaScript tests
./vendor/bin/sail npm test

# Watch mode
./vendor/bin/sail npm test:watch
```

## 🔍 Code Quality

```bash
# PHP formatting
./vendor/bin/sail pint

# TypeScript checks
./vendor/bin/sail npm run tsc

# ESLint
./vendor/bin/sail npm run lint
```

## 📦 Project Structure

```
work-board/
├── app/                  # PHP application code
├── resources/
│   ├── js/             # React components & logic
│   └── views/          # Blade templates
├── routes/              # API & web routes
├── tests/               # PHP & JavaScript tests
└── database/            # Migrations & seeders
```

## 🔒 Environment Variables

Key configurations in `.env`:

-   `APP_URL`: Application URL
-   `DB_DATABASE`: MySQL database name
-   `REDIS_HOST`: Redis connection
-   `REVERB_APP_KEY`: Real-time broadcasting key

## 📄 License

[MIT License](LICENSE)
