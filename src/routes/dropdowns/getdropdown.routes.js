import { Router } from 'express';
import { prisma } from '../../db.js'; // keep this one to access DB

const r = Router();

r.get('/country', async (req, res) => {
  try {
    
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc', 
      },
    });

 
    res.status(200).json({
      ok: true,
      message: 'Countries fetched successfully.',
      data: countries,
    });

  } catch (error) {
    
    console.error('Failed to fetch countries:', error); 

    
    res.status(500).json({
      ok: false,
      message: 'An internal server error occurred while fetching countries.',
    });
  }
});



export default r;