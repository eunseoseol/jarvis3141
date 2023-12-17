

export default async function Page({ searchParams }) {
  const secretKey = "test_sk_jZ61JOxRQVEgBEdMnag8W0X9bAqw";

  const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString("base64");

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const payments = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const { card } = payments;
 return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <video autoPlay loop muted style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 }}>
        <source src="/background.mov" type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '20px', height: 'calc(100vh - 20px)', overflowY: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignItems: 'center' }}>
        <img src="/book0.png" alt="Book" style={{ maxWidth: '400px', marginBottom: '40px' }} />
        <img src="/book1.png" alt="Book" style={{ maxWidth: '400px', marginBottom: '40px' }} />
        <img src="/book2.png" alt="Book" style={{ maxWidth: '400px', marginBottom: '40px' }} />
        <img src="/book3.png" alt="Book" style={{ maxWidth: '400px', marginBottom: '40px' }} />
        <img src="/book4.png" alt="Book" style={{ maxWidth: '400px', marginBottom: '40px' }} />
        <img src="/book5.png" alt="Book" style={{ maxWidth: '400px', marginBottom: '40px' }} />
      </div>
    </div>
  );
}