import express from 'express';
import morgan from 'morgan';
import path from 'path';
import indexRoutes from './routes/index';
import  { errorHandler, ValidationError } from './core/interceptor';

const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(morgan('dev'));
app.use(express.json());
//app.use(errorHandler);

// routes
app.use('/api', indexRoutes);


// folder: store public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;