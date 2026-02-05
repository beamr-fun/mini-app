import { Router } from 'express';
import {
  getFollowEmbed,
  getFollowImg,
  getReplyEmbed,
  getReplyImg,
  getShareEmbed,
  getShareImg,
} from '../controllers/ogController';

export const ogRoute = Router();

ogRoute.get('/reply-embed', getReplyEmbed);
ogRoute.get('/reply-embed.png', getReplyImg);

ogRoute.get('/follow-embed', getFollowEmbed);
ogRoute.get('/follow-embed.png', getFollowImg);

ogRoute.get('/share-embed', getShareEmbed);
ogRoute.get('/share-embed.png', getShareImg);
