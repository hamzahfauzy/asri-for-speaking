<?php 
\Libs\Web\Page::setTitle("ASRI for Speaking | Data Media");
loadFile('../src/Views/layout/header'); 
$lessons = \Libs\Database\DB::table('lessons')->get();
?>
<div class="card">
    <div class="card-header">
        <!-- Heading -->
        <h3 class="section-title">
          Data Media
        </h3>
    </div>
    <div class="card-body">
        <div class="table-container">
            <table id="mytabel" style="width: 100%;">
                <thead>
                    <tr>
                        <th style="text-align: center;" width="30">NO</th>
                        <th style="text-align: center;">Lesson</th>
                        <th style="text-align: center;">Ket</th>
                        <?php if (auth()['level'] == 'admin') { ?>
                            <th style="text-align: center;">Aksi</th>
                        <?php } ?>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                    $no = 1;
                    foreach ($lessons as $lesson) { 
                        $id = $lesson['id'];
                        ?>
                        <tr>
                            <td style="text-align: center;"><?= $no; ?></td>
                            <td><?= htmlspecialchars($lesson['name']); ?></td>
                            <td><?= htmlspecialchars($lesson['description']); ?></td>

                            <?php if (auth()['level'] == 'admin') { ?>
                            <td class="text-center">
                                <!-- DETAIL -->
                                
                                <a href="/lesson-items/create?lesson_id=<?=$id?>" class="btn btn-sm btn-primary">
                                    Add Media
                                </a>
                                
                                <a href="/lesson-items?lesson_id=<?=$id?>" class="btn btn-sm btn-success">
                                    List
                                </a>
                            </td>
                        <?php } ?>
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

<?php loadFile('../src/Views/layout/footer'); ?>