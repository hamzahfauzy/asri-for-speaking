<?php 
\Libs\Web\Page::setTitle("ASRI for Speaking | List Media");
loadFile('../src/Views/layout/header'); 
$lesson_id = $_GET['lesson_id'];
$query = "SELECT lesson_items.*, lessons.name lesson_name, sections.name section_name FROM lesson_items 
            LEFT JOIN lessons ON lessons.id = lesson_items.lesson_id
            LEFT JOIN sections ON sections.id = lesson_items.section_id";
$items = \Libs\Database\DB::exec($query);
?>
<div class="card">
    <div class="card-header">
        <!-- Heading -->
        <h3 class="section-title">
          List Media
        </h3>
        <?php if (auth()['level'] == 'admin') : ?>
            <a href="/lesson-items/create?lesson_id=<?=$lesson_id?>" class="btn btn-primary"><i class="fas fa-plus-circle mr-2"></i> Tambah Baru</a>
        <?php endif ?>
    </div>
    <div class="card-body">
        <div class="table-container">
            <table id="mytabel" style="width: 100%;">
                <thead>
                    <tr>
                        <th style="text-align: center;" width="30">NO</th>
                        <th style="text-align: center;">Judul</th>
                        <th style="text-align: center;">Deskripsi</th>
                        <th style="text-align: center;">Pertanyaan</th>
                        <?php if (auth()['level'] == 'admin') { ?>
                            <th style="text-align: center;">Aksi</th>
                        <?php } ?>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                    $no = 1;
                    foreach ($items as $item) { 
                        $id = $item['id'];
                        ?>
                        <tr>
                            <td style="text-align: center;"><?= $no; ?></td>
                            <td><?= $item['lesson_name'] .' - '.$item['section_name']; ?></td>
                            <td><?= htmlspecialchars($item['description']); ?></td>
                            <td><?= htmlspecialchars($item['question']); ?></td>

                            <?php if (auth()['level'] == 'admin') { ?>
                            <td class="text-center">
                                <!-- DETAIL -->
                                
                                <a href="/lesson-items/edit?id=<?=$id?>&lesson_id=<?=$item['lesson_id']?>" class="btn btn-success" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <!-- HAPUS -->
                                <form action="/lesson-items?id=<?=$id?>" method="post" style="display:inline;">
                                    <input type="hidden" name="_method" value="DELETE">
                                    <button type="submit" class="btn btn-danger" 
                                        onclick="return confirm('Yakin ingin menghapus data ini <?= htmlspecialchars($item['lesson_name'] .' - '. $item['section_name']); ?>?');"
                                        title="Hapus">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </form>
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