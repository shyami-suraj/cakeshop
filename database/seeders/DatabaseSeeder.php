<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'name' => 'admin ',
            'phone'=>'9844673255',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'user_type'=>'admin',
        ]);
    }
}
