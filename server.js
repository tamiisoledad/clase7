const express = require ('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let palabras = ["Frase", "inicial"]

app.get('/api/frase', (req, res) => {
  let frase = '';

  for (const palabra of palabras) {
    frase += `${palabra} `
  }

  frase = frase.slice(0, -1)

  res.json({
    frase
  })
})

app.get('/api/frase/:pos', (req, res) => {
  const posicion = req.params.pos;
  const palabra = palabras[posicion - 1]

  res.json({
    buscada: palabra
  })
})

app.post('/api/palabras', (req, res) => {
  const palabra = req.body.palabra;
  palabras.push(palabra)

  res.json({
    agregada: palabra,
    posicion: palabras.length
  })
})

app.put('/api/palabras/:pos', (req, res) => {
  const palabra = req.body.palabra;
  const posicion = req.params.pos;

  const palabraAnterior = palabras[posicion - 1];

  palabras[posicion - 1] = palabra

  res.json({
    actualizada: palabra,
    anterior: palabraAnterior
  })
})

app.delete('/api/palabras/:pos', (req, res) => {
  const posicion = req.params.pos;



  palabras = palabras.filter((p, i) => i+1 != posicion)

  res.json({
    success: true
  })
})


app.listen(8080, () => console.log('server running in http://localhost:8080'))