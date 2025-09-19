<?php

use Libs\Database\DB;

\Libs\Web\Page::setTitle("ASRI for Speaking | Media");
loadFile('src/Views/layout/header'); 

$lesson_id = $_GET['lesson_id'];
$user_id = $_GET['user_id'];

$lesson = DB::table('lessons')->where('id', $lesson_id)->first();
$sections = DB::table('sections')->get();
$results = DB::table('results')->where('lesson_id', $lesson_id)->where('user_id', $user_id)->get();

$mediaData = [];
$sectionId = [];
foreach($sections as $section)
{
    $items = DB::table('lesson_items')->where('lesson_id', $lesson_id)->where('section_id', $section['id'])->get();
    $mediaData[$section['id']] = array_values(array_map(function($item){ return $item['section_id'] == 3 ? ['description' => nl2br($item['description']), 'speakText' => $item['description'],'question' => $item['question']] : $item['question']; }, $items));
    $sectionId[] = strtolower(explode(' ', $section['name'])[0]);
}

$resultData = [];
$summary    = [
    'benar' => 0,
    'salah' => 0,
    'total' => 0
];
foreach($results as $result)
{
    $resultData[$result['section_id']] = $result;
    $content_object = json_decode($result['content_object'], true);
    $summary['total'] += count($content_object);

    // Ambil kolom "status" saja
    $statuses = array_column($content_object, 'status');

    // Hitung jumlah masing-masing status
    $count = array_count_values($statuses);

    $summary['benar'] += isset($content_object[0]['status']) ? ($count[1] ?? 0) : count($content_object);
    $summary['salah'] += isset($content_object[0]['status']) ? ($count[0] ?? 0) : 0;
}

$summary['percent'] = ceil(($summary['benar'] / $summary['total']) * 100);

$section_state = count($resultData) ?? 0;

// print_r($sectionId);
// print_r($section_state);
// print_r($sectionId[$section_state]);
?>
<script>
window.identificationWordsData = <?=json_encode($mediaData[1])?>;
window.notificationWordsData = <?=json_encode($mediaData[2])?>;
window.descriptionWordsData = <?=json_encode($mediaData[3])?>;
window.applicationWordsData = <?=json_encode($mediaData[4])?>;
window.harmonizationWordsData = <?=json_encode($mediaData[5])?>;
window.lesson_id = <?=$lesson_id?>;
window.completedLessonSteps = <?=count($resultData)?>;
window.activeLessonType = "<?=isset($sectionId[$section_state]) ? $sectionId[$section_state] : count($resultData)?>";
</script>

<style>
  /* Style umum untuk semua tombol */
  .btn {
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  /* Warna Next (hijau) */
  .btn-next {
    background-color: #28a745;
    color: white;
  }
  .btn-next:hover {
    background-color: #218838;
  }

  /* Warna Previous (biru) */
  .btn-prev {
    background-color: #007bff;
    color: white;
  }
  .btn-prev:hover {
    background-color: #0056b3;
  }

  /* Tombol Retry (oranye) */
  .btn-tertiary {
    background-color: #fd7e14;
    color: white;
  }
  .btn-tertiary:hover {
    background-color: #e05a00;
  }

  /* Tombol Complete (ungu) */
  .btn-complete {
    background-color: #6f42c1;
    color: white;
  }
  .btn-complete:hover {
    background-color: #5936a2;
  }
  .btn-circle {
    border-radius: 50px;
    padding: 10px 14px;
  }
  .circle-progress {
      transform: rotate(-90deg);
    }

    .d-flex {display: flex;}
    .align-items-center {
  align-items: center !important;
}
.justify-content-around {
  justify-content: space-around !important;
}
.justify-content-between {
  justify-content: space-between !important;
}
.justify-content-center {
  justify-content: center !important;
}
</style> 

<section class="content-body">
    <div class="breadcrumb">
        <a href="index.html">Media</a>
        <span>/</span>
        <a href="#"><?=$lesson['name']?></a>
        <span>/</span>
        <p><?=$lesson['description']?></p>
    </div>

    <h2 class="page-title" style="margin-top: 0.5rem"><?=$lesson['name']?> : <?=$lesson['description']?></h2>
    <p class="page-subtitle">Let's learn and practice <?=$lesson['description']?> speaking!</p>
    <div class="learning-path-container">
        <div class="accordion-item active">
            <div class="accordion-header">
                <div class="accordion-title">
                    <h4><?=$lesson['description']?> Learning Path</h4>
                    <p>Complete all steps to proceed.</p>
                </div>
                <div class="accordion-progress">
                    <span id="lesson-progress-text">0/5 Completed</span>
                    <div class="progress-bar-wrapper">
                        <div class="progress-bar-fill" style="width: 0%" id="lesson-progress-fill"></div>
                    </div>
                </div>
                <i class="fas fa-chevron-down accordion-icon"></i>
            </div>
            <div class="accordion-content">
                <ul class="step-list">
                <?php foreach($sections as $index => $section): $id = explode(' ', $section['name'])[0]; ?>
                <li class="step-item <?=$index == $section_state ? 'active' : ''?>" id="step-<?=strtolower($id)?>" data-lesson-type="<?=strtolower($id)?>">
                    <div class="step-icon-wrapper"><i class="<?=$section['icon']?>"></i></div>
                    <div class="step-info">
                    <h5 class="step-title"><?=$section['name']?></h5>
                    <p class="step-meta"><?=$section['description']?></p>
                    </div>
                </li>
                <?php endforeach ?>
                </ul>
            </div>
        </div>

        <?php if(count($resultData) < 5): ?>

        <div class="identification-section card" id="identification-content">
            <div class="identification-header" style="text-align: center">
              <h1>Identification of verb</h1>
              <div class="identification-progress"><span id="identification-current-word">1</span> of <span id="identification-total-words">5</span></div>
            </div>
            <div class="identification-body">
              <div class="identification-illustration">
                <img src="/public/assets/kacap.jpg" alt="A person thinking and analyzing data on a computer screen." />
              </div>
              <div class="identification-content-wrapper">
                <p class="identification-instruction">Listen to the word carefully</p>
                <div class="identification-word-play">
                  <div class="word-box" id="play-identification-word-btn">
                    <h2 class="word-to-display" id="identification-word-to-display">Type</h2>
                  </div>
                  <div class="soundwave-visualizer">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <button class="play-pronunciation-btn" title="Listen to the word"></button>
                </div>
                <p class="identification-note">Push the button</p>
              </div>
            </div>
            <div class="identification-footer">
                <button class="btn btn-prev" id="identification-prev-btn" style="display: none">← Replay</button>
                <button class="btn btn-next" id="identification-next-btn">Next →</button>
                <button class="btn btn-complete" id="complete-identification-btn" style="display: none">
                Complete Stage <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </div>

        <div class="notification-section card" id="notification-content" style="display: none">
            <div class="notification-header" style="text-align: center">
              <h1>Notification of verb</h1>
              <div class="notification-progress"><span id="notification-current-word">1</span> of <span id="notification-total-words">5</span></div>
            </div>
            <div class="notification-body">
              <div class="notification-illustration">
                <img src="/public/assets/noti.jpg" alt="Person speaking into a microphone for analysis." />
              </div>
              <div class="notification-content-wrapper">
                <p class="notification-instruction"></p>
                <h2 class="word-to-display" id="notification-word-to-display">type</h2>
                <div class="soundwave-visualizer">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="speech-input-area">
                    <button class="mic-button" id="start-notification-recognition-btn">
                    <i class="fas fa-microphone"></i>
                    </button>
                    <p class="recording-status" id="notification-recording-status">Click the microphone to speak</p>
                </div>
                <div class="pronunciation-legend" style="display: none;">
                    <div class="legend-item legend-green">
                        <i class="fas fa-check"></i>
                        <span>Exactly</span>
                    </div>
                    <div class="legend-item legend-yellow">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Almost</span>
                    </div>
                    <div class="legend-item legend-red">
                        <i class="fas fa-times"></i>
                        <span>Need revision</span>
                    </div>
                </div>
                <p class="user-spoken-word" id="notification-user-spoken-word"></p>
                <p class="recognition-result" id="notification-recognition-result"></p>
              </div>
            </div>
            <div class="notification-footer">
              <button class="btn btn-prev" id="notification-prev-btn" style="display: none"><i class="fas fa-arrow-left"></i> Replay</button>
              <button class="btn btn-tertiary" id="notification-try-again-btn" style="display: none">Retry <i class="fas fa-redo"></i></button>
              <button class="btn btn-next" id="notification-next-btn">Next <i class="fas fa-arrow-right"></i></button>
              <button class="btn btn-complete" id="complete-notification-btn" style="display: none">Complete Stage <i class="fas fa-check-circle"></i></button>
            </div>
        </div>

        <div class="description-section card" id="description-content" style="display: none">
            <div class="description-header" style="text-align: center">
              <h1>Description of verb</h1>
              <div class="description-progress"><span id="description-current-index">1</span> of <span id="description-total-words">5</span></div>
            </div>
            <div class="description-body">
              <div class="description-illustration">
                <h1 style="text-align: center; font-size: 40px; margin-bottom: 3px">Pay Attention</h1>
                <img src="/public/assets/description.jpg" alt="Detailed explanation of a word." />
              </div>

              <div class="description-content-wrapper">
                <div style="text-align: center;">
                  <button class="btn btn-primary btn-circle" id="play-description-full-btn" title="Listen Full Explanation">
                    <i class="fas fa-play"></i>
                  </button>
                </div>
                <div class="word-header">
                  <h2 class="word-to-display" id="description-word-to-display">type</h2>
                </div>

                <hr class="dashed-separator" />

                <div id="word-details" class="word-details">
                  <!-- <p class="description-spelling" id="description-spelling"></p>
                  <p class="description-pronunciation" id="description-pronunciation"></p>
                  <p class="description-meaning-intro" id="description-meaning-intro"></p>
                  <ul class="description-meanings-list" id="description-meanings-list"></ul>
                  <p class="description-example-intro">Example Sentences:</p>
                  <ul class="description-examples-list" id="description-examples-list"></ul> -->
                </div>
              </div>
            </div>
            <div class="description-footer">
                <button class="btn btn-prev" id="description-prev-btn" style="display: none">
                <i class="fas fa-arrow-left"></i> Previous
                </button>
                <button class="btn btn-next" id="description-next-btn">
                    Next <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn btn-complete" id="complete-description-btn" style="display: none">
                    Complete Stage <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </div>

        <div class="application-section card" id="application-content" style="display: none">
            <div class="application-header" style="text-align: center">
              <h1>Application of verb</h1>
              <div class="application-progress"><span id="application-current-word">1</span> of <span id="application-total-words">5</span></div>
            </div>
            <div class="application-body">
              <div class="application-illustration">
                <img src="/public/assets/aplication.png" alt="Person practicing a task." />
              </div>
              <div class="application-content-wrapper">
                <p class="application-instruction"></p>
                <h2 class="word-to-display" id="application-word-to-display">talk</h2>
                <div class="speech-input-area">
                  <button class="mic-button" id="start-application-recognition-btn">
                    <i class="fas fa-microphone"></i>
                  </button>
                  <p class="recording-status" id="application-recording-status">Click the microphone to speak</p>
                </div>

                <div class="pronunciation-legend" style="display: none;">
                  <div class="legend-item legend-green">
                    <i class="fas fa-check"></i>
                    <span>Exactly</span>
                  </div>
                  <div class="legend-item legend-yellow">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Almost</span>
                  </div>
                  <div class="legend-item legend-red">
                    <i class="fas fa-times"></i>
                    <span>Need revision</span>
                  </div>
                </div>
                <p class="user-spoken-word" id="application-user-spoken-word"></p>
                <p class="recognition-result" id="application-recognition-result"></p>
              </div>
            </div>
            <div class="application-footer">
                <button class="btn btn-prev" id="application-prev-btn" style="display: none">
                <i class="fas fa-arrow-left"></i> Previous
                </button>
                <button class="btn btn-tertiary" id="application-try-again-btn" style="display: none">
                Retry <i class="fas fa-redo"></i>
                </button>
                <button class="btn btn-next" id="application-next-btn" style="display: none">
                Next <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn btn-complete" id="complete-application-btn" style="display: none">
                Complete Stage <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </div>

        <div class="harmonization-section card" id="harmonization-content" style="display: none">
            <div class="harmonization-header" style="text-align: center">
              <h1>Harmonization of verb</h1>
              <div class="harmonization-progress"><span id="harmonization-current-word">1</span> of <span id="harmonization-total-words">5</span></div>
            </div>
            <div class="harmonization-body">
              <div class="harmonization-illustration">
                <img src="/public/assets/harmonisasi.jpg" alt="Final practice stage." />
              </div>
              <div class="harmonization-content-wrapper">
                <p class="harmonization-instruction"></p>
                <h2 class="word-to-display" id="harmonization-word-to-display">guess</h2>
                <div class="speech-input-area">
                  <button class="mic-button" id="start-harmonization-recognition-btn">
                    <i class="fas fa-microphone"></i>
                  </button>
                  <p class="recording-status" id="harmonization-recording-status">Click the microphone to speak</p>
                </div>

                <p class="user-spoken-word" id="harmonization-user-spoken-word"></p>
                <p class="recognition-result" id="harmonization-recognition-result"></p>
              </div>
            </div>
            <div class="harmonization-footer">
                <button class="btn btn-prev" id="harmonization-prev-btn" style="display: none">
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <button class="btn btn-tertiary" id="harmonization-try-again-btn" style="display: none">
                Retry <i class="fas fa-redo"></i>
                </button>
                <button class="btn btn-next" id="harmonization-next-btn" style="display: none">
                Next <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn btn-complete" id="complete-harmonization-btn" style="display: none">
                Complete Stage <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </div>

        <?php else: ?>

        <div class="container py-4">
          <!-- Card Ring Summary -->
          <div class="card mb-4 shadow-sm">
            <div class="card-body align-items-center justify-content-around">
            <h1 class="text-center mb-4 fw-bold">
              Laporan Akhir / Hasil Keseluruhan 🎉
            </h1>

            <div class="d-flex align-items-center justify-content-center" style="gap:10px;">
              <div class="position-relative" style="width: 120px; height: 120px;">
                <svg class="progress-circle" viewBox="0 0 36 36">
                  <path class="bg" stroke="#eee" stroke-width="3.8" fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="progress" stroke="#28c76f" stroke-width="3.8" stroke-dasharray="<?=$summary['percent']?>, 100"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <text x="18" y="20.35" class="percentage" text-anchor="middle" font-size="7" fill="#111"><?=$summary['percent']?>%</text>
                </svg>
              </div>
              <div>
                <p>✅ Total Benar: <strong><?=$summary['benar']?></strong></p>
                <p>❌ Total Salah: <strong><?=$summary['salah']?></strong></p>
                <p>📘 Total Soal: <strong><?=$summary['total']?></strong></p>
              </div>
            </div>
            <!-- Info -->

            <h3 class="fw-bold mb-3 text-center mt-3">Rincian Per Sesi</h3>

            <!-- Progress bar list -->
             <div style="max-width: 500px;margin:auto;">
               <?php $no=1; foreach($resultData as $index => $result): ?>
               <div class="mb-3">
                 <div class="d-flex justify-content-between small mb-1">
                   <span>Sesi <?=$no++?></span><span><?=(int)$result['total_value']?>/100</span>
                 </div>
                 <div class="progress-bar-wrapper">
                     <div class="progress-bar-fill" style="width: <?=(int)$result['total_value']?>%" id="lesson-progress-fill"></div>
                 </div>
               </div>
               <?php endforeach ?>
             </div>
        </div>
</div>

<style>
.progress-circle {
  width: 100%;
  height: 100%;
}
.progress-circle .bg {
  stroke-linecap: round;
}
.progress-circle .progress {
  stroke-linecap: round;
}
</style>


        <?php endif ?>
    </div>
</main>

<?php loadFile('src/Views/layout/footer', [
    '<script src="https://code.responsivevoice.org/responsivevoice.js?key=R2qA371F"></script>',
    '<script src="/public/assets_two/mahasiswa/media.js?v='.strtotime('now').'"></script>'
]); ?>