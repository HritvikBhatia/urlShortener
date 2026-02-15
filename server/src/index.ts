import express from "express"
import cors from "cors"
import crypto from "crypto"
import { prisma } from "./lib/prisma";

const app = express();

app.use(cors())
app.use(express.json())

app.post("/shortener", async (req, res) => {
    const { longUrl } = req.body;
    if(!longUrl){
        return res.status(400).json({
            msg: "url not found try again buddy"
        })
    }

    try{
        const shortUrl = crypto.randomBytes(6).toString("base64url");

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 1);
        
        const newUrl = await prisma.url.create({
            data: {
                longUrl,
                shortUrl,
                expiresAt,
            },
        });
        return res.status(201).json({
            id: newUrl.id,
            shortUrl: `http://localhost:3000/${newUrl.shortUrl}`,
            expiresAt: newUrl.expiresAt,
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            msg: "somthing went wrong buddy"
        })    
    }
})

app.get("/:shortUrl", async (req, res) => {
    const { shortUrl } = req.params;

    const link = await prisma.url.findUnique({
        where:{
            shortUrl
        }
    })

    if (!link) {
        return res.status(404).json({
            msg: "link not found",
        });
    }

    res.redirect(link.longUrl)
})

app.listen(3000,() => {
    console.log("server is started at port 3000")
})