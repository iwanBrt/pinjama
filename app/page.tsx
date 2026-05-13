"use client";

import React, { useState, useEffect } from "react";
import { Printer, FileText, Calculator, User, Briefcase, Landmark, Calendar, MapPin, Phone, CreditCard, DollarSign } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    nama: "",
    noKtp: "",
    tempatLahir: "",
    tglLahir: "",
    jabatan: "",
    instansi: "",
    nip: "",
    alamat: "",
    noHp: "",
    pemberiPinjaman: "",
    bendaharaGaji: "",
    pinjamanBaru: "0",
    pinjamanLama: "0",
    tenor: "1",
    bungaBulanan: "0",
    tanggalSurat: new Date().toISOString().split("T")[0],
    kotaSurat: "Bandung",
  });

  const [biayaAdmin] = useState(30000);
  const [sisaDiterima, setSisaDiterima] = useState(0);
  const [cicilanPerBulan, setCicilanPerBulan] = useState(0);
  const [totalCicilan, setTotalCicilan] = useState(0);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const parseNumber = (val: string) => {
    const num = parseInt(val.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? 0 : num;
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, [field]: rawValue });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const pinjamanBaruNum = parseNumber(formData.pinjamanBaru);
    const pinjamanLamaNum = parseNumber(formData.pinjamanLama);
    const tenorNum = parseInt(formData.tenor, 10) || 1;
    const bungaBulananNum = parseFloat(formData.bungaBulanan) || 0;

    const sisa = pinjamanBaruNum - pinjamanLamaNum - biayaAdmin;
    setSisaDiterima(sisa > 0 ? sisa : 0);

    const jasaTotal = pinjamanBaruNum * (bungaBulananNum / 100) * tenorNum;
    const cicilanPokok = pinjamanBaruNum / tenorNum;
    const cicilanBulan = Math.round(cicilanPokok + (jasaTotal / tenorNum));
    const total = cicilanBulan * tenorNum;

    setCicilanPerBulan(cicilanBulan);
    setTotalCicilan(total);
  }, [formData, biayaAdmin]);

  const handlePrint = () => {
    window.print();
  };

  // Convert month number to Indonesian month string
  const getIndonesianDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col lg:flex-row font-sans text-gray-900 dark:text-gray-100">
      
      {/* LEFT: FORM INPUT SECTION (Hidden on print) */}
      <div className="w-full lg:w-[450px] xl:w-[500px] border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-screen overflow-y-auto print:hidden shadow-xl z-10 relative">
        <div className="sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 p-6 z-20 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
              <FileText className="text-blue-600" size={24} />
              PinjamanApp
            </h1>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Generator Surat Otomatis</p>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Cetak</span>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* SECTION: Data Diri */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 border-b border-gray-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
              <User size={16} /> Data Pemohon
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Nama Lengkap</label>
                <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Misal: Budi Santoso" />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">No. KTP</label>
                <input type="text" name="noKtp" value={formData.noKtp} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="16 digit NIK" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Tempat Lahir</label>
                  <input type="text" name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Kota" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Tgl Lahir</label>
                  <input type="date" name="tglLahir" value={formData.tglLahir} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">No. HP</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400"><Phone size={16} /></span>
                  <input type="text" name="noHp" value={formData.noHp} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="08..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Alamat Lengkap</label>
                <textarea name="alamat" value={formData.alamat} onChange={handleChange} rows={2} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Jalan, RT/RW, Desa..." />
              </div>
            </div>
          </section>

          {/* SECTION: Pekerjaan */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 border-b border-gray-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
              <Briefcase size={16} /> Data Pekerjaan
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Instansi / Perusahaan</label>
                  <input type="text" name="instansi" value={formData.instansi} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Nama Kantor" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Jabatan</label>
                  <input type="text" name="jabatan" value={formData.jabatan} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Staff, dll" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">NIP/No Kontrak</label>
                  <input type="text" name="nip" value={formData.nip} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Nomor Induk..." />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: Pinjaman */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 border-b border-gray-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
              <Calculator size={16} /> Kalkulasi Pinjaman
            </h2>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 space-y-4 border border-blue-100 dark:border-blue-900/50">
              <div>
                <label className="block text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Pemberi Pinjaman</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-blue-400"><Landmark size={16} /></span>
                  <input type="text" name="pemberiPinjaman" value={formData.pemberiPinjaman} onChange={handleChange} className="w-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/50 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Nama Koperasi / Pemberi Dana" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Bendahara Gaji (Tujuan Kuasa)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-blue-400"><CreditCard size={16} /></span>
                  <input type="text" name="bendaharaGaji" value={formData.bendaharaGaji} onChange={handleChange} className="w-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/50 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Nama Instansi/Kantor" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Pinjaman Baru (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-blue-500 font-bold">Rp</span>
                    <input type="text" value={parseNumber(formData.pinjamanBaru).toLocaleString("id-ID")} onChange={(e) => handleCurrencyChange(e, "pinjamanBaru")} className="w-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/50 rounded-lg pl-10 pr-3 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Pinjaman Belum Lunas (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-blue-500 font-bold">Rp</span>
                    <input type="text" value={parseNumber(formData.pinjamanLama).toLocaleString("id-ID")} onChange={(e) => handleCurrencyChange(e, "pinjamanLama")} className="w-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/50 rounded-lg pl-10 pr-3 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Tenor (Bulan)</label>
                    <select name="tenor" value={formData.tenor} onChange={handleChange} className="w-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/50 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                        <option key={m} value={m}>{m} Bulan</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-800 dark:text-blue-300 mb-1">Bunga/Jasa (%) / bln</label>
                    <input type="number" step="0.1" name="bungaBulanan" value={formData.bungaBulanan} onChange={handleChange} className="w-full bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/50 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Preview in Form */}
            <div className="bg-zinc-900 dark:bg-black rounded-xl p-4 text-white space-y-3 shadow-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Cicilan Per Bulan</span>
                <span className="font-semibold text-green-400">{formatRupiah(cicilanPerBulan)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Biaya Admin</span>
                <span className="font-semibold text-zinc-200">{formatRupiah(biayaAdmin)}</span>
              </div>
              <div className="h-px bg-zinc-700 w-full my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-300 font-medium">Sisa Diterima</span>
                <span className="font-bold text-lg text-blue-400">{formatRupiah(sisaDiterima)}</span>
              </div>
            </div>
          </section>

          {/* SECTION: Footer Surat */}
          <section className="space-y-4 pb-12">
             <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 border-b border-gray-100 dark:border-zinc-800 pb-2 flex items-center gap-2">
              <Calendar size={16} /> Tempat & Tanggal
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Kota</label>
                <input type="text" name="kotaSurat" value={formData.kotaSurat} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-zinc-400 mb-1">Tanggal</label>
                <input type="date" name="tanggalSurat" value={formData.tanggalSurat} onChange={handleChange} className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* RIGHT: DOCUMENT PREVIEW (This part is printed) */}
      <div className="flex-1 bg-gray-200 dark:bg-neutral-900 lg:h-screen lg:overflow-y-auto flex justify-center py-8 px-4 lg:p-8 print:p-0 print:m-0 print:bg-white print:h-auto print:overflow-visible relative">
        {/* A4 Paper Container */}
        <div className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] shadow-2xl p-[20mm] xl:p-[25.4mm] font-serif print:shadow-none print:w-[210mm] print:h-auto print:p-[20mm] mx-auto text-sm leading-relaxed relative">
          
          <div className="text-center font-bold text-base mb-8 uppercase underline underline-offset-4">
            Surat Permohonan dan Pernyataan Pinjaman
          </div>

          <p className="mb-4">Yang Bertanda tangan di bawah ini :</p>
          
          <table className="w-full mb-6">
            <tbody>
              <tr>
                <td className="w-48 py-1 align-top">Nama</td>
                <td className="w-4 py-1 align-top">:</td>
                <td className="py-1 align-top font-semibold">{formData.nama || <span className="text-gray-300 font-normal">..........................................</span>}</td>
              </tr>
              <tr>
                <td className="py-1 align-top">No. KTP</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">{formData.noKtp || <span className="text-gray-300">..........................................</span>}</td>
              </tr>
              <tr>
                <td className="py-1 align-top">Tempat Tgl Lahir</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">
                  {formData.tempatLahir ? `${formData.tempatLahir}, ` : <span className="text-gray-300">............., </span>} 
                  {formData.tglLahir ? getIndonesianDate(formData.tglLahir) : <span className="text-gray-300">........................</span>}
                </td>
              </tr>
              <tr>
                <td className="py-1 align-top">Jabatan</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">{formData.jabatan || <span className="text-gray-300">..........................................</span>}</td>
              </tr>
              <tr>
                <td className="py-1 align-top">Instansi</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">{formData.instansi || <span className="text-gray-300">..........................................</span>}</td>
              </tr>
              <tr>
                <td className="py-1 align-top">NIP/No Kontrak Kerja</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">{formData.nip || <span className="text-gray-300">..........................................</span>}</td>
              </tr>
              <tr>
                <td className="py-1 align-top">Alamat</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">{formData.alamat || <span className="text-gray-300">..........................................</span>}</td>
              </tr>
              <tr>
                <td className="py-1 align-top">NO. Hp.</td>
                <td className="py-1 align-top">:</td>
                <td className="py-1 align-top">{formData.noHp || <span className="text-gray-300">..........................................</span>}</td>
              </tr>
            </tbody>
          </table>

          <p className="mb-4 text-justify">
            Dengan ini menyatakan mengajukan dan telah menerima pinjaman uang sebesar <strong>{formatRupiah(parseNumber(formData.pinjamanBaru))}</strong> dari <strong>{formData.pemberiPinjaman || "............................."}</strong> Selaku pemberi pinjaman yang akan dibayar kembali <em>secara Tunai atau non tunai via transfer/pemindahan</em> melalui pemotongan TKD/TPP/Gaji Bulan/ Honorium Bulanan/ Penghasilan Lainnya*.
          </p>

          <p className="mb-4 text-justify">
            Sebanyak <strong>{formData.tenor}</strong> Kali angsuran, dengan total cicilan setelah ditambah jasa menjadi sebesar : <strong>{formatRupiah(totalCicilan)}</strong>
          </p>

          <table className="w-full border-collapse border border-black mb-6 text-center text-sm">
            <thead>
              <tr className="bg-gray-100 print:bg-transparent">
                <th className="border border-black py-2 w-12">NO</th>
                <th className="border border-black py-2">Bulan</th>
                <th className="border border-black py-2">Dibayarkan</th>
                <th className="border border-black py-2">Besar Cicilan</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: parseInt(formData.tenor) || 1 }).map((_, i) => (
                <tr key={i}>
                  <td className="border border-black py-1.5">{i + 1}</td>
                  <td className="border border-black py-1.5"></td>
                  <td className="border border-black py-1.5"></td>
                  <td className="border border-black py-1.5 font-medium">{formatRupiah(cicilanPerBulan)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mb-4 text-justify">
            Saya Juga memberi kuasa penuh untuk memotong langsung TKD/TPP/GAJI/ Honorarium saya yang dimaksud kepada bendahara Gaji Kantor <strong>{formData.bendaharaGaji || "..................................................."}</strong> Tempat saya bekerja secara <em>tunai atau non tunai via transfer/Pemindahbukuan</em> untuk diserahkan kepada pemberi pinjaman. Apabila saya pindah, berhenti bekerja atau diberhentikan dari kantor tempat saya bekerja saat saya meminjam. maka saya akan tetap membayar pinjaman tersebut.
          </p>

          <p className="mb-4 text-justify">
            Apabila pemotongan TKD/Gaji/Honorarium saya secara <em>tunai atau non tunai via transfer/pemindahbukuan tidak memungkinkan. Maka saya bersedia menyerahkan ATM saya kepada pemberi pinjaman untuk pengembalian uang dari rekening tabungan saya untuk angsuran sebesar utang saya dimaksud diatas.</em>
          </p>

          <p className="mb-8">Untuk keperluan ini saya serahkan persyaratan dan agunan**.</p>

          <div className="flex justify-between items-start mb-12">
            <div className="text-center w-64">
              <p>Mengetahui/Menyetujui</p>
              <p>Bendahara Gaji</p>
              <div className="h-24"></div>
              <p>(............................................)</p>
            </div>
            <div className="text-center w-64">
              <p>{formData.kotaSurat || "Bandung"}, {getIndonesianDate(formData.tanggalSurat) || "................"}</p>
              <p>Yang Mengajukan/Pemohon</p>
              <div className="h-24 flex items-end justify-center relative">
                <div className="absolute text-[10px] text-gray-400 border border-gray-300 p-2 bottom-4 left-1/2 -translate-x-1/2">
                  Materai<br/>10.000
                </div>
              </div>
              <p className="font-bold underline underline-offset-2">{formData.nama || "(............................................)"}</p>
            </div>
          </div>

          <div className="border border-black p-4 inline-block w-full text-sm mb-6 bg-gray-50 print:bg-transparent">
            <p className="font-bold mb-2">Ket :</p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-64 py-0.5">Pinjaman Baru</td>
                  <td className="w-4 py-0.5">:</td>
                  <td className="py-0.5">{formatRupiah(parseNumber(formData.pinjamanBaru))}</td>
                </tr>
                <tr>
                  <td className="py-0.5">Pinjaman yang belum Lunas</td>
                  <td className="py-0.5">:</td>
                  <td className="py-0.5">{formatRupiah(parseNumber(formData.pinjamanLama))}</td>
                </tr>
                <tr className="font-bold border-t border-dashed border-gray-400">
                  <td className="py-2 mt-1">Sisa Diterima</td>
                  <td className="py-2 mt-1">:</td>
                  <td className="py-2 mt-1 text-base">{formatRupiah(sisaDiterima)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs">
            <p className="font-bold mb-1">Catatan : Melampirkan foto Copy</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>KTP/KK</li>
              <li>SK Jabatan dan SK Terakhir atau surat kontrak</li>
              <li>ATM dan Buku Tabungan (jika diperlukan).</li>
              <li>Adm Rp.30.000.</li>
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
}
