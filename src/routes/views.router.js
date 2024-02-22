import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {})
})

router.get("/paburoxChat", (req, res) => {
    res.render("messages");
});

export default router;