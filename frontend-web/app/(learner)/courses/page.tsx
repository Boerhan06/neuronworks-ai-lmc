"use client";

import React, { useState } from "react";
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
  Play,
  Pause,
  ArrowLeft,
  Bot,
  Send,
  HelpCircle,
  FileText,
  Volume2,
} from "lucide-react";

export default function LearnerCoursePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeScene, setActiveScene] = useState(1);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo! Saya Asisten AI Tutor. Ada yang ingin Anda tanyakan mengenai materi Tanggap Insiden Siber ini?",
      citation: null,
    },
    {
      sender: "user",
      text: "Berapa lama batas waktu maksimal untuk eskalasi ke C-Level?",
      citation: null,
    },
    {
      sender: "bot",
      text: "Berdasarkan SOP Halaman 9, insiden tingkat Kritis wajib dieskalasikan ke CISO dan Kepala Divisi dalam rentang waktu paling lambat 30 menit melalui jalur komunikasi darurat terenkripsi.",
      citation: "SOP_Tanggap_Insiden_v2.pdf [Hal. 9]",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: inputMessage, citation: null },
      {
        sender: "bot",
        text: `Pertanyaan Anda mengenai "${inputMessage}" telah dicocokkan dengan dokumen SOP. Pastikan selalu mematuhi protokol isolasi awal sebelum mengambil tindakan lanjutan.`,
        citation: "SOP_Tanggap_Insiden_v2.pdf [Hal. 4]",
      },
    ]);
    setInputMessage("");
  };

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
              <span className="font-semibold text-white tracking-tight">Portal Pembelajar</span>
              <Badge variant="mono">Modul 1: Tanggap Insiden</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success">Progres: 60%</Badge>
            <Button size="sm" variant="secondary">
              Unduh Catatan
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Video Player & Quiz (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* 16:9 Video Player Container */}
            <div className="rounded-xl overflow-hidden border border-[#33323E] bg-[#1F132A] relative aspect-video flex flex-col justify-between p-6 shadow-2xl">
              {/* Overlay Top Bar */}
              <div className="flex items-center justify-between z-10">
                <Badge variant="info">Video Avatar AI Lokal (LatentSync)</Badge>
                <div className="flex items-center gap-2 text-xs bg-[#13111C]/80 px-3 py-1 rounded-full border border-[#33323E]">
                  <Volume2 className="w-3.5 h-3.5 text-[#853BCE]" />
                  <span>XTTS-v2 Audio Suara Bahasa Indonesia</span>
                </div>
              </div>

              {/* Center Play Button Graphic */}
              <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-[#853BCE] hover:bg-[#A667E4] text-white flex items-center justify-center shadow-[0px_0px_24px_0px_#853BCE80] transition-all transform hover:scale-105 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </button>
                <p className="mt-3 text-sm font-medium text-white">
                  {isPlaying ? "Memutar Adegan 2..." : "Klik untuk Memutar Modul"}
                </p>
                <p className="text-xs text-[#A1A0AB]">
                  Adegan {activeScene} dari 5: Langkah Isolasi Jaringan Cepat
                </p>
              </div>

              {/* Subtitle Bar at Bottom */}
              <div className="z-10 bg-[#13111C]/90 border border-[#33323E] p-3 rounded-lg text-center backdrop-blur">
                <p className="text-xs text-white">
                  &ldquo;Langkah pertama adalah isolasi. Segera putuskan koneksi workstation terdampak dan nonaktifkan sesi aktif dalam batas waktu 15 menit.&rdquo;
                </p>
                <span className="text-[10px] text-[#A667E4] font-mono mt-1 block">
                  Sumber Terverifikasi: SOP_Tanggap_Insiden_v2.pdf [Hal. 4]
                </span>
              </div>
            </div>

            {/* Scene Selector & Progress */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveScene(s)}
                  className={`flex-1 min-w-[100px] p-2.5 rounded-lg border text-left transition-all ${activeScene === s
                      ? "border-[#853BCE] bg-[#853BCE]/15 text-white"
                      : "border-[#33323E] bg-[#1C1A28] text-[#A1A0AB] hover:text-white"
                    }`}
                >
                  <div className="text-[10px] font-mono">Adegan {s}</div>
                  <div className="text-xs font-semibold truncate">
                    {s === 1
                      ? "Pembuka"
                      : s === 2
                        ? "Isolasi"
                        : s === 3
                          ? "Bukti Forensik"
                          : s === 4
                            ? "Eskalasi"
                            : "Kuis Akhir"}
                  </div>
                </button>
              ))}
            </div>

            {/* Checkpoint Auto-Quiz */}
            <Card className="bg-[#1C1A28] border-[#33323E]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#853BCE]" />
                    <CardTitle className="text-base text-white">
                      Kuis Pemahaman: Prosedur Isolasi Jaringan
                    </CardTitle>
                  </div>
                  <Badge variant="mono">Pertanyaan 1 dari 3</Badge>
                </div>
                <CardDescription className="text-xs">
                  Pertanyaan ini digenerate otomatis berdasarkan fakta SOP (Layer 2 Auto Quiz Engine).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-white font-medium">
                  Berapa batas waktu maksimal yang diberikan kepada responder untuk memutus koneksi dan mencabut token otentikasi?
                </p>
                <div className="space-y-2 text-xs">
                  {[
                    { text: "A. 60 menit setelah notifikasi", correct: false },
                    { text: "B. 15 menit setelah anomali terdeteksi", correct: true },
                    { text: "C. 24 jam sebelum laporan mingguan", correct: false },
                    { text: "D. Tanpa batas waktu selama sistem aman", correct: false },
                  ].map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg border border-[#33323E] hover:border-[#853BCE]/50 bg-[#13111C] cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="quiz_q1"
                        className="accent-[#853BCE] w-4 h-4 cursor-pointer"
                        defaultChecked={option.correct}
                      />
                      <span className="text-[#DCDCE0]">{option.text}</span>
                    </label>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <Button size="sm" variant="primary">
                    Kirim Jawaban & Catat xAPI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: AI Tutor RAG Sidebar (1 col) */}
          <div className="flex flex-col h-full space-y-4">
            <Card className="flex-1 bg-[#1C1A28] border-[#33323E] flex flex-col h-[750px]">
              <CardHeader className="pb-3 border-b border-[#33323E]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#A667E4]" />
                    <CardTitle className="text-base text-white">AI Tutor RAG</CardTitle>
                  </div>
                  <Badge variant="success">Online</Badge>
                </div>
                <CardDescription className="text-xs">
                  Jawaban strictly grounded ke dokumen SOP internal (Zero Hallucination).
                </CardDescription>
              </CardHeader>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"
                      }`}
                  >
                    <div
                      className={`max-w-[88%] p-3 rounded-lg leading-relaxed ${m.sender === "user"
                          ? "bg-[#853BCE] text-white rounded-br-none"
                          : "bg-[#13111C] border border-[#33323E] text-[#DCDCE0] rounded-bl-none"
                        }`}
                    >
                      <p>{m.text}</p>
                      {m.citation && (
                        <div className="mt-2 pt-2 border-t border-[#33323E]/60 text-[10px] text-[#A667E4] font-mono flex items-center gap-1">
                          <FileText className="w-3 h-3" /> {m.citation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-[#33323E] bg-[#13111C]/50">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Tanyakan materi SOP..."
                    className="flex-1 bg-[#13111C] border border-[#33323E] rounded-md px-3 py-2 text-xs text-white placeholder-[#A1A0AB] focus:outline-none focus:border-[#853BCE]"
                  />
                  <Button type="submit" size="sm" variant="primary">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}