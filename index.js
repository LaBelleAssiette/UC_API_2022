const express = require('express');
const cors = require('cors');
const app = express();
const port = 2001;
const { ChefsManager } = require('./managers/ChefsManager');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.post('/chefs', async function(req, res) {
    const { firstname, lastname, description, photo } = req.body;
    const chefsManager = new ChefsManager({ firstname, lastname, description, photo });
    try {
        const json = await chefsManager.save();
        res.send(json);
    } catch (e) {
        console.error('Chef insertion error :');
        console.error(e);
    }
});

app.get('/chefs', async function(req, res) {
    const chefsManager = new ChefsManager();
    try {
        const json = await chefsManager.getChefs()
        res.status(200).json(json);
    } catch (e) {
        console.error('Error server');
        console.error(e);
    }
});

app.delete('/chefs/:id', async function(req, res) {
    const { id } = req.params;
    const chefsManager = new ChefsManager();
    try {
        const json = await chefsManager.deleteChef(id);
        res.status(200).json(json);
    } catch (e) {   
        console.error('Error server');
        console.error(e);
    }
});

// mettre a jour un chef
app.put('/chefs/:id', async function(req, res) {
    const { id } = req.params;
    const { firstname, lastname, description, photo } = req.body;
    const chefsManager = new ChefsManager({ firstname, lastname, description, photo });
    try {   
        const json = await chefsManager.updateChef(id);
        res.status(200).json(json);
    } catch (e) {
        console.error('Error server');
        console.error(e);
    }   
});  


app.listen(port, () => {
    console.log(`LBA_usecase listening on port ${port}`)
})

