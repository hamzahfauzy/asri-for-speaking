<?php 
\Libs\Web\Page::setTitle("ASRI for Speaking | Daftar Mahasiswa");
loadFile('../src/Views/layout/header'); 
$users = \Libs\Database\DB::table('users')->where('level','student')->get();
?>
<div class="card">
    <div class="card-header">
        <!-- Heading -->
        <h3 class="section-title">
          Daftar Mahasiswa
        </h3>
        <?php if (auth()['level'] == 'admin') : ?>
            <a href="/students/create" class="btn btn-primary"><i class="fas fa-plus-circle mr-2"></i> Tambah Baru</a>
        <?php endif ?>
    </div>
    <div class="card-body">
        <div class="table-container">
            <table id="mytabel" style="width: 100%;">
                <thead>
                    <tr>
                        <th style="text-align: center;" width="30">NO</th>
                        <th style="text-align: center;">Nama</th>
                        <th style="text-align: center;">Alamat</th>
                        <th style="text-align: center;">Gender</th>
                        <th style="text-align: center;">No. WA</th>
                        <th style="text-align: center;">Username</th>
                        <?php if (auth()['level'] == 'admin') { ?>
                            <th style="text-align: center;">Aksi</th>
                        <?php } ?>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                    $no = 1;
                    foreach ($users as $user) { 
                        $id = $user['id'];
                        ?>
                        <tr>
                            <td style="text-align: center;"><?= $no; ?></td>
                            <td><?= htmlspecialchars($user['name']); ?></td>
                            <td><?= htmlspecialchars($user['address']); ?></td>
                            <td style="text-align: center;"><?= htmlspecialchars($user['gender'] == 'male' ? 'Laki-laki' : 'Perempuan'); ?></td>
                            <td><?= htmlspecialchars($user['phone']); ?></td>
                            <td><?= htmlspecialchars($user['username']); ?></td>

                            <?php if (auth()['level'] == 'admin') { ?>
                            <td class="text-center">
                                <!-- DETAIL -->
                                 <?php /*
                                <a href="/students/detail?id=<?=$id?>" class="btn btn-info" title="Detail">
                                    <i class="fas fa-eye"></i>
                                </a>
                                */ ?>
                                
                                <a href="/students/edit?id=<?=$id?>" class="btn btn-success" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <!-- HAPUS -->
                                <form action="/students?id=<?=$id?>" method="post" style="display:inline;">
                                    <input type="hidden" name="_method" value="DELETE">
                                    <input type="hidden" name="redirect" value="/students">
                                    <button type="submit" class="btn btn-danger" 
                                        onclick="return confirm('Yakin ingin menghapus data ini <?= htmlspecialchars($user['name']); ?>?');"
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