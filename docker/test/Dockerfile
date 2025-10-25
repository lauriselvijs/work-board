FROM php:8.2-fpm-alpine

# Install system dependencies and PHP extension build deps
RUN apk update && apk add --no-cache \
    git \
    curl \
    bash \
    mysql-client \
    mariadb-connector-c \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libxpm-dev \
    freetype-dev \
    libxml2-dev \
    libzip-dev \
    oniguruma-dev \
    zlib-dev \
    icu-dev \
    autoconf \
    gcc \
    g++ \
    make \
    nodejs \
    npm \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        zip \
        gd \
        xml \
        dom \
        intl \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del autoconf gcc g++ make  # Clean up build tools

# Add Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application source
COPY . /var/www/html

COPY .env.example /var/www/html/.env

# Install PHP dependencies (for testing)
RUN composer install --no-interaction --prefer-dist
RUN npm install && npm run build

RUN php artisan key:generate

CMD ["php-fpm"]
