import express from 'express'

const router = express.Router();
// app.use(json());

router.get('/api/users/currentuser', (req, res)=>{
  res.send('Hi currentuser!')
})

export { router as currentUserRouter}



