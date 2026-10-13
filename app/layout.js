export const metadata = { title: "Nexa" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0,background:"#000",color:"#fff",fontFamily:"system-ui"}}>{children}</body>
    </html>
  );
}
