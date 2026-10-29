import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from "@ai-lmc/ui";
import {
  FileText,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Video,
} from "lucide-react";

export default function CreatorStudioPage() {
  return (
    <div className="min-h-screen bg-[#13111C] text-[#DCDCE0] flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-[#33323E] bg-[#13111C]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-[#A1A0AB] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Portal
            </Link>
            <span className="text-[#33323E]">|</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-tight">Creator Studio</span>
              <Badge variant="mono">Layer 3 & 4</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="info">Zero Data Egress Aktif</Badge>
            <Button size="sm" variant="secondary">
              Simpan Draf
            </Button>
            <Button size="sm" variant="primary">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> Setujui & Render Video
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-8">
        {/* Header info */}
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Studio Pembuatan Modul Video
          </h1>
          <p className="text-[#A1A0AB] mt-1 text-sm">
            Konversi dokumen SOP internal menjadi micro-learning video 3 menit (5 adegan) dengan sitasi sumber otomatis.
          </p>
        </div>

        {/* 3 Step Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="bg-[#1C1A28] border-[#33323E]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="success">Selesai (Layer 5)</Badge>
                <FileText className="w-5 h-5 text-[#853BCE]" />
              </div>
              <CardTitle className="text-base text-white mt-2">1. Ingest Dokumen</CardTitle>
              <CardDescription className="text-xs text-[#A1A0AB]">
                SOP_Tanggap_Insiden_v2.pdf (4.2 MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-[#A1A0AB] space-y-1">
              <p>• Ekstraksi teks: 18 halaman</p>
              <p>• Embedding: 42 chunks (bge-m3)</p>
              <p>• Status: Siap di-grounding RAG</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1A28] border-[#853BCE]/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="info">Sedang Ditinjau</Badge>
                <Sparkles className="w-5 h-5 text-[#A667E4]" />
              </div>
              <CardTitle className="text-base text-white mt-2">2. SME Approval Gate</CardTitle>
              <CardDescription className="text-xs text-[#A1A0AB]">
                5 Adegan Naskah + Sitasi Wajib
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-[#A1A0AB] space-y-1">
              <p>• Total durasi: Tepat 180 detik (3:00)</p>
              <p>• Sitasi halaman: 5 dari 5 adegan terverifikasi</p>
              <p className="text-[#A667E4] font-medium">• Menunggu persetujuan SME</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1A28] border-[#33323E] opacity-75">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Terkunci</Badge>
                <Video className="w-5 h-5 text-[#A1A0AB]" />
              </div>
              <CardTitle className="text-base text-white mt-2">3. Render GPU Lokal</CardTitle>
              <CardDescription className="text-xs text-[#A1A0AB]">
                XTTS-v2 Narasi + LatentSync Lip-sync
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-[#A1A0AB] space-y-1">
              <p>• Worker: GPU Lokal (On-premise)</p>
              <p>• Antrean: Menunggu persetujuan SME</p>
              <p>• Output: Video MP4 1080p + Takarir VTT</p>
            </CardContent>
          </Card>
        </div>

        {/* Split Screen SME Review Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Dokumen Sumber & RAG Citations */}
          <Card className="bg-[#1C1A28] border-[#33323E]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white">Dokumen Sumber Terverifikasi</CardTitle>
                <Badge variant="mono">SOP_Tanggap_Insiden_v2.pdf</Badge>
              </div>
              <CardDescription className="text-xs">
                Prinsip Non-Negotiable #2: Setiap adegan wajib memiliki sitasi halaman dokumen sumber.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-[#13111C] border border-[#33323E] text-xs space-y-2">
                <div className="flex items-center justify-between text-[#A1A0AB]">
                  <span className="font-semibold text-white">Kutipan Halaman 4: Prosedur Isolasi Awal</span>
                  <Badge variant="success">Sitasi Sah</Badge>
                </div>
                <p className="text-[#DCDCE0] italic leading-relaxed">
                  &ldquo;Dalam waktu maksimal 15 menit setelah anomali terdeteksi, tim responder wajib memutuskan koneksi jaringan segmen terdampak dan mencabut token otentikasi aktif.&rdquo;
                </p>
                <p className="text-[11px] text-[#A1A0AB]">
                  Grounding RAG Match: 94.8% confidence score (Embedding bge-m3).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#13111C] border border-[#33323E] text-xs space-y-2">
                <div className="flex items-center justify-between text-[#A1A0AB]">
                  <span className="font-semibold text-white">Kutipan Halaman 9: Matriks Eskalasi C-Level</span>
                  <Badge variant="success">Sitasi Sah</Badge>
                </div>
                <p className="text-[#DCDCE0] italic leading-relaxed">
                  &ldquo;Insiden tingkat Kritis wajib dieskalasikan ke CISO dan Kepala Divisi dalam rentang waktu paling lambat 30 menit melalui jalur komunikasi darurat terenkripsi.&rdquo;
                </p>
                <p className="text-[11px] text-[#A1A0AB]">
                  Grounding RAG Match: 96.2% confidence score.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Scene-by-Scene Script & Storyboard Editor */}
          <Card className="bg-[#1C1A28] border-[#33323E]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white">Review Naskah Adegan (Scene 1-5)</CardTitle>
                <Badge variant="info">5 Adegan / 180 Detik</Badge>
              </div>
              <CardDescription className="text-xs">
                Periksa naskah suara (TTS) dan petunjuk visual avatar sebelum merilis ke GPU worker.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  id: 1,
                  title: "Adegan 1: Pembuka & Pengenalan Ancaman",
                  dur: "30s",
                  cite: "Hal. 1-2",
                  script:
                    "Selamat datang di modul tanggap darurat siber. Ketika anomali terdeteksi, setiap detik sangat berharga untuk melindungi aset perusahaan.",
                },
                {
                  id: 2,
                  title: "Adegan 2: Langkah Isolasi Jaringan Cepat",
                  dur: "35s",
                  cite: "Hal. 4",
                  script:
                    "Langkah pertama adalah isolasi. Segera putuskan koneksi workstation terdampak dan nonaktifkan sesi aktif dalam batas waktu 15 menit.",
                },
                {
                  id: 3,
                  title: "Adegan 3: Preservasi Bukti Digital",
                  dur: "40s",
                  cite: "Hal. 6",
                  script:
                    "Jangan pernah melakukan reboot mendadak. Ambil memory snapshot volatile memory untuk analisis forensik tim keamanan.",
                },
                {
                  id: 4,
                  title: "Adegan 4: Matriks Komunikasi & Eskalasi",
                  dur: "40s",
                  cite: "Hal. 9",
                  script:
                    "Laporkan eskalasi tingkat keparahan kepada CISO dan komandan insiden melalui kanal darurat sebelum batas waktu 30 menit.",
                },
                {
                  id: 5,
                  title: "Adegan 5: Rangkuman & Poin Kuis",
                  dur: "35s",
                  cite: "Hal. 12",
                  script:
                    "Ingat rumus 3T: Tanggapi, Tangkal, dan Tuntaskan. Lanjutkan ke kuis pemahaman berikut untuk menguji kesiapan Anda.",
                },
              ].map((scene) => (
                <div
                  key={scene.id}
                  className="p-3.5 rounded-lg bg-[#13111C] border border-[#33323E] hover:border-[#853BCE]/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medium text-xs text-white">{scene.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#A1A0AB]">{scene.dur}</span>
                      <Badge variant="mono">{scene.cite}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-[#DCDCE0]">{scene.script}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
