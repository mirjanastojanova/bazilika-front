import {mongooseConnect} from '../../lib/mongoose';
import {PriceList} from '../../models/PriceList.js';

export default async function handler(req, res) {
    await mongooseConnect();
  
    if (req.method === "GET") {
        const pricelist = await PriceList.find().sort({ createdAt: -1 }).lean();
        return res.status(200).json(pricelist);
    }

}