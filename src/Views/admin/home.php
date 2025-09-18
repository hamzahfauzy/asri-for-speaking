<?php 
\Libs\Web\Page::setTitle("ASRI for Speaking | Dashboard");
$link = [
    'admin' => 'lesson-items',
    'teacher' => 'results',
    'student' => 'media'
];
loadFile('src/Views/layout/header'); ?>
<section class="content-body">
    <h2 class="page-title">List of Lesson</h2>
    <p class="page-subtitle">Click More Detail for Detail Lesson</p>

    <div class="lesson-grid">
    <div class="card lesson-card" style="--anim-delay: 0.1s">
        <div class="card-icon-bg" style="background-color: #e0f7fa">
        <i class="fas fa-running" style="color: #00796b"></i>
        </div>
        <div class="card-content">
        <span class="card-subtitle">LESSON 1</span>
        <h3 class="card-title">Verb</h3>
        <a href="/<?=$link[auth()['level']]?>?lesson_id=1" class="btn btn-primary">More Detail...</a>
        </div>
    </div>

    <div class="card lesson-card" style="--anim-delay: 0.2s">
        <div class="card-icon-bg" style="background-color: #fff3e0">
        <i class="fas fa-cube" style="color: #f57c00"></i>
        </div>
        <div class="card-content">
        <span class="card-subtitle">LESSON 2</span>
        <h3 class="card-title">Noun</h3>
        <a href="/<?=$link[auth()['level']]?>?lesson_id=2" class="btn btn-primary">More Detail...</a>
        </div>
    </div>

    <div class="card lesson-card" style="--anim-delay: 0.3s">
        <div class="card-icon-bg" style="background-color: #fce4ec">
        <i class="fas fa-palette" style="color: #d81b60"></i>
        </div>
        <div class="card-content">
        <span class="card-subtitle">LESSON 3</span>
        <h3 class="card-title">Adjective</h3>
        <a href="/<?=$link[auth()['level']]?>?lesson_id=3" class="btn btn-primary">More Detail...</a>
        </div>
    </div>

    <div class="card lesson-card" style="--anim-delay: 0.4s">
        <div class="card-icon-bg" style="background-color: #e8eaf6">
        <i class="fas fa-sliders-h" style="color: #303f9f"></i>
        </div>
        <div class="card-content">
        <span class="card-subtitle">LESSON 4</span>
        <h3 class="card-title">Adverb</h3>
        <a href="/<?=$link[auth()['level']]?>?lesson_id=4" class="btn btn-primary">More Detail...</a>
        </div>
    </div>
    </div>
</section>

<?php loadFile('src/Views/layout/footer'); ?>