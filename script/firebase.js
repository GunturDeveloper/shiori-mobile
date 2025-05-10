import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAifSw4Xj7Pd9LVF4mRbpHjjDlmh2P_hK8",
  authDomain: "eskul-f5dcc.firebaseapp.com",
  projectId: "eskul-f5dcc",
  storageBucket: "eskul-f5dcc.firebasestorage.app",
  messagingSenderId: "1044167947678",
  appId: "1:1044167947678:web:022f39668748cfa527d28f",
  measurementId: "G-FZ47456S1H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "sensor", "dataUtama");

getDoc(docRef).then((docSnap) => {
  if (!docSnap.exists()) {
    setDoc(docRef, {
      suhu: 30,
      kelembabanLingkungan: 80,
      kelembabanTanaman: 60
    });
  }
});

onSnapshot(docRef, (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data();
    const temp = data.suhu;
    const kelembabanTanaman = data.kelembabanTanaman;
    const kelembabanLingkungan = data.kelembabanLingkungan;

    document.getElementById("temperature-text").textContent = `${temp}°C`;
    document.getElementById("temperature-bar").style.width = `${Math.min((temp / 50) * 100, 100)}%`;
    document.getElementById("ling").textContent = `${kelembabanLingkungan}%`;
    document.getElementById("tan").textContent = `${kelembabanTanaman}%`;

    let saran = "";

    if (temp > 35 && kelembabanTanaman < 30) {
      saran = "Panas ekstrem! Siram tanaman segera dan lindungi dengan penutup.";
    } else if (temp > 30 && kelembabanLingkungan < 40) {
      saran = "Suhu tinggi dan udara kering, pertimbangkan menyiram tanaman lebih sering.";
    } else if (temp < 20 && kelembabanTanaman > 80) {
      saran = "Tanaman terlalu basah dan suhu rendah, kurangi penyiraman.";
    } else if (kelembabanTanaman > 90) {
      saran = "Hati-hati! Tanaman terlalu lembab, bisa memicu jamur.";
    } else if (kelembabanTanaman < 20) {
      saran = "Tanaman kekurangan air, segera siram.";
    } else if (kelembabanLingkungan > 90) {
      saran = "Lingkungan sangat lembab, pastikan sirkulasi udara cukup.";
    } else if (kelembabanLingkungan < 30) {
      saran = "Udara kering! Tanaman bisa mengalami stres air.";
    } else if (temp > 32 && kelembabanTanaman > 80) {
      saran = "Cuaca panas dan tanah basah, pastikan tidak terjadi genangan.";
    } else if (temp < 18 && kelembabanLingkungan < 40) {
      saran = "Dingin dan kering, cek kondisi akar tanaman.";
    } else if (kelembabanLingkungan < 50 && kelembabanTanaman < 50) {
      saran = "Waktunya menyiram, kelembaban lingkungan dan tanaman rendah.";
    } else if (temp >= 25 && temp <= 30 && kelembabanTanaman >= 40 && kelembabanTanaman <= 70) {
      saran = "Kondisi ideal, pertahankan perawatan seperti biasa.";
    } else if (temp >= 30 && kelembabanTanaman >= 60 && kelembabanTanaman <= 80) {
      saran = "Hati-hati overwatering di suhu panas.";
    } else if (kelembabanTanaman > kelembabanLingkungan + 30) {
      saran = "Tanah terlalu basah dibanding udara, kurangi penyiraman.";
    } else if (kelembabanTanaman < kelembabanLingkungan - 30) {
      saran = "Tanaman kekurangan air dibanding lingkungan, segera siram.";
    } else if (temp < 15) {
      saran = "Suhu terlalu rendah, lindungi tanaman dari dingin.";
    } else if (temp > 40) {
      saran = "Bahaya! Panas ekstrem, tanaman bisa layu cepat.";
    } else if (kelembabanTanaman >= 50 && kelembabanTanaman <= 70) {
      saran = "Tanaman dalam kondisi kelembaban yang baik.";
    } else if (kelembabanLingkungan >= 60 && kelembabanLingkungan <= 80) {
      saran = "Lingkungan cukup nyaman untuk tanaman.";
    } else if (temp >= 20 && temp <= 26) {
      saran = "Suhu optimal untuk pertumbuhan tanaman.";
    } else {
      saran = "Kondisi stabil, lanjutkan monitoring berkala.";
    }

    document.getElementById("saranteks").textContent = saran;
  }
});