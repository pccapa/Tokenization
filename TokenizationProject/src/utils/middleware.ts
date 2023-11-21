import { Request, Response } from "express";
import BaseRepository from "../repository/repository";

require('dotenv').config();

const HeaderValidation = async (req: Request, res: Response, next: any) => {
    if (req.path == '/health') return next();
    let validationMessage = process.env.INVALID_PK;

    if (!req.headers.authorization) {
        res.status(400).json({ validation: validationMessage });
        return;
    }

    let header = req.headers.authorization.split(' ');
    if (header[0] !== "Bearer" || header[1].length > 24) {
        res.status(400).json({ validation: validationMessage });
        return;
    }
    try {
        const exitsMerchant: boolean = await BaseRepository.checkMerchant(header[1]);
        if (!exitsMerchant) {
            res.status(400).json({ validation: validationMessage });
            return;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ validation: process.env.GENERAL_ERROR });
        return;
    }

};

export default HeaderValidation;
