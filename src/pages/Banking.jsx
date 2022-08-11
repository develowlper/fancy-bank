import { Euro } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';

import { useForm } from 'react-hook-form';
import zustand from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';

const store = (set) => ({
  amounts: [],
  addAmount: (value) =>
    set((state) => {
      state.amounts.push({ value, key: nanoid() });
    }),
});

const useStore = zustand(devtools(persist(immer(store), { name: 'banking' })));

export default function Banking() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const addAmount = useStore((state) => state.addAmount);
  const amounts = useStore((state) => state.amounts);
  const onSubmit = (data) => addAmount(Number(data.amount));
  return (
    <Container component="main">
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          defaultValue={0}
          type="number"
          step="any"
          label="amount"
          placeholder="enter amount here"
          {...register('amount')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Euro />
              </InputAdornment>
            ),
          }}
          inputProps={{
            step: 0.01,
          }}
        />
        <Button type="submit">Send</Button>
      </Box>
      <Box>
        <Box component="ul" sx={{ listStyle: 'none' }}>
          {amounts.map((amount) => (
            <Box component="li" key={amount.key}>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <Box>
                    <Euro size="small" />
                  </Box>
                </Grid>
                <Grid>
                  <Typography component="div" key={amount.key}>
                    {amount.value}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
