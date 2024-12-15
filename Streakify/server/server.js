const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');
const habitLogRoutes = require('./routes/habitLogRoutes');
// const streakRoutes = require('./routes/streakRoutes');


const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/habitLogs', habitLogRoutes);
// app.use('/api/streaks', streakRoutes);

sequelize.sync({ alter: true }).then(() => {
        const PORT = process.env.PORT || 3000;
        console.log('Database synced successfully!'); 
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
