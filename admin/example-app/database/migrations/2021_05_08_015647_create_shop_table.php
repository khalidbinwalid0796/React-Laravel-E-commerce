<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop', function (Blueprint $table) {
            $table->id();
            $table->string('shop_code');
            $table->string('shop_name');
            $table->string('shop_logo');
            $table->string('shop_address');
            $table->string('shop_owner');
            $table->string('shop_category');
            $table->string('shop_username');
            $table->string('shop_mobile');
            $table->string('shop_email');
            $table->string('shop_password');
            $table->string('shop_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop');
    }
}
