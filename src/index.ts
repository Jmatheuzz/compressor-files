import express, { Request, Response } from 'express'
import JsZIP from 'jszip'
import multer from 'multer'

const app = express()
app.use(express.json())

const upload = multer()

app.post('/', upload.any(), async (req: Request, res: Response) => {
  
  const zip = new JsZIP()
  const images = zip.folder('images')
  if (req.files !== undefined && req.files.length > 0){
    req.files.map((file, index) => {
      images?.file(file.originalname, file.buffer, {base64: true})
    })
  }
  const zipped = await zip.generateAsync({type: 'base64'})
  .then((content) => {
    return content
  })
  res.send({base64: zipped})
})

app.listen(5555, () => console.log('running in http://localhost:5555'))