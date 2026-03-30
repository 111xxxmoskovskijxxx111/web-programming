import React, { useState } from 'react';
import { 
  Paper, Typography, TextField, MenuItem, Slider, 
  InputAdornment, Button, Stack, Box 
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const marks = [
  { value: 1, label: 'Min' },
  { value: 5, label: '5' },
  { value: 10, label: 'Max' },
];

export const AssetForm: React.FC = () => {
  const [category, setCategory] = useState('sensor');

  return (
    
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Реєстрація нового модуля / датчика
      </Typography>
      
      <Stack spacing={3} sx={{ mt: 2 }}>
        {/* Вимога 3: TextField (Outlined) */}
        <TextField 
          label="Назва обладнання" 
          variant="outlined" 
          fullWidth 
          placeholder="Наприклад: Датчик температури v2"
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Вимога 3: Select menu */}
          <TextField
            select
            label="Категорія"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="feeder">Дозатор корму</MenuItem>
            <MenuItem value="sensor">Сенсор / Датчик</MenuItem>
            <MenuItem value="network">Мережевий хаб</MenuItem>
          </TextField>

          {/* Вимога 3: TextField (Filled) + InputAdornment */}
          <TextField 
            label="Вартість" 
            variant="filled" 
            fullWidth
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Пріоритет обслуговування (1-10)</Typography>
          {/* Вимога 3: Slider з видимими позначками (marks) */}
          <Slider
            defaultValue={5}
            step={1}
            marks={marks}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </Box>

        <Button variant="contained" color="primary" size="large">
          Зареєструвати актив
        </Button>
      </Stack>
    </Paper>
  );
};