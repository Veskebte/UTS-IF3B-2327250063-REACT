/* eslint-disable no-unused-vars */
// src/components/menu/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateMenu() {
  // Inisialisasi state untuk menyimpan nama menu
  const [namaMenu, setNamaMenu] = useState("");
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika namaMenu kosong, set pesan error
    if (namaMenu.trim() === "") {
      setError("Nama Menu is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data menu
      const response = await axios.post(
        "https://uts-if-3-b-2327250063-api.vercel.app/api/api/menus", // Endpoint API yang dituju
        {
          nama: namaMenu, // Data yang dikirim berupa objek JSON dengan properti 'nama'
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika menu berhasil dibuat
        setSuccess("Menu created successfully!");
        setNamaMenu(""); // Kosongkan input form setelah sukses submit
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to create menu");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating menu");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create menu</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Form untuk mengisi nama menu */}
      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">
            Nama menu
          </label>
          {/* Input untuk nama menu dengan class bootstrap */}
          <input
            type="text" className="form-control" id="namaMenu"
            value={namaMenu} // Nilai input disimpan di state namaMenu
            onChange={(e) => setNamaMenu(e.target.value)} // Update state saat input berubah
            placeholder="Enter menu Name" // Placeholder teks untuk input
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}