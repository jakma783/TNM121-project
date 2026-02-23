const url = require("node:url");
const fs = require("node:fs");
const path = require("node:path");
 
async function handleRequest(req, res, db) {
 
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
 
    // To get all data on movies with a limit
    if (req.method === "GET" && pathname === "/movies") {
 
        const movies = await db.collection("imdb")
            .find(
                {},
                {
                    projection: {
                        _id: 1,
                        name: 1,
                        year: 1,
                        genre: 1,
                        rating: 1
                    }
                }
            )
            .limit(50)
            .toArray();
 
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(movies));
    }
 
    // Detailed view of one movie with relevant information + bechdel score
    if (req.method === "GET" && pathname.startsWith("/movie/")) {
 
        const imdbId = pathname.split("/")[2];
 
        const movie = await db.collection("imdb").aggregate([
 
            { $match: { _id: imdbId } },
 
            {
                $lookup: {
                    from: "bechdel",
                    localField: "normalized_id",
                    foreignField: "normalized_imdb_id",
                    as: "bechdel_data"
                }
            },
 
            {
                $project: {
                    _id: 1,
                    title: "$name",
                    year: 1,
                    genre: 1,
                    runtime: 1,
                    description: 1,
                    director: 1,
                    actors: "$star",
                    imdb_rating: "$rating",
 
                    bechdel_score: {
                        $cond: {
                            if: { $gt: [{ $size: "$bechdel_data" }, 0] },
                            then: { $arrayElemAt: ["$bechdel_data.rating", 0] },
                            else: null
                        }
                    }
                }
            }
 
        ]).toArray();
 
        if (!movie.length) {
            res.statusCode = 404;
            return res.end("Movie not found");
        }
 
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(movie[0]));
    }

    if(req.method === "GET" && pathname.startsWith("/image/")) {
        const normalizedID = pathname.split("/")[2];

        const imagePath = path.join(__dirname, "../client/media", normalizedID + ".png");
        const placeholderPath = path.join(__dirname, "../client/media", "placeholder.png");

        fs.readFile(imagePath, (err, data) => {
            // If there is no image to given normalized Id
            if(err){
                fs.readFile(placeholderPath, (err2, data2) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "image/png");
                    return res.end(data2);
                });
            // Show movie that matches the normalized Id
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "image/png");
                return res.end(data);
            }
        });
        return;
    }
 
    res.statusCode = 404;
    res.end("Endpoint not found");
}
 
module.exports = { handleRequest };
 