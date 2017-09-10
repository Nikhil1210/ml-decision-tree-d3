import * as express from 'express';
 import modelRoutes from './model.route';
 import predictionsRoutes from './predictions.route';
// import postRoutes from './post.route';
// import agentRoutes from './agent.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

// mount model routes at /model
 router.use('/model', modelRoutes);

 // mount auth routes at /auth
 router.use('/predictions', predictionsRoutes);

// router.use('/agents', agentRoutes);
// router.use('/posts', postRoutes);

export default router;