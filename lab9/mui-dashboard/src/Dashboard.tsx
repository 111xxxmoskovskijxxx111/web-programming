import React from 'react';
import { Grid, Card, CardContent, Typography, Stack } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const metrics = [
  { id: 1, title: 'Зареєстровані тварини', value: '142', icon: <PetsIcon fontSize="large" color="primary" /> },
  { id: 2, title: 'Активні дозатори', value: '8', icon: <PrecisionManufacturingIcon fontSize="large" color="success" /> },
  { id: 3, title: 'Витрата корму (кг)', value: '34.5', icon: <MonitorWeightIcon fontSize="large" color="warning" /> },
  { id: 4, title: 'Рівень води', value: '89%', icon: <WaterDropIcon fontSize="large" color="info" /> },
];

export const Dashboard: React.FC = () => {
  return (
    
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {metrics.map((metric) => (
        // Вимога 1: Адаптивність (xs=1, sm=2, md=4 колонки)
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={metric.id}>
          <Card elevation={2}>
            <CardContent>
              {/* Вимога 1: Stack для вертикального вирівнювання */}
              <Stack direction="column" alignItems="center" spacing={1}>
                {metric.icon}
                <Typography variant="h4" component="div">
                  {metric.value}
                </Typography>
                <Typography color="text.secondary">
                  {metric.title}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};