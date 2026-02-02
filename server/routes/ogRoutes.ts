import { Router } from 'express';
import { getReplyEmbed, getReplyImg } from '../controllers/ogController';

export const ogRoute = Router();

ogRoute.get('/reply-embed', getReplyEmbed);
ogRoute.get('/reply-embed.webp', getReplyImg);
