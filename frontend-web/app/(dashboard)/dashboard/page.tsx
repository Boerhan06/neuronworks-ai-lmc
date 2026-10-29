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
  TrendingUp,
  Users,
  AlertTriangle,
  Award,
  ArrowLeft,
  Activity,
} from "lucide-react";

export default function LndDashboardPage() {
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
              <span className="font-semibold text-white tracking-tight">L&D Analytics Dashboard</span>
              <Badge variant="mono">Layer 2 & LRS</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success">xAPI LRS Terhubung</Badge>
            <Button size="sm" variant="secondary">
              Ekspor Laporan (PDF)
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Analitik Pembelajaran & Kepatuhan Divisi
          </h1>
          <p className="text-[#A1A0AB] mt-1 text-sm">
            Pantau progres pelatihan, deteksi kesenjangan keterampilan (skill gap), dan audit aktivitas xAPI secara real-time.
          </p>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#1C1A28] border-[#33323E]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A1A0AB]">Tingkat Kepatuhan</span>
                <TrendingUp className="w-4 h-4 text-[#42946E]" />
              </div>
              <CardTitle className="text-2xl text-white font-bold">92.4%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#42946E] flex items-center gap-1">
                +4.2% dari kuartal sebelumnya
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1A28] border-[#33323E]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A1A0AB]">Karyawan Terlatih</span>
                <Users className="w-4 h-4 text-[#853BCE]" />
              </div>
              <CardTitle className="text-2xl text-white font-bold">2,480</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#A1A0AB]">
                Dari total 2,650 karyawan aktif
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1A28] border-[#33323E]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A1A0AB]">Rata-rata Skor Kuis</span>
                <Award className="w-4 h-4 text-[#82AAFF]" />
              </div>
              <CardTitle className="text-2xl text-white font-bold">86.5 / 100</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#A1A0AB]">
                88% lulus pada percobaan pertama
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1C1A28] border-[#33323E]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A1A0AB]">Skill Gap Kritis</span>
                <AlertTriangle className="w-4 h-4 text-[#D97706]" />
              </div>
              <CardTitle className="text-2xl text-[#F59E0B] font-bold">3 Area</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#DCDCE0]">
                Perlu modul remedial otomatis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Divisional Table & Real-time xAPI Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Divisional Compliance Table */}
          <Card className="lg:col-span-2 bg-[#1C1A28] border-[#33323E]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white">
                  Kepatuhan Pelatihan Berdasarkan Divisi
                </CardTitle>
                <Badge variant="outline">Per Tanggal Hari Ini</Badge>
              </div>
              <CardDescription className="text-xs">
                Data kepatuhan modul wajib (SOP Tanggap Insiden, Anti-Fraud, & Standar Keamanan Data).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#DCDCE0]">
                  <thead className="bg-[#13111C] text-[#A1A0AB] border-b border-[#33323E]">
                    <tr>
                      <th className="py-2.5 px-3">Divisi</th>
                      <th className="py-2.5 px-3">Peserta</th>
                      <th className="py-2.5 px-3">Selesai</th>
                      <th className="py-2.5 px-3">Retensi Video</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#33323E]/50">
                    {[
                      {
                        dept: "Teknologi Informasi & Keamanan",
                        users: 420,
                        rate: "98%",
                        retention: "94%",
                        status: "success",
                        label: "Optimal",
                      },
                      {
                        dept: "Operasional & Layanan Pelanggan",
                        users: 850,
                        rate: "94%",
                        retention: "91%",
                        status: "success",
                        label: "Optimal",
                      },
                      {
                        dept: "Keuangan & Kepatuhan Regulasi",
                        users: 310,
                        rate: "96%",
                        retention: "92%",
                        status: "success",
                        label: "Optimal",
                      },
                      {
                        dept: "Pemasaran & Bisnis Digital",
                        users: 520,
                        rate: "78%",
                        retention: "72%",
                        status: "info",
                        label: "Perlu Perhatian",
                      },
                      {
                        dept: "Sumber Daya Manusia (SDM)",
                        users: 180,
                        rate: "89%",
                        retention: "85%",
                        status: "success",
                        label: "Baik",
                      },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#13111C]/40 transition-colors">
                        <td className="py-3 px-3 font-medium text-white">{row.dept}</td>
                        <td className="py-3 px-3">{row.users} staf</td>
                        <td className="py-3 px-3">{row.rate}</td>
                        <td className="py-3 px-3">{row.retention}</td>
                        <td className="py-3 px-3">
                          <Badge
                            variant={row.status === "success" ? "success" : "info"}
                          >
                            {row.label}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Real-time xAPI Activity Feed */}
          <Card className="bg-[#1C1A28] border-[#33323E]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white">Aktivitas xAPI LRS</CardTitle>
                <Activity className="w-4 h-4 text-[#853BCE]" />
              </div>
              <CardDescription className="text-xs">
                Pencatatan granular real-time (Layer 2 & 5).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  actor: "Ahmad F.",
                  verb: "completed",
                  object: "Kuis Tanggap Insiden",
                  score: "95%",
                  time: "1 menit lalu",
                },
                {
                  actor: "Rina S.",
                  verb: "watched",
                  object: "Adegan 3: Preservasi Bukti",
                  score: "100%",
                  time: "3 menit lalu",
                },
                {
                  actor: "Budi W.",
                  verb: "interacted",
                  object: "AI Tutor RAG Question",
                  score: "-",
                  time: "6 menit lalu",
                },
                {
                  actor: "Dewi P.",
                  verb: "passed",
                  object: "Evaluasi Akhir Modul",
                  score: "90%",
                  time: "12 menit lalu",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#13111C] border border-[#33323E] text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{item.actor}</span>
                    <span className="text-[10px] text-[#A1A0AB]">{item.time}</span>
                  </div>
                  <p className="text-[#A1A0AB]">
                    <span className="text-[#A667E4] font-mono">{item.verb}</span>{" "}
                    {item.object}
                  </p>
                  {item.score !== "-" && (
                    <p className="text-[11px] text-[#42946E]">Skor: {item.score}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
