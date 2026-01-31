import { Router } from 'express';
import { getUsersByFIDs } from '../utils/neynar';
import sharp from 'sharp';
import path from 'path';
import { getReplyEmbed } from '../controllers/ogController';

export const ogRoute = Router();

ogRoute.get('/reply-embed', getReplyEmbed);

ogRoute.get('/reply-embed.png');
