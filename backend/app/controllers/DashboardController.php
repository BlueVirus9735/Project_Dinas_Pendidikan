<?php
require_once __DIR__ . "/../models/IjazahModel.php";


class DashboardController {
    
    public function getStats() {
        $ijazahModel = new IjazahModel();

        try {
            $totalIjazah = $ijazahModel->countAll();
            $recentIjazah = $ijazahModel->getRecent(5);
            $yearDistribution = $ijazahModel->getYearDistribution();

            $chartData = [];
            foreach ($yearDistribution as $item) {
                $chartData[] = [
                    'name' => (string)$item['tahun'],
                    'value' => (int)$item['count']
                ];
            }

            echo json_encode([
                "status" => "success",
                "data" => [
                    "counts" => [
                        "total_ijazah" => $totalIjazah,
                    ],
                    "charts" => [
                        "ijazah_per_year" => $chartData,
                    ],
                    "recent_docs" => $recentIjazah
                ]
            ]);

        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    }
}
?>
