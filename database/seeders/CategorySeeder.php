<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::truncate();
        $cats = [
            [
                "name" => "học thuật"
            ],
            [
                "name" => "bài thuốc dân gian"
            ]
        ];

        foreach ($cats as $cat) {
            Category::create($cat);
        }
    }
}
