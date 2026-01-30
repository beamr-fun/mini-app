import { Router } from 'express';

export const ogRoute = Router();

ogRoute.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('id', id);

  const baseUrl = `https://${req.get('host')}`;

  const imageUrl = `${baseUrl}/public/img/${id}`;

  const embed = {
    version: '1',
    imageUrl,
    button: {
      title: 'Open Beamr',
      action: {
        type: 'launch_miniapp',
        name: 'Beamr',
        url: baseUrl,
        splashImageUrl: `${baseUrl}/images/splash.png`,
        splashBackgroundColor: '#0F0E0E',
      },
    },
  };

  res.type('text/html').send(`<!DOCTYPE html>
<html>
<head>
  <meta name="fc:miniapp" content='${JSON.stringify(embed)}' />
  <meta name="fc:frame" content='${JSON.stringify(embed)}' />
</head>
<body></body>
</html>`);
});
