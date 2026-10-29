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
  Sparkles,
  BarChart3,
  GraduationCap,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Database,
} from "lucide-react";

export default function Home() {
  return (
            <div className="min-h-screen bg-[#13111C] text-[#DCDCE0] flex flex-col">
              {/* Top Navigation */}
              <header className="border-b border-[#33323E] bg-[#13111C]/80 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#853BCE] flex items-center justify-center font-bold text-white shadow-[0px_0px_16px_0px_#853BCE80]">
                      NL
                    </div>
                    <span className="font-semibold text-lg text-white tracking-tight">
                      AI-LMC Enterprise
                    </span>
                    <Badge variant="mono">v0.1.0 Monorepo</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="info">Zero Data Egress</Badge>
                    <div className="flex items-center gap-2">
                      <Link href="/studio">
                        <Button size="sm" variant="ghost">
                          Studio
                        </Button>
                      </Link>
                      <Link href="/dashboard">
                        <Button size="sm" variant="ghost">
                          Dasbor
                        </Button>
                      </Link>
                      <Link href="/courses">
                        <Button size="sm" variant="primary">
                          Mulai Belajar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </header>

              {/* Hero Section */}
              <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16 space-y-16">
                <div className="text-center max-w-3xl mx-auto space-y-5">
                  <Badge variant="mono" className="px-3 py-1 text-xs">
                    Platform AI Learning Management & Creator Enterprise
                  </Badge>
                  <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight font-serif">
                    Ubah Dokumen SOP Menjadi Video Interaktif Berbasis AI Lokal
                  </h1>
                    <p className="text-base sm:text-lg text-[#A1A0AB] leading-relaxed">
                      Otomatisasi siklus pembelajaran karyawan dari ingest dokumen internal, kurikulum 5 adegan, sintesis suara & avatar lokal, hingga sertifikasi dan pelacakan standar xAPI tanpa kebocoran data.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <Link href="/studio">
                        <Button size="lg" variant="primary">
                          Buka Creator Studio <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <Link href="/dashboard">
                        <Button size="lg" variant="secondary">
                          Lihat Dasbor Kepatuhan
                        </Button>
                      </Link>
                    </div>
                </div>

                  {/* 3 Main Experience Portals (Route Groups) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Creator Studio Card */}
                    <Link href="/studio" className="group block">
                      <Card className="h-full bg-[#1C1A28] border-[#33323E] hover:border-[#853BCE] transition-all duration-200 group-hover:shadow-[0px_0px_24px_0px_#853BCE33]">
                        <CardHeader>
                          <div className="w-10 h-10 rounded-lg bg-[#853BCE]/20 border border-[#853BCE]/40 flex items-center justify-center text-[#A667E4] mb-3">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl text-white group-hover:text-[#A667E4] transition-colors">
                              Creator Studio
                            </CardTitle>
                            <Badge variant="mono">(creator)</Badge>
                          </div>
                          <CardDescription className="text-xs text-[#A1A0AB]">
                            Layer 3: Agen AI & SME Review Gate
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-xs text-[#DCDCE0] space-y-2">
                          <p>• Unggah SOP, regulasi, dan modul produk internal.</p>
                          <p>• Ekstraksi naskah 5 adegan tepat 180 detik.</p>
                          <p>• Validasi sitasi halaman sumber sebelum render GPU.</p>
                          <div className="pt-3 flex items-center text-xs font-semibold text-[#853BCE] group-hover:translate-x-1 transition-transform">
                            Masuk ke Studio &rarr;
                          </div>
                        </CardContent>
                      </Card>
                    </Link>

                    {/* L&D Dashboard Card */}
                    <Link href="/dashboard" className="group block">
                      <Card className="h-full bg-[#1C1A28] border-[#33323E] hover:border-[#853BCE] transition-all duration-200 group-hover:shadow-[0px_0px_24px_0px_#853BCE33]">
                        <CardHeader>
                          <div className="w-10 h-10 rounded-lg bg-[#42946E]/20 border border-[#42946E]/40 flex items-center justify-center text-[#42946E] mb-3">
                            <BarChart3 className="w-5 h-5" />
                          </div>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl text-white group-hover:text-[#A667E4] transition-colors">
                              L&D Dashboard
                            </CardTitle>
                            <Badge variant="mono">(dashboard)</Badge>
                          </div>
                          <CardDescription className="text-xs text-[#A1A0AB]">
                            Layer 2: LRS & Analisis Kepatuhan
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-xs text-[#DCDCE0] space-y-2">
                          <p>• Pemetaan kepatuhan pelatihan lintas divisi.</p>
                          <p>• Analitik retensi tontonan video & heatmap drop-off.</p>
                          <p>• Deteksi skill gap otomatis untuk rekomendasi modul.</p>
                          <div className="pt-3 flex items-center text-xs font-semibold text-[#853BCE] group-hover:translate-x-1 transition-transform">
                            Buka Dasbor Analitik &rarr;
                          </div>
                        </CardContent>
                      </Card>
                    </Link>

                    {/* Learner Portal Card */}
                    <Link href="/courses" className="group block">
                      <Card className="h-full bg-[#1C1A28] border-[#33323E] hover:border-[#853BCE] transition-all duration-200 group-hover:shadow-[0px_0px_24px_0px_#853BCE33]">
                        <CardHeader>
                          <div className="w-10 h-10 rounded-lg bg-[#306EE8]/20 border border-[#306EE8]/40 flex items-center justify-center text-[#82AAFF] mb-3">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl text-white group-hover:text-[#A667E4] transition-colors">
                              Portal Pembelajar
                            </CardTitle>
                            <Badge variant="mono">(learner)</Badge>
                          </div>
                          <CardDescription className="text-xs text-[#A1A0AB]">
                            Layer 1: Video Interaktif & AI Tutor
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-xs text-[#DCDCE0] space-y-2">
                          <p>• Pemutar video 16:9 dengan takarir tersinkronisasi.</p>
                          <p>• Asisten AI Tutor RAG dengan jawaban berbasis sitasi.</p>
                          <p>• Kuis pemahaman adaptif dengan sertifikasi otomatis.</p>
                          <div className="pt-3 flex items-center text-xs font-semibold text-[#853BCE] group-hover:translate-x-1 transition-transform">
                            Masuk Kursus &rarr;
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>

                  {/* 5-Layer Monorepo Architecture Overview */}
                  <div className="p-8 rounded-xl bg-[#1F132A]/70 border border-[#33323E] space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-white">Fondasi Monorepo Terintegrasi</h2>
                        <p className="text-xs text-[#A1A0AB] mt-1">
                          Struktur multi-service pnpm workspaces dengan prinsip Zero Data Egress dan RBAC enterprise.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="mono">PostgreSQL 16 + pgvector</Badge>
                        <Badge variant="mono">Redis 7</Badge>
                        <Badge variant="mono">MinIO S3</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                      <div className="p-3.5 rounded-lg bg-[#13111C] border border-[#33323E] space-y-1.5">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#853BCE]" /> Layer 1: Client
                        </div>
                        <p className="text-[#A1A0AB]">Next.js 16 App Router di `apps/web` (Portal & Studio).</p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#13111C] border border-[#33323E] space-y-1.5">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#42946E]" /> Layer 2: Core
                        </div>
                        <p className="text-[#A1A0AB]">Go Backend API & Gateway di `services/api` (port 8080).</p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#13111C] border border-[#33323E] space-y-1.5">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-[#82AAFF]" /> Layer 3: Orchestrator
                        </div>
                        <p className="text-[#A1A0AB]">FastAPI AI Worker di `services/ai-worker` (port 8000).</p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#13111C] border border-[#33323E] space-y-1.5">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#A667E4]" /> Layer 4: Media AI
                        </div>
                        <p className="text-[#A1A0AB]">XTTS-v2, LatentSync, Faster-Whisper, & FFmpeg GPU.</p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#13111C] border border-[#33323E] space-y-1.5">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <Database className="w-4 h-4 text-[#F59E0B]" /> Layer 5: Data
                        </div>
                        <p className="text-[#A1A0AB]">PostgreSQL pgvector, MinIO, dan xAPI LRS.</p>
                      </div>
                    </div>
                  </div>
              </main>

              {/* Footer */}
              <footer className="border-t border-[#33323E] py-6 text-center text-xs text-[#A1A0AB]">
                <p>AI Learning Management & Creator (AI-LMC) Enterprise &copy; 2026. Hak cipta dilindungi undang-undang.</p>
              </footer>
            </div>
            );
}
