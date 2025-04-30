# Database Schema

## Users Table

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->string('status')->default('active'); // active, inactive, pending
    $table->timestamp('last_active_at')->nullable();
    $table->string('avatar')->nullable();
    $table->rememberToken();
    $table->timestamps();
});
```

## Roles Table (via Spatie Permission)

```php
Schema::create('roles', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('guard_name');
    $table->text('description')->nullable();
    $table->timestamps();
});
```

## Permissions Table (via Spatie Permission)

```php
Schema::create('permissions', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('guard_name');
    $table->string('category')->nullable(); // For grouping permissions
    $table->timestamps();
});
```

## Model Has Roles Table (via Spatie Permission)

```php
Schema::create('model_has_roles', function (Blueprint $table) {
    $table->unsignedBigInteger('role_id');
    $table->string('model_type');
    $table->unsignedBigInteger('model_id');
    $table->primary(['role_id', 'model_type', 'model_id']);
});
```

## Model Has Permissions Table (via Spatie Permission)

```php
Schema::create('model_has_permissions', function (Blueprint $table) {
    $table->unsignedBigInteger('permission_id');
    $table->string('model_type');
    $table->unsignedBigInteger('model_id');
    $table->primary(['permission_id', 'model_type', 'model_id']);
});
```

## Role Has Permissions Table (via Spatie Permission)

```php
Schema::create('role_has_permissions', function (Blueprint $table) {
    $table->unsignedBigInteger('permission_id');
    $table->unsignedBigInteger('role_id');
    $table->primary(['permission_id', 'role_id']);
});
```

## Activity Logs Table

```php
Schema::create('activity_logs', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id')->nullable();
    $table->string('action');
    $table->string('target');
    $table->text('details')->nullable();
    $table->ipAddress('ip_address')->nullable();
    $table->string('user_agent')->nullable();
    $table->timestamps();
    
    $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
});
```

## Widgets Table

```php
Schema::create('widgets', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->json('configuration');
    $table->string('status')->default('draft'); // draft, published
    $table->unsignedBigInteger('created_by');
    $table->timestamps();
    
    $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
});
```

## Knowledge Base Categories Table

```php
Schema::create('kb_categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->unsignedBigInteger('parent_id')->nullable();
    $table->integer('order')->default(0);
    $table->timestamps();
    
    $table->foreign('parent_id')->references('id')->on('kb_categories')->onDelete('set null');
});
```

## Knowledge Base Articles Table

```php
Schema::create('kb_articles', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('content');
    $table->unsignedBigInteger('category_id')->nullable();
    $table->unsignedBigInteger('created_by');
    $table->unsignedBigInteger('updated_by')->nullable();
    $table->string('status')->default('draft'); // draft, published
    $table->timestamps();
    
    $table->foreign('category_id')->references('id')->on('kb_categories')->onDelete('set null');
    $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
    $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
});
```

## AI Models Table

```php
Schema::create('ai_models', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('provider'); // gemini, huggingface, etc.
    $table->json('configuration');
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

## AI Prompts Table

```php
Schema::create('ai_prompts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('content');
    $table->json('variables')->nullable();
    $table->unsignedBigInteger('model_id');
    $table->timestamps();
    
    $table->foreign('model_id')->references('id')->on('ai_models')->onDelete('cascade');
});
```

## Conversations Table

```php
Schema::create('conversations', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id')->nullable(); // Null for guest users
    $table->string('session_id'); // For tracking guest users
    $table->string('status')->default('active'); // active, closed
    $table->timestamps();
    
    $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
});
```

## Messages Table

```php
Schema::create('messages', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('conversation_id');
    $table->text('content');
    $table->string('sender_type'); // user, ai
    $table->unsignedBigInteger('ai_model_id')->nullable();
    $table->json('metadata')->nullable(); // For storing additional information
    $table->timestamps();
    
    $table->foreign('conversation_id')->references('id')->on('conversations')->onDelete('cascade');
    $table->foreign('ai_model_id')->references('id')->on('ai_models')->onDelete('set null');
});
```

## Guest Users Table

```php
Schema::create('guest_users', function (Blueprint $table) {
    $table->id();
    $table->string('session_id');
    $table->string('name')->nullable();
    $table->string('email')->nullable();
    $table->string('phone')->nullable();
    $table->ipAddress('ip_address')->nullable();
    $table->string('user_agent')->nullable();
    $table->timestamps();
});
```
