<?php

use Libs\Database\DB;

\Libs\Web\Page::setTitle("ASRI for Speaking | Data Lesson");
loadFile('src/Views/layout/header'); 
$lesson_id = $_GET['lesson_id'];
$query = "SELECT 
            users.id user_id,
            users.name user_name,
            SUM(results.total_value) total_skor
          FROM users 
          JOIN results ON results.user_id = users.id
          WHERE results.lesson_id = $lesson_id
          GROUP BY users.id, users.name";

$results = DB::exec($query);
?>
<div class="card">
    <div class="card-header">
        <!-- Heading -->
        <h3 class="section-title">
          Data Lesson
        </h3>
    </div>
    <div class="card-body">
        <div class="table-container">
            <table id="mytabel" style="width: 100%;">
                <thead>
                    <tr>
                        <th style="text-align: center;" width="30">NO</th>
                        <th style="text-align: center;">Mahasiswa</th>
                        <th style="text-align: center;">Total Skor</th>
                        <th style="text-align: center;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                    $no = 1;
                    foreach ($results as $result) { 
                        ?>
                        <tr>
                            <td style="text-align: center;"><?= $no; ?></td>
                            <td><?= htmlspecialchars($result['user_name']); ?></td>
                            <td><?= htmlspecialchars($result['total_skor']); ?></td>
                            <td class="text-center">
                                <!-- DETAIL -->
                                <a href="/results/detail?lesson_id=<?=$lesson_id?>&user_id=<?=$result['user_id']?>" class="btn btn-sm btn-success">
                                    Detail
                                </a>
                            </td>
                    </tr>
                    <?php 
                    $no++;
                } 
                ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php loadFile('src/Views/layout/footer'); ?>