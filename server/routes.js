// Routing for API-endpoints
const express = require("express");
const router = express.Router();

router.get("/movie/:id", async (req, res) => {
    try {
        const imdbId = req.params.id;
        const db = req.app.locals.db;

        const movie = await db.collection("imdb").aggregate([
            {
                $match: { _id: imdbId }
            },
            {
                $lookup: {
                    from: "bechdel",
                    localField: "normalized_id",
                    foreignField: "normalized_imdb_id",
                    as: "bechdel_data"
                }
            }
        ]).toArray();

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json(movie);

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}); 



