<?php
require_once __DIR__ . '/../models/IjazahModel.php';
require_once __DIR__ . '/../helpers/SecureToken.php';

class SkpiController {
    public function request() {

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
             http_response_code(405); 
             echo json_encode(['status' => false, 'message' => 'Method Not Allowed']);
             exit;
        }
        
        $id = $_POST['id'] ?? null;
        if (!$id) { 
            http_response_code(400); 
            echo json_encode(['status' => false, 'message' => 'ID Required']);
            exit;
        }

        if (!isset($_FILES['file_polisi']) || $_FILES['file_polisi']['error'] !== UPLOAD_ERR_OK) {
             http_response_code(400); 
             echo json_encode(['status' => false, 'message' => 'File Surat Kehilangan Kepolisian Wajib Diupload']);
             exit;
        }

        $uploadDir = __DIR__ . '/../../../frontend/public/uploads/skpi/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

        $ext = pathinfo($_FILES['file_polisi']['name'], PATHINFO_EXTENSION);
        $filename = 'SKPI_' . $id . '_' . time() . '.' . $ext;
        if (move_uploaded_file($_FILES['file_polisi']['tmp_name'], $uploadDir . $filename)) {
            $model = new IjazahModel();
            $model->updateSkpiStatus($id, 'pending', 'uploads/skpi/' . $filename);
            echo json_encode(['status' => true, 'message' => 'Pengajuan Berhasil']);
        } else {
             http_response_code(500); 
             echo json_encode(['status' => false, 'message' => 'Gagal Upload File']);
             exit;
        }
    }

    public function approve() {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;
        
        if ($id) {
             $model = new IjazahModel();
             $model->updateSkpiStatus($id, 'approved');
             echo json_encode(['status' => true, 'message' => 'Permohonan Disetujui']);
        }
    }

    public function reject() {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;
         if ($id) {
             $model = new IjazahModel();
             $model->updateSkpiStatus($id, 'rejected');
             echo json_encode(['status' => true, 'message' => 'Permohonan Ditolak']);
        }
    }

    public function print() {
        if (!isset($_GET['token'])) {
            http_response_code(400);
            die("Error: Token not provided.");
        }

        $token = $_GET['token'];
        $id = SecureToken::decode($token);

        if (!$id) {
            http_response_code(403);
            die("Error 403: Security Token Invalid or Tampered.");
        }

        $model = new IjazahModel();
        $data = $model->findById($id);

        if (!$data) {
            http_response_code(404);
            die("Error 404: Data Siswa Not Found.");
        }
        
        if (!isset($data['skpi_status']) || $data['skpi_status'] !== 'approved') {
             echo "<div style='font-family:sans-serif; text-align:center; padding:50px;'>
                <h1 style='color:red;'>AKSES DITOLAK 🚫</h1>
                <p>Dokumen SKPI ini <b>BELUM DISETUJUI</b> oleh Dinas Pendidikan.</p>
                <p>Silakan selesaikan proses verifikasi terlebih dahulu.</p>
             </div>";
             exit;
        }
        $this->renderView($data);
    }

    private function renderView($data) {
        $imagePath = __DIR__ . '/../../../frontend/public/logo_dinas.png';
        
        $logoSrc = '';
        if (file_exists($imagePath)) {
            $imageData = base64_encode(file_get_contents($imagePath));
            $logoSrc = 'data:image/png;base64,' . $imageData; 
        } else {
            $logoSrc = 'http://localhost:5173/logo_dinas.png';
        }
        
        ?>
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <title>SKPI - <?= htmlspecialchars($data['nama'] ?? 'Siswa') ?></title>
            <style>
                body { font-family: 'Times New Roman', serif; margin: 40px; color: #000; }
                .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 20px; position: relative; }
                .header img { width: 80px; position: absolute; left: 10px; top: 0; }
                .header h2 { margin: 0; font-size: 18pt; text-transform: uppercase; }
                .header h3 { margin: 5px 0; font-size: 14pt; font-weight: normal; }
                .header p { margin: 0; font-size: 10pt; font-style: italic; }
                
                .content { padding: 0 40px; line-height: 1.6; }
                .title { text-align: center; margin: 30px 0; }
                .title h4 { text-decoration: underline; margin: 0; font-size: 16pt; }
                .title p { margin: 5px 0; font-size: 12pt; }

                table { width: 100%; margin: 20px 0; font-size: 12pt; }
                td { vertical-align: top; padding: 5px 0; }
                .label { width: 200px; font-weight: bold; }
                .separator { width: 20px; }

                .footer { margin-top: 50px; text-align: right; padding-right: 40px; }
                .ttd-box { display: inline-block; text-align: center; width: 250px; }
                .ttd-box p { margin: 5px 0; }
                .jabatan { font-weight: bold; }
                .nama { font-weight: bold; text-decoration: underline; margin-top: 60px !important; }
                
                .validasi-box {
                    position: fixed;
                    bottom: 40px;
                    left: 40px;
                    border: 1px solid #000;
                    padding: 10px;
                    font-size: 9pt;
                    width: 300px;
                    font-family: sans-serif;
                }

                @media print {
                    @page { size: A4; margin: 2cm; }
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body onload="window.print()">
            
            <div class="header">
                <img src="<?= $logoSrc ?>" alt="Logo">
                <h2>PEMERINTAH KABUPATEN CIREBON</h2>
                <h3>DINAS PENDIDIKAN</h3>
                <p>Jl. Sunan Drajat No. 10 Telp. (0231) 321266, Sumber - Kabupaten Cirebon - Jawa Barat.</p>
            </div>

            <div class="content">
                <div class="title">
                    <h4>SURAT KETERANGAN PENGGANTI IJAZAH</h4>
                    <p>Nomor: 421 / SKPI / <?= date('Y') ?> / <?= str_pad($data['id'], 4, '0', STR_PAD_LEFT) ?></p>
                </div>

                <p>Yang bertanda tangan di bawah ini Kepala Dinas Pendidikan Kabupaten, menerangkan dengan sesungguhnya bahwa:</p>

                <table>
                    <tr>
                        <td class="label">Nama Lengkap</td>
                        <td class="separator">:</td>
                        <td><?= htmlspecialchars($data['nama'] ?? '-') ?></td>
                    </tr>
                    <tr>
                        <td class="label">NISN</td>
                        <td class="separator">:</td>
                        <td><?= htmlspecialchars($data['nisn'] ?? '-') ?></td>
                    </tr>
                    <tr>
                        <td class="label">Tempat, Tgl Lahir</td>
                        <td class="separator">:</td>
                        <td><?= "Cirebon" ?>, <?= date('d F Y', strtotime($data['tanggal_lahir'] ?? 'now')) ?></td>
                    </tr>
                    <tr>
                        <td class="label">Sekolah Asal</td>
                        <td class="separator">:</td>
                        <td><?= htmlspecialchars($data['sekolah'] ?? '-') ?></td>
                    </tr>
                    <tr>
                        <td class="label">Nomor Ijazah</td>
                        <td class="separator">:</td>
                        <td><?= htmlspecialchars($data['nomor_ijazah'] ?? '-') ?></td>
                    </tr>
                     <tr>
                        <td class="label">Tahun Lulus</td>
                        <td class="separator">:</td>
                        <td><?= htmlspecialchars($data['tahun'] ?? '-') ?></td>
                    </tr>
                </table>

                <p>Adalah benar pemilik Ijazah tersebut di atas yang dilaporkan <strong>HILANG / RUSAK</strong>. Surat keterangan ini dipergunakan sebagai pengganti Ijazah asli.</p>
                
                <p>Demikian surat keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
            </div>

            <div class="footer">
                <div class="ttd-box">
                    <p>Ditetapkan di: Kabupaten Cirebon</p>
                    <p>Pada Tanggal: <?= date('d F Y') ?></p>
                    <p class="jabatan">Kepala Dinas Pendidikan Kabupaten Cirebon</p>
                    <p class="nama">H. Ronianto, S.Pd., M.M</p>
                    <p>NIP. 19800101 200001 1 001</p>
                </div>
            </div>

            <div class="validasi-box">
                <b>VALIDASI DOKUMEN (SECURE)</b><br>
                Dokumen ini sah dan digenerate secara elektronik.<br>
                ID Dokumen: <?= strtoupper(md5($data['id'] . 'SALT')) ?><br>
                Verifikasi: dinas-pendidikan.go.id/verify
            </div>
        </body>
        </html>
        <?php
    }
}
?>
