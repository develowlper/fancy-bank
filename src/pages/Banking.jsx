import { BalanceRounded, Euro } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';

import { useForm } from 'react-hook-form';
import zustand from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

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

  const { data, isLoading } = useQuery(['balances'], () =>
    supabase
      .from('balances')
      .select('*')
      .order('created_at', { ascending: false })
  );

  const queryClient = useQueryClient();

  const balances = data?.data;
  const error = data?.error;

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  // useStore((state) => state.amounts);
  const onSubmit = async (data) => {
    const { data: res, error } = await supabase
      .from('balances')
      .insert([
        { created_by: supabase.auth.user().id, amount: Number(data.amount) },
      ]);

    queryClient.invalidateQueries('balances');

    console.log(error, data);
  };
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
          {balances.map((balance) => (
            <Box component="li" key={balance.id}>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <Box>
                    <Euro size="small" />
                  </Box>
                </Grid>
                <Grid>
                  <Typography component="div">{balance.amount}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
