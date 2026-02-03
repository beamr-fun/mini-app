import { Router } from 'express';
import {
  getFollowEmbed,
  getFollowImg,
  getReplyEmbed,
  getReplyImg,
} from '../controllers/ogController';

export const ogRoute = Router();

ogRoute.get('/reply-embed', getReplyEmbed);
ogRoute.get('/reply-embed.png', getReplyImg);

ogRoute.get('/follow-embed', getFollowEmbed);
ogRoute.get('/follow-embed.png', getFollowImg);
