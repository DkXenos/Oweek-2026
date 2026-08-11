"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type TextareaHTMLAttributes,
} from "react";

// Textarea yang tingginya ikut isi: makin panjang teksnya, makin tinggi
// kotaknya, jadi admin tidak perlu scroll di dalam kotak kecil saat mengetik.
// Saat di-klik (focus) kotaknya juga langsung melebar lewat CSS
// .admin-autogrow:focus, supaya ada ruang kerja walau isinya masih pendek.
type AutoGrowTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string;
};

export default function AutoGrowTextarea({
  value,
  className,
  ...props
}: AutoGrowTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // height di-reset dulu supaya scrollHeight menghitung tinggi konten yang
    // sebenarnya, bukan tinggi yang sudah dipasang sebelumnya.
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    resize();
  }, [value, resize]);

  useEffect(() => {
    // Lebar kotak berubah saat window di-resize, jumlah baris ikut berubah.
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  return (
    <textarea
      {...props}
      ref={ref}
      value={value}
      className={`admin-autogrow${className ? ` ${className}` : ""}`}
      // onInput dipakai untuk resize supaya onChange milik pemanggil tetap utuh.
      onInput={resize}
    />
  );
}
