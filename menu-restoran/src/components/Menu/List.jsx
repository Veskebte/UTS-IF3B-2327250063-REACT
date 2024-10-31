/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function List() {
  const [menu, setmenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk mengontrol loading

  // Mengambil data menu saat komponen dimount
  useEffect(() => {
    axios
      .get("https://uts-if-3-b-2327250063-api.vercel.app/api/api/menus")
      .then((response) => {
        setmenu(response.data.result); // Simpan data menu ke dalam state
        setIsLoading(false); // Set isLoading menjadi false setelah data berhasil diambil
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error
        setIsLoading(false); // Set isLoading menjadi false meskipun terjadi error
      });
  }, []);

  // Fungsi untuk menghapus menu berdasarkan ID dengan konfirmasi SweetAlert2
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! menu: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://uts-if-3-b-2327250063-api.vercel.app/api/api/menus/${id}`)
          .then((response) => {
            // Hapus menu dari state setelah sukses dihapus dari server
            setmenu(menu.filter((f) => f.id !== id));
            // Tampilkan notifikasi sukses
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            Swal.fire(
              "Error",
              "There was an issue deleting the data.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <h2>List menu</h2>

      <NavLink to="/menu/create" className="btn btn-primary mb-3">
        Create
      </NavLink>

      {/* Tampilkan loader jika data belum selesai dimuat */}
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <ul className="list-group">
          {menu.map((f) => (
            <li
              key={f.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{f.nama}</span> {/* Menampilkan nama menu */}
              <div
                className="btn-group"
                role="group"
                aria-label="Action buttons"
              >
                <NavLink
                  to={`/menu/edit/${f.id}`}
                  className="btn btn-warning"
                >
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(f.id, f.nama)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}