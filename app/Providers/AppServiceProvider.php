<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url): void
    {
        Request::macro('extractQueryParams', function () {
            return [
                'query' => $this->query(config('const.query_string.query_key')),
                'sort' => $this->query(config('const.query_string.sort_key')),
                'order' => $this->query(config('const.query_string.order_key')),
                'filter' => $this->query(config('const.query_string.filter_key')),
            ];
        });

        if (config('app.env') == 'production') {
            $url->forceScheme('https');
        }

        Password::defaults(function () {
            $rule = Password::min(8);

            if (config('app.env') == 'production') {
                return request()->isPrecognitive()
                    ? $rule
                    : $rule->uncompromised();
            }

            return $rule;
        });
    }
}
