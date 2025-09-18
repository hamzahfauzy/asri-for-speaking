<?php

use Libs\System\File;
use Libs\Web\Route;

    
Route::get('/', new File('src/Views/landing', true));

Route::beforeEnter('checkSession')->get('login', new File('src/Views/auth/login', true));
Route::beforeEnter('checkSession')->get('forgot-password', new File('src/Views/auth/forgot-password', true));
Route::beforeEnter('checkSession')->post('login', [Controllers\LoginController::class, 'login']);
Route::beforeEnter('checkSession')->post('register', [Controllers\LoginController::class, 'register']);
Route::beforeEnter('sessionRequired')->get('logout', [Controllers\LoginController::class, 'logout']);

Route::beforeEnter('sessionRequired')->get('home', new File('src/Views/admin/home', true));

Route::beforeEnter('sessionRequired')->get('profile', new File('src/Views/admin/profile', true));
Route::beforeEnter('sessionRequired')->post('profile', [Controllers\ProfileController::class, 'updateProfile']);
Route::beforeEnter('sessionRequired')->get('change-password', new File('src/Views/admin/change-password', true));
Route::beforeEnter('sessionRequired')->post('change-password', [Controllers\ProfileController::class, 'updatePassword']);

Route::beforeEnter('sessionRequired')->get('students', new File('src/Views/admin/students/index', true));
Route::beforeEnter('sessionRequired')->get('students/edit', new File('src/Views/admin/students/edit', true));
Route::beforeEnter('sessionRequired')->post('students', [Controllers\UserController::class, 'store']);
Route::beforeEnter('sessionRequired')->put('students', [Controllers\UserController::class, 'update']);
Route::beforeEnter('sessionRequired')->delete('students', [Controllers\UserController::class, 'delete']);
Route::beforeEnter('sessionRequired')->get('students/create', new File('src/Views/admin/students/create', true));

Route::beforeEnter('sessionRequired')->get('teachers', new File('src/Views/admin/teachers/index', true));
Route::beforeEnter('sessionRequired')->get('teachers/edit', new File('src/Views/admin/teachers/edit', true));
Route::beforeEnter('sessionRequired')->post('teachers', [Controllers\UserController::class, 'store']);
Route::beforeEnter('sessionRequired')->put('teachers', [Controllers\UserController::class, 'update']);
Route::beforeEnter('sessionRequired')->delete('teachers', [Controllers\UserController::class, 'delete']);
Route::beforeEnter('sessionRequired')->get('teachers/create', new File('src/Views/admin/teachers/create', true));

Route::beforeEnter('sessionRequired')->get('lessons', new File('src/Views/admin/lessons/index', true));

Route::beforeEnter('sessionRequired')->get('lesson-items', new File('src/Views/admin/lesson-items/index', true));
Route::beforeEnter('sessionRequired')->get('lesson-items/create', new File('src/Views/admin/lesson-items/create', true));
Route::beforeEnter('sessionRequired')->get('lesson-items/edit', new File('src/Views/admin/lesson-items/edit', true));
Route::beforeEnter('sessionRequired')->post('lesson-items', [Controllers\LessonItemController::class, 'store']);
Route::beforeEnter('sessionRequired')->put('lesson-items', [Controllers\LessonItemController::class, 'update']);
Route::beforeEnter('sessionRequired')->delete('lesson-items', [Controllers\LessonItemController::class, 'delete']);
Route::beforeEnter('sessionRequired')->get('seed-lesson-items', [Controllers\LessonItemController::class, 'seedLesson']);

Route::beforeEnter('sessionRequired')->post('save-result', [Controllers\SectionController::class, 'saveResult']);

Route::beforeEnter('sessionRequired')->get('media', new File('src/Views/admin/media/index', true));