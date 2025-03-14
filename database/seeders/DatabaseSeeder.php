<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\PostSeeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();
        User::create([
            "name" => "Thanh Quy",
            "email" => "free2idol@gmail.com",
            "password" => bcrypt(config("app.admin_password")),
        ]);

        $this->call([
            PostSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
