"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Volume2, BookOpen, Users, Star, ArrowRight, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const indahSteps = [
    {
      letter: "I",
      title: "IDENTIFICATION",
      description: "Mengidentifikasi suara dan pola pengucapan yang tepat",
      icon: <Volume2 className="h-6 w-6" />,
    },
    {
      letter: "N",
      title: "NOTIFICATION",
      description: "Memberikan notifikasi dan feedback real-time",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      letter: "D",
      title: "DESCRIPTION",
      description: "Mendeskripsikan cara pengucapan yang benar",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      letter: "A",
      title: "APPLICATION",
      description: "Mengaplikasikan teknik pengucapan dalam praktik",
      icon: <Play className="h-6 w-6" />,
    },
    {
      letter: "H",
      title: "HARMONIZATION",
      description: "Menyelaraskan pengucapan dengan standar yang tepat",
      icon: <Star className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-sky-600">
              <Mic className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sky-900">ASRI</h1>
              <p className="text-xs text-sky-600">Speech Recognition</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors">
              Fitur
            </Link>
            <Link href="#indah" className="text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors">
              Metode INDAH
            </Link>
            <Link href="#about" className="text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors">
              Tentang
            </Link>
            <Button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white">Mulai Belajar</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-100/50 to-transparent"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-200">🎯 Teknologi AI Terdepan</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">ASRI: Automatic Speech Recognition Indah</h1>
                  <p className="max-w-[600px] text-sky-700 md:text-xl">Platform pembelajaran pronunciation bahasa Inggris dengan teknologi AI yang menggunakan metode INDAH untuk hasil pembelajaran yang optimal dan menyenangkan.</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white transform hover:scale-105 transition-all duration-200">
                    <Play className="mr-2 h-4 w-4" />
                    Mulai Belajar Sekarang
                  </Button>
                  <Button variant="outline" size="lg" className="border-sky-300 text-sky-700 hover:bg-sky-50 hover:border-sky-400">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-sky-600" />
                    <span className="text-sm text-sky-600">10,000+ Pengguna</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-sky-600">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-sky-100">
                    <div className="text-center space-y-4">
                      <div className="mx-auto h-20 w-20 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                        <Mic className="h-10 w-10 text-white animate-pulse" />
                      </div>
                      <h3 className="text-xl font-semibold text-sky-900">Mulai Berbicara</h3>
                      <p className="text-sky-600">AI akan menganalisis pronunciation Anda secara real-time</p>
                      <div className="flex justify-center space-x-2">
                        <div className="h-2 w-2 bg-sky-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="h-2 w-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INDAH Method Section */}
        <section id="indah" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-sky-50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <Badge className="bg-sky-100 text-sky-800">Metode Pembelajaran</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-900">Metode INDAH</h2>
              <p className="mx-auto max-w-[700px] text-sky-700 md:text-xl">Pendekatan sistematis 5 langkah untuk menguasai pronunciation bahasa Inggris dengan sempurna</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {indahSteps.map((step, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${hoveredStep === index ? "transform -translate-y-2 shadow-xl border-sky-300" : "hover:shadow-lg border-sky-100"}`}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 transition-opacity duration-300 ${hoveredStep === index ? "opacity-10" : "opacity-0"}`}></div>
                  <CardHeader className="text-center relative">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">{step.letter}</span>
                    </div>
                    <CardTitle className="text-lg text-sky-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center relative">
                    <div className="mb-4 flex justify-center text-sky-600">{step.icon}</div>
                    <CardDescription className="text-sky-600">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <Badge className="bg-sky-100 text-sky-800">Fitur Unggulan</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-900">Mengapa Memilih ASRI?</h2>
              <p className="mx-auto max-w-[700px] text-sky-700 md:text-xl">Platform pembelajaran yang dilengkapi dengan teknologi AI terdepan untuk pengalaman belajar yang optimal</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-xl transition-all duration-300 border-sky-100 hover:border-sky-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-sky-900">Real-time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sky-600">Analisis pronunciation secara real-time dengan feedback instan untuk perbaikan yang cepat dan akurat.</CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-sky-100 hover:border-sky-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-sky-900">Pembelajaran Adaptif</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sky-600">Sistem pembelajaran yang menyesuaikan dengan kemampuan dan progress individual setiap pengguna.</CardDescription>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-sky-100 hover:border-sky-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-sky-900">Komunitas Belajar</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sky-600">Bergabung dengan komunitas pembelajar dari seluruh Indonesia untuk saling mendukung dan berbagi pengalaman.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-sky-500 to-sky-600">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Siap Meningkatkan Pronunciation Anda?</h2>
              <p className="mx-auto max-w-[600px] text-sky-100 md:text-xl">Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat metode INDAH dalam pembelajaran pronunciation</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4">
                <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50 transform hover:scale-105 transition-all duration-200">
                  <Play className="mr-2 h-4 w-4" />
                  Mulai Gratis Sekarang
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-sky-600">
                  Lihat Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-sky-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-sky-600">
                  <Mic className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">ASRI</span>
              </div>
              <p className="text-sky-200 text-sm">Platform pembelajaran pronunciation bahasa Inggris dengan teknologi AI terdepan.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-sm text-sky-200">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Metode INDAH
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Harga
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-sm text-sky-200">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Bantuan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-sky-200">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Karir
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sky-800 mt-8 pt-6 text-center text-sm text-sky-200">
            <p>&copy; {new Date().getFullYear()} ASRI. Semua hak dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
