const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// Usage: put originals in ./public/hall/ then run `npm run process-images`
const inputDir = path.join(__dirname, '..', 'public', 'hall')
const outputDir = path.join(inputDir, 'optimized')

if (!fs.existsSync(inputDir)) {
  console.error('Input directory does not exist:', inputDir)
  process.exit(1)
}

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

const allowed = ['.jpg', '.jpeg', '.png']

async function processFile(file) {
  const ext = path.extname(file).toLowerCase()
  const base = path.basename(file, ext)
  const inputPath = path.join(inputDir, file)
  const outJpg = path.join(outputDir, `${base}.jpg`)
  const outWebp = path.join(outputDir, `${base}.webp`)

  try {
    await sharp(inputPath).resize(1600, 900, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(outJpg)
    await sharp(inputPath).resize(1600, 900, { fit: 'cover' }).webp({ quality: 80 }).toFile(outWebp)
    console.log('Processed', file)
  } catch (err) {
    console.error('Error processing', file, err)
  }
}

async function run() {
  const files = fs.readdirSync(inputDir).filter((f) => allowed.includes(path.extname(f).toLowerCase()))
  if (files.length === 0) {
    console.warn('No images found in', inputDir)
    return
  }

  for (const f of files) {
    // skip files in optimized dir
    if (f === 'optimized') continue
    // eslint-disable-next-line no-await-in-loop
    await processFile(f)
  }

  console.log('All done. Optimized images are in', outputDir)
}

run()
