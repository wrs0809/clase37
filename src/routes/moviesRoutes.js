const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recommended);
router.get('/movies/detail/:id', moviesController.detail);
//Crear pelicula
router.get('/movies/add', moviesController.add);
router.post('/movies/add', moviesController.createMovie);
//Editar pelicula
router.get('/movies/edit/:id', moviesController.edit);
router.put('/movies/edit/:id', moviesController.update);
//Borrar pelicula
router.delete('/movies/delete/:id', moviesController.delete);


module.exports = router;