const Turf = require('../models/addTurfmodel');

exports.createTurf = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    const { title, location, description, price, type, slug } = req.body;
    const imgPath = req.file ? `/uploads/${req.file.filename}` : '';

    console.log('Data to insert:', { title, location, description, price, type, slug, img: imgPath });

    // Save to database with imgPath included
    await Turf.create({ title, location, description, price, type, slug, img: imgPath });
    
    console.log('Turf created successfully');
    res.status(201).json({ message: 'Turf created successfully' });
  } catch (error) {
    console.error('Error creating turf:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllTurfs = async (req, res) => {
    try {
        const turfs = await Turf.getAll();
        res.json(turfs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTurf = async (req, res) => {
    try {
        const { id } = req.params;
        await Turf.delete(id);
        res.json({ message: 'Turf deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTurfById = async (req, res) => {
    try {
        const { id } = req.params;
        const turf = await Turf.getById(id);
        if (!turf) {
            return res.status(404).json({ error: 'Turf not found' });
        }
        res.json(turf);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchTurfs = async (req, res) => {
    try {
        const { location, type, slug } = req.query;
        const turfs = await Turf.search({ location, type, slug });
        res.json(turfs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
