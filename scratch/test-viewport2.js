fetch('http://localhost:3000')
  .then(r => r.text())
  .then(t => {
    const metas = t.match(/<meta[^>]*name=["']viewport["'][^>]*>/gi) || [];
    console.log('Viewport meta tags:', metas);
  });
