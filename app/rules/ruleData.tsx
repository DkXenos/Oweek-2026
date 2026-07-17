import { ReactNode } from "react";

export interface Rule {
    title: string;
    content: ReactNode;
}

export const rules: Rule[] = [
    {
        title: "Pasal I (Ruang Lingkup)",
        content: (
            <>
                <ol className="list1">
                    <li>
                        <b>Yang termasuk area O-Week dalam Universitas Ciputra meliputi:</b>
                        <ol className="list2">
                            <li>UC Main Building</li>
                            <li>UC Tower (lantai 1 - 21)</li>
                            <li>UC Plaza</li>
                            <li>Corepreneur</li>
                        </ol>
                    </li>
                    <li>
                        <b>Yang termasuk area cakupan Universitas Ciputra:</b>
                        <ol>
                            <li>UC Main Building</li>
                            <li>UC Tower</li>
                            <li>UC Plaza</li>
                            <li>Corepreneur</li>
                            <li>UC Venture</li>
                            <li>UC Walk (Berkeley & Cornell)</li>
                            <li>UC Loop</li>
                            <li>Bukit UC</li>
                            <li>Parkiran UC, meliputi parkiran gedung dan parkiran lapangan</li>
                            <li>Lapangan Olahraga UC</li>
                        </ol>
                    </li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal II (Kewajiban Umum)",
        content: (
            <>
                <ol className="list1">
                    <li>Diwajibkan untuk datang tepat waktu selama kegiatan O-WEEK sesuai dengan Waktu Indonesia Bagian Barat.</li>
                    <li>Diwajibkan menyapa, bersikap sopan, dan menghormati sesama trainee, panitia, dosen, dan staff, baik dikenal maupun tidak, selama pelaksanaan kegiatan O-WEEK.</li>
                    <li>Diwajibkan bekerja sama dengan baik dan bersikap kooperatif kepada sesama trainee, panitia, dosen, dan staff.</li>
                    <li>Diwajibkan menjaga ketenangan dan ketertiban pada setiap agenda kegiatan O-WEEK demi kelancaran acara.</li>
                    <li>Diwajibkan mengikuti seluruh kegiatan O-WEEK dengan sadar dan penuh perhatian, seperti tidak tidur, tidak menggunakan gadget, serta menghargai setiap narasumber yang sedang berbicara dengan menjaga ketenangan bersama.</li>
                    <li>Diwajibkan berkontribusi aktif dalam masing masing kelompok serta mendengarkan pendapat sesama trainee ketika berbicara saat kegiatan O-WEEK berlangsung.</li>
                    <li>Diwajibkan menjaga kebersihan dan kerapian lingkungan Universitas Ciputra selama pelaksanaan kegiatan O-WEEK serta menjaga segala bentuk properti milik Universitas Ciputra. Kerusakan yang disebabkan oleh trainee, baik disengaja maupun tidak disengaja, wajib diganti sesuai ketentuan dari Property Management.</li>
                    <li>Diwajibkan memilah sampah sesuai ketentuan yang berlaku.</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal III (Larangan Umum)",
        content: (
            <>
                <ol className="list1">
                    <li>Dilarang mengeluarkan kata kata kotor dan atau bersikap tidak sopan kepada sesama trainee, staff, dosen, dan panitia.</li>
                    <li>Dilarang membiarkan pihak selain panitia, staff, atau mahasiswa Universitas Ciputra yang berkepentingan atau memiliki bukti janji temu dengan civitas akademika, yaitu dosen dan staff, memasuki area kegiatan O-WEEK.</li>
                    <li>Dilarang meninggalkan acara dan area O-WEEK selama agenda pelaksanaan kegiatan O-WEEK berlangsung, kecuali mendapat izin dari pihak AMD masing masing dan HOD, dengan sepengetahuan panitia divisi SID.</li>
                    <li>Dilarang mengajak atau memaksa sesama trainee maupun panitia dalam kerja sama organisasi pribadi, seperti bisnis, rumah ibadah, dan sebagainya, selama kegiatan O-WEEK.</li>
                    <li>Dilarang menyebarkan informasi apa pun mengenai O-WEEK kepada pihak yang tidak berkepentingan.</li>
                    <li>Dilarang memiliki kuku yang panjang selama kegiatan O-WEEK berlangsung.</li>
                    <li>Dilarang menggunakan dan mengoperasikan gadget selama kegiatan O-WEEK berlangsung tanpa izin panitia.</li>
                    <li>Dilarang menginjak rumput yang berada di area Universitas Ciputra, kecuali mendapatkan izin dan arahan dari panitia.</li>
                    <li>Dilarang berkelahi dan atau menjadi provokator selama kegiatan O-WEEK berlangsung.</li>
                    <li>Dilarang melakukan tindakan penipuan, pencurian, perampokan, penyiksaan, pembunuhan, serta tindak kriminal lainnya.</li>
                    <li>Dilarang melakukan tindakan diskriminasi terhadap orang lain atas dasar gender, suku, agama, ras, antar golongan, nilai nilai, keterbatasan fisik atau mental, orientasi seksual, maupun orientasi politik.</li>
                    <li>Dilarang melakukan kecurangan dalam bentuk apa pun serta tindakan academic misconduct, seperti menandatangani presensi trainee, menggantikan trainee lain selama kegiatan O-WEEK, maupun bentuk academic misconduct lainnya.</li>
                    <li>Dilarang melakukan tindakan pemaksaan, menakut nakuti, mengancam, maupun mengintimidasi panitia, sesama trainee, dosen, staff, dan atau orang lain.</li>
                    <li>Dilarang melakukan segala bentuk tindakan asusila, seperti KNPI (Kissing, Necking, Petting, Intercourse).</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal IV (Larangan Pemalsuan & Plagiarisme)",
        content: (
            <>
                <ol className="list1">
                    <li>Dilarang melakukan pemalsuan dan plagiarisme dalam bentuk apapun, termasuk pemalsuan dokumen dan surat-surat yang berkaitan dengan kegiatan O-WEEK untuk kepentingan pribadi atau kelompok seperti tindak pemalsuan identitas dan meminta bantuan pihak ketiga (3) untuk menggantikan keikutsertaannya dalam O-WEEK.</li>
                    <li>Dilarang menyediakan dan menggunakan jasa untuk membuat dan/atau mengerjakan tugas.</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal V (Larangan Merokok)",
        content: (
            <>
                <ol className="list1">
                    <li>Rokok yang dimaksud adalah segala jenis bentuk rokok, baik rokok konvensional, rokok elektrik, maupun pemanas tembakau.</li>
                    <li>Trainee dilarang merokok selama kegiatan O-WEEK berlangsung, selama masih berada di lingkungan Universitas Ciputra, atau selama masih menggunakan atribut O-WEEK.</li>
                    <li>Trainee dilarang mempromosikan iklan rokok di lingkungan Universitas Ciputra maupun pada kegiatan yang mengatasnamakan Universitas Ciputra.</li>
                    <li>Trainee dilarang memproduksi atau membuat rokok di lingkungan kampus.</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal VI (Larangan Minuman Beralkohol)",
        content: (
            <>
                <ol className="list1">
                    <li>Trainee dilarang membawa dan mengonsumsi minuman beralkohol di dalam lingkungan Universitas Ciputra atau selama menggunakan atribut dan identitas yang memiliki asosiasi dengan Universitas Ciputra dan O-WEEK.</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal VII (Larangan Penyalahgunaan Narkotika, Psikotropika, dan Obat-Obatan Terlarang)",
        content: (
            <>
                <ol className="list1">
                    <li>Trainee dilarang membawa dan mengonsumsi minuman beralkohol di dalam lingkungan Universitas Ciputra atau selama menggunakan atribut dan identitas yang memiliki asosiasi dengan Universitas Ciputra dan O-WEEK.</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal VIII (Larangan Perjudian)",
        content: (
            <>
                <ol className="list1">
                    <li>Trainee dilarang melakukan segala bentuk perjudian saat berada di dalam lingkungan Universitas Ciputra, atau saat masih menggunakan atribut Universitas Ciputra dan O-WEEK.</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal X (Larangan Kekerasan Seksual)",
        content: (
            <>
                <ol className="list1">
                    <li><b>
                        Trainee dilarang melakukan segala bentuk kekerasan seksual baik di dalam maupun di luar Universitas Ciputra. Kekerasan seksual yang dimaksud mencakup tindakan yang dilakukan secara verbal, non fisik, fisik, dan/atau melalui teknologi informasi dan komunikasi.
                    </b></li>

                    <li>
                        <b>Trainee dilarang:</b>
                        <ol className="list2">
                            <li>Menyampaikan ujaran yang mendiskriminasi atau melecehkan tampilan fisik, kondisi tubuh, dan/atau identitas gender Korban.</li>
                            <li>Memperlihatkan alat kelaminnya dengan sengaja.</li>
                            <li>Menyampaikan ucapan yang memuat rayuan, lelucon, dan/atau siulan yang bernuansa seksual pada Korban.</li>
                            <li>Memperagakan gesture yang bernuansa seksual.</li>
                            <li>Menatap Korban dengan nuansa seksual dan/atau tidak nyaman.</li>
                            <li>Mengirimkan pesan, lelucon, gambar, foto, audio, dan/atau video bernuansa seksual kepada Korban meskipun sudah dilarang Korban.</li>
                            <li>Mengambil, merekam, dan/atau mengedarkan foto dan/atau rekaman audio dan/atau visual Korban yang bernuansa seksual.</li>
                            <li>Mengunggah foto tubuh dan/atau informasi pribadi Korban yang bernuansa seksual.</li>
                            <li>Menyebarkan informasi terkait tubuh dan/atau pribadi Korban yang bernuansa seksual.</li>
                            <li>Mengintip atau dengan sengaja melihat Korban yang sedang melakukan kegiatan secara pribadi dan/atau pada ruang yang bersifat pribadi.</li>
                            <li>Membujuk, memaksa, menjanjikan, menawarkan sesuatu, atau mengancam Korban untuk melakukan transaksi atau kegiatan seksual yang tidak disetujui oleh Korban.</li>
                            <li>Memberi hukuman atau sanksi yang bernuansa seksual.</li>
                            <li>Memaksa menyentuh, mengusap, meraba, memegang, memeluk, mencium dan/atau menggosokkan bagian tubuhnya pada tubuh Korban.</li>
                            <li>Membuka pakaian Korban.</li>
                            <li>Mempraktikkan budaya komunitas yang bernuansa kekerasan seksual.</li>
                            <li>Melakukan percobaan perkosaan, namun penetrasi tidak terjadi.</li>
                            <li>Melakukan perkosaan termasuk penetrasi dengan benda atau bagian tubuh.</li>
                            <li>Memaksa atau memperdayai Korban untuk melakukan aborsi.</li>
                            <li>Memaksa atau memperdayai Korban untuk hamil atau menghamili.</li>
                            <li>Menggunakan AI secara tidak bertanggung jawab.</li>
                            <li>Membiarkan terjadinya kekerasan seksual dengan sengaja.</li>
                            <li>Melakukan perbuatan kekerasan seksual lainnya.</li>
                        </ol>
                    </li>

                    <li>
                        <b>Apabila dalam kasus kekerasan seksual yang terjadi terdapat Persetujuan Korban, maka persetujuan Korban dianggap tidak sah dalam hal Korban:</b>
                        <ol className="list2">
                            <li>Memiliki usia belum dewasa sesuai dengan ketentuan peraturan perundang-undangan.</li>
                            <li>Mengalami situasi dimana pelaku mengancam, memaksa, dan/atau menyalahgunakan kedudukannya.</li>
                            <li>Mengalami kondisi di bawah pengaruh obat-obatan, alkohol, dan/atau narkoba.</li>
                            <li>Mengalami sakit, tidak sadar, atau tertidur.</li>
                            <li>Memiliki kondisi fisik dan/atau psikologis yang rentan.</li>
                            <li>Mengalami kelumpuhan sementara (tonic immobility).</li>
                        </ol>
                    </li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal XI (Larangan Perundungan)",
        content: (
            <>
                <ol className="list1">
                    <li>Trainee dilarang melakukan perundungan/bullying baik di dalam maupun di luar Universitas Ciputra. Setiap trainee harus memperlakukan orang lain dengan martabat dan rasa hormat, tanpa membeda-bedakan gender, suku, agama, ras dan antar golongan, nilai-nilai, keterbatasan fisik/mental, orientasi seksual, dan orientasi politik.</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal XII (Larangan Melanggar Etika Berlalu lintas/Berkendara secara Tidak Aman)",
        content: (
            <>
                <ol className="list1">
                    <li>
                        <b>
                            Trainee dilarang melanggar etika berkendara baik di dalam area cakupan Universitas Ciputra (Pasal I) dan menggunakan atribut Universitas Ciputra. Etika berlalu lintas dapat dimaknai sebagai menghormati, menghargai, dan menjaga keselamatan diri sendiri dan orang lain pada saat di jalanan. Etika berlalu lintas juga wajib diikuti oleh para pengguna kendaraan bermotor, para pejalan kaki, dan kendaraan yang tidak bermotor seperti pesepeda dan lainnya mengacu kepada ketentuan peraturan yang berlaku.
                        </b>
                    </li>

                    <li>
                        <b>Trainee dilarang:</b>
                        <ol className="list2">
                            <li>Mengemudikan kendaraan bermotor tanpa Surat Izin Mengemudi (SIM).</li>
                            <li>Mengemudikan kendaraan bermotor tanpa Surat Tanda Nomor Kendaraan (STNK).</li>
                            <li>Membunyikan klakson dan menyalakan lampu sorot secara tidak sopan dan tidak pada tempatnya.</li>
                            <li>Berkendara dalam pengaruh alkohol dan/atau di bawah pengaruh obat.</li>
                            <li>Mengemudikan kendaraan bermotor tanpa sabuk pengaman (untuk pengemudi atau penumpang kendaraan roda 4) dan helm (untuk pengemudi atau penumpang kendaraan roda 2).</li>
                            <li>Melakukan pelanggaran rambu-rambu lalu lintas.</li>
                            <li>Berkendara secara tidak bertanggung jawab dan membahayakan orang lain.</li>
                            <li>Menggunakan HP saat berkendara.</li>
                            <li>Berkendara yang membahayakan keselamatan diri sendiri dan/atau orang lain.</li>
                            <li>Berkendara dengan melewati batas kecepatan yang ditentukan.</li>
                            <li>Berkendara dengan saling berlomba atau melakukan balapan liar di jalan.</li>
                            <li>Berkendara tidak sesuai jalur yang ditentukan.</li>
                            <li>Berkendara secara tidak aman lainnya.</li>
                            <li>Parkir tidak pada tempatnya.</li>
                            <li>Meninggalkan kendaraan di kampus melebihi jam operasional yang ditentukan, kecuali dengan persetujuan pejabat yang berwenang.</li>
                        </ol>
                    </li>

                    <li>
                        <b>Untuk menjaga kenyamanan bersama dalam pelaksanaan kegiatan O-WEEK, maka trainee wajib menaati aturan kendaraan berikut:</b>
                        <ol className="list2">
                            <li>Pada tanggal 25 sampai 30 Agustus 2025 trainee diperbolehkan membawa kendaraan bermotor, akan tetapi dihimbau berisikan minimal 4 orang per mobil dan 2 orang per motor.</li>
                            <li>Dihimbau bagi trainee yang membawa kendaraan bermotor agar menyiapkan Surat Izin Mengemudi (SIM) sebelum memasuki area.</li>
                        </ol>
                    </li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal XIII (Larangan Intoleransi & Tindakan Radikalisme)",
        content: (
            <>
                <ol className="list1">
                    <li>Trainee dilarang melakukan tindakan intoleransi, dan tindakan radikalisme selama kegiatan O-WEEK berlangsung melalui perkataan dan tindakan apapun (Contoh: mengejek, menghina, doktrin yang sesat dan aktivitas radikalisme lainnya).</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal XIV (Penggunaan Media Sosial & Transaksi Elektronik)",
        content: (
            <>
                <ol className="list1">
                    <li>
                        <b>
                            Trainee dilarang dengan sengaja dan tanpa hak mendistribusikan, mentransmisikan, dan membuat dapat diaksesnya informasi elektronik dan/atau dokumen elektronik yang:
                        </b>
                        <ol className="list2">
                            <li>Memiliki muatan yang melanggar kesusilaan, perjudian, penghinaan dan/atau pencemaran nama baik, pemerasan dan/atau pengancaman;</li>
                            <li>Menyebarkan berita bohong dan menyesatkan yang mengakibatkan kerugian pihak lain dalam transaksi elektronik;</li>
                            <li>Ditujukan untuk menimbulkan rasa kebencian atau permusuhan individu dan/atau kelompok masyarakat tertentu berdasarkan atas suku, agama, ras, dan antargolongan (SARA);</li>
                            <li>Berisi ancaman kekerasan atau menakut-nakuti yang ditujukan secara pribadi;</li>
                        </ol>
                    </li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal XV (Aturan Berbusana)",
        content: (
            <>
                <ol className="list1">
                    <li>Trainee tidak boleh menggunakan pakaian yang memperlihatkan area: perut, ketiak, paha, dan dada.</li>
                    <li>Trainee wajib menggunakan busana sesuai dengan ketentuan agenda O-WEEK.</li>
                    <li>Trainee wajib menggunakan sepatu yang tertutup (tidak memperlihatkan jari dan tumit kaki) di lingkungan Universitas Ciputra.</li>
                    <li>Trainee dapat menggunakan busana tertentu untuk agenda khusus dengan izin dari panitia AMD dan diketahui oleh panitia SID.</li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal XVI (Penyampaian Pendapat & Penyelesaian Konflik)",
        content: (
            <>
                <ol className="list1">
                    <li><b>Hak trainee dalam menyampaikan aspirasi.</b></li>

                    <li>
                        <b>Ketentuan penyampaian pendapat dan penyelesaian konflik:</b>
                        <ol className="list2">
                            <li>Trainee yang menyampaikan aspirasinya berhak memperoleh respon, perlindungan hukum, dan jaminan keamanan.</li>
                            <li>Trainee yang menyampaikan pendapat wajib menaati peraturan yang berlaku.</li>
                            <li>Bentuk penyampaian pendapat dilakukan melalui dialog yang santun dan dilengkapi pendapat tertulis yang ditujukan kepada HOD melalui perantaraan AMD.</li>
                            <li>Bentuk penyampaian pendapat dapat dimungkinkan dengan tetap memprioritaskan dialog yang santun dan bermusyawarah pada panitia AMD terlebih dahulu.</li>
                            <li>Rencana penyampaian pendapat disampaikan secara tertulis kepada HOD melalui perantaraan AMD, berisi maksud dan tujuan, permasalahan yang akan disampaikan, pihak yang terlibat, waktu, tempat pelaksanaan, dan pejabat terkait yang diperlukan.</li>
                            <li>Apabila diperlukan, trainee dapat membuat janji temu dengan pejabat terkait seperti panitia HOD untuk menyampaikan aspirasi, dengan tetap melaksanakan alur penyampaian pendapat seperti yang tertera pada ayat 2a sampai 2c terlebih dahulu.</li>
                            <li>Setiap permasalahan diselesaikan dengan damai oleh para pihak yang berselisih didampingi oleh panitia AMD dan SID.</li>
                            <li>Trainee dilarang menyampaikan pendapat dan menyelesaikan konflik menggunakan konten media sosial atau media apa pun yang dapat berdampak pada pencemaran nama baik Universitas Ciputra.</li>
                        </ol>
                    </li>
                </ol>
            </>
        ),
    },
    {
        title: "HIMBAUAN BAGI TRAINEE O-WEEK 2025 (Penutup)",
        content: (
            <>
                <ol className="list1">
                    <li>
                        <b>Peraturan ini berlaku sejak tanggal ditetapkan dan dapat diubah sesuai kebutuhan.</b>
                        <ol className="list2">
                            <li>Peraturan ini ditetapkan oleh panitia O-WEEK Universitas Ciputra.</li>
                            <li>Setiap trainee wajib mematuhi peraturan ini selama kegiatan O-WEEK berlangsung.</li>
                            <li>Tidak membawa segala bentuk permainan papan dan kartu.</li>
                            <li>Selalu menjaga barang bawaan pribadi, karena segala bentuk kehilangan yang dialami oleh Trainee bukanlah tanggung jawab Panitia O-WEEK dan Universitas Ciputra.</li>
                        </ol>
                    </li>
                </ol>
            </>
        ),
    },
    {
        title: "Pasal XVII (Sanksi)",
        content: (
            <>
                <>
                    <ol className="list1">
                        <li>
                            <b>Setiap pelanggaran dikenai sanksi yang terdiri dari:</b>
                            <ol className="list2">
                                <li>Sanksi ringan.</li>
                                <li>Sanksi sedang.</li>
                                <li>Sanksi berat.</li>
                            </ol>
                        </li>

                        <li>
                            <b>Sanksi ringan sebagaimana yang dimaksud pada ayat (1) huruf a meliputi:</b>
                            <ol className="list2">
                                <li>Teguran lisan.</li>
                                <li>Permohonan Maaf, Penyesalan, atau Pernyataan Sikap dalam bentuk tertulis.</li>
                            </ol>
                        </li>

                        <li>
                            <b>Sanksi sedang sebagaimana yang dimaksud pada ayat (1) huruf b meliputi:</b>
                            <ol className="list2">
                                <li>Sanksi ringan.</li>
                                <li>Surat Peringatan 1.</li>
                                <li>Mengganti semua kerusakan dan kerugian.</li>
                            </ol>
                        </li>

                        <li>
                            <b>Sanksi berat sebagaimana yang dimaksud pada ayat (1) huruf c meliputi:</b>
                            <ol className="list2">
                                <li>Sanksi sedang.</li>
                                <li>Surat Peringatan 2.</li>
                                <li>Lulus bersyarat dari O-WEEK.</li>
                            </ol>
                        </li>

                        <li>
                            <b>Setiap Trainee yang terbukti melakukan pelanggaran:</b>
                            <ol className="list2">
                                <li>Pasal 2 ayat 1, 2, 3, 4, 5, 6, 8, dan Pasal 3 ayat 1, 2, 6, 7, 8, akan dikenai sanksi ringan.</li>
                                <li>Pasal 2 ayat 7, Pasal 3 ayat 3, 4, 5, 9, 10, 11, 12, 14, Pasal 12 ayat 2a, 2b, 2c, 2e, 2n, 2o, dan Pasal 15 akan dikenai sanksi sedang.</li>
                                <li>Pasal 3 ayat 13, 15, Pasal 4, Pasal 5, Pasal 6, Pasal 7, Pasal 8, Pasal 9, Pasal 10, Pasal 11, Pasal 12 ayat 2d, 2f, 2g, 2h, 2i, 2j, 2k, 2l, 2m, Pasal 13, Pasal 14, dan Pasal 16 ayat 2a, 2b, 2f akan dikenai sanksi berat.</li>
                            </ol>
                        </li>

                        <li>
                            <b>Sanksi yang dijatuhkan akan disesuaikan dengan pengurangan poin yang diterima trainee setiap kali melakukan pelanggaran dan akumulasi dilakukan secara kontinu selama kegiatan O-WEEK berlangsung, dengan perhitungan sebagai berikut:</b>
                            <ol className="list2">
                                <li>Pelanggaran dan sanksi ringan: -1 poin.</li>
                                <li>Pelanggaran dan sanksi sedang: -5 poin.</li>
                                <li>Pelanggaran dan sanksi berat: -15 poin.</li>
                                <li>Ketika trainee melakukan sebuah pelanggaran, pengurangan poin akan diakumulasikan sesuai prinsip di atas dan trainee akan mendapatkan sanksi ringan, sedang, atau berat sesuai jumlah pengurangan poin yang dimiliki akibat pelanggaran yang dilakukan.</li>
                            </ol>
                        </li>
                    </ol>
                </>
            </>
        ),
    },
    {
        title: "Pasal XVIII (Prosedur Penjatuhan Sanksi)",
        content: (
            <>
                <>
                    <ol className="list1">
                        <li>Sanksi berupa teguran lisan dapat langsung disampaikan oleh pihak terkait oleh panitia SID tanpa melalui proses pemeriksaan dan tanpa pembuatan Berita Acara Pemeriksaan (BAP).</li>
                        <li>Setiap sanksi selain teguran lisan dibuat Berita Acara Pemeriksaan (BAP) oleh pihak yang berwenang menjatuhkan sanksi dan dilanjutkan dengan proses pemeriksaan.</li>
                        <li>Proses pemeriksaan diikuti pejabat struktural terkait, trainee yang melakukan pelanggaran, dan saksi bila diperlukan.</li>
                        <li>Sebelum diberikan sanksi dalam bentuk keputusan tetap, kepada trainee yang melakukan pelanggaran diberi kesempatan untuk melakukan klarifikasi.</li>
                        <li>Panitia SID berhak untuk mengambil atau mengumpulkan bukti pelanggaran menggunakan alat elektronik atau alat bantu lainnya sebelum maupun ketika proses penjatuhan sanksi.</li>
                    </ol>
                </>
            </>
        ),
    },
];